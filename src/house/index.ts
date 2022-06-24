import {
  ConsumptionFactorsT,
  DataE,
  DataI,
  HeaterE,
  HouseE,
  HouseT,
  YearE
} from "./types";

//
// Data sets available
// Note: avoid dealing with dynamic loading drawbacks
import ADEME_2022 from "./data/ademe_2022.json";
import CCO2_2021 from "./data/cco2_2021.json";
import CCO2_2022 from "./data/cco2_2022.json";
import CITEPA_2021 from "./data/citepa_2021.json";
import CITEPA_2022 from "./data/citepa_2022.json";
const DATA = {
  ADEME_2022: ADEME_2022 as DataI,
  CCO2_2021: CCO2_2021 as DataI,
  CCO2_2022: CCO2_2022 as DataI,
  CITEPA_2021: CITEPA_2021 as DataI,
  CITEPA_2022: CITEPA_2022 as DataI
};

export default class House {
  private avgEmission: number | undefined; // Singleton average computation (by person)
  private avgEmissionByHouse: number | undefined; // Singleton average computation (by house)
  private emissionFromStudy:
    | { houseEmission: number; apartmentEmission: number }
    | undefined; // Singleton study computation (apartment/house)
  private data: DataI; // Factor Emissions Loaded
  private dataSet: DataE; // Factor Emissions Source

  /**
   * @warning use the static build method using dataset enum type DataE
   */
  constructor(dataSet: DataE, data: DataI) {
    if (!data) throw new Error("Cannot be instanciated without dataset");
    this.data = data;
    this.dataSet = dataSet;
    this.avgEmission = undefined;
    this.avgEmissionByHouse = undefined;
    this.emissionFromStudy = undefined;
  }

  /**
   * Create new instance from dataset
   *
   * @param dataset - the dataset to be used with this calculator
   *
   * @return new House calculator - Throw error if dataset not loaded.
   */
  static build(dataset: DataE) {
    try {
      const data = DATA[dataset];
      return new House(dataset, data);
    } catch {
      throw new Error(`Error Loading Dataset <${dataset}>`);
    }
  }

  /**
   * Return constants data loaded
   *
   * @return constant data loaded
   */
  getData = (): DataI => this.data;

  /**
   * Return dataset name
   *
   * @return constant dataset loaded
   */
  getDataset = (): DataE => this.dataSet;

  /**
   * Compute the co2 emission consumed in kgCO2e from a list of consumed ressources
   * Negative values are allowed (this could be due to energy provider correction)
   *
   * @param  consumptions - list consumptions made in unit depending on heater type
   * @param  heater - type of heater in use
   *
   * @return
   * the real emission consummed from bills consumptions in kgCO2e
   * -1 in case of error (constants not available from dataset)
   */
  getEmissionConsumed = (consumptions: number[], heater: HeaterE): number => {
    const combustibleFactor = this.data.emissionFactors[heater].energyFactor;
    if (isNaN(combustibleFactor as any) || combustibleFactor! < 0) return -1;

    let initialEmission = 0;
    const emissions = consumptions.reduce(
      (acc, value) => acc + value,
      initialEmission
    );
    return emissions * combustibleFactor;
  };

  /**
   * Compute the CO2 emissions estimation for a house in kgCO2e/year
   *
   * @description
   * We compute here the CO2e emission estimation from heating housing with this simple computation:
   * - Emission = Surface * ConsumptionFactor * CombustibleFactor * ClimateCoef
   * - [kgCO2e/year] = [m²] * [kWh/(m².year)] * [kgCO2e/kW] * Cste
   *
   * If the region or region correction factor is not found - ClimateCoef = 1 is applied.
   *
   * @param house - the house
   *
   * @return
   *   the estimated house emissions in kgCO2e/year
   *   -1 in case of error (constants not available from dataset)
   */
  getEmissionEstimated = (house: HouseT): number => {
    if (house.surface < 0) return -1;

    // Get the factor emission from study - kWh/(m².year)
    const emissionFactor = this.data.consumptionFactors?.[house.built]?.[
      house.type
    ]?.[house.heater]?.emissionFactor;
    if (isNaN(emissionFactor as any) || emissionFactor! < 0) return -1;

    // Retrieve the combustible Factor - kgCO2e/kW
    const combustibleFactor = this.data.emissionFactors?.[house.heater]
      ?.emissionFactor;
    if (!combustibleFactor) return -1;

    // Check if a climateCoeff factor is available - Cste
    let climateCoeff = 1;
    const region = this.data.regions?.find(
      region => region.DEP === house.region
    );
    if (
      region &&
      this.data.climateCoeffs &&
      this.data.climateCoeffs[region.FACTOR]
    )
      climateCoeff = this.data.climateCoeffs[region.FACTOR];

    // Compute
    return house.surface * emissionFactor! * combustibleFactor * climateCoeff;
  };

  /**
   * Return the total co2 estimation from house/apartment study in kgCO2e/year.
   *
   * @param study - the raw study data
   *
   * @warning
   * Implementation is defined as a lazy singleton that compute only once.
   *
   * @return
   * The estimated co2 emission in kgCO2e/year
   */
  private computeStudy = (
    study: ConsumptionFactorsT
  ): { houseEmission: number; apartmentEmission: number } => {
    if (this.emissionFromStudy) return this.emissionFromStudy;

    // Compute Average emissions
    let apartmentEmission = 0;
    let houseEmission = 0;
    for (const [keyBuilt, built] of Object.entries(study)) {
      const apartment = built.apartment;
      const house = built.house;

      // Adding all apartment emissions
      for (const [keyHeater, heater] of Object.entries(apartment)) {
        const emission =
          (heater.part / 100) *
          this.getEmissionEstimated({
            heater: keyHeater as HeaterE,
            built: keyBuilt as YearE,
            surface: heater.surface,
            type: HouseE.apartment
          });
        if (emission > 0) apartmentEmission += emission;
      }

      // Adding all house emissions
      for (const [keyHeater, heater] of Object.entries(house)) {
        const emission =
          (heater.part / 100) *
          this.getEmissionEstimated({
            heater: keyHeater as HeaterE,
            built: keyBuilt as YearE,
            surface: heater.surface,
            type: HouseE.house
          });
        if (emission > 0) houseEmission += emission;
      }
    }

    // Set singleton
    this.emissionFromStudy = {
      houseEmission: houseEmission,
      apartmentEmission: apartmentEmission
    };
    return this.emissionFromStudy;
  };

  /**
   * Return the average co2 estimation from housing heating in kgCO2e/year (per person).
   *
   * @warning
   * Implementation is defined as a lazy singleton that compute only once.
   *
   * @return
   * The estimated co2 emission in kgCO2e/year (per person)
   */
  getEmissionAvg = (): number => {
    if (this.avgEmission) return this.avgEmission;

    // Different mothodologies (depends on the dataset) are used to compute the average consumption
    switch (this.dataSet) {
      // Simple Ratio
      case DataE.CCO2_2021:
      case DataE.CCO2_2022:
      case DataE.CITEPA_2021:
      case DataE.CITEPA_2022:
        this.avgEmission =
          this.data.study!.totalEmission! / this.data.study!.peopleCount!;
        return this.avgEmission;
      // Make use of the full study (Average of the whole set)
      case DataE.ADEME_2022:
        const emissions = this.computeStudy(this.data.consumptionFactors!);
        this.avgEmission =
          (emissions.apartmentEmission * this.data.study!.apartment! +
            emissions.houseEmission * this.data.study!.house!) /
          this.data.study!.peopleCount!;
        return this.avgEmission;
    }
  };

  /**
   * Return the average co2 estimation from housing heating in kgCO2e/year (per house-apartment).
   *
   * @warning
   * Implementation is defined as a lazy singleton that compute only once.
   *
   * @return
   * The estimated co2 emission in kgCO2e/year (per house-apartment), -1 if information is not available.
   */
  getEmissionAvgByHouse = (): number => {
    if (this.avgEmissionByHouse) return this.avgEmissionByHouse;

    // Different mothodologies (depends on the dataset) are used to compute the average consumption
    switch (this.dataSet) {
      // Simple Ratio
      case DataE.CCO2_2021:
      case DataE.CITEPA_2021:
      case DataE.CITEPA_2022:
        return -1;
      case DataE.CCO2_2022:
        this.avgEmission =
          this.data.study!.totalEmission! /
          (this.data.study!.house! + this.data.study!.apartment!);
        return this.avgEmission;
      // Make use of the full study (Average of the whole set)
      case DataE.ADEME_2022:
        const study = this.data.study!;
        const apartmentPart =
          study.apartment! / (study.apartment! + study.house!);
        const housePart = study.house! / (study.apartment! + study.house!);
        const emissions = this.computeStudy(this.data.consumptionFactors!);

        this.avgEmission =
          emissions.apartmentEmission * apartmentPart +
          emissions.houseEmission * housePart;
        return this.avgEmission;
    }
  };
}

/**
 * @TODO Missing trusted Sources & factor coefficients (waiting for it)
 * Compute the co2 emissions reduction from the reduction earned with the work of the house in kgCO2/year
 * Use the emission already computed from house if available, compute first the house emission otherwise.
 *
 * @param house - the house
 * @param works - the type(s) of work(s) made
 *
 * @return
 *   the estimated emissions reduction in kgCO2/year
 *   -1 in case of error (constants not available from dataset)
 */
/*export const getWorkReduction = (house:HouseT, works:ReductionT[]):number => {
  const emission = house.emission || getEmission(house);
  if (emission < 0) return -1;

  // Make uniq && Accumulate all reduction factors
  let initialFactor = 0;
  const reductionFactor =
    [... new Set(works)].reduce((acc, value) => acc + data.reductions[value], initialFactor);

  return emission * reductionFactor;
}*/

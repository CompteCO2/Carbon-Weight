import { DataE, DataI, HeaterE, HouseE, HouseT, YearE } from "./types";
//
// Data sets available
// Note: avoid dealing with dynamic loading drawbacks
import ADEME_2022 from "./data/ademe_2022.json";
import CCO2_2022 from "./data/cco2_2022.json";
import CITEPA_2021 from "./data/citepa_2021.json";
const DATA = {
  ADEME_2022: ADEME_2022 as DataI,
  CCO2_2022: CCO2_2022 as DataI,
  CITEPA_2021: CITEPA_2021 as DataI
};

export default class House {
  private avgEmission: number | undefined; // Singleton average computation
  private data: DataI; // Factor Emissions Loaded
  private dataSet: DataE; // Factor Emissions Source

  constructor(dataSet: DataE, data: DataI) {
    if (!data) throw new Error("Cannot be instanciated without dataset");
    this.data = data;
    this.dataSet = dataSet;
    this.avgEmission = undefined;
  }

  /**
   * Create a calculator instance from dataset
   *
   * @return new House calculator - Throw error if dataset not loaded.
   */
  static build(dataset: DataE) {
    try {
      const data = DATA[dataset];
      return new House(dataset, data);
    } catch {
      throw new Error("Dataset Not Available");
    }
  }

  /**
   * Return the current data constants loaded
   *
   * @return constant data loaded
   */
  getData = (): DataI => this.data;

  /**
   * Compute the co2 emission consumed in kgCO2e from a list of consumed ressources
   * Negative values are allowed (this could be due to energy provider correction)
   *
   * @param  consumptions - list consumptions made in unit depending on heater type
   * @param  heater - type of heater in use
   *
   * @return
   * the real emission consummed from bills consumptions in kgCO2e
   * -1 in case of error (invalid energy factor from heater)
   */
  getEmissionConsumed = (consumptions: number[], heater: HeaterE): number => {
    const combustibleFactor = this.data.emissionFactors[heater].energyFactor;
    if (combustibleFactor < 0) return -1;

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
   *   -1 in case of error
   */
  getEmissionEstimated = (house: HouseT): number => {
    if (house.surface < 0) return -1;

    // Get the factor emission from study - kWh/(m².year)
    const emissionFactor = this.data.consumptionFactors?.[house.built]?.[
      house.type
    ]?.[house.heater]?.emissionFactor;
    if (!emissionFactor || emissionFactor < 0) return -1;

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
    return house.surface * emissionFactor * combustibleFactor * climateCoeff;
  };

  /**
   * Return the average co2 estimation from housing heating in kgCO2e/year.
   *
   * @warning
   * Implementation is defined as a lazy singleton that compute only once.
   *
   * @return
   * The estimated co2 emission in kgCO2e/year
   */
  getEmissionAvg = (): number => {
    if (this.avgEmission) return this.avgEmission;

    // Different mothodologies (depends on the dataset) are used to compute the average consumption
    switch (this.dataSet) {
      // Simple Ratio
      case DataE.CCO2_2022:
      case DataE.CITEPA_2021:
        this.avgEmission =
          this.data.study!.totalEmission! / this.data.study!.residentCount!;
        return this.avgEmission;
      // Make use of the full study (Average of the whole set)
      case DataE.ADEME_2022:
        const study = this.data.study!;
        const apartmentPart =
          study.apartment! / (study.apartment! + study.house!);
        const housePart = study.house! / (study.apartment! + study.house!);
        let apartmentEmission = 0;
        let houseEmission = 0;

        // Compute Average emissions
        for (const [keyBuilt, built] of Object.entries(
          this.data.consumptionFactors!
        )) {
          const apartment = built.apartment;
          const house = built.house;

          // Adding all apartment emissions
          for (const [keyHeater, heater] of Object.entries(apartment)) {
            apartmentEmission +=
              (heater.part / 100) *
              this.getEmissionEstimated({
                heater: keyHeater as HeaterE,
                built: keyBuilt as YearE,
                surface: heater.surface,
                type: HouseE.apartment
              });
          }
          // Adding all apartment emissions
          for (const [keyHeater, heater] of Object.entries(house)) {
            const emission =
              (heater.part / 100) *
              this.getEmissionEstimated({
                heater: keyHeater as HeaterE,
                built: keyBuilt as YearE,
                surface: heater.surface,
                type: HouseE.apartment
              });
            if (emission > 0) houseEmission += emission;
          }
        }

        this.avgEmission =
          apartmentEmission * apartmentPart + houseEmission * housePart;
        return this.avgEmission;
      default:
        return -1;
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
 *   -1 in case of error
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

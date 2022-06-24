import { ConsumptionT, DataE, DataI, ModelT, VehicleT } from "./types";

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

export default class Vehicle {
  private avgEmission: number | undefined; // Singleton average computation (by people)
  private avgEmissionByVehicle: number | undefined; // Singleton average computation (by vehicle)
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
    this.avgEmissionByVehicle = undefined;
  }

  /**
   * Create a calculator instance from dataset
   *
   * @return new House calculator - Throw error if dataset not loaded.
   */
  static build(dataset: DataE) {
    try {
      const data = DATA[dataset];
      return new Vehicle(dataset, data);
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
   * Return the inner data set name
   *
   * @return constant data loaded
   */
  getDataset = (): DataE => this.dataSet;

  /**
   * Compute a CO2 emission from the consumption in kgCO2e/year using
   * fuel emission factors in kgCO2e/litre
   *
   * @description
   * Depending on the availibity of the consumption parameter, it whether use the following:
   *
   * Using consumption
   * - Emission = Consumption * Factor
   * - [kgCO2e/year] = [L/year] * [kgCO2e/L]
   *
   * Using Mileage & MPG
   * Emission = MPG * (Mileage / 100) * Factor
   * [kgCO2e/year] = [L/100Km] * [100Km/year] * [kgCO2e/L]
   *
   * Although this computation method is the most precise, it relies on a parameter
   * that could be quite uncertain (depends on personal measure) or
   * even unknown. Indeed, the exact MPG (or real fuel consumption)
   * for the period of the annual mileage could be difficult to get with precision
   * if not measured properly.
   *
   * @param consumption - the measured consumption in { L } or { Mileage & MPG }
   * @param dataset - the factor emission source
   *
   * @return
   *   the emission in kgCO2/year
   *   -1 in case of error (missing information)
   */
  getEmissionConsumed = (consumption: ConsumptionT): number => {
    // We either needs consumption or mileage && MPG
    if (
      (consumption.consumption === undefined &&
        consumption.distanceByYear === undefined) ||
      (consumption.consumption === undefined && consumption.mpg === undefined)
    )
      return -1;

    // Retrieve the consumption in L
    const consumed =
      consumption.consumption !== undefined
        ? consumption.consumption
        : consumption.mpg! * (consumption.distanceByYear! / 100);

    return consumed * this.data.emissionFactors[consumption.fuel];
  };

  /**
   * Return the average co2 estimation from PC (private vehicle) in kgCO2e/year (by person).
   *
   * @TODO review, source and explain differents computation
   *
   * @description
   * It is a simple proportion taking the total private vehicle emission estimated from private vehicle
   * divided by the number of people.
   *
   * emission = emissions / #people
   * [kgCO2e/year/vehicle] = [kgCO2e/kg/year] / [people]
   *
   * @return
   * The estimated co2 emission in kgCO2e/year (per people)
   */
  getEmissionAvg = (): number => {
    if (this.avgEmission) return this.avgEmission;
    this.avgEmission =
      this.data.study.totalEmission / this.data.study.peopleCount;
    return this.avgEmission;
  };

  /**
   * Return the average co2 estimation by PC (private vehicle) in kgCO2e/year (by vehicle).
   *
   * @description
   * It is a simple proportion taking the total private vehicle emission estimated from private vehicle
   * divided by the number of vehicle.
   *
   * emission = emissions / #vehicles
   * [kgCO2e/year/vehicle] = [kgCO2e/kg/year] / [vehicle]
   *
   * @return
   * The estimated co2 emission in kgCO2e/year (per vehicle)
   */
  getEmissionAvgByVehicle = (): number => {
    if (this.avgEmissionByVehicle) return this.avgEmissionByVehicle;
    this.avgEmissionByVehicle = this.data.study.carCount
      ? this.data.study.totalEmission / this.data.study.carCount
      : -1;
    return this.avgEmissionByVehicle;
  };

  /**
 * Compute CO2 emission from driving a specific vehicle in kgCO2/year
 *
 * @TODO review, source and explain the yearFactor constant computation
 *
 * @description
 * The vehicle carbon emission is computed using the original emission/consumption factor.
 * However, this value is evolving along the time as the vehicle get older and
 * depends on factors such as driving habits and maintains mechanics.
 * We thus use an extra factor that takes into account aging.
 *
 * The computation could use the factor emission expressed in **gCO2e/km**
 * which can be found on the registration card - V.7 field (EU):
 * - Emission = Mileage * Factor * YearCorrection
 * - [kgCO2e/year] = [Km/year] * [gCO2e/km] / 1000 * Cste
 *
 * Or it could either use the fuel consumption factor expressed in "L/100Km".
 * We find back the formula of the first method using the fuel consumption factor
 * coerced with the extra aging factor:
 - Emission = MPG * (Mileage / 100) * FuelEmissionFactor * YearCorrection
 - [kgCO2e/year] = [L/100Km] * [100Km/year] * [kgCO2e/L] * Cste
 *
 * @param vehicle - the vehicle measured factors in ({ gCO2e/km } or { L/100Km + FuelE }) and the Mileage
 * @param dataset - the factor emission source
 *
 * @return
 *   the estimated emission in kgCO2/year
 *   -1 in case of error (missing information)
 */
  getEmissionMileage = (vehicle: VehicleT): number => {
    // We either needs emissionFactor or consumption && fuel
    if (
      (vehicle.emissionFactor === undefined &&
        vehicle.consumption === undefined) ||
      (vehicle.emissionFactor === undefined && vehicle.fuel === undefined)
    )
      return -1;
    // Return from consumption && fuel
    if (vehicle.consumption !== undefined)
      return this.getEmissionConsumed({
        consumption: (vehicle.consumption * vehicle.distanceByYear) / 100, // * yearFactor
        fuel: vehicle.fuel!
      });
    // Return from emissionFactor
    return vehicle.distanceByYear * (vehicle.emissionFactor! / 1000); // * yearFactor;
  };

  /**
   * Compute CO2 emission estimation from driving a type of vehicle in kgCO2/year
   *
   * @description
   * Allows you to get a fairly good CO2e emission estimation from only
   * the vehicle type and your annual mileage.
   *
   * The constant factor unit is **gCO2e/km** and are statistic averages depending
   * on the three following parameters:
   * - Vehicle Type: Light utility, Standard, Two Wheeler.
   * - Fuel Type: CNG, Diesel, Electric, LPG, Petrol.
   * - Year of manufacture: From 1990 To 2018.
   *
   * So, the formula is kinda the same as the one used in "Registration Card".
   * The change is on the emission factors that come from statistical source and
   * already include vehicle aging.
   *
   * Emission = Mileage * Factor / 1000
   * [kgCO2e/year] = [Km/year] * [kgCO2e/km]
   *
   * @param vehicle - the vehicle type and the yearly mileage.
   * @param dataset - the factor emission source
   *
   * @return
   *   the estimated emission in kgCO2e/year
   *   -1 in case of error (cannot find the data for this type of vehicle)
   */
  getEmissionEstimated = (model: ModelT): number => {
    const vehicleData = this.data.emissionFigure?.vehicle?.[model.type]?.[
      model.fuel
    ];
    if (!vehicleData) return -1;

    const startYear = this.data.emissionFigure!.yearStart;
    const closestYear = Math.min(
      Math.max(startYear, model.year),
      startYear + vehicleData!.length - 1
    );
    const emissionFactor = vehicleData[closestYear - startYear];

    return model.distanceByYear * (emissionFactor / 1000);
  };
}

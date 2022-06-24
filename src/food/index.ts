import {
  DataE,
  DataI,
  DataR,
  FoodE,
  FoodI,
  ComsumptionR,
  ConsumptionT,
  WasteE
} from "./types";
//
const WEEK_RANGE = { min: 0, max: 14 };

/**
 * Transform raw data factors from ADEME to the ones used by the calculator
 *
 * @param dataR the raw data coming from the .json referenced sources
 *
 * @return the factors computed (averages/sums) to be used by the calculator
 */
export const buildData = (dataR: DataR): DataI => {
  let data: { foods: { [key: string]: FoodI } } = { foods: {} };
  Object.entries(dataR.foods).forEach(([key, value]) => {
    const averageWeightDay = Object.values(value.averageWeightDay).reduce(
      (a, b) => a + b
    );
    const emissionFactors = Object.values(value.emissionFactors);
    const emissionFactor =
      emissionFactors.reduce((a, b) => a + b) / emissionFactors.length;
    const food = key as keyof typeof FoodE;
    (data.foods[food] as FoodI) = {
      averageWeight: value.averageWeight,
      averageWeightDay: averageWeightDay,
      emissionFactor: emissionFactor,
      wasteEmissionFactor:
        dataR.wastes[value.wasteEmissionFactor as WasteE].packaging,
      wasteRatioFactor: dataR.wastes[value.wasteEmissionFactor as WasteE].ratio
    };
  });

  return data as DataI;
};

// Data sets available
// Note: avoid dealing with dynamic loading drawbacks
import ADEME_2022 from "./data/ademe_2022.json";
const DATA = {
  ADEME_2022: buildData(ADEME_2022 as DataR)
};

export default class Food {
  private avgEmission: ComsumptionR | undefined; // Singleton average computation
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
  }

  /**
   * Create a calculator instance from dataset
   *
   * @return new House calculator - Throw error if dataset not loaded.
   */
  static build(dataset: DataE) {
    try {
      const data = DATA[dataset];
      return new Food(dataset, data);
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
   * Compute a rough co2 estimation from eating habits in kgCO2e/year
   *
   * @description
   * Your food carbon footprint is by design a best estimate.
   * This approximation still allows you to get an order of magnitude and act.
   *
   * The formulat we use is as simple as (where frequency is given by week) :
   *
   * emission = SUM[(weaklyConsumed * averageWeight * 52) / 1000 * carbonEmissionFactor]
   * [kgCO2e/year] = (52[g/week]) / 1000 * [kgCO2e/kg]
   *
   * waste = SUM[(weaklyConsumed * averageWeight * 52) / 1000 * wasteRatioFactor * wasteEmissionFactor]
   * [kgCO2e/year] = (52[g/week]) / 1000 * [kgPackaging/kg] * [kgCO2e/kgPackaging]
   *
   * @param consumption - consumed products in meal/week
   *
   * @return
   *   the estimated emission emissions in kgCO2e/year
   *   { -1, -1 } in case of error
   */
  getEmissionEstimated = (consumption: ConsumptionT): ComsumptionR => {
    let emission = 0;
    let waste = 0;
    for (const [key, value] of Object.entries(consumption)) {
      if (!value) continue;
      if (value < WEEK_RANGE.min || value > WEEK_RANGE.max)
        return { emission: -1, waste: -1 };
      const food = key as keyof typeof FoodE;
      const yearlyWeight =
        (value * this.data.foods[food].averageWeight * 52) / 1000; // (from g to Kg)
      emission += yearlyWeight * this.data.foods[food].emissionFactor;
      waste +=
        yearlyWeight *
        this.data.foods[food].wasteRatioFactor *
        this.data.foods[food].wasteEmissionFactor;
    }

    return { emission, waste };
  };

  /**
   * Return the average co2 estimation from eating habits in kgCO2e/year.
   *
   * @description
   * It takes the average adult consumption of different foods expressed in g/day from trusted source.
   * The formulat we use is as simple as (where frequency is given by week) :
   *
   * emission = SUM[(dailyAvg * 365) / 1000 * carbonEmissionFactor]
   * [kgCO2e/year] = (365[g/day]) / 1000 * [kgCO2e/kg]
   *
   * waste = SUM[(daily * 365) / 1000 * wasteRatioFactor * wasteEmissionFactor]
   * [kgCO2e/year] = (365[g/day]) / 1000 * [kgPackaging/kg] * [kgCO2e/kgPackaging]
   *
   * @warning
   * Implementation is defined as a lazy singleton that compute only once.
   *
   * @return
   * The estimated co2 emission in kgCO2e/year
   */
  getEmissionAvg = (): ComsumptionR => {
    if (this.avgEmission) return this.avgEmission;
    let emission = 0;
    let waste = 0;
    for (const value of Object.values(this.data.foods)) {
      const yearlyWeight = (value.averageWeightDay * 365) / 1000; // (from g to Kg)
      emission += yearlyWeight * value.emissionFactor;
      waste +=
        yearlyWeight * value.wasteRatioFactor * value.wasteEmissionFactor;
    }
    this.avgEmission = { emission, waste };

    return this.avgEmission;
  };
}

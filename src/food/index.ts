import { BuildData,  DataI, DataR, FoodE, ComsumptionR, ConsumptionT } from './types';
import dataJSON from './data/fr.json';
const dataR = dataJSON as DataR;
const data = BuildData(dataR);
const WEEK_RANGE = { min: 0, max: 14 };
let avgEmission:ComsumptionR|undefined = undefined; // Singleton average computation

/**
 * Return the current data constants loaded
 *
 * @return constant data loaded
 */
export const getData = ():DataI => { return data; }

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
export const getEmission = (consumption:ConsumptionT):ComsumptionR => {
  let emission = 0;
  let waste = 0;
  for (const [key, value] of Object.entries(consumption)) {
    if (!value) continue;
    if (value < WEEK_RANGE.min || value > WEEK_RANGE.max) return { emission: -1, waste: -1 };
    const food = key as keyof typeof FoodE;
    const yearlyWeight = ((value * data.foods[food].averageWeight)) * 52 / 1000; // (from g to Kg)
    emission += yearlyWeight * data.foods[food].emissionFactor;
    waste += yearlyWeight * data.foods[food].wasteRatioFactor * data.foods[food].wasteEmissionFactor;
  }

  return { emission, waste };
}

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
export const getEmissionAvg = ():ComsumptionR => {
  if (avgEmission) return { emission:avgEmission.emission, waste:avgEmission.waste };
  let emission = 0;
  let waste = 0;
  for (const value of Object.values(data.foods)) {
    const yearlyWeight = value.averageWeightDay * 365 / 1000; // (from g to Kg)
    emission += yearlyWeight * value.emissionFactor;
    waste += yearlyWeight * value.wasteRatioFactor * value.wasteEmissionFactor;
  }
  avgEmission = { emission, waste }

  return avgEmission;
}

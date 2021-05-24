import { DataI, ComsumptionR, ConsumptionT } from './types';
import dataJSON from './data/fr.json';
const data = dataJSON as DataI;
const rangeByWeek = { min: 0, max: 14 };

/**
 * Compute a rough co2 estimation from eatin habits in kgCO2/year
 *
 * @description
 * Your food carbon footprint is by design a best estimate.
 * Indeed, how can you EXACTLY count the number of pineapples imported by plane,
 * all the kilos of frozen asparagus, etc, that you have eaten this year?
 * This approximation still allows you to get an order of magnitude and act.
 * The formulat we use is as simple as (where frequency is given by week) :
 * emission = (frequency x QTE / 1000) x 52 x carbonEmissionFactor
 * waste = (frequency x QTE / 1000) x 52 x carbonWasteEmissionFactor
 *
 * @param consumption - consumed products by week
 *
 * @return
 *   the estimated emission  emissions in kgCO2/year
 *   -1 in case of error
 */
export const getEmission = (consumption:ConsumptionT):ComsumptionR => {
  let emission = 0;
  let waste = 0;
  for (const [key, value] of Object.entries(consumption)) {
    if (!value) continue;
    if (value < rangeByWeek.min || value > rangeByWeek.max) return { emission, waste };

    const yearlyWeight = ((value * data.foods[key].averageWeight)) * 52 / 1000; // (from g to Kg)
    emission += yearlyWeight * data.foods[key].emissionFactor;
    waste += yearlyWeight * data.foods[key].wasteEmissionFactor;
  }

  return { emission, waste };
}

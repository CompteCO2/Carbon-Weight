import { ClimateE, DataI, HouseT } from './types';
import dataJSON from './data/fr.json';
const data = dataJSON as DataI;

/**
 * Compute the CO2 emissions  estimation for a house in kgCO2e/year
 *
 * @description
 * We compute here the CO2e emission estimation from heating housing with this simple computation:
 * - Emission = Surface * ConsumptionFactor * CombustibleFactor * ClimateCoef
 * - [kgCO2e/year] = [m²] * [kWh/(m².year)] * [kgCO2e/kW] * Cste
 *
 * @param house - the house
 *
 * @return
 *   the estimated house emissions in kgCO2e/year
 *   -1 in case of error
 */
export const getEmission = (house:HouseT):number => {
  const region = data.regions[house.region];
  const consumptionFactor = data.consumptionFactors[house.built][house.type][house.heater].emissionFactor;

  if (!region|| house.surface < 0 || consumptionFactor < 0) return -1;

  const climateCoeff = data.climateCoeffs[region as ClimateE];
  const combustibleFactor = data.emissionFactors[house.heater];
  return house.surface * consumptionFactor * combustibleFactor * climateCoeff;
}

/**
 * @TODO Verify units in use for each energy type
 * Compute the co2 emission consumed in kgCO2e from a list of consumed ressources
 * Negative values are allowed (this could be due to energy provider correction)
 *
 * @param  consumptions - list consumptions made in unit depending on heater type
 * @param  heater - type of heater in use
 *
 * @return the real emission consummed from bills consumptions in kgCO2e
 */
/*export const getEmissionConsumed = (consumptions:number[], heater:HeaterE):number => {
  let initialEmission = 0;
  const emissions = consumptions.reduce((acc, value) => acc + value, initialEmission);
  return emissions * data.emissionFactors[heater];
}*/

/**
 * @TODO Source and verify factor coefficient
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

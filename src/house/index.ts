import { DataI, HeaterT, HouseT, ReductionT } from './types';
import dataJSON from './data/fr.json';
const data = dataJSON as DataI;

/**
 * Retrieve the year key category from the exact building year of the house
 *
 * @param climate - habitable surface of the house in m2
 * @param buildYear - the year the house was built
 *
 * @return
 *   the year key corresponding to the building year category
 *   undefined in case of unfound category
 */
export const toYearKey = (climate:string, buildYear:number):string | undefined => {
  let yearKey = undefined;
  if (!climate || !data.classes[climate]) return yearKey;

  // Sort years key by descending order to find the corresponding year key
  const keys = Object.keys(data.classes[climate]).sort((a:string, b:string) => b.localeCompare(a));
  for (let i = 0; i < keys.length; i++) {
    if (buildYear >= parseInt(keys[i])) {
      yearKey = keys[i];
      break;
    }
  }

  return yearKey;
}

/**
 * Compute the co2 emissions for a house in kgCO2
 *
 * @param house - the house
 *
 * @return
 *   the estimated house emissions in kgCO2
 *   -1 in case of error
 */
export const getEmission = (house:HouseT):number => {
  const climate = data.climates[house.region];
  const buildYearKey = toYearKey(climate, house.buildYear);
  if (!data.climates[house.region] || !buildYearKey) return -1;

  const energyFactor = data.classes[climate][buildYearKey];
  const emissionFactor = data.heaters[house.heater].factor;
  const emissionFactorUnit = data.heaters[house.heater].factorUnit;
  return house.surface * energyFactor * emissionFactor * emissionFactorUnit;
}

/**
 * Compute the co2 emission consumed in kgCO2 from a list of consumed ressources
 *
 * @param  consumptions - list consumptions made in unit depending on heater type
 * @param  heater - type of heater in use
 *
 * @return the real emission consummed from bills consumptions
 */
export const getEmissionConsumed = (consumptions:[number], heater:HeaterT):number => {
  let initialEmission = 0;
  const emissions = consumptions.reduce((acc, value) => acc + value, initialEmission);
  return emissions * data.heaters[heater].factorUnit;
}

/**
 * Compute the co2 emissions reduction from the reduction earned with the work of the house in kgCO2
 * Use the emission already computed from house if available, compute first the house emission otherwise.
 *
 * @param house - the house
 * @param works - the type(s) of work(s) made
 *
 * @return
 *   the estimated emissions reduction in kgCO2
 *   -1 in case of error
 */
export const getWorkReduction = (house:HouseT, works:[ReductionT]):number => {
  const emission = house.emission || getEmission(house);
  if (emission < 0) return -1;

  // Make uniq && Accumulate all reduction factors
  let initialFactor = 0;
  const reductionFactor =
    [... new Set(works)].reduce((acc, value) => acc + data.reductions[value], initialFactor);

  return emission * reductionFactor;
}

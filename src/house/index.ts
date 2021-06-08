import { ClimateE, DataI, HeaterE, HouseE, HouseT, YearE } from './types';
import dataJSON from './data/fr.json';
const data = dataJSON as DataI;
let avgEmission:number|undefined = undefined; // Singleton average computation

/**
 * Return the current data constants loaded
 *
 * @return constant data loaded
 */
export const getData = ():DataI => { return data; }

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
  if (house.region && !data.regions[house.region]) return -1;

  const consumptionFactor = data.consumptionFactors[house.built][house.type][house.heater].emissionFactor;
  if (house.surface < 0 || consumptionFactor < 0) return -1;

  const climateCoeff = house.region ? data.climateCoeffs[data.regions[house.region] as ClimateE] : 1;
  const combustibleFactor = data.emissionFactors[house.heater].emissionFactor;
  return house.surface * consumptionFactor * combustibleFactor * climateCoeff;
}

/**
 * Return the average co2 estimation from housing heating in kgCO2e/year.
 *
 * @warning
 * Implementation is defined as a lazy singleton that compute only once.
 *
 * @ TODO
 * Could be more generic
 *
 * @return
 * The estimated co2 emission in kgCO2e/year
 */
export const getEmissionAvg = ():number => {
  if (avgEmission) return avgEmission;

  const apartmentPart = data.study.apartment / (data.study.apartment + data.study.house);
  const housePart = data.study.house / (data.study.apartment + data.study.house);
  let apartmentEmission = 0;
  let houseEmission = 0;

  // Compute Average emissions
  for (const [keyBuilt, built] of Object.entries(data.consumptionFactors)) {
    const apartment = built.apartment;
    const house = built.house;

    // Adding all apartment emissions
    for (const [keyHeater, heater] of Object.entries(apartment)) {
      apartmentEmission += (heater.part / 100) *
        getEmission({ heater: keyHeater as HeaterE, built: keyBuilt as YearE,
                      surface: heater.surface, type: HouseE.apartment });
    };
    // Adding all apartment emissions
    for (const [keyHeater, heater] of Object.entries(house)) {
      const emission = (heater.part / 100) *
        getEmission({ heater: keyHeater as HeaterE, built: keyBuilt as YearE,
                      surface: heater.surface, type: HouseE.apartment });
      if (emission > 0) houseEmission += emission;
    };
  }

  avgEmission = (apartmentEmission * apartmentPart) + (houseEmission * housePart);
  return avgEmission;
}

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
export const getEmissionConsumed = (consumptions:number[], heater:HeaterE):number => {
  const combustibleFactor = data.emissionFactors[heater].energyFactor;
  if (combustibleFactor < 0) return -1;

  let initialEmission = 0;
  const emissions = consumptions.reduce((acc, value) => acc + value, initialEmission);
  return emissions * combustibleFactor;
}

/**
 * @TODO Source and verify factor coefficients
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

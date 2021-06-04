import { ConsumptionT, DataI, ModelT, VehicleT } from './types';
import dataJSON from './data/fr.json';
const data = dataJSON as DataI;

/**
 * Return the current data constants loaded
 *
 * @return constant data loaded
 */
export const getData = ():DataI => { return data; }


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
 *
 * @return
 *   the emission in kgCO2/year
 *   -1 in case of error (missing information)
 */
export const getEmissionConsumed = (consumption:ConsumptionT):number => {
  // We either needs consumption or mileage && MPG
  if (consumption.consumption === undefined  && consumption.distanceByYear === undefined ||
      consumption.consumption === undefined && consumption.mpg === undefined) return -1;

  // Retrieve the consumption in L
  const consumed = (consumption.consumption !== undefined) ? consumption.consumption :
                   consumption.mpg! * (consumption.distanceByYear! / 100);

  return consumed * data.emissionFactors[consumption.fuel];
}

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
 *
 * @return
 *   the estimated emission in kgCO2/year
 *   -1 in case of error (missing information)
 */
export const getEmissionMileage = (vehicle:VehicleT):number => {
  // We either needs emissionFactor or consumption && fuel
  if (vehicle.emissionFactor === undefined  && vehicle.consumption === undefined ||
      vehicle.emissionFactor === undefined && vehicle.fuel === undefined) return -1;
  // Return from consumption && fuel
  if (vehicle.consumption !== undefined ) return getEmissionConsumed({
    consumption: vehicle.consumption * vehicle.distanceByYear / 100, // * yearFactor
    fuel: vehicle.fuel!
  })
  // Return from emissionFactor
  return vehicle.distanceByYear * (vehicle.emissionFactor! / 1000);// * yearFactor;
}

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
 *
 * @return
 *   the estimated emission in kgCO2e/year
 *   -1 in case of error (cannot find the data for this type of vehicle)
 */
export const getEmissionEstimated = (model:ModelT):number => {
  const vehicleData = data.emissionFigure.vehicle[model.type][model.fuel];
  if (!vehicleData) return -1;

  const startYear = data.emissionFigure.yearStart;
  const closestYear = Math.min(Math.max(startYear, model.year), startYear + vehicleData!.length - 1);
  const emissionFactor = vehicleData[closestYear - startYear];

  return model.distanceByYear * (emissionFactor / 1000);
}

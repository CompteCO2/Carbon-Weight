import { AirportsI, DataI, FlightI, HaulE } from './types';
import airportsJSON from './data/airports.json';
import dataJSON from './data/fr.json';

const airports = airportsJSON as AirportsI;
const data = dataJSON as DataI;

const EARTH_RADIUS = 6371; // Radius of the earth in Km

/**
 * Return the current data constants loaded
 *
 * @return constant data loaded
 */
export const getAirports = ():AirportsI => { return airports; }

/**
 * Compute distance in Km from longitude and lattitude using the haversine formula.
 *
 * @description the law of haversine in brief:
 * Given a unit sphere, a "triangle" on the surface of the sphere is defined by the great circles
 * connecting three points u, v, and w on the sphere.
 * If the lengths of these three sides are a (from u to v), b (from u to w), and c (from v to w),
 * and the angle of the corner opposite c is C, then the law of haversines states:
 *
 * hav(c) = hav(a - b) + sin(a) * sin(b) * hav(C)
 *
 * Since this is a unit sphere, the lengths a, b, and c are simply equal to the angles (in radians)
 * subtended by those sides from the center of the sphere (for a non-unit sphere,
 * each of these arc lengths is equal to its central angle multiplied by the radius R of the sphere).
 *
 * @param fromLat - Lattitude of the point of departure
 * @param fromLon - Longitude of the point of departure
 * @param toLat - Lattitude of the point of arrival
 * @param toLon - Longitude of the point of arrival
 *
 * @return the distance in Km
 */
export const getDistance = (fromLat:number, fromLon:number, toLat:number, toLon:number):number => {
   const degToRad = (deg:number) => deg * (Math.PI  / 180);
   const dLat = degToRad(toLat - fromLat);
   const dLon = degToRad(toLon - fromLon);
   const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(degToRad(fromLat)) * Math.cos(degToRad(toLat)) *
             Math.sin(dLon/2) * Math.sin(dLon/2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

   return EARTH_RADIUS * c;
 }

 /**
  * Retrieve the emission factor from the flight distance
  *
  * @param distance - distance of the flight in Km
  *
  * @return emission factor in kgCO2e/peq.km
  */
 export const getHaulFactor = (distance:number):number => {
   if (distance <= data.hauls[HaulE.short].maxKm) return data.hauls[HaulE.short].emissionFactor;
   if (distance <= data.hauls[HaulE.medium].maxKm) return data.hauls[HaulE.medium].emissionFactor;
   return data.hauls[HaulE.long].emissionFactor;
  }

/**
 * Compute the co2 emissions from air travels in kgCO2e/year
 *
 * @description
 * Firstly the distances are calculated between the airports selected, then we
 * use the factor emission expressed in kgCO2e/peq.km (peq = person equivalent) to
 * get our first estimation per equivalent person:
 *
 * - Emission = Distance * Factor
 * - [kgCO2e/year] = [Km/year] * [kgCO2e/km]
 *
 * Finally, we add a factor depending on the class of the seat taken
 * (economy class, business class, first class).
 *
 * @param flight - the flight taken (cf. type)
 * @param nbFlights - the number of flight made a year.
 *
 * @return
 *   the estimated flight emissions for the passengers in kgCO2e
 *   -1 in case of error (e.g. missing IATA airport)
 */
export const getEmission = (travel:FlightI, nbFlights:number):number => {
  const fromAirport = airports[travel.fromIATA];
  const toAirport = airports[travel.toIATA];

  if (!fromAirport || !toAirport || travel.nbPassengers < 0 || nbFlights < 0) return -1;

  const distance = getDistance(fromAirport.lat, fromAirport.lon, toAirport.lat, toAirport.lon);
  const roundTripFactor = travel.roundTrip ? 2 : 1;
  const emissionFactor = getHaulFactor(distance);

  return  travel.nbPassengers * nbFlights * roundTripFactor *
          distance * emissionFactor * data.seats[travel.seatType];
}

/**
 * Return the average co2 estimation in peq.kgCO2e/year.
 *
 * @description
 * This constant is the ratio emission(2019)/#passengers(2019) from
 * the Directorate General of Civil Aviation (DGAC).
 *
 * @return
 * The average co2 emission in peq.kgCO2e/year.
 */
export const getEmissionAvg = ():number => { return data.averageEmission; }

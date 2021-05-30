import { AirportsI, DataI, SeatT } from './types';
import airportsJSON from './data/airports.json';
import dataJSON from './data/median.json';

const airports = airportsJSON as AirportsI;
const data = dataJSON as DataI;

const EARTH_RADIUS = 6371; // Radius of the earth in Km

/// TODO FULLY REVIEW CONSTANTS & FORMULA FROM NEW STANDARDS

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
   const dLat = degToRad(toLat - fromLat);  // deg2rad below
   const dLon = degToRad(toLon - fromLon);
   const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(degToRad(fromLat)) * Math.cos(degToRad(toLat)) *
             Math.sin(dLon/2) * Math.sin(dLon/2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

   return EARTH_RADIUS * c;
 }

/**
 * Compute the co2 emissions from air travels in kgCO2
 *
 * @param flight - the house
 *
 * @return
 *   the estimated flight emissions for the passengers in kgCO2
 *   -1 in case of error (e.g. missing IATA airport)
 */
export const getEmission =
(fromIata:string, toIata:string, nbPassengers:number, seatType:SeatT, nbFlights:number):number => {
  const fromAirport = airports[fromIata];
  const toAirport = airports[toIata];

  if (!fromAirport || !toAirport || nbPassengers < 0 || nbFlights < 0) return -1;

  let emission = 0;

  const distance = getDistance(fromAirport.lat, fromAirport.lon, toAirport.lat, toAirport.lon);

  return emission * distance * nbFlights * data.seats[seatType];
}

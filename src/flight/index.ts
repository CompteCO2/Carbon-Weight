import { AirportsI, DataE, DataI, FlightI, HaulE } from "./types";
//
import airportsJSON from "./data/airports.json";
const AIRPORTS = airportsJSON as AirportsI;
//
const EARTH_RADIUS = 6371; // Radius of the earth in Km

//
// Data sets available
// Note: avoid dealing with dynamic loading drawbacks
import ADEME_2022 from "./data/ademe_2022.json";
const DATA = {
  ADEME_2022: ADEME_2022 as DataI
};

/**
 * Return the available airports
 *
 * @return constant data loaded
 */
export const getAirports = (): AirportsI => {
  return AIRPORTS;
};

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
export const getDistance = (
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): number => {
  const degToRad = (deg: number) => deg * (Math.PI / 180);
  const dLat = degToRad(toLat - fromLat);
  const dLon = degToRad(toLon - fromLon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(fromLat)) *
      Math.cos(degToRad(toLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c;
};

export default class Flight {
  private avgEmission: number | undefined; // Singleton average computation (per people)
  private avgEmissionByPassenger: number | undefined; // Singleton average computation (per passenger)
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
    this.avgEmissionByPassenger = undefined;
  }

  /**
   * Create a calculator instance from dataset
   *
   * @return new House calculator - Throw error if dataset not loaded.
   */
  static build(dataset: DataE) {
    try {
      const data = DATA[dataset];
      return new Flight(dataset, data);
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
   * Retrieve the emission factor from the flight distance
   *
   * @param distance - distance of the flight in Km
   *
   * @return emission factor in kgCO2e/peq.km
   */
  getHaulFactor = (distance: number): number => {
    if (distance <= this.data.hauls[HaulE.short].maxKm)
      return this.data.hauls[HaulE.short].emissionFactor;
    if (distance <= this.data.hauls[HaulE.medium].maxKm)
      return this.data.hauls[HaulE.medium].emissionFactor;
    return this.data.hauls[HaulE.long].emissionFactor;
  };

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
  getEmissionEstimated = (travel: FlightI, nbFlights: number): number => {
    const fromAirport = AIRPORTS[travel.fromIATA];
    const toAirport = AIRPORTS[travel.toIATA];

    if (!fromAirport || !toAirport || travel.nbPassengers < 0 || nbFlights < 0)
      return -1;

    const distance = getDistance(
      fromAirport.lat,
      fromAirport.lon,
      toAirport.lat,
      toAirport.lon
    );
    const roundTripFactor = travel.roundTrip ? 2 : 1;
    const emissionFactor = this.getHaulFactor(distance);

    return (
      travel.nbPassengers *
      nbFlights *
      roundTripFactor *
      distance *
      emissionFactor *
      this.data.seats[travel.seatType]
    );
  };

  /**
   * Return the average co2 estimation in peq.kgCO2e/year (per person).
   *
   * @description
   * This constant is the ratio totalEmission/#people
   *
   * @return
   * The average co2 emission in peq.kgCO2e/year (per person).
   */
  getEmissionAvg = (): number => {
    if (this.avgEmission) return this.avgEmission;
    this.avgEmission =
      this.data.study.totalEmission / this.data.study.peopleCount;
    return this.avgEmission;
  };

  /**
   * Return the average co2 estimation in peq.kgCO2e/year (per passenger).
   *
   * @description
   * This constant is the ratio totalEmission/#passenger
   *
   * @return
   * The average co2 emission in peq.kgCO2e/year (per passenger).
   */
  getEmissionAvgByPassenger = (): number => {
    if (this.avgEmissionByPassenger) return this.avgEmissionByPassenger;
    this.avgEmissionByPassenger =
      this.data.study.totalEmission / this.data.study.passengerCount;
    return this.avgEmissionByPassenger;
  };
}

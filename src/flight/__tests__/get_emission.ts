import Flight from "../";
import { DataE, FlightI, SeatE } from "../types";

// Data interface used for testing purpose
type DataI = {
  expectedResult: number;
  flight: FlightI;
  nbFlights: number;
  testDescription: string;
};

// Run all the tests for a given dataset
const runner = (dataset: DataI[]) => {
  const flight = Flight.build(DataE.ADEME_2022);
  dataset.forEach((data: DataI) => {
    test(data.testDescription + "- Emission", () =>
      expect(
        Math.floor(flight.getEmissionEstimated(data.flight, data.nbFlights))
      ).toBeCloseTo(data.expectedResult)
    );
  });
};

const WRONG_DATA = [
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 1,
      roundTrip: true,
      seatType: SeatE.economy,
    },
    nbFlights: -1,
    expectedResult: -1,
    testDescription: "Negative nb Flights",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: -1,
      roundTrip: true,
      seatType: SeatE.economy,
    },
    nbFlights: 1,
    expectedResult: -1,
    testDescription: "Negative nb passengers",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "XXX",
      nbPassengers: -1,
      roundTrip: true,
      seatType: SeatE.economy,
    },
    nbFlights: 1,
    expectedResult: -1,
    testDescription: "Unknown airport",
  },
];

const NUL_DATA = [
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 0,
      roundTrip: true,
      seatType: SeatE.economy,
    },
    nbFlights: 1,
    expectedResult: 0,
    testDescription: "No passengers",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 1,
      roundTrip: true,
      seatType: SeatE.economy,
    },
    nbFlights: 0,
    expectedResult: 0,
    testDescription: "No flights",
  },
];

const SAMPLE_DATA = [
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 1,
      roundTrip: false,
      seatType: SeatE.economy,
    },
    nbFlights: 1,
    expectedResult: 777,
    testDescription:
      "One rountrip a Year - Paris - Cap Town - 1 economy one way",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 1,
      roundTrip: true,
      seatType: SeatE.economy,
    },
    nbFlights: 1,
    expectedResult: 1554,
    testDescription:
      "One rountrip a Year - Paris - Cap Town - 1 economy rountrip",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 1,
      roundTrip: true,
      seatType: SeatE.business,
    },
    nbFlights: 1,
    expectedResult: 3419,
    testDescription:
      "One rountrip a Year - Paris - Cap Town - 1 business rountrip",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 1,
      roundTrip: true,
      seatType: SeatE.first,
    },
    nbFlights: 1,
    expectedResult: 6216,
    testDescription:
      "One rountrip a Year - Paris - Cap Town - 1 first class rountrip",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 1,
      roundTrip: true,
      seatType: SeatE.economy,
    },
    nbFlights: 2,
    expectedResult: 3108,
    testDescription:
      "One rountrip a Year - Paris - Cap Town - 2 economy rountrip",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 2,
      roundTrip: true,
      seatType: SeatE.economy,
    },
    nbFlights: 1,
    expectedResult: 3108,
    testDescription:
      "One rountrip a Year - Paris - Cap Town - 1 economy rountrip (2 per)",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "CPT",
      nbPassengers: 1,
      roundTrip: false,
      seatType: SeatE.economy,
    },
    nbFlights: 2,
    expectedResult: 1554,
    testDescription:
      "One rountrip a Year - Paris - Cap Town - 2 economy one way",
  },
  {
    flight: {
      fromIATA: "CDG",
      toIATA: "BAJ",
      nbPassengers: 1,
      roundTrip: false,
      seatType: SeatE.economy,
    },
    nbFlights: 1,
    expectedResult: 1177,
    testDescription: "One flight - Paris - Bali - 1 economy one way",
  },
];

describe("Testing emission using wrong parameters", () => runner(WRONG_DATA));
describe("Testing emission using nul data", () => runner(NUL_DATA));
describe("Testing flight emission", () => runner(SAMPLE_DATA));
//...

import Vehicle from "../";
import { ConsumptionT, DataE, FuelE } from "../types";

// Data interface used for testing purpose
type DataI = {
  expectedResult: number;
  consumption: ConsumptionT;
  testDescription: string;
};

// Run all the tests for a given dataset
const runner = (dataset: DataI[]) => {
  const vehicle = Vehicle.build(DataE.ADEME_2022);
  dataset.forEach((data: DataI) => {
    test(data.testDescription + " - Emission", () =>
      expect(Math.floor(vehicle.getEmissionConsumed(data.consumption))).toBe(
        data.expectedResult
      )
    );
  });
};

const WRONG_DATA = [
  {
    consumption: { distanceByYear: 100, fuel: FuelE.E85 },
    expectedResult: -1,
    testDescription: "Missing parameter mpg"
  },
  {
    consumption: { fuel: FuelE.E85, mpg: 7 },
    expectedResult: -1,
    testDescription: "Missing parameter distanceByYear"
  }
];

const NUL_DATA = [
  {
    consumption: { consumption: 0, fuel: FuelE.E85 },
    expectedResult: 0,
    testDescription: "No consumption"
  },
  {
    consumption: { distanceByYear: 0, fuel: FuelE.E85, mpg: 6 },
    expectedResult: 0,
    testDescription: "No distance"
  },
  {
    consumption: { distanceByYear: 100000, fuel: FuelE.E85, mpg: 0 },
    expectedResult: 0,
    testDescription: "No mpg"
  }
];

const SAMPLE_DATA = [
  {
    consumption: { consumption: 1000, fuel: FuelE.E85 },
    expectedResult: 1460,
    testDescription: "Consumed 1000L of E85"
  },
  {
    consumption: { distanceByYear: 10000, fuel: FuelE.E85, mpg: 10 },
    expectedResult: 1460,
    testDescription: "Drive 10 000Km using 10L/100km --> (1000L eq) of E85"
  },
  {
    consumption: { consumption: 1000, fuel: FuelE.gasoil },
    expectedResult: 3170,
    testDescription: "Consumed 1000L of Gasoil"
  },
  {
    consumption: { distanceByYear: 10000, fuel: FuelE.gasoil, mpg: 10 },
    expectedResult: 3170,
    testDescription: "Drive 10 000Km using 10L/100km --> (1000L eq) of Gasoil"
  },
  {
    consumption: { distanceByYear: 10000, fuel: FuelE.electric, mpg: 10 },
    expectedResult: 0,
    testDescription: "Electric always return 0"
  }
];

describe("Testing getEmissionConsumed using wrong parameters", () =>
  runner(WRONG_DATA));
describe("Testing getEmissionConsumed using nul data", () => runner(NUL_DATA));
describe("Testing getEmissionConsumed using well known results", () =>
  runner(SAMPLE_DATA));
//...

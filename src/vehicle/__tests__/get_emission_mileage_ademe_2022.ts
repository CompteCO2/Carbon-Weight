import Vehicle from "../";
import { FuelE, DataE, VehicleT } from "../types";

// Data interface used for testing purpose
type DataI = {
  expectedResult: number;
  vehicle: VehicleT;
  testDescription: string;
};

// Run all the tests for a given dataset
const runner = (dataset: DataI[]) => {
  const vehicle = Vehicle.build(DataE.ADEME_2022);
  dataset.forEach((data: DataI) => {
    test(data.testDescription + " - Emission", () =>
      expect(Math.floor(vehicle.getEmissionMileage(data.vehicle))).toBe(
        data.expectedResult
      )
    );
  });
};

const WRONG_DATA = [
  {
    vehicle: { distanceByYear: 100, fuel: FuelE.E85 },
    expectedResult: -1,
    testDescription: "Missing parameter consumption"
  },
  {
    vehicle: { consumption: 100, distanceByYear: 100 },
    expectedResult: -1,
    testDescription: "Missing parameter fuel type"
  },
  {
    vehicle: { distanceByYear: 100 },
    expectedResult: -1,
    testDescription: "Missing parameter emissionFactor"
  }
];

const NUL_DATA = [
  {
    vehicle: { consumption: 0, distanceByYear: 100, fuel: FuelE.E85 },
    expectedResult: 0,
    testDescription: "No consumption"
  },
  {
    vehicle: { consumption: 100, distanceByYear: 0, fuel: FuelE.E85 },
    expectedResult: 0,
    testDescription: "No distance"
  },
  {
    vehicle: { distanceByYear: 100, emissionFactor: 0 },
    expectedResult: 0,
    testDescription: "No emission"
  }
];

const SAMPLE_DATA = [
  {
    vehicle: { consumption: 10, distanceByYear: 10000, fuel: FuelE.E85 },
    expectedResult: 1460,
    testDescription: "Drive 10 000Km using 10L/100km --> (1000L eq) of E85"
  },
  {
    vehicle: { consumption: 7, distanceByYear: 10000, fuel: FuelE.gasoil },
    expectedResult: 2219,
    testDescription: "Drive 10 000Km driving 7L/100km - Gasoil"
  },
  {
    vehicle: { distanceByYear: 10000, emissionFactor: 232.2 },
    expectedResult: 2322,
    testDescription:
      "Drive 10 000Km using the constant emission (co2 figure LUV) factor of Gasoil"
  },
  {
    vehicle: { consumption: 7, distanceByYear: 10000, fuel: FuelE.electric },
    expectedResult: 0,
    testDescription: "Electric has no emission"
  }
];

describe("Testing getEmissionMileage using wrong parameters", () =>
  runner(WRONG_DATA));
describe("Testing getEmissionMileage using nul data", () => runner(NUL_DATA));
describe("Testing getEmissionMileage using well known results", () =>
  runner(SAMPLE_DATA));
//...

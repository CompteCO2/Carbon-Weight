import Vehicle from "../";
import { FuelE, DataE, ModelT, VehicleE } from "../types";

// Data interface used for testing purpose
type DataI = {
  expectedResult: number;
  vehicle: ModelT;
  testDescription: string;
};

// Run all the tests for a given dataset
const runner = (dataset: DataI[]) => {
  const vehicle = Vehicle.build(DataE.CCO2_2021);
  dataset.forEach((data: DataI) => {
    test(data.testDescription + " - Emission", () =>
      expect(Math.floor(vehicle.getEmissionEstimated(data.vehicle))).toBe(
        data.expectedResult
      )
    );
  });
};

const WRONG_DATA = [
  {
    vehicle: {
      distanceByYear: 100,
      fuel: FuelE.E85,
      type: VehicleE.twoWheeler,
      year: 2021
    },
    expectedResult: -1,
    testDescription: "Missing corresponding fuel"
  }
];

const NUL_DATA = [
  {
    vehicle: {
      distanceByYear: 0,
      fuel: FuelE.gasoil,
      type: VehicleE.standard,
      year: 2021
    },
    expectedResult: -1,
    testDescription: "No distance"
  }
];

describe("Testing getEmissionEstimated using wrong parameters", () =>
  runner(WRONG_DATA));
describe("Testing getEmissionEstimated using nul data", () => runner(NUL_DATA));
//...

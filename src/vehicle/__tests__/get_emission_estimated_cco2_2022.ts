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
  const vehicle = Vehicle.build(DataE.CCO2_2022);
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
    expectedResult: 0,
    testDescription: "No distance"
  }
];

const SAMPLE_DATA = [
  {
    vehicle: {
      distanceByYear: 10000,
      fuel: FuelE.gasoil,
      type: VehicleE.standard,
      year: 2001
    },
    expectedResult: 1799,
    testDescription: "Drive 10 000Km - Gasoil - 2001"
  },
  {
    vehicle: {
      distanceByYear: 10000,
      fuel: FuelE.gasoil,
      type: VehicleE.standard,
      year: 2021
    },
    expectedResult: 1616,
    testDescription: "Drive 10 000Km - Gasoil"
  },
  {
    vehicle: {
      distanceByYear: 10000,
      fuel: FuelE.gasoil,
      type: VehicleE.lightUtility,
      year: 2021
    },
    expectedResult: 2339,
    testDescription: "Drive 10 000Km - Gasoil - light utility vehicle"
  },
  {
    vehicle: {
      distanceByYear: 10000,
      fuel: FuelE.fuel,
      type: VehicleE.standard,
      year: 2000
    },
    expectedResult: 1971,
    testDescription: "Drive 10 000Km - fuel standard"
  },
  {
    vehicle: {
      distanceByYear: 10000,
      fuel: FuelE.fuel,
      type: VehicleE.twoWheeler,
      year: 2000
    },
    expectedResult: 1148,
    testDescription: "Drive 10 000Km - fuel twoWheeler"
  },
  {
    vehicle: {
      distanceByYear: 10000,
      fuel: FuelE.electric,
      type: VehicleE.lightUtility,
      year: 2021
    },
    expectedResult: 0,
    testDescription: "Drive 10 000Km - electric light utility vehicle"
  }
];

describe("Testing getEmissionEstimated using wrong parameters", () =>
  runner(WRONG_DATA));
describe("Testing getEmissionEstimated using nul data", () => runner(NUL_DATA));
describe("Testing getEmissionEstimated using well known results", () =>
  runner(SAMPLE_DATA));
//...

/*import { getWorkReduction } from "../";
import { HeaterT, HouseT, ReductionT } from "../types";

// Data interface used for testing purpose
type DataI = {
  expectedResult: number,
  house: HouseT,
  reduction: ReductionT[],
  testDescription: string,
}

// Run all the tests for a given dataset
const runner = (dataset:DataI[]) => {
  dataset.forEach((data:DataI) => {
    test(data.testDescription, () =>
      expect(Math.floor(getWorkReduction(data.house, data.reduction))).toBe(data.expectedResult)
    );
  })
}

const WRONG_DATA = [
  {
    expectedResult: -1,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "29", surface: 100, emission: -100 },
    reduction: [ReductionT.OTHER],
    testDescription: "Check with wrong initial emission"
  },
  {
    expectedResult: -1,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "99", surface: -100 },
    reduction: [ReductionT.OTHER],
    testDescription: "Check with wrong data"
  }
];

const TEST_DATA = [
  {
    expectedResult: 0,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100,  emission: 2075 },
    reduction: [],
    testDescription: "Check without work"
  },
  {
    expectedResult: 207,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100,  emission: 2075 },
    reduction: [ReductionT.OTHER],
    testDescription: "Check unitary work - OTHER"
  },
  {
    expectedResult: 518,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100,  emission: 2075 },
    reduction: [ReductionT.WALL_INSULATION],
    testDescription: "Check unitary work - WALL_INSULATION"
  },
  {
    expectedResult: 311,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100,  emission: 2075 },
    reduction: [ReductionT.WINDOW_CHANGE],
    testDescription: "Check unitary work - WINDOW_CHANGE"
  },
  {
    expectedResult: 207,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100,  emission: 2075 },
    reduction: [ReductionT.FLOOR_INSULATION],
    testDescription: "Check unitary work - FLOOR_INSULATION"
  },
  {
    expectedResult: 207,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100,  emission: 2075 },
    reduction: [ReductionT.VENTILATION_UPDATE],
    testDescription: "Check unitary work - VENTILATION_UPDATE"
  },
  {
    expectedResult: 415,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100,  emission: 2075 },
    reduction: [ReductionT.OTHER, ReductionT.VENTILATION_UPDATE],
    testDescription: "Check more than a work"
  },
  {
    expectedResult: 1867,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100,  emission: 2075 },
    reduction: [ReductionT.ATTIC_INSULATION, ReductionT.FLOOR_INSULATION, ReductionT.OTHER,
                ReductionT.VENTILATION_UPDATE, ReductionT.WALL_INSULATION, ReductionT.WINDOW_CHANGE],
    testDescription: "Check all works"
  },
  {
    expectedResult: 207,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100 },
    reduction: [ReductionT.OTHER],
    testDescription: "Check unitary work reduction without precomputed emission"
  }
];

describe("Testing work reduction emission using wrong parameters", () => runner(WRONG_DATA));
describe("Testing few work reduction emission", () => runner(TEST_DATA));*/

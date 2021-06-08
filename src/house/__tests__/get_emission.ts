import { getEmission } from "../";
import { HeaterE, HouseE, HouseT, YearE } from "../types";

// Data interface used for testing purpose
type DataI = {
  expectedResult: number,
  house: HouseT,
  testDescription: string,
}

// Run all the tests for a given dataset
const runner = (dataset:DataI[]) => {
  dataset.forEach((data:DataI) => {
    test(data.testDescription, () =>
      expect(Math.floor(getEmission(data.house))).toBe(data.expectedResult)
    );
  })
}

const WRONG_DATA = [
  {
    expectedResult: -1,
    house : {
      built: YearE.recent, heater: HeaterE.urban, region: "29 - Finistère",
      surface: 100, type: HouseE.house
    },
    testDescription: "Check with wrong data - Urban House"
  },
  {
    expectedResult: -1,
    house : {
      built: YearE.recent, heater: HeaterE.gas, region: "99",
      surface: 100, type: HouseE.house
    },
    testDescription: "Check with wrong region"
  },
  {
    expectedResult: -1,
    house : {
      built: YearE.recent, heater: HeaterE.gas, region: "29 - Finistère",
      surface: -100, type: HouseE.house
    },
    testDescription: "Check with wrong surface"
  },
  {
    expectedResult: -1,
    house : {
      built: YearE.recent, heater: HeaterE.gas, region: "99",
      surface: -100, type: HouseE.house
    },
    testDescription: "Check with more than one wrong parameters"
  },
];

const TYPE_BUILT_DATA = [
  {
    expectedResult: 5394,
    house : {
      built: YearE.old, heater: HeaterE.gas, region: "75 - Paris",
      surface: 100, type: HouseE.house
    },
    testDescription: "H1 - Old House - 100m2"
  },
  {
    expectedResult: 4455,
    house : {
      built: YearE.recent, heater: HeaterE.gas, region: "75 - Paris",
      surface: 100, type: HouseE.house
    },
    testDescription: "H1 - Recent House - 100m2"
  },
  {
    expectedResult: 3918,
    house : {
      built: YearE.old, heater: HeaterE.gas, region: "75 - Paris",
      surface: 100, type: HouseE.apartment
    },
    testDescription: "H1 - Old Apartment - 100m2"
  },
  {
    expectedResult: 3355,
    house : {
      built: YearE.recent, heater: HeaterE.gas, region: "75 - Paris",
      surface: 100, type: HouseE.apartment
    },
    testDescription: "H1 - Recent Apartment - 100m2"
  }
];

const REGION_DATA = [
  {
    expectedResult: 762,
    house : {
      built: YearE.recent, heater: HeaterE.wood, region: "75 - Paris",
      surface: 100, type: HouseE.house
    },
    testDescription: "H1 - Recent House - 100m2"
  },
  {
    expectedResult: 623,
    house : {
      built: YearE.recent, heater: HeaterE.wood, region: "29 - Finistère",
      surface: 100, type: HouseE.house
    },
    testDescription: "H2 - Recent House - 100m2"
  },
  {
    expectedResult: 415,
    house : {
      built: YearE.recent, heater: HeaterE.wood, region: "20 - Corse",
      surface: 100, type: HouseE.house
    },
    testDescription: "H3 - Recent House - 100m2"
  },
];

const SURFACE_DATA = [
  {
    expectedResult: 1822,
    house : {
      built: YearE.recent, heater: HeaterE.gas, region: "29 - Finistère",
      surface: 50, type: HouseE.house
    },
    testDescription: "H2 - Recent House - 50m2"
  },
  {
    expectedResult: 911,
    house : {
      built: YearE.recent, heater: HeaterE.gas, region: "29 - Finistère",
      surface: 25, type: HouseE.house
    },
    testDescription: "H2 - Recent House - 25m2"
  },
];

describe("Testing emission using wrong parameters", () => runner(WRONG_DATA));
describe("Testing emission for various type of house", () => runner(TYPE_BUILT_DATA));
describe("Testing emission for various type of climate", () => runner(REGION_DATA));
describe("Testing emission for various type of climate", () => runner(SURFACE_DATA));
//...

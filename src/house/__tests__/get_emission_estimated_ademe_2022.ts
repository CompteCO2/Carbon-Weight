import House from "../";
import { DataE, HeaterE, HouseE, HouseT, YearE } from "../types";

// Data interface used for testing purpose
type DataI = {
  expectedResult: number;
  house: HouseT;
  testDescription: string;
};

// Run all the tests for a given dataset
const runner = (dataset: DataI[]) => {
  const house = House.build(DataE.ADEME_2022);
  dataset.forEach((data: DataI) => {
    test(data.testDescription, () =>
      expect(Math.floor(house.getEmissionEstimated(data.house))).toBe(
        data.expectedResult
      )
    );
  });
};

const WRONG_DATA = [
  {
    expectedResult: -1,
    house: {
      built: YearE.recent,
      heater: HeaterE.urban,
      surface: 100,
      type: HouseE.house
    },
    testDescription: "Check with wrong data - Urban House"
  },
  {
    expectedResult: -1,
    house: {
      built: YearE.recent,
      heater: HeaterE.gas,
      surface: -100,
      type: HouseE.house
    },
    testDescription: "Check with wrong surface"
  },
  {
    expectedResult: -1,
    house: {
      built: YearE.recent,
      heater: HeaterE.gas,
      region: 99,
      surface: -100,
      type: HouseE.house
    },
    testDescription: "Check with more than one wrong parameters"
  }
];

const TYPE_BUILT_DATA = [
  {
    expectedResult: 4904,
    house: {
      built: YearE.old,
      heater: HeaterE.gas,
      surface: 100,
      type: HouseE.house
    },
    testDescription: "Old House - 100m2"
  },
  {
    expectedResult: 4050,
    house: {
      built: YearE.recent,
      heater: HeaterE.gas,
      surface: 100,
      type: HouseE.house
    },
    testDescription: "Recent House - 100m2"
  },
  {
    expectedResult: 3562,
    house: {
      built: YearE.old,
      heater: HeaterE.gas,
      surface: 100,
      type: HouseE.apartment
    },
    testDescription: "Old Apartment - 100m2"
  },
  {
    expectedResult: 3050,
    house: {
      built: YearE.recent,
      heater: HeaterE.gas,
      surface: 100,
      type: HouseE.apartment
    },
    testDescription: "Recent Apartment - 100m2"
  }
];

const SURFACE_DATA = [
  {
    expectedResult: 2025,
    house: {
      built: YearE.recent,
      heater: HeaterE.gas,
      surface: 50,
      type: HouseE.house
    },
    testDescription: "Recent House - 50m2"
  },
  {
    expectedResult: 1012,
    house: {
      built: YearE.recent,
      heater: HeaterE.gas,
      surface: 25,
      type: HouseE.house
    },
    testDescription: "Recent House - 25m2"
  }
];

describe("Testing emission using wrong parameters", () => runner(WRONG_DATA));
describe("Testing emission for various type of house", () =>
  runner(TYPE_BUILT_DATA));
describe("Testing emission for various type of climate", () =>
  runner(SURFACE_DATA));
//...

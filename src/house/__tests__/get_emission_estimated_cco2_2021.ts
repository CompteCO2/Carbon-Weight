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
  const house = House.build(DataE.CCO2_2021);
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

// Note: No estimation available with CITEPA_2021 dataset
const OTHER_DATA = [
  {
    expectedResult: -1,
    house: {
      built: YearE.old,
      heater: HeaterE.gas,
      surface: 100,
      type: HouseE.house
    },
    testDescription: "Old House - 100m2"
  },
  {
    expectedResult: -1,
    house: {
      built: YearE.recent,
      heater: HeaterE.gas,
      surface: 100,
      type: HouseE.house
    },
    testDescription: "H1 - Recent House - 100m2"
  },
  {
    expectedResult: -1,
    house: {
      built: YearE.old,
      heater: HeaterE.gas,
      region: 75,
      surface: 100,
      type: HouseE.apartment
    },
    testDescription: "H1 - Old Apartment - 100m2"
  },
  {
    expectedResult: -1,
    house: {
      built: YearE.recent,
      heater: HeaterE.gas,
      region: 75,
      surface: 100,
      type: HouseE.apartment
    },
    testDescription: "H1 - Recent Apartment - 100m2"
  }
];

describe("Testing emission using wrong parameters", () => runner(WRONG_DATA));
describe("Testing emission for various type of house", () =>
  runner(OTHER_DATA));
//...

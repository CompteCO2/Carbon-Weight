import { getEmission } from "../";
import { HeaterT, HouseT } from "../types";

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
    house : { buildYear: -2021, heater: HeaterT.GAS, region: "29", surface: 100 },
    testDescription: "Check with wrong year"
  },
  {
    expectedResult: -1,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "99", surface: 100 },
    testDescription: "Check with wrong region"
  },
  {
    expectedResult: -1,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "29", surface: -100 },
    testDescription: "Check with wrong surface"
  },
  {
    expectedResult: -1,
    house : { buildYear: -2021, heater: HeaterT.GAS, region: "99", surface: -100 },
    testDescription: "Check with more than one wrong parameters"
  },
];

const GAS_DATA = [
  {
    expectedResult: 2075,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "75", surface: 100 },
    testDescription: "H1 - Newest Built - 100m2"
  },
  {
    expectedResult: 2490,
    house : { buildYear: 1991, heater: HeaterT.GAS, region: "75", surface: 100 },
    testDescription: "H1 - Cat Year (-1) - 100m2"
  },
  {
    expectedResult: 3113,
    house : { buildYear: 1988, heater: HeaterT.GAS, region: "75", surface: 100 },
    testDescription: "H1 - Cat Year (-2) - 100m2"
  },
  {
    expectedResult: 3736,
    house : { buildYear: 1982, heater: HeaterT.GAS, region: "75", surface: 100 },
    testDescription: "H1 - Cat Year (-3) - 100m2"
  },
  {
    expectedResult: 4151,
    house : { buildYear: 1976, heater: HeaterT.GAS, region: "75", surface: 100 },
    testDescription: "H1 - Cat Year (-4) - 100m2"
  },
  {
    expectedResult: 5189,
    house : { buildYear: 1905, heater: HeaterT.GAS, region: "75", surface: 100 },
    testDescription: "H1 - Cat Year (-5) - 100m2"
  },
  {
    expectedResult: 882,
    house : { buildYear: 2021, heater: HeaterT.GAS, region: "29", surface: 50 },
    testDescription: "H2 - Newest Built - 50m2"
  },
  {
    expectedResult: 1058,
    house : { buildYear: 1991, heater: HeaterT.GAS, region: "29", surface: 50 },
    testDescription: "H2 - Cat Year (-1) - 50m2"
  },
  {
    expectedResult: 1323,
    house : { buildYear: 1988, heater: HeaterT.GAS, region: "29", surface: 50 },
    testDescription: "H2 - Cat Year (-2) - 50m2"
  },
  {
    expectedResult: 1587,
    house : { buildYear: 1982, heater: HeaterT.GAS, region: "29", surface: 50 },
    testDescription: "H2 - Cat Year (-3) - 50m2"
  },
  {
    expectedResult: 1764,
    house : { buildYear: 1976, heater: HeaterT.GAS, region: "29", surface: 50 },
    testDescription: "H2 - Cat Year (-4) - 50m2"
  },
  {
    expectedResult: 2205,
    house : { buildYear: 1905, heater: HeaterT.GAS, region: "29", surface: 50 },
    testDescription: "H2 - Cat Year (-5) - 50m2"
  },
];


describe("Testing emission using wrong parameters", () => runner(WRONG_DATA));
describe("Testing GAS emission", () => runner(GAS_DATA));
//...

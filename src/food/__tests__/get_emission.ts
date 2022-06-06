import Food from "../";
import { DataE, ComsumptionR, ConsumptionT } from "../types";

// Data interface used for testing purpose
type DataI = {
  expectedResult: ComsumptionR;
  consumption: ConsumptionT;
  testDescription: string;
};

// Run all the tests for a given dataset
const runner = (dataset: DataI[]) => {
  const food = Food.build(DataE.ADEME_2022);
  dataset.forEach((data: DataI) => {
    test(data.testDescription + "- Emission", () =>
      expect(
        Math.floor(food.getEmissionEstimated(data.consumption).emission)
      ).toBeCloseTo(data.expectedResult.emission)
    );
    test(data.testDescription + "- Waste", () =>
      expect(
        Math.floor(food.getEmissionEstimated(data.consumption).waste)
      ).toBeCloseTo(data.expectedResult.waste)
    );
  });
};

const WRONG_DATA = [
  {
    consumption: {
      alcohol: 24,
      bread: 2,
      cheese: 1,
      fish: 1,
      harvestExotic: 1,
      harvestLocal: 1,
      meatRed: 1,
      meatWhite: 1,
      rice: 1,
      soft: 1
    },
    expectedResult: { emission: -1, waste: -1 },
    testDescription: "Out of scope frequency"
  },
  {
    consumption: {
      alcohol: -2,
      bread: 2,
      cheese: 1,
      fish: 1,
      harvestExotic: 1,
      harvestLocal: 1,
      meatRed: 1,
      meatWhite: 1,
      rice: 1,
      soft: 1
    },
    expectedResult: { emission: -1, waste: -1 },
    testDescription: "Out of scope frequency - Negative"
  }
];

const SAMPLE_DATA = [
  {
    consumption: {
      alcohol: 0,
      bread: 0,
      cheese: 0,
      fish: 0,
      harvestExotic: 0,
      harvestLocal: 0,
      meatRed: 0,
      meatWhite: 0,
      rice: 0,
      soft: 0
    },
    expectedResult: { emission: 0, waste: 0 },
    testDescription: "No Consumption"
  },
  {
    consumption: {
      alcohol: 6,
      bread: 10,
      cheese: 5,
      fish: 4,
      harvestExotic: 5,
      harvestLocal: 8,
      meatRed: 6,
      meatWhite: 3,
      rice: 6,
      soft: 13
    },
    expectedResult: { emission: 2592, waste: 103 },
    testDescription: "average food consumption (closest to stats)"
  },
  {
    consumption: {
      alcohol: 7,
      bread: 7,
      cheese: 7,
      fish: 7,
      harvestExotic: 7,
      harvestLocal: 7,
      meatRed: 7,
      meatWhite: 7,
      rice: 7,
      soft: 7
    },
    expectedResult: { emission: 3386, waste: 111 },
    testDescription: "everything once a day"
  }
];

describe("Testing emission using wrong parameters", () => runner(WRONG_DATA));
describe("Testing food habits emission", () => runner(SAMPLE_DATA));
//...

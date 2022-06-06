// Those tests are to ensured a constant change has been done properly.
import Food, { buildData } from "../";
import { DataE, FoodE } from "../types";

describe("Testing constants - Make sure data loaded", () => {
  const food = Food.build(DataE.ADEME_2022);
  const data = food.getData();
  test("Check data", () => expect(data.foods).toBeDefined());
  test("Check minimum data fields", () =>
    expect(Object.keys(data.foods).length).toBeGreaterThan(9));
});

describe("Testing constants - Testing the national average", () => {
  const food = Food.build(DataE.ADEME_2022);
  const emissionAvg = food.getEmissionAvg();
  test("Check national emission", () =>
    expect(emissionAvg.emission).toBeCloseTo(2562.5, 0));
  test("Check national waste", () =>
    expect(emissionAvg.waste).toBeCloseTo(124.5, 0));
  const newEmission = food.getEmissionAvg();
  test("Check national emission - Singleton", () =>
    expect(newEmission.emission).toBeCloseTo(2562.5, 0));
});

describe("Testing constants build - Make sure data are converted properly", () => {
  const dataR = {
    foods: {
      meatWhite: {
        averageWeight: 150,
        averageWeightDay: { meat: 52.9 },
        emissionFactors: {
          chicken_breast: 4.9,
          chicken_leg: 4.9,
          chicken_whole: 5.2
        },
        wasteEmissionFactor: "plastic_film"
      },
      harvestLocal: {
        averageWeight: 200,
        averageWeightDay: { fruits: 82.7, legumes: 40, vegetables: 100 },
        emissionFactors: { in_season: 0.3, off_season: 2.3 },
        wasteEmissionFactor: "paper"
      }
    },
    wastes: {
      paper: { packaging: 0.919, ratio: 0.1 },
      plastic_film: { packaging: 2.09, ratio: 0.05 }
    }
  };

  const data = buildData(dataR);
  test("Check data", () => expect(data.foods).toBeDefined());

  // White Meat
  test("Check whiteMeat averageWeight", () =>
    expect(data.foods[FoodE.meatWhite].averageWeight).toBe(150));
  test("Check whiteMeat averageWeightDay", () =>
    expect(data.foods[FoodE.meatWhite].averageWeightDay).toBeCloseTo(52.9));
  test("Check whiteMeat emissionFactor", () =>
    expect(data.foods[FoodE.meatWhite].emissionFactor).toBeCloseTo(5));
  test("Check whiteMeat waste packaging", () =>
    expect(data.foods[FoodE.meatWhite].wasteEmissionFactor).toBeCloseTo(2.09));
  test("Check whiteMeat waste packaging", () =>
    expect(data.foods[FoodE.meatWhite].wasteRatioFactor).toBeCloseTo(0.05));

  // Local Harvest
  test("Check harvestLocal averageWeight", () =>
    expect(data.foods[FoodE.harvestLocal].averageWeight).toBe(200));
  test("Check harvestLocal averageWeightDay", () =>
    expect(data.foods[FoodE.harvestLocal].averageWeightDay).toBeCloseTo(222.7));
  test("Check harvestLocal emissionFactor", () =>
    expect(data.foods[FoodE.harvestLocal].emissionFactor).toBeCloseTo(1.3));
  test("Check harvestLocal waste packaging", () =>
    expect(data.foods[FoodE.harvestLocal].wasteEmissionFactor).toBeCloseTo(
      0.919
    ));
  test("Check harvestLocal waste packaging", () =>
    expect(data.foods[FoodE.harvestLocal].wasteRatioFactor).toBeCloseTo(0.1));
});

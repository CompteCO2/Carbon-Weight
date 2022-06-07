import House from "../";
import { DataE } from "../types";

describe("Testing data loaded", () => {
  test("Check data", () => expect(true).toBe(true));
  const house = House.build(DataE.CITEPA_2021);
  const data = house.getData();
  test("Check data", () => expect(data).toBeDefined());
  test("Check dataset", () =>
    expect(house.getDataset()).toBe(DataE.CITEPA_2021));
  test("Check min e-factors", () =>
    expect(Object.keys(data.emissionFactors).length).toEqual(7));
});

describe("Testing constants - Testing the national average", () => {
  const house = House.build(DataE.CITEPA_2021);
  const emissionAvg = house.getEmissionAvg();
  test("Check national emission", () =>
    expect(Math.floor(emissionAvg)).toBe(651));
});

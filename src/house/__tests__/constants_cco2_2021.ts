import House from "../";
import { DataE } from "../types";

describe("Testing data loaded", () => {
  test("Check data", () => expect(true).toBe(true));
  const house = House.build(DataE.CCO2_2021);
  const data = house.getData();
  test("Check data", () => expect(data).toBeDefined());
  test("Check dataset", () => expect(house.getDataset()).toBe(DataE.CCO2_2021));
  test("Check min e-factors", () =>
    expect(Object.keys(data.emissionFactors).length).toEqual(7));
});

describe("Testing constants - Testing the national average", () => {
  const house = House.build(DataE.CCO2_2021);
  test("Check national emission (by person)", () =>
    expect(Math.round(house.getEmissionAvg())).toBe(648));
  test("Check national emission (by house-apartment)", () =>
    expect(Math.round(house.getEmissionAvgByHouse())).toBe(-1));
});

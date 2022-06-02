import House from "../";
import { DataE } from "../types";

describe("Testing data loaded", () => {
  test("Check data", () => expect(true).toBe(true));
  const house = House.build(DataE.CCO2_2022);
  const data = house.getData();
  test("Check data", () => expect(data).toBeDefined());

  test("Check min e-factors", () =>
    expect(Object.keys(data.emissionFactors).length).toEqual(7));
});

describe("Testing constants - Testing the national average", () => {
  const house = House.build(DataE.CCO2_2022);
  const emissionAvg = house.getEmissionAvg();
  test("Check national emission", () =>
    expect(Math.floor(emissionAvg)).toBe(651));
});

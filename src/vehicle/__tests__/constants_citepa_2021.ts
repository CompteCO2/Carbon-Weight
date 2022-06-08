// Those tests are to ensured a constant change has been done properly.
import Vehicle from "../";
import { DataE } from "../types";

describe("Testing constants consistency for CITEPA_2021", () => {
  const vehicle = Vehicle.build(DataE.CITEPA_2021);
  const data = vehicle.getData();
  test("Check data", () => expect(data).toBeDefined());
  test("Check dataset", () =>
    expect(vehicle.getDataset()).toBe(DataE.CITEPA_2021));
  test("Check min e-factors", () =>
    expect(Object.keys(data.emissionFactors).length).toBe(6));
});

describe("Testing constants - Testing the national average for CCO2_2022", () => {
  const vehicle = Vehicle.build(DataE.CITEPA_2021);
  test("Check national emission", () =>
    expect(Math.floor(vehicle.getEmissionAvg())).toBe(1201));
});

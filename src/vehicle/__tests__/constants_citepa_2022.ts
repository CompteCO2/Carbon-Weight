// Those tests are to ensured a constant change has been done properly.
import Vehicle from "../";
import { DataE } from "../types";

describe("Testing constants consistency for CITEPA_2022", () => {
  const vehicle = Vehicle.build(DataE.CITEPA_2022);
  const data = vehicle.getData();
  test("Check data", () => expect(data).toBeDefined());
  test("Check dataset", () =>
    expect(vehicle.getDataset()).toBe(DataE.CITEPA_2022));
  test("Check min e-factors", () =>
    expect(Object.keys(data.emissionFactors).length).toBe(6));
});

describe("Testing constants - Testing the national average for CITEPA_2022", () => {
  const vehicle = Vehicle.build(DataE.CITEPA_2022);
  test("Check national emission (by person)", () =>
    expect(Math.round(vehicle.getEmissionAvg())).toBe(1002));
  test("Check national emission (by vehicle)", () =>
    expect(vehicle.getEmissionAvgByVehicle()).toBe(-1));
});

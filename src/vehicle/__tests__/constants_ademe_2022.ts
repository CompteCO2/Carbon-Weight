// Those tests are to ensured a constant change has been done properly.
import Vehicle from "../";
import { DataE } from "../types";

describe("Testing constants consistency for ADEME_2022", () => {
  const vehicle = Vehicle.build(DataE.ADEME_2022);
  const data = vehicle.getData();
  test("Check data", () => expect(data).toBeDefined());
  test("Check dataset", () =>
    expect(vehicle.getDataset()).toBe(DataE.ADEME_2022));
  test("Check min e-factors", () =>
    expect(Object.keys(data.emissionFactors).length).toBe(6));
  test("Check min emission figure available years consistency", () => {
    const nbYears = data.emissionFigure!.vehicle.lightUtility.electric.length;
    Object.values(data.emissionFigure!.vehicle).forEach(vehicle => {
      Object.values(vehicle).forEach(fuel => expect(fuel.length).toBe(nbYears));
    });
  });
});

describe("Testing constants - Testing the national average for ADEME_2022", () => {
  const vehicle = Vehicle.build(DataE.ADEME_2022);
  test("Check national emission (by person)", () =>
    expect(vehicle.getEmissionAvg()).toBeCloseTo(1082.4, 0));
  test("Check national emission (by vehicle)", () =>
    expect(vehicle.getEmissionAvgByVehicle()).toBeCloseTo(1973.35, 0));
});

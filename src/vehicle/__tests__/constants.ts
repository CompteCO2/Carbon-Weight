// Those tests are to ensured a constant change has been done properly.
import { getData, getEmissionAvg } from "../";

describe("Testing constants consistency", () => {
  const data = getData();
  test("Check data", () => expect(data).toBeDefined());
  test("Check min e-factors", () =>
    expect(Object.keys(data.emissionFactors).length).toBeGreaterThan(4));
  test("Check min emission figure available years consistency", () => {
    const nbYears = data.emissionFigure.vehicle.lightUtility.electric.length;
    Object.values(data.emissionFigure.vehicle).forEach(vehicle => {
      Object.values(vehicle).forEach(fuel => expect(fuel.length).toBe(nbYears));
    });
  });
});

describe("Testing constants - Testing the national average", () => {
  const emissionAvg = getEmissionAvg();
  test("Check national emission", () =>
    expect(emissionAvg).toBeCloseTo(1973.35, 0));
});

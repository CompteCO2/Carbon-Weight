// Those tests are to ensured a constant change has been done properly.
import { getData } from '../';

describe("Testing constants consistency", () => {
  const data = getData();
  test("Check data", () => expect(data).toBeDefined());
  test("Check min e-factors", () => expect(Object.keys(data.emissionFactors).length).toBeGreaterThan(4));
  test("Check min emission figure available years consistency", () => {
    const nbYears = data.emissionFigure.vehicle.lightUtility.electric.length;
    Object.values(data.emissionFigure.vehicle).forEach(vehicle => {
      Object.values(vehicle).forEach(fuel => expect(fuel.length).toBe(nbYears));
    });
  });
});

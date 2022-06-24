import House from "../";
import { DataE } from "../types";

describe("Testing data loaded", () => {
  const house = House.build(DataE.ADEME_2022);
  const data = house.getData();
  test("Check data", () => expect(data).toBeDefined());
  test("Check dataset", () =>
    expect(house.getDataset()).toBe(DataE.ADEME_2022));
  test("Check min e-factors", () =>
    expect(Object.keys(data.emissionFactors).length).toEqual(7));

  // Check All Parts (House|Apartment) sums to 1
  let apartmentPart = 0;
  let housePart = 0;

  // Sum them all
  for (const built of Object.values(data.consumptionFactors || {})) {
    const apartment = built.apartment;
    const house = built.house;

    // Adding all apartment emissions
    for (const heater of Object.values(apartment)) {
      apartmentPart += heater.part;
    }
    for (const heater of Object.values(house)) {
      housePart += heater.part;
    }

    test("Check data Apartment Parts summing to 1", () =>
      expect(apartmentPart / 100).toBeCloseTo(1));
    test("Check data House Parts summing to 1", () =>
      expect(housePart / 100).toBeCloseTo(1));
  }
});

describe("Testing constants - Testing the national average", () => {
  const house = House.build(DataE.ADEME_2022);
  test("Check national emission (by person)", () =>
    expect(Math.round(house.getEmissionAvg())).toBe(1130));
  test("Check national emission (by house/apartment)", () =>
    expect(Math.round(house.getEmissionAvgByHouse())).toBe(2694));
});

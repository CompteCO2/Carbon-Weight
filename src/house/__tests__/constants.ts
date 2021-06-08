import { getData, getEmissionAvg } from '../';

describe("Testing data loaded", () => {
  const data = getData();
  test("Check data", () => expect(data).toBeDefined());
  test("Check min e-factors", () => expect(Object.keys(data.emissionFactors).length).toBeGreaterThan(5));

  // Check All Parts (House|Apartment) sums to 1
  let apartmentPart = 0;
  let housePart = 0;

  // Compute Average emissions
  for (const  built of Object.values(data.consumptionFactors)) {
    const apartment = built.apartment;
    const house = built.house;

    // Adding all apartment emissions
    for (const heater of Object.values(apartment)) { apartmentPart += heater.part; };
    for (const heater of Object.values(house)) { housePart += heater.part; };

    test("Check data Apartment Parts summing to 1", () => expect(apartmentPart/100).toBeCloseTo(1));
    test("Check data House Parts summing to 1", () => expect(housePart/100).toBeCloseTo(1));
  }
});

describe("Testing constants - Testing the national average", () => {
  const emissionAvg = getEmissionAvg();
  test("Check national emission", () => expect(Math.floor(emissionAvg)).toBe(2301));
  const newEmission = getEmissionAvg();
  test("Check national emission - Singleton", () => expect(Math.floor(newEmission)).toBe(2301));
});

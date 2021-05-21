import { toYearKey } from "../"
const climate = "H1";

describe("Testing toYearKey mapping", () => {
  test("Check with current year", () => {
    expect(toYearKey(climate, 2021)).toEqual("2001");
  });
  test("Check with exact year", () => {
    expect(toYearKey(climate, 2001)).toEqual("2001");
  });
  test("Check in between category", () => {
    expect(toYearKey(climate, 1988)).toEqual("1983");
  });
  test("Check year 0", () => {
    expect(toYearKey(climate, 33)).toEqual("0");
  });
  test("Check with negative year", () => {
    expect(toYearKey(climate, -2021)).toBeUndefined();
  });
  test("Check with unknown climate", () => {
    expect(toYearKey("H", 2021)).toBeUndefined();
  });
});

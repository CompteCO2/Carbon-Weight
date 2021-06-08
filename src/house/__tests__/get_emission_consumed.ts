import { getEmissionConsumed } from "../";
import { HeaterE } from "../types";

describe("Testing emission consummed (often straight from the bills)", () => {
  test("Unknown consumption energy", () => {
    expect(Math.floor(getEmissionConsumed([2000], HeaterE.urban))).toEqual(-1);
  });
  test("No consumption", () => {
    expect(Math.floor(getEmissionConsumed([0], HeaterE.gas))).toEqual(0);
  });
  test("Simple consumption (Last Month)", () => {
    expect(Math.floor(getEmissionConsumed([1000], HeaterE.gas))).toEqual(3230);
  });
  test("Negative consumption (provider correction)", () => {
    expect(Math.floor(getEmissionConsumed([-1000], HeaterE.gas))).toEqual(-3230);
  });
  test("Positive/Negative consumption compensation", () => {
    expect(Math.floor(getEmissionConsumed(Array(6).fill(1000).concat(Array(6).fill(-1000)), HeaterE.gas)))
    .toEqual(0);
  });
  test("A Year of same consumption", () => {
    expect(Math.floor(getEmissionConsumed(Array(12).fill(1000), HeaterE.gas))).toEqual(38760);
  });
  test("Hald a Year with a Consumption - Half with Another", () => {
    expect(Math.floor(getEmissionConsumed(Array(6).fill(1000).concat(Array(6).fill(500)), HeaterE.gas)))
    .toEqual(29070);
  });
});

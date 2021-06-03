// Those tests are to ensured a constant change has been done properly.
import { getAirports, getEmissionAvg, getDistance, getHaulFactor } from '../';

describe("Testing constants - Make sure airports are loaded", () => {
  const airports = getAirports();
  test("Check data", () => expect(airports).toBeDefined());
  test("Check minimum data fields", () => expect(Object.keys(airports).length).toBeGreaterThan(1000));
});

describe("Testing constants - Test haversine implementation with known value", () => {
  const airports = getAirports();
  test("Check data: Same place", () => expect(Math.floor(getDistance(
    airports["CPT"].lat, airports["CPT"].lon, airports["CPT"].lat, airports["CPT"].lon))).toBe(0));
  test("Check data: Paris - Cap Town", () => expect(Math.floor(getDistance(
    airports["CDG"].lat, airports["CDG"].lon, airports["CPT"].lat, airports["CPT"].lon))).toBe(9362));
  test("Check data: Paris - Berlin", () => expect(Math.floor(getDistance(
    airports["CDG"].lat, airports["CDG"].lon, airports["SXF"].lat, airports["SXF"].lon))).toBe(857));
});

describe("Testing constants - Test emission factor constants (AVG - Haul)", () => {
  test("Check data: Average", () => expect(getEmissionAvg()).toBe(13586));
  test("Check data: Long Haul", () => expect(getHaulFactor(9362)).toBe(0.083));
  test("Check data: Medium Haul", () => expect(getHaulFactor(2200)).toBe(0.102));
  test("Check data: Short Haul", () => expect(getHaulFactor(857)).toBe(0.141));
  test("Check data: Does Not Exists", () => expect(getHaulFactor(29362)).toBe(-1));
});

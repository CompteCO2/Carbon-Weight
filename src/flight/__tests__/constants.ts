// Those tests are to ensured a constant change has been done properly.
import Flight, { getAirports, getDistance } from "../";
import { DataE } from "../types";

describe("Testing constants - Make sure airports are loaded", () => {
  const flight = Flight.build(DataE.ADEME_2022);
  const data = flight.getData();
  const airports = getAirports();
  test("Check airports", () => expect(airports).toBeDefined());
  test("Check data", () => expect(data).toBeDefined());
  test("Check dataset", () =>
    expect(flight.getDataset()).toBe(DataE.ADEME_2022));
  test("Check minimum data fields", () =>
    expect(Object.keys(airports).length).toBeGreaterThan(1000));
});

describe("Testing constants - Test haversine implementation with known value", () => {
  const airports = getAirports();
  test("Check data: Same place", () =>
    expect(
      Math.floor(
        getDistance(
          airports["CPT"].lat,
          airports["CPT"].lon,
          airports["CPT"].lat,
          airports["CPT"].lon
        )
      )
    ).toBe(0));
  test("Check data: Paris - Cap Town", () =>
    expect(
      Math.floor(
        getDistance(
          airports["CDG"].lat,
          airports["CDG"].lon,
          airports["CPT"].lat,
          airports["CPT"].lon
        )
      )
    ).toBe(9362));
  test("Check data: Paris - Berlin", () =>
    expect(
      Math.floor(
        getDistance(
          airports["CDG"].lat,
          airports["CDG"].lon,
          airports["SXF"].lat,
          airports["SXF"].lon
        )
      )
    ).toBe(857));
});

describe("Testing constants - Test emission factor constants (AVGs + Hauls)", () => {
  const flight = Flight.build(DataE.ADEME_2022);
  test("Check data: Average (per person)", () =>
    expect(Math.round(flight.getEmissionAvg())).toBe(179));
  test("Check data: Average (per passenger)", () =>
    expect(Math.round(flight.getEmissionAvgByPassenger())).toBe(173));
  test("Check data: Long Haul", () =>
    expect(flight.getHaulFactor(9362)).toBe(0.083));
  test("Check data: Medium Haul", () =>
    expect(flight.getHaulFactor(2200)).toBe(0.102));
  test("Check data: Short Haul", () =>
    expect(flight.getHaulFactor(857)).toBe(0.141));
});

// Data sets available
export enum DataE {
  "ADEME_2022" = "ADEME_2022",
  "CCO2_2021" = "CCO2_2021",
  "CCO2_2022" = "CCO2_2022",
  "CITEPA_2021" = "CITEPA_2021",
  "CITEPA_2022" = "CITEPA_2022"
}

// Climate types available in the country
// Note: Factor introduced and available in CCO2 dataset
export enum ClimateE {
  H1 = "H1", // Cold
  H2 = "H2", // Medium
  H3 = "H3" // Warm
}

// Heater Combustible types available
export enum HeaterE {
  urban = "urban", // District Heating - ?
  electric = "electric", // Electric - KWh
  fuelOil = "fuelOil", // Domestic Fuel Oil - L
  gas = "gas", // Domestic Gas - Kg
  coal = "coal", // Coal - Kg
  heatPump = "heatPump", // Heat Pump (electric)
  thermalSolar = "thermalSolar", // Thermal Solar (electric)
  propane = "propane", // Propane - Kg
  wood = "wood" // Firewood / Coal - Kg
}

// House types available
export enum HouseE {
  apartment = "apartment",
  house = "house"
}

// Climate available
export enum YearE {
  old = "old", // Before 1975 (included)
  recent = "recent" // After 1975
}

// Heater factors average informations
export type ConsumptionI = {
  emissionFactor: number; // kWh/(m².year)
  part: number; // Part of use in %
  surface: number; // m²
};

// Combustible factors informations
export type HeaterI = {
  emissionFactor?: number; // kWh/(m².year)
  energyFactor: number; // kgCO2e/U (combustible unit)
};

// Region factors informations
export type RegionI = {
  DEP: number; // Region number
  NCC: string; // Region name
  FACTOR: ClimateE; // Region climate factor
};

// House informations
export type HouseT = {
  emission?: number; // estimated house emissions in kgCO2/year
  heater: HeaterE; // heater type
  built: YearE; // Whether the house was built before 1975 (included) or not
  region?: number; // region of the house
  surface: number; // habitable surface of the house in m2
  type: HouseE; // Housing type
};

export type ConsumptionFactorsT = {
  [key in keyof typeof YearE]: {
    [key in keyof typeof HouseE]: {
      [key in keyof typeof HeaterE]: ConsumptionI;
    };
  };
};

// Interface of data factors used to compute emission
export type DataI = {
  climateCoeffs?: { [key in keyof typeof ClimateE]: number }; // Coeff
  emissionFactors: { [key in keyof typeof HeaterE]: HeaterI }; // kgCO2e/kWh
  consumptionFactors?: ConsumptionFactorsT; // Consumption Factors (Full Figure)
  regions?: [RegionI];
  study?: {
    apartment?: number;
    house?: number;
    peopleCount: number;
    totalEmission?: number;
  };
};

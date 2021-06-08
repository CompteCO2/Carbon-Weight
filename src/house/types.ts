// Climate types available in the country
export enum ClimateE {
  H1 = "H1", // Cold
  H2 = "H2", // Medium
  H3 = "H3", // Warm
}

// Heater Combustible types available
export enum HeaterE {
  urban = "urban",        // District Heating
  electric = "electric",  // Electric
  gas = "gas",            // Domestic Gas
  GPL = "GPL",            // GPL (Propane-Butane)
  fuelOil = "fuelOil",    // Domestic Fuel Oil
  wood = "wood",          // Firewood / Coal
}

// House types available
export enum HouseE {
  apartment = "apartment",
  house = "house"
}

// Climate available
export enum YearE {
  old = "old",        // Before 1975 (included)
  recent = "recent"   // After 1975
}

// Heater factors average informations
export type ConsumptionI = {
  emissionFactor: number,
  surface: number
}

// House informations
export type HouseT = {
  emission?: number, // estimated house emissions in kgCO2/year
  heater: HeaterE,   // heater type
  built: YearE,      // Whether the house was built before 1975 (included) or not
  region: string,    // region of the house
  surface: number,   // habitable surface of the house in m2
  type: HouseE,      // Housing type
}

// Mapping class
export type ClasseI = {[key: string]: number};

// Interface of data factors used to compute emission
export type DataI = {
  climateCoeffs: {[key in keyof typeof ClimateE]: number},   // Coeff
  emissionFactors: {[key in keyof typeof HeaterE]: number}, // kgCO2e/kWh
  consumptionFactors: {
    [key in keyof typeof YearE]: {
      [key in keyof typeof HouseE]: {
        [key in keyof typeof HeaterE]: ConsumptionI
  }}},
  regions: {[key: string]: ClimateE}
}

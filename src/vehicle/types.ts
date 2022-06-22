// Data sets available
export enum DataE {
  "ADEME_2022" = "ADEME_2022",
  "CCO2_2021" = "CCO2_2021",
  "CCO2_2022" = "CCO2_2022",
  "CITEPA_2021" = "CITEPA_2021",
  "CITEPA_2022" = "CITEPA_2022"
}

// Fuel types available
export enum FuelE {
  "E85" = "E85",
  "electric" = "electric",
  "fuel" = "fuel",
  "gasoil" = "gasoil",
  "GNV" = "GNV",
  "LPG" = "LPG"
}

// Vehicle types available
export enum VehicleE {
  "lightUtility" = "lightUtility",
  "standard" = "standard",
  "twoWheeler" = "twoWheeler"
}

// Consumption informations
export type ConsumptionT = {
  consumption?: number; // Vehicle fuel consumption in L
  distanceByYear?: number; // Distance yearly made in Km
  fuel: FuelE; // Fuel type
  mpg?: number; // Vehicle fuel consumption in L/100Km
};

// Vehicle informations
export type VehicleT = {
  consumption?: number; // Vehicle fuel consumption in L/100Km
  distanceByYear: number; // Distance yearly made in Km
  emissionFactor?: number; // Vihicle emission factor in gCO2e/km
  fuel?: FuelE; // Emission factor of generated waste from the product
};

// Vehicle informations
export type ModelT = {
  distanceByYear: number; // Average distance yearly made in Km
  fuel: FuelE; // Emission factor of generated waste from the product
  type: VehicleE;
  year: number;
};

// Each vehicle type as a factor in gCO2e/km depending on the fuel used and year of manufacture
// This does not allow any data hole as we enforce comparing on the same base of data.
export type FigureT = {
  vehicle: { [key: string]: { [key: string]: number[] } };
  yearStart: number;
};

// Interface of data factors used to compute emission
export type DataI = {
  emissionFactors: { [key: string]: number };
  emissionFigure?: FigureT;
  study: {
    totalEmission: number;
    carCount?: number;
    peopleCount: number;
  };
};

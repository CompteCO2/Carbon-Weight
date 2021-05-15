// Heater types available
export enum HeaterT {
  BUT = "BUT",  // Butane
  CIT = "CIT",  // District Heating
  ELE = "ELE",  // Electric
  GAS = "GAS",  // Natural Gas
  HEA = "HEA",  // Solar Energy
  HPU = "HPU",  // Heat Pump
  MIN = "MIN",  // Coal
  OIL = "OIL",  // Domestic Fuel Oil
  PET = "PET",  // ????
  WOO = "WOO",  // Firewood
}

// Reduction type of the work of the house
export enum ReductionT {
  ATTIC_INSULATION = "ATTIC_INSULATION",
  FLOOR_INSULATION = "FLOOR_INSULATION",
  OTHER = "OTHER",
  VENTILATION_UPDATE = "VENTILATION_UPDATE",
  WALL_INSULATION = "WALL_INSULATION",
  WINDOW_CHANGE = "WINDOW_CHANGE",
}

// Heater factors informations
export type HeaterI = {
  factor: number,
  factorUnit: number,
  unit: string,
}

// House informations
export type HouseT = {
  buildYear: number, // year the house was built
  emission?: number, // estimated house emissions in kgCO2
  heater: HeaterT,   // heater type
  region: string,    // region of the house
  surface: number,   // habitable surface of the house in m2
}

// Mapping class
export type ClasseI = {[key: string]: number};

// Interface of data factors used to compute emission
export type DataI = {
  classes: {[key: string]: ClasseI},
  climates: {[key: string]: string},
  heaters: {[key: string]: HeaterI},
  reductions: {[key: string]: number},
}

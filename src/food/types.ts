// Food types available
export enum FoodT {
  ALCOHOL = "alcohol",
  BREAD = "bread",
  CHEESE = "cheese",
  FISH = "fish",
  LGEXO = "exoticHarvest",    // Exotic - Vegetable & Fruits
  LGSAI = "localHarvest",     // Season - Vegetable & Fruits
  REDMEAT = "redMeat",
  RICE = "rice",
  SOFT = "soft",
  WHITEMEAT = "whiteMeat"
}

// Food factors informations
export type FoodI = {
  emissionFactor: number,       // Emission factor of generated waste from the food type
  averageWeight: number,        // Average weight consummed in g
  wasteEmissionFactor: number,  // Emission factor of generated waste from the product
}

// Consumption informations
export type ConsumptionT = {
  alcohol?: number,       // number of consumption of alcohol by week
  bread?: number,         // number of consumption of bread by week
  cheese?: number,        // number of consumption of cheese by week
  exoticHarvest?: number, // number of consumption of exoticHarvest by week
  fish?: number,          // number of consumption of fish by week
  localHarvest?: number,  // number of consumption of localHarvest by week
  redMeat?: number,       // number of consumption of redMeat by week
  rice?: number,          // number of consumption of rice by week
  soft?: number,          // number of consumption of soft by week
  whiteMeat?: number,     // number of consumption of whiteMeat by week
}

// Compution type returned from computation
export type ComsumptionR = {
  emission: number, // estimated production emissions in kgCO2/year
  waste:number,     // estimated waste emissions in kgCO2/year
}

// Interface of data factors used to compute emission
export type DataI = {
  foods: {[key: string]: FoodI}
}

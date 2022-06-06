// Data sets available
export enum DataE {
  "ADEME_2022" = "ADEME_2022"
}

// Food types available
export enum FoodE {
  alcohol = "alcohol",
  bread = "bread",
  cheese = "cheese",
  fish = "fish",
  harvestExotic = "harvestExotic", // Exotic - Vegetable & Fruits
  harvestLocal = "harvestLocal", // Season - Vegetable & Fruits
  meatRed = "meatRed",
  meatWhite = "meatWhite",
  rice = "rice", // Rice/Pasta (cooked weight)
  soft = "soft"
}

// Waste types available
export enum WasteE {
  cardboard = "cardboard",
  fat_butter = "fat_butter",
  glass_bottle = "glass_bottle",
  food_brick = "food_brick",
  milk_bottle = "milk_bottle",
  none = "none",
  packaging_glass = "packaging_glass",
  packaging_pet = "packaging_pet",
  paper = "paper",
  plastic_bottle = "plastic_bottle",
  plastic_film = "plastic_film",
  tin_can = "tin_can",
  tray = "tray",
  tray_ps = "tray_ps"
}

// Food factors raw data
export type FoodD = {
  averageWeight: number; // Average weight consummed in g
  averageWeightDay: { [key: string]: number }; // Average weights consumed in g/day (from reliable source)
  emissionFactors: { [key: string]: number }; // Emission of co2 from the product in kgCO2e/kg (from reliable source)
  wasteEmissionFactor: string; // Waste package type
};

// Food extracted factors informations
export type FoodI = {
  averageWeight: number; // Average weight/meal consummed in g/meal
  averageWeightDay: number; // Average weight/day consummed in g/day
  emissionFactor: number; // Emission factor from the food type in kgCO2e/kg
  wasteEmissionFactor: number; // Emission factor of generated waste from the product in kgCO2e/kgPackaging
  wasteRatioFactor: number; // Waste/Food weight ratio in kgPackaging/kgFood
};

// Food waste factors informations
export type WasteI = {
  packaging: number; // kgCO2e/kgPackaging
  ratio: number; // kgPackaging/kgFood
};

// Interface of raw data factors
export type DataR = {
  foods: { [key: string]: FoodD };
  wastes: { [key: string]: WasteI };
};

// Interface of computed data factors used to compute emission
export type DataI = {
  foods: { [key in keyof typeof FoodE]: FoodI };
};

// Consumption informations [foodT/week]
export type ConsumptionT = { [key in keyof typeof FoodE]: number };

// Compution type returned from computation
export type ComsumptionR = {
  emission: number; // estimated production emissions in kgCO2e/year
  waste: number; // estimated waste emissions in kgCO2e/year
};

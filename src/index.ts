export { default as Flight } from "./flight";
export {
  DataE as FlightDataE,
  AirportI as FlightAirportI,
  AirportsI as FlightAirportsI,
  FlightI,
  HaulE as FlightHaulE,
  SeatE as FlightSeatE
} from "./flight/types";

export { default as Food } from "./food";
export {
  DataE as FoodDataE,
  FoodE,
  ComsumptionR as FoodComsumptionR,
  ConsumptionT as FoodConsumptionT,
  WasteE as FoodWasteE
} from "./food/types";

export { default as House } from "./house";
export {
  DataE as HouseDataE,
  HeaterE as HouseHeaterE,
  HouseE,
  HouseT,
  YearE as HouseYearE
} from "./house/types";

export { default as Vehicle } from "./vehicle";
export {
  ConsumptionT as VehicleConsumptionT,
  DataE as VehicleDataE,
  FuelE as VehicleFuelE,
  ModelT as VehicleModelT,
  VehicleE,
  VehicleT
} from "./vehicle/types";

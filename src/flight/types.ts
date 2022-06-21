// Data sets available
export enum DataE {
  "ADEME_2022" = "ADEME_2022"
}

// Airport informations
export type AirportI = {
  name: string; // Name of the airport
  city: string; // City of the airport
  country: string; // Country of the airport
  lat: number; // Lattitude of the airport localization
  lon: number; // Longitude of the airport localization
};

// SeatE type of seat used in the plane
export enum SeatE {
  economy = "economy",
  business = "business",
  first = "first"
}

// HaulE type of haul used to categorize a flight
export enum HaulE {
  long = "long",
  medium = "medium",
  short = "short"
}

// Data factors constant used to compute emissions
export type DataI = {
  hauls: {
    [key in keyof typeof HaulE]: { maxKm: number; emissionFactor: number };
  };
  seats: { [key: string]: number };
  study: {
    totalEmission: number;
    passengerCount: number;
    peopleCount: number;
  };
};

// Travel informations
export type FlightI = {
  fromIATA: string; // Airport of departure
  toIATA: string; // Airport of arrival
  nbPassengers: number; // Number of passengers
  roundTrip: boolean; // Is Round-Trip
  seatType: SeatE;
};

// Interface of data used to compute distance - IATA is used as the key
// International Air Transport Association's (IATA) unique 3-letter identifier
export type AirportsI = { [key: string]: AirportI };

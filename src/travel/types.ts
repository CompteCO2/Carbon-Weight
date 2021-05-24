// Airport informations
export type AirportI = {
  name: string,        // Name of the airport
  city: string,        // City of the airport
  country: string,     // Country of the airport
  lat: number,         // Lattitude of the airport localization
  lon: number,        // Longitude of the airport localization
}

// SeatT type of seat used in the plane
export enum SeatT {
  Economy = "Economy",
  Business = "Business",
  First = "First"
}

// Travel informations
export type TravelI = {
  from: AirportI,        // Airport of departure
  to: AirportI,          // Airport of arrival
  nbPassengers: number,  // Number of passengers
  seatType: SeatT
}

// Interface of data used to compute distance - IATA is used as the key
// International Air Transport Association's (IATA) unique 3-letter identifier
export type DataI = { [key: string]: AirportI }

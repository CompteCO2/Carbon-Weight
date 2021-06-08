# Flight Emissions
First, the distances are calculated between the airports selected, using the greater circle method: we compute the **distance in Km** from longitude and latitude using the haversine formula (cf. https://en.wikipedia.org/wiki/Haversine_formula).

Then we can use the factor emission (cf. next section) to get our first estimation per equivalent person:
- Emission = Distance * Factor
- [kgCO2e/year] = [Km/year] * [kgCO2e/km]

Finally, we add a factor depending on the class of the seat taken (economy class, business class, first class). Connections are not taken into account.

## Emission Factors
We use the last version of the carbon base data (2021) from he French Agency for Ecological Transition (ADEME) which uses an emission factor expressed in **kgCO2e/peq.km** (peq = person equivalent):
- **Short-Haul**: 0.141
- **Medium-Haul**: 0.102
- **Long-Haul**: 0.083

**Note**: they use actual air traffic consumption data provided by the Directorate General of Civil Aviation (DGAC) - https://www.bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/Aerien2 to compute those factors.

**Note bis**:The data only focus on classic airliners, able to carry both passengers and cargo and does not take into account the Radiative Forcing Factor.

## Short-Haul - Medium-Haul - Long-Haul
Airliners are classified as short medium long haul, however this definition is not standardized. We use the same rule used by the emission factor source (cf. ADEME documentation link):
- **Short-Haul**: < 1.000 Km
- **Medium-Haul**: < 3.500 Km
- **Long-Haul**: < 20.000 Km

## Seat Types
Emission factors were calculated according to the number of passengers a flight transports. A first class seat would occupy a larger area compared to an economy class equivalent per passenger and therefore attribute to a larger percentage of the overall planes emission.

For the seat type factor we compute them from the UK Government source (https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2019). We average the deltas between classes (grouped by Haul):
- **Economy**: 1
- **Business**: 2.2
- **First**: 4

Note: The distance definition for the haul classification from UK does not stick perfectly to the one from ADEME but are more than enough close for the estimation (700Km - 3700Km).

## National Average CO2 Emission
 Our national co2 emission average "getEmissionAvg()" give us:
 - **13 586 peq.kgCO2e/year from food consumption**

This constant is the ratio emission(2019)/#passengers(2019) from the Directorate General of Civil Aviation (DGAC). Only emissions from TARMAAC source commercial aviation, including APU, are considered here (https://eco-calculateur.dta.aviation-civile.gouv.fr/les-chiffres-cles):
- **Emission**: 2,44 mtCO2e
- **Passengers**: 179.6 millions
- **Flights**: 1,57 millions

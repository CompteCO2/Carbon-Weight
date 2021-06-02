# Vehicle Emissions
The carbon footprint from car usage can be calculated using different methods, providing the result in differing levels of accuracy. We propose two computations :
- **From Fuel Consumption**: Type of Fuel and, Consumption or Annual Mileage and actual MPG.
- **From Registration Card**: Type of Fuel, Mileage and gCO2e/km (constructor).
- **From Vehicle Type**: Annual Mileage and the gCO2e/km figure (explained below).

Although the first computation method is the most precise, it relies on a parameter that could be quite uncertain (depends on personal measure) or even unknown. Indeed, the exact MPG (or real fuel consumption) for the period of the annual mileage could be difficult to get with precision if not measured properly.

This is the best choice if you cannot guarantee the actual MPG/Consumption. This method is based on the constructor factor emission corrected by the vehicle age.

The last one is the least precise, but still allows you to get a fairly good CO2e emission estimation from only the vehicle type and your annual mileage.

# Carbon Emission Factors
All our carbon emission factors come from the same trusted source ADEME ("Agence De l'Environnement et de la Maîtrise de l'Énergie"), which is the French Agency for Ecological Transition.

## Fuel Consumption
The fuel emission factors are expressed in **kgCO2e/litre**.
Those values take into account both Combustion and Upstream (Extraction/Process, Transport, Refining, Distribution) emissions:
- **Gasoil**: 3.17
- **Fuel**: 2.79
- **Electric**: 0
- **LPG**: 1.86
- **E85**: 1.46
- **Flight**: 3.01

Using this Emission Factor is straight and depends on a minimum of parameters:
### Using real consumption
- Emission = Consumption * Factor
- [kgCO2e/year] = [L/year] * [kgCO2e/L]

### Using Mileage & MPG
- Emission = MPG * (Mileage / 100) * Factor
- [kgCO2e/year] = [L/100Km] * [100Km/year] * [kgCO2e/L]

Note:
- You may find those numbers there: https://www.bilans-ges.ademe.fr/fr/basecarbone/.
- Those data are mainly calculated with the GWP at 100 years of the 5th IPCC report (the last). See the IPCC website: http://www.ipcc.ch/report/ar5/wg1/.

## Registration Card
The vehicle carbon emission is computed here using the constructor emission factor or the original consumption factor. Both those values are trusted source as the measure is made on the exact reference of a vehicle and are available from the government data website (https://www.data.gouv.fr/fr/datasets/emissions-de-co2-et-de-polluants-des-vehicules-commercialises-en-france/). They are collected from UTAC (in charge of the homologation of vehicles before they are put on sale).

However, this value is evolving along the time as the vehicle get older and depends on different factors such as driving habits and maintains mechanics. We thus use an extra factor that takes into account aging (explained further).

### Using emission factor
The constructor emission factor is expressed in **gCO2e/km** which can be found on the registration card of the vehicle - V.7 field (EU). Formula is as simple as:
* - Emission = Mileage * Factor / 1000 * YearCorrection
* - [kgCO2e/year] = [Km/year] * [kgCO2e/km] * Cste

### Using consumption factor
Or it could either consumption factor expressed in **L/100Km**. We find back the formula of the first method using the fuel consumption factor coerced with the extra aging factor:
- Emission = MPG * (Mileage / 100) * FuelEmissionFactor * YearCorrection
- [kgCO2e/year] = [L/100Km] * [100Km/year] * [kgCO2e/L] * Cste

Note: On our side we use the "mix driving condition" measure.

### Aging Factor
TODO - Complete review of constant computations.

## Car Type - gCO2e/km figure
The unit is **gCO2e/km** and are statistic averages depending on the three following parameters:
- **Vehicle Type**: Light utility, Standard, Two Wheeler.
- **Fuel Type**: CNG, Diesel, Electric, LPG, Petrol.
- **Year of manufacture**: From 1990 To 2018.

So, the formula is kinda the same as the one used in "Registration Card". The change is on the emission factors that come from statistical source and already include vehicle aging.

- Emission = Mileage * Factor / 1000
- [kgCO2e/year] = [Km/year] * [kgCO2e/km]

The french factor emission constants - gCO2e/km figure - are coming from the "Citepa. Rapport Secten" (https://www.citepa.org/fr/secten/). "Citepa is a non-profit organisation and State operator for the French Environment Ministry, the Citepa meets reporting requirements for air pollutants and greenhouse gas emissions from France in different inventory formats, such as UNFCCC, EMEP, Kyoto Protocol and UNECE inventories."

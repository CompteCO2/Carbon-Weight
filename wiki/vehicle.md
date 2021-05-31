# Vehicle Emissions
The carbon footprint from car usage can be calculated using different methods, providing the result in differing levels of accuracy. We propose two computations :
- **From Fuel Consumption**: Type of Fuel, Annual Mileage and actual MPG.
- **From Registration Card**: Type of Fuel, Annual Mileage and constructor MPG.
- **From Car Type**: Annual Mileage and the gCO2/km figure (explained below).

Although the first computation method is the most precise, it relies on a parameter that could be quite incertain (depends on personal measure) or even unknown. Indeed, the exact MPG (real consumption) for the period of the annual mileage could be difficult to get with precision if not measured properly.

This is the best choice if you cannot guarantee the actual MPG. This method is based on the constructor factor emission corrected by the vehicle age.

The last one is the least precise, but still allows you to get a fairly good CO2 emission
estimation of your vehicle from only the car type and your annual mileage.

# Carbon Emission Factors
All our carbon emission factors come from the same trusted source ADEME ("Agence De l'Environnement et de la Maîtrise de l'Énergie"), which is the French Agency for Ecological Transition.

## Fuel Consumption
The constant emission factor from fuel consumption is expressed in **kgCO2e/litre**.
Here are the values in use:
- Yo
- Yo
- Yo


Using this Emission Factor is straight and depends on a minimum of parameters:
- Emission = Consumption * Factor

Note:
- You may find those numbers there: https://www.bilans-ges.ademe.fr/fr/basecarbone/.
- Those data are mainly calculated with the GWP at 100 years of the 5th IPCC report (the last). See the IPCC website: http://www.ipcc.ch/report/ar5/wg1/.

## Car Type - gCO2/km figure
The french factor emission constants - gCO2/km figure - are coming from the "Citepa. Rapport Secten" (https://www.citepa.org/fr/secten/). "Citepa is a non-profit organisation and State operator for the French Environment Ministry, the Citepa meets reporting requirements for air pollutants and greenhouse gas emissions from France in different inventory formats, such as UNFCCC, EMEP, Kyoto Protocol and UNECE inventories."

The unit is **gCO2/km** and depends on the three following parameters:
- **Vehicle Type**: Light utility, Standard, Two Wheeler.
- **Fuel Type**: CNG, Diesel, Electric, LPG, Petrol.
- **Year of manufacture**: From 1990 To 2018.

# Carbon-Weight
Carbon Footprint Calculator For Individuals And Households. This carbon footprint calculation allows you to estimate and calculate your personal or business carbon footprint whether it comes from housing, travels, transportation or food habits.

You may directly use this calculator online from https://myco2emission.com/ (by https://www.compteco2.com/ - migration in progress).

You may embed the calculator to your webpage or blog post using the following HTML code (in progress):
```
<iframe width="900" height="600" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" src="https://compteco2.com/carbon-weight"></iframe>
```

You may also install the self contained npm package to use it from your own projects (in progress).
```
npm i @cco2/carbon-weight
```

# Methodology & Documentation
Here are the methodologies and data used for our CO2 emission calculator. Please keep in mind that all emission computed are given in **kgCO2e/year**.

## House Emissions

## Food Emissions
The idea is to compute a quite rough co2 emission (kgCO2e/year) estimate from weekly eating habits. The food carbon footprint is by design a best estimate, this approximation still allows to get an order of magnitude. The formula in use, is as simple as :
- emission = Sum[ (weaklyConsumed * averageWeight * 52) / 1000 * carbonEmissionFactor ]
- waste = SUM[ (weaklyConsumed * averageWeight * 52) / 1000 * wasteRatioFactor * wasteEmissionFactor ]

Here are the factor units in use:
- [kgCO2e/year] = (52[g/week]) / 1000 * [kgCO2e/kg]
- [kgCO2e/year] = (52[g/week]) / 1000 * [kgPackaging/kg] * [kgCO2e/kgPackaging]

#### Frequency
This is the number of time the aliments is consumed **a week in a range of 0 to 14 (from 0 to twice a day)**.

#### Quantities
It represents the **average quantity in g/meal** for a specific food by an adult. The constants come from a general average restaurant portion. Here are the ones in use:
- **Alcohol**: 33cl/meal.
- **Bread**: 100g/meal.
- **Cheese**: 50g/meal.
- **Fish**: 130g/meal.
- **Harvest - Exotic**: 200g/meal.
- **Harvest - Local**: 200g/meal.
- **Red/White Meat**: 150g/meal.
- **Rice/Pasta (cooked)**: 150g/meal.
- **Soft**: 400cl/meal

#### Carbon Emission Factors
The carbon emission per food consumed factors are **expressed in kgCO2e/kg**. The constant factors come from the FoodGES project by ADEME: "Facteur D’émission de gaz à effet de serre des principaux aliments consommés en France" (https://www.bilans-ges.ademe.fr/fr/actualite/actualite/detail/id/23). ADEME ("Agence De l'Environnement et de la Maîtrise de l'Énergie") is the French Agency for Ecological Transition.

We use the factor emission average grouped as the following:
- **Alcohol**: Wine, Beer.
- **Bread**: Wheat flour.
- **Cheese**: Cream cheese, all other kinds (goat, hard, soft).
- **Fish**: Canned tuna, Crustacean, Salmon/Trout (farmed, smoked, steak), Sea Bream/Bass (fillet), Whole wild fish.
- **Harvest - Exotic**: By boat, by flight.
- **Harvest - Local**: In Season, Off Season.
- **Red Meat**: Beef, Lamb chops, Porc (bacon, meat, sausages), Veal.
- **Rice/Pasta**: Cooked Cereal (quinoa...), Pasta, Rice, Semolina.
- **soft**: Juice, Soda, Water bottle.
- **White Meat**: Chicken (breast, legs, whole), Duck Breast, Rabbit, Turkey (breast, legs, whole).

#### Carbon Waste Emission Factors
The carbon waste emission factors are **pairs expressed in kgCO2e/kgPackaging and kgPackaging/kgFood**. The constant factors come from the FoodGES project by ADEME: "Facteur D’émission de gaz à effet de serre des principaux aliments consommés en France" (https://www.bilans-ges.ademe.fr/fr/actualite/actualite/detail/id/23).

- **Cardboard**: [1.06, 0.1]
- **Fat (butter)**: [2, 0.05]
- **Glass bottle**: [1.013, 0.5]
- **Food brick**: [1.49, 0.1]
- **Milk bottle / Cream jar**: [1.92, 0.05]
- **No Packaging**: [0, 0]
- **Packaging glass**: [0.803, 0.5]
- **Paper**: [0.919, 0.1]
- **PET packaging**: [3.27, 0.05]
- **Plastic bottle**: [3.4, 0.05]
- **Plastic film packaging**: [2.09, 0.05]
- **PS tray**: [2.83, 0.05]
- **Tin can**: [0.319, 0.1]
- **Tray**: [2.83, 0.05]

### National Average CO2 Emission
 Our national co2 emission average "getEmissionAvg()" give us:
 - **2563 kgCO2e/year from food consumption**
 - **125 kgCO2e/year from waste generated**

 It uses the food quantity consumptions (g/day) statistic on an adult which sources from the ANSES INCA 3 investigation (https://www.anses.fr/fr/system/files/NUT2014SA0234Ra.pdf). ANSES is The French Agency for Food, Environmental and Occupational Health & Safety. It is an administrative public establishment accountable to the French Ministries of Health, Agriculture, the Environment, Labour and Consumer Affairs.

We use the sum of average quantity consumed grouped by the type of food as the following:
- **Alcohol (227.5g/day)**: Alcohol.
- **Bread (155.8g/day)**: Bread (white, semi-wholemeal/wholemeal).
- **Cheese (38.5g/day)**: All kind excluding desserts, ice creams, yaourts.
- **Fish (80.9.9g/day)**: Crustacean, Fish.
- **Harvest - Exotic (135.2g/day)**: Fruits, Legumes, Vegetables.
- **Harvest - Local (222.7g/day)**: Fruits, Legumes, Vegetables.
- **Red Meat (110.1g/day)**: Delicatessen, Red Meat.
- **Rice/Pasta cooked (137.9g/day)**: Cereal, Pasta, Rice - (white, semi-wholemeal/wholemeal).
- **Softs (783.2g/day)** : Juices, water bottles.
- **White Meat (52.9g/day)**: Meat dishes.

## Flight Emissions
Firstly the distances are calculated between the airports selected, using the greater circle method: we compute the **distance in Km** from longitude and latitude using the haversine formula (cf. https://en.wikipedia.org/wiki/Haversine_formula).

This is then multiplied by the appropriate emissions factor specific to the type of flight (short haul or long haul) and the class of seat taken (e.g. economy class, business class etc.). The emissions factors include the distance uplift to compensate for planes not flying using the most direct route i.e. flying around international airspace, stacking etc.

### Short-Haul & Long-Haul


### Seat Types
The factors in use here are based on the area occupied by a passenger of different seat class. As you could fit more economy seats in a classic plane (YYY) than 1st class seats (YYY), emission of a 1st class passenger attribute to a larger percentage of the overall planes emission. This factors comes from the average of (source. XXXXX)

Different emission factors were calculated according to the relative area on the aircraft occupied by different seating classes, for example a first class seat would occupy a larger area compared to an economy class equivalent per passenger and therefore attribute to a larger percentage of the overall planes emission.

## Vehicle Emissions
The french factor emission constants are coming from the "Citepa. Rapport Secten édition 2020". "Citepa is a non-profit organisation and State operator for the French Environment Ministry, the Citepa meets reporting requirements for air pollutants and greenhouse gas emissions from France in different inventory formats, such as UNFCCC, EMEP, Kyoto Protocol and UNECE inventories."

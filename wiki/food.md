# Food Emissions
The idea is to compute a quite rough co2 emission (kgCO2e/year) estimate from weekly eating habits. The weekly consumption based has been choosen for its convenience to be estimated by an individual.

The food carbon footprint is by design a best estimate, this approximation still allows to get an order of magnitude. The formula in use, is as simple as :
- emission = Sum[ (weaklyConsumed * averageWeight * 52) / 1000 * carbonEmissionFactor ]
- waste = SUM[ (weaklyConsumed * averageWeight * 52) / 1000 * wasteRatioFactor * wasteEmissionFactor ]

Here are the factor units in use:
- [kgCO2e/year] = (52[g/week]) / 1000 * [kgCO2e/kg]
- [kgCO2e/year] = (52[g/week]) / 1000 * [kgPackaging/kg] * [kgCO2e/kgPackaging]

### Frequency
This is the number of time the aliments is consumed **a week in a range of 0 to 14 (from 0 to twice a day)**. This is a parameter easily estimated from an individual; on the other hand, a simple projection from daily consumption averages (from trusted source) would give a pretty good approximation as well (cf. National Average CO2 Emission section).

### Quantities
It represents the **average quantity in g/meal** for a specific food by an adult. The constants come from a general average restaurant portion estimated by ourself. Here are the ones in use:
- **Alcohol**: 33cl/meal.
- **Bread**: 100g/meal.
- **Cheese**: 50g/meal.
- **Fish**: 130g/meal.
- **Harvest - Exotic**: 200g/meal.
- **Harvest - Local**: 200g/meal.
- **Red/White Meat**: 150g/meal.
- **Rice/Pasta (cooked)**: 150g/meal.
- **Soft**: 400cl/meal

### Carbon Emission Factors
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

### Carbon Waste Emission Factors
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

# Housing Emissions
The carbon footprint from heating usage is proposed with two computations, both extremely simple :
- **From Real Consumption**: Use the exact consumption of a combustible to compute the CO2 emission in **kgCO2e**.
- **From House**: Use housing model to compute an estimation of CO2 emission in **kgCO2e/year**.

First method is straight (U is the combustible unit):
- Emission = Consumption * CombustibleFactor
- [kgCO2e] = [U] * [kgCO2e/U]

Second one uses a few more factors:
- Emission = Surface * ConsumptionFactor * CombustibleFactor * ClimateCoef
- [kgCO2e/year] = [m²] * [kWh/(m².year)] * [kgCO2e/kW] * Cste

## Emission Factors
We use the last version of the carbon base data (2021) from he French Agency for Ecological Transition (ADEME). The factors are pairs defined by the duo "Consumption Surface Factor" **kWh/(m².year)** and the "Combustible Emission Factor" **kgCO2e/kWh**.

The Housing Consumption factors are grouped by and depends on:
- Type of Housing (House, Apartment).
- Type of Combustible (Electric, Fuel oil, Gas, GPL, Urban, Wood/Coal).
- Year of Construction (Before or After 1975).

### Sources:
**Consumption Surface Factor**: https://www.bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/Chauffage. They use actual statistics (open data) provided by the CEREN (CENTER FOR ECONOMIC STUDIES AND RESEARCH ON ENERGY) - https://www.ceren.fr/ - to compute those factors.

**Combustible Emission Factor**: We use the last version of the carbon base data (2021) -https://www.bilans-ges.ademe.fr/fr/basecarbone.

Note: The electric data source come from the ADEME report (2020) "Positioning of ADEME on the calculation of the CO2 content of electricity, in the case of electric heating" (https://www.ademe.fr/sites/default/files/assets/documents/fiche-technique-ademe-contenu-co2-electricite-2020-v2.pdf).

Note bis: The urban data source come from the Ministry of Ecological Transition (2020) (https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000042428417/). We made the average removing missing references.

## Climatic Zones
Energy needs are different depending on the climate. This is why the RT 2020 (Thermal Regulations 2020) defines a classification of French departments into 3 major climatic zones: H1, H2, H3. The classification is made by the government and available on its website (cf. https://www.ecologie.gouv.fr/sites/default/files/La%20r%C3%A9partition%20des%20d%C3%A9partements%20par%20zone%20climatique.pdf).

### Climate Correction Coefficients
The ADEME has used this classification to obtain regional averages from the national average energy consumption. The coefficients are the ratio of the UDD (unified degree day) for the area considered to the UDD for the whole country : https://www.bilans-ges.ademe.fr/documentation/UPLOAD_DOC_FR/index.htm?corrections_climatiques.htm

- **H1**: 1.1
- **H2**: 0.9
- **H3**: 0.6

## National Average CO2 Emission
 Our national co2 emission average "getEmissionAvg()" give us:
 - **XXXX kgCO2e/year from heating housing**

Using the ADEME/CEREN source - https://www.bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/Chauffage - we compute the nation average co2 emission by normalizing and summing the average emission of each housing from:
- **Average Emission Factor** - kWh/(m².year)
- **Average Housing Surfaces** - m²
- **Average Proportion of each energy in heating** - % (equally divided between "new" and "old" housing and grouped by housing type).
- **Proportion of Apartments & Houses in the study** - %

## Possible Future Enhancement
Add a reduction coefficient from the work type a house get from:
- Attic Insulation
- Floor Insulation
- Ventilation
- Wall Insulation
- Window Change

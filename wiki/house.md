# Housing Emissions

The carbon footprint from heating usage is proposed with two computations, both extremely simple :

- **From Real Consumption**: Use the exact consumption of a combustible to compute the CO2 emission in **kgCO2e**.
- **From House Type**: Use housing model to compute an estimation of CO2 emission in **kgCO2e/year**.

First method is straight (U is the combustible unit):

- Emission = Consumption \* CombustibleFactor
- [kgCO2e] = [U] \* [kgCO2e/U]

Second one uses a few more factors:

- Emission = Surface \* ConsumptionFactor \* CombustibleFactor \* ClimateCoef
- [kgCO2e/year] = [m²] \* [kWh/(m².year)] \* [kgCO2e/kW] \* Cste

## Emission Factors

The factors are pairs defined by the duo "Consumption Surface Factor" **kWh/(m².year)** and the "Combustible Emission Factor" **kgCO2e/kWh**.

The Housing Consumption factors are grouped by and depends on:

- Type of Housing (House, Apartment).
- Type of Combustible (Electric, Fuel oil, Gas, GPL, Urban, Wood/Coal).
- Year of Construction (Before or After 1975).

## Sources:

Three datasets are currently available to compute emissions:

- ADEME (2022) - French Agency for Ecological Transition
- CCO2 (2022) - Aggregation of ADEME & CITEPA with some correction coefficients.
- CITEPA (2021) - Technical Reference Center for Air Pollution and Climate Change (Non-Profit Association)

### ADEME

We use the last version of the carbon base data (2022) for all estimations.

**Consumption Surface Factor**:

https://www.bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/Chauffage. They use actual statistics (open data) provided by the CEREN (CENTER FOR ECONOMIC STUDIES AND RESEARCH ON ENERGY) - https://www.ceren.fr/ - to compute those factors.

**Combustible Emission Factor**:

We use the last version of the carbon base data (2022) -https://www.bilans-ges.ademe.fr/fr/basecarbone.

Note: The electric data source come from the ADEME report (2020) "Positioning of ADEME on the calculation of the CO2 content of electricity, in the case of electric heating" (https://www.ademe.fr/sites/default/files/assets/documents/fiche-technique-ademe-contenu-co2-electricite-2020-v2.pdf).

Note bis: The urban data source come from the Ministry of Ecological Transition (2020) (https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000042428417/). We made the average removing missing references.

#### Note

Why would ADEME emission factors are higher?

Those ones use an another computation methodology : taking into account both Combustion and Upstream (Extraction/Process, Transport, Refining, Distribution) emissions.

- You may find those numbers there: https://www.bilans-ges.ademe.fr/fr/basecarbone/.
- Those data are mainly calculated with the GWP at 100 years of the 5th IPCC report (the last). See the IPCC website: http://www.ipcc.ch/report/ar5/wg1/.

### CITEPA - CCO2

The data comming from CITEPA are all available within a single PDF report - "Rapport Secten Édition 2021":
https://www.citepa.org/wp-content/uploads/publications/secten/Citepa_Rapport-Secten_ed2021_v1_30072021.pdf

## Climatic Zones (CCO2)

Energy needs are different depending on the climate. This is why the RT 2020 (Thermal Regulations 2020) defines a classification of French departments into 3 major climatic zones: H1, H2, H3. The classification is made by the government and available on its website (cf. https://www.ecologie.gouv.fr/sites/default/files/La%20r%C3%A9partition%20des%20d%C3%A9partements%20par%20zone%20climatique.pdf).

### Climate Correction Coefficients

The ADEME has used this classification to obtain regional averages from the national average energy consumption. The coefficients are the ratio of the UDD (unified degree day) for the area considered to the UDD for the whole country : https://www.bilans-ges.ademe.fr/documentation/UPLOAD_DOC_FR/index.htm?corrections_climatiques.htm

The calculator gives the CO2 emissions of the dwelling from the amount of energy consumed. For energies such as fuel oil or propane, a user always knows approximately how much energy he consumes and can always indicate the quantity of energy he has purchased: for example, the owner of a house heated with fuel oil knows that he fills up his tank X times a year, and that he generally buys X litres of fuel oil per year.

For some energies, we do not know exactly how much is consumed without having the bill in front of us. In this case, it is often difficult to have in mind an order of magnitude of the quantity consumed. This is the typical case with town gas, where the quantity is expressed in kWh HCV and not in cubic meters on the bills (with the kWh HCV -m3 relationship varying according to the season, the origin of the gas, etc.).

In this case, the calculator produces an estimate of the amount of energy needed (in kWh HCV) to heat 1 m2 of a dwelling. This estimate also depends on the region where the dwelling is located. Of course, in cold regions the consumption is higher than in warm regions. In France, regions are classified into three geographical zones, H1, H2, and H3. The H1 zone corresponds to the "cold" areas of the country, and "H3" to the warmest areas.

In order to take into account these geographical variations, the calculator assigns a coefficient to each zone. In the H1 zone the amount of heat required is thus higher than the amount of heat required in the H3 zone. There is no precise data to quantify the differences between these zones. As the objective of the calculator is to provide an approximate value, before the exact calculation from the actual quantities as they appear on the invoice, the coefficients have been set to the following values:

- **H1**: 1.1
- **H2**: 0.9
- **H3**: 0.6

## National Average CO2 Emission

### ADEME

Using the ADEME/CEREN source - https://www.bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/Chauffage - we compute the nation average co2 emission by normalizing and summing the average emission of each housing from:

- **Average Emission Factor** - kWh/(m².year)
- **Average Housing Surfaces** - m²
- **Average Proportion of each energy in heating** - % (equally divided between "new" and "old" housing and grouped by housing type).
- **Proportion of Apartments & Houses in the study** - %

### CITEPA - CCO2

Here, the average is a simple ratio "totalEmission / #inhabitants".

SECTEN data from CITEPA reports a total of 43.7 millions tons of CO2 for residential building use and domestic activities in 2020.

This figure does not take into account the use of our tertiary buildings, i.e. 26.2 million tons of CO2 in 2020, in order to compare only the emissions from our homes.

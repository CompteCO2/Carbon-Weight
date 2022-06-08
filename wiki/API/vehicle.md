[@cco2/carbon-weight](../README.md) / [Modules](../modules.md) / [vehicle](../modules/vehicle.md) / default

# Class: default

[vehicle](../modules/vehicle.md).default

## Table of contents

### Constructors

- [constructor](vehicle.default.md#constructor)

### Properties

- [avgEmission](vehicle.default.md#avgemission)
- [data](vehicle.default.md#data)
- [dataSet](vehicle.default.md#dataset)

### Methods

- [getData](vehicle.default.md#getdata)
- [getDataset](vehicle.default.md#getdataset)
- [getEmissionAvg](vehicle.default.md#getemissionavg)
- [getEmissionConsumed](vehicle.default.md#getemissionconsumed)
- [getEmissionEstimated](vehicle.default.md#getemissionestimated)
- [getEmissionMileage](vehicle.default.md#getemissionmileage)
- [build](vehicle.default.md#build)

## Constructors

### constructor

• **new default**(`dataSet`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSet` | `DataE` |
| `data` | `DataI` |

#### Defined in

[vehicle/index.ts:19](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L19)

## Properties

### avgEmission

• `Private` **avgEmission**: `undefined` \| `number`

#### Defined in

[vehicle/index.ts:15](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L15)

___

### data

• `Private` **data**: `DataI`

#### Defined in

[vehicle/index.ts:16](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L16)

___

### dataSet

• `Private` **dataSet**: `DataE`

#### Defined in

[vehicle/index.ts:17](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L17)

## Methods

### getData

▸ **getData**(): `DataI`

Return the current data constants loaded

#### Returns

`DataI`

constant data loaded

#### Defined in

[vehicle/index.ts:45](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L45)

___

### getDataset

▸ **getDataset**(): `DataE`

Return the inner data set name

#### Returns

`DataE`

constant data loaded

#### Defined in

[vehicle/index.ts:52](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L52)

___

### getEmissionAvg

▸ **getEmissionAvg**(): `number`

Return the average co2 estimation from PC (private vehicle) in kgCO2e/year.

**`todo`** review, source and explain differents computation

**`description`**
It is a simple proportion taking the total private vehicle emission estimated from private vehicle
divided by the number of vehicle.

emission = emissions / #vehicles
[kgCO2e/year/vehicle] = [kgCO2e/kg/year] / [vehicle]

#### Returns

`number`

The estimated co2 emission in kgCO2e/year (per vehicle)

#### Defined in

[vehicle/index.ts:117](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L117)

___

### getEmissionConsumed

▸ **getEmissionConsumed**(`consumption`): `number`

Compute a CO2 emission from the consumption in kgCO2e/year using
fuel emission factors in kgCO2e/litre

**`description`**
Depending on the availibity of the consumption parameter, it whether use the following:

Using consumption
- Emission = Consumption * Factor
- [kgCO2e/year] = [L/year] * [kgCO2e/L]

Using Mileage & MPG
Emission = MPG * (Mileage / 100) * Factor
[kgCO2e/year] = [L/100Km] * [100Km/year] * [kgCO2e/L]

Although this computation method is the most precise, it relies on a parameter
that could be quite uncertain (depends on personal measure) or
even unknown. Indeed, the exact MPG (or real fuel consumption)
for the period of the annual mileage could be difficult to get with precision
if not measured properly.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `consumption` | `ConsumptionT` | the measured consumption in { L } or { Mileage & MPG } |

#### Returns

`number`

  the emission in kgCO2/year
  -1 in case of error (missing information)

#### Defined in

[vehicle/index.ts:82](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L82)

___

### getEmissionEstimated

▸ **getEmissionEstimated**(`model`): `number`

Compute CO2 emission estimation from driving a type of vehicle in kgCO2/year

**`description`**
Allows you to get a fairly good CO2e emission estimation from only
the vehicle type and your annual mileage.

The constant factor unit is **gCO2e/km** and are statistic averages depending
on the three following parameters:
- Vehicle Type: Light utility, Standard, Two Wheeler.
- Fuel Type: CNG, Diesel, Electric, LPG, Petrol.
- Year of manufacture: From 1990 To 2018.

So, the formula is kinda the same as the one used in "Registration Card".
The change is on the emission factors that come from statistical source and
already include vehicle aging.

Emission = Mileage * Factor / 1000
[kgCO2e/year] = [Km/year] * [kgCO2e/km]

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `ModelT` |

#### Returns

`number`

  the estimated emission in kgCO2e/year
  -1 in case of error (cannot find the data for this type of vehicle)

#### Defined in

[vehicle/index.ts:197](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L197)

___

### getEmissionMileage

▸ **getEmissionMileage**(`vehicle`): `number`

Compute CO2 emission from driving a specific vehicle in kgCO2/year

**`todo`** review, source and explain the yearFactor constant computation

**`description`**
The vehicle carbon emission is computed using the original emission/consumption factor.
However, this value is evolving along the time as the vehicle get older and
depends on factors such as driving habits and maintains mechanics.
We thus use an extra factor that takes into account aging.

The computation could use the factor emission expressed in **gCO2e/km**
which can be found on the registration card - V.7 field (EU):
- Emission = Mileage * Factor * YearCorrection
- [kgCO2e/year] = [Km/year] * [gCO2e/km] / 1000 * Cste

Or it could either use the fuel consumption factor expressed in "L/100Km".
We find back the formula of the first method using the fuel consumption factor
coerced with the extra aging factor:
- Emission = MPG * (Mileage / 100) * FuelEmissionFactor * YearCorrection
- [kgCO2e/year] = [L/100Km] * [100Km/year] * [kgCO2e/L] * Cste

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vehicle` | `VehicleT` | the vehicle measured factors in ({ gCO2e/km } or { L/100Km + FuelE }) and the Mileage |

#### Returns

`number`

  the estimated emission in kgCO2/year
  -1 in case of error (missing information)

#### Defined in

[vehicle/index.ts:152](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L152)

___

### build

▸ `Static` **build**(`dataset`): [`default`](vehicle.default.md)

Create a calculator instance from dataset

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataset` | `DataE` |

#### Returns

[`default`](vehicle.default.md)

new House calculator - Throw error if dataset not loaded.

#### Defined in

[vehicle/index.ts:31](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/vehicle/index.ts#L31)

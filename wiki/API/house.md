[@cco2/carbon-weight](../README.md) / [Modules](../modules.md) / [house](../modules/house.md) / default

# Class: default

[house](../modules/house.md).default

## Table of contents

### Constructors

- [constructor](house.default.md#constructor)

### Properties

- [avgEmission](house.default.md#avgemission)
- [data](house.default.md#data)
- [dataSet](house.default.md#dataset)

### Methods

- [getData](house.default.md#getdata)
- [getDataset](house.default.md#getdataset)
- [getEmissionAvg](house.default.md#getemissionavg)
- [getEmissionConsumed](house.default.md#getemissionconsumed)
- [getEmissionEstimated](house.default.md#getemissionestimated)
- [build](house.default.md#build)

## Constructors

### constructor

• **new default**(`dataSet`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSet` | `DataE` |
| `data` | `DataI` |

#### Defined in

[house/index.ts:19](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L19)

## Properties

### avgEmission

• `Private` **avgEmission**: `undefined` \| `number`

#### Defined in

[house/index.ts:15](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L15)

___

### data

• `Private` **data**: `DataI`

#### Defined in

[house/index.ts:16](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L16)

___

### dataSet

• `Private` **dataSet**: `DataE`

#### Defined in

[house/index.ts:17](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L17)

## Methods

### getData

▸ **getData**(): `DataI`

Return the current data constants loaded

#### Returns

`DataI`

constant data loaded

#### Defined in

[house/index.ts:45](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L45)

___

### getDataset

▸ **getDataset**(): `DataE`

Return the inner data set name

#### Returns

`DataE`

constant data loaded

#### Defined in

[house/index.ts:52](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L52)

___

### getEmissionAvg

▸ **getEmissionAvg**(): `number`

Return the average co2 estimation from housing heating in kgCO2e/year.

**`warning`**
Implementation is defined as a lazy singleton that compute only once.

#### Returns

`number`

The estimated co2 emission in kgCO2e/year

#### Defined in

[house/index.ts:132](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L132)

___

### getEmissionConsumed

▸ **getEmissionConsumed**(`consumptions`, `heater`): `number`

Compute the co2 emission consumed in kgCO2e from a list of consumed ressources
Negative values are allowed (this could be due to energy provider correction)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `consumptions` | `number`[] | list consumptions made in unit depending on heater type |
| `heater` | `HeaterE` | type of heater in use |

#### Returns

`number`

the real emission consummed from bills consumptions in kgCO2e
-1 in case of error (invalid energy factor from heater)

#### Defined in

[house/index.ts:65](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L65)

___

### getEmissionEstimated

▸ **getEmissionEstimated**(`house`): `number`

Compute the CO2 emissions estimation for a house in kgCO2e/year

**`description`**
We compute here the CO2e emission estimation from heating housing with this simple computation:
- Emission = Surface * ConsumptionFactor * CombustibleFactor * ClimateCoef
- [kgCO2e/year] = [m²] * [kWh/(m².year)] * [kgCO2e/kW] * Cste

If the region or region correction factor is not found - ClimateCoef = 1 is applied.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `house` | `HouseT` | the house |

#### Returns

`number`

  the estimated house emissions in kgCO2e/year
  -1 in case of error

#### Defined in

[house/index.ts:93](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L93)

___

### build

▸ `Static` **build**(`dataset`): [`default`](house.default.md)

Create a calculator instance from dataset

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataset` | `DataE` |

#### Returns

[`default`](house.default.md)

new House calculator - Throw error if dataset not loaded.

#### Defined in

[house/index.ts:31](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/house/index.ts#L31)

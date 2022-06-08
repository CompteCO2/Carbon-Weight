[@cco2/carbon-weight](../README.md) / [Modules](../modules.md) / [food](../modules/food.md) / default

# Class: default

[food](../modules/food.md).default

## Table of contents

### Constructors

- [constructor](food.default.md#constructor)

### Properties

- [avgEmission](food.default.md#avgemission)
- [data](food.default.md#data)
- [dataSet](food.default.md#dataset)

### Methods

- [getData](food.default.md#getdata)
- [getDataset](food.default.md#getdataset)
- [getEmissionAvg](food.default.md#getemissionavg)
- [getEmissionEstimated](food.default.md#getemissionestimated)
- [build](food.default.md#build)

## Constructors

### constructor

• **new default**(`dataSet`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSet` | `ADEME_2022` |
| `data` | `DataI` |

#### Defined in

[food/index.ts:56](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/food/index.ts#L56)

## Properties

### avgEmission

• `Private` **avgEmission**: `undefined` \| `ComsumptionR`

#### Defined in

[food/index.ts:52](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/food/index.ts#L52)

___

### data

• `Private` **data**: `DataI`

#### Defined in

[food/index.ts:53](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/food/index.ts#L53)

___

### dataSet

• `Private` **dataSet**: `ADEME_2022`

#### Defined in

[food/index.ts:54](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/food/index.ts#L54)

## Methods

### getData

▸ **getData**(): `DataI`

Return the current data constants loaded

#### Returns

`DataI`

constant data loaded

#### Defined in

[food/index.ts:82](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/food/index.ts#L82)

___

### getDataset

▸ **getDataset**(): `ADEME_2022`

Return the inner data set name

#### Returns

`ADEME_2022`

constant data loaded

#### Defined in

[food/index.ts:89](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/food/index.ts#L89)

___

### getEmissionAvg

▸ **getEmissionAvg**(): `ComsumptionR`

Return the average co2 estimation from eating habits in kgCO2e/year.

**`description`**
It takes the average adult consumption of different foods expressed in g/day from trusted source.
The formulat we use is as simple as (where frequency is given by week) :

emission = SUM[(dailyAvg * 365) / 1000 * carbonEmissionFactor]
[kgCO2e/year] = (365[g/day]) / 1000 * [kgCO2e/kg]

waste = SUM[(daily * 365) / 1000 * wasteRatioFactor * wasteEmissionFactor]
[kgCO2e/year] = (365[g/day]) / 1000 * [kgPackaging/kg] * [kgCO2e/kgPackaging]

**`warning`**
Implementation is defined as a lazy singleton that compute only once.

#### Returns

`ComsumptionR`

The estimated co2 emission in kgCO2e/year

#### Defined in

[food/index.ts:151](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/food/index.ts#L151)

___

### getEmissionEstimated

▸ **getEmissionEstimated**(`consumption`): `ComsumptionR`

Compute a rough co2 estimation from eating habits in kgCO2e/year

**`description`**
Your food carbon footprint is by design a best estimate.
This approximation still allows you to get an order of magnitude and act.

The formulat we use is as simple as (where frequency is given by week) :

emission = SUM[(weaklyConsumed * averageWeight * 52) / 1000 * carbonEmissionFactor]
[kgCO2e/year] = (52[g/week]) / 1000 * [kgCO2e/kg]

waste = SUM[(weaklyConsumed * averageWeight * 52) / 1000 * wasteRatioFactor * wasteEmissionFactor]
[kgCO2e/year] = (52[g/week]) / 1000 * [kgPackaging/kg] * [kgCO2e/kgPackaging]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `consumption` | `ConsumptionT` | consumed products in meal/week |

#### Returns

`ComsumptionR`

  the estimated emission emissions in kgCO2e/year
  { -1, -1 } in case of error

#### Defined in

[food/index.ts:112](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/food/index.ts#L112)

___

### build

▸ `Static` **build**(`dataset`): [`default`](food.default.md)

Create a calculator instance from dataset

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataset` | `ADEME_2022` |

#### Returns

[`default`](food.default.md)

new House calculator - Throw error if dataset not loaded.

#### Defined in

[food/index.ts:68](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/food/index.ts#L68)

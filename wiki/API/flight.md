[@cco2/carbon-weight](../README.md) / [Modules](../modules.md) / [flight](../modules/flight.md) / default

# Class: default

[flight](../modules/flight.md).default

## Table of contents

### Constructors

- [constructor](flight.default.md#constructor)

### Properties

- [avgEmission](flight.default.md#avgemission)
- [data](flight.default.md#data)
- [dataSet](flight.default.md#dataset)

### Methods

- [getData](flight.default.md#getdata)
- [getDataset](flight.default.md#getdataset)
- [getEmissionAvg](flight.default.md#getemissionavg)
- [getEmissionEstimated](flight.default.md#getemissionestimated)
- [getHaulFactor](flight.default.md#gethaulfactor)
- [build](flight.default.md#build)

## Constructors

### constructor

• **new default**(`dataSet`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSet` | `ADEME_2022` |
| `data` | `DataI` |

#### Defined in

[flight/index.ts:71](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L71)

## Properties

### avgEmission

• `Private` **avgEmission**: `undefined` \| `number`

#### Defined in

[flight/index.ts:67](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L67)

___

### data

• `Private` **data**: `DataI`

#### Defined in

[flight/index.ts:68](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L68)

___

### dataSet

• `Private` **dataSet**: `ADEME_2022`

#### Defined in

[flight/index.ts:69](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L69)

## Methods

### getData

▸ **getData**(): `DataI`

Return the current data constants loaded

#### Returns

`DataI`

constant data loaded

#### Defined in

[flight/index.ts:97](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L97)

___

### getDataset

▸ **getDataset**(): `ADEME_2022`

Return the inner data set name

#### Returns

`ADEME_2022`

constant data loaded

#### Defined in

[flight/index.ts:104](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L104)

___

### getEmissionAvg

▸ **getEmissionAvg**(): `number`

Return the average co2 estimation in peq.kgCO2e/year.

**`description`**
This constant is the ratio emission(2019)/#passengers(2019) from
the Directorate General of Civil Aviation (DGAC).

#### Returns

`number`

The average co2 emission in peq.kgCO2e/year.

#### Defined in

[flight/index.ts:178](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L178)

___

### getEmissionEstimated

▸ **getEmissionEstimated**(`travel`, `nbFlights`): `number`

Compute the co2 emissions from air travels in kgCO2e/year

**`description`**
Firstly the distances are calculated between the airports selected, then we
use the factor emission expressed in kgCO2e/peq.km (peq = person equivalent) to
get our first estimation per equivalent person:

- Emission = Distance * Factor
- [kgCO2e/year] = [Km/year] * [kgCO2e/km]

Finally, we add a factor depending on the class of the seat taken
(economy class, business class, first class).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `travel` | `FlightI` | - |
| `nbFlights` | `number` | the number of flight made a year. |

#### Returns

`number`

  the estimated flight emissions for the passengers in kgCO2e
  -1 in case of error (e.g. missing IATA airport)

#### Defined in

[flight/index.ts:142](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L142)

___

### getHaulFactor

▸ **getHaulFactor**(`distance`): `number`

Retrieve the emission factor from the flight distance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `distance` | `number` | distance of the flight in Km |

#### Returns

`number`

emission factor in kgCO2e/peq.km

#### Defined in

[flight/index.ts:113](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L113)

___

### build

▸ `Static` **build**(`dataset`): [`default`](flight.default.md)

Create a calculator instance from dataset

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataset` | `ADEME_2022` |

#### Returns

[`default`](flight.default.md)

new House calculator - Throw error if dataset not loaded.

#### Defined in

[flight/index.ts:83](https://github.com/CompteCO2/Carbon-Weight/blob/616756c/src/flight/index.ts#L83)

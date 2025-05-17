# Timezone Groups

![npm](https://img.shields.io/npm/v/timezone-groups)

`timezone-groups` is a versatile NPM package that allows you to effortlessly generate timezone groups in both Node.js and browser environments. It supports multiple date libraries, including the option to create and use custom ones.

## Features

- Compatible with Node.js and the latest two browser versions.
- Supports various date libraries for generating groups, including the ability to use custom ones.

## Installation

Install the package via NPM using the following command:

```bash
npm install timezone-groups
```

## Usage

### `groupByOffset`

```javascript
import { groupByOffset } from "timezone-groups/groupByOffset";
import { DateEngine } from "timezone-groups/groupByOffset/strategy/native";

const timeZoneGroups = await groupByOffset({
  startDate, // The start reference date to generate the groups (defaults to now).
  groupDateRange, // The number of days to consider for the DST groupings (defaults to 365).
  dateEngine: new DateEngine(), // The date engine instance used to generate groups. You can use the `createDateEngine` utility to create an engine from any of the supported engine values. Alternatively, a custom date engine instance used to generate groups.
});

console.log(timeZoneGroups);

// Output:
// [
//   {
//     "labelIdx": [0, ..., 46],
//     "tzs": ["America/Anguilla", ...,  "America/Tortola"]
//   },
// ...
// ]
```

### `groupByName`

```javascript
import { groupByName } from "timezone-groups/groupByName";

const timeZoneGroups = await groupByName();

console.log(timeZoneGroups);

// Output:
// [
//   {
//     "label": "Africa/Abidjan",
//   },
//   {
//     "label": "Africa/Accra",
//   },
// ...
// ]
```

### `groupByRegion`

```javascript
import { groupByRegion } from "timezone-groups/groupByRegion";

const timeZoneGroups = await groupByRegion();

console.log(timeZoneGroups);

// Output:
// [
//   {
//     "label": "Africa",
//     "tzs": ["Africa/Abidjan", ...,  "Africa/Windhoek"]
//   },
//   {
//     "label": "America",
//     "tzs": ["America/Adak", ...,  "America/Yakutat"]
//   },
// ...
// ]
```

## Notes

- IANA time zones are generated via `Intl.supportedValuesOf("timeZone")`.
- Label indices can be used to provide localized labels.
- Based on https://github.com/neogermi/timezone-grouping/ (many thanks to [@neogermi](https://github.com/neogermi)).

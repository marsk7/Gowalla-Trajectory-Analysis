import {FilterType} from '../constants.js';
import {FilterInterval, StringSearchOptions} from '../types.js';
import {makeIntervalComplete} from '../utils/makeIntervalComplete.js';

export type FilterFunction = (
  filterValues: unknown[],
  featureValue: unknown,
  params?: Record<string, unknown>
) => boolean;

export const filterFunctions: Record<FilterType, FilterFunction> = {
  [FilterType.IN]: filterIn,
  [FilterType.BETWEEN]: filterBetween,
  [FilterType.TIME]: filterTime,
  [FilterType.CLOSED_OPEN]: filterClosedOpen,
  [FilterType.STRING_SEARCH]: filterStringSearch,
};

function filterIn(filterValues: unknown[], featureValue: unknown): boolean {
  return filterValues.includes(featureValue);
}

// FilterTypes.BETWEEN
function filterBetween(
  filterValues: unknown[],
  featureValue: unknown
): boolean {
  const checkRange = (range: [number, number]) => {
    const [lowerBound, upperBound] = range;
    return (
      (featureValue as number) >= lowerBound &&
      (featureValue as number) <= upperBound
    );
  };

  return makeIntervalComplete(filterValues as FilterInterval[]).some(
    checkRange
  );
}

function filterTime(filterValues: unknown[], featureValue: unknown) {
  const featureValueAsTimestamp = new Date(featureValue as number).getTime();
  if (isFinite(featureValueAsTimestamp)) {
    return filterBetween(filterValues, featureValueAsTimestamp);
  } else {
    throw new Error(`Column used to filter by time isn't well formatted.`);
  }
}

// FilterTypes.CLOSED_OPEN
function filterClosedOpen(
  filterValues: unknown[],
  featureValue: unknown
): boolean {
  const checkRange = (range: [number, number]) => {
    const [lowerBound, upperBound] = range;
    return (
      (featureValue as number) >= lowerBound &&
      (featureValue as number) < upperBound
    );
  };

  return makeIntervalComplete(filterValues as [number, number][]).some(
    checkRange
  );
}

// FilterTypes.STRING_SEARCH
function filterStringSearch(
  filterValues: unknown[],
  featureValue: unknown,
  params: StringSearchOptions = {}
): boolean {
  const normalizedFeatureValue = normalize(featureValue, params);
  const stringRegExp = params.useRegExp
    ? filterValues
    : filterValues.map((filterValue) => {
        let stringRegExp = escapeRegExp(normalize(filterValue, params));

        if (params.mustStart) stringRegExp = `^${stringRegExp}`;
        if (params.mustEnd) stringRegExp = `${stringRegExp}$`;

        return stringRegExp;
      });

  const regex = new RegExp(
    stringRegExp.join('|'),
    params.caseSensitive ? 'g' : 'gi'
  );
  return !!normalizedFeatureValue.match(regex);
}

// Aux
const specialCharRegExp = /[.*+?^${}()|[\]\\]/g;
const normalizeRegExp = /\p{Diacritic}/gu;

function escapeRegExp(value: string) {
  return value.replace(specialCharRegExp, '\\$&');
}

function normalize(data: unknown, params: StringSearchOptions) {
  let normalizedData = String(data);
  if (!params.keepSpecialCharacters)
    normalizedData = normalizedData
      .normalize('NFD')
      .replace(normalizeRegExp, '');

  return normalizedData;
}

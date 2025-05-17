import {AggregationType} from '../types.js';
import {FeatureData} from '../types-internal.js';

/** @privateRemarks Source: @carto/react-core */
export type AggregationFunction = (
  values: unknown[] | FeatureData[],
  keys?: string[] | string,
  joinOperation?: AggregationType
) => number;

/** @privateRemarks Source: @carto/react-core */
export const aggregationFunctions: Record<
  Exclude<AggregationType, 'custom'>,
  AggregationFunction
> = {
  count: (values) => values.length,
  min: (...args) => applyAggregationFunction(min, ...args),
  max: (...args) => applyAggregationFunction(max, ...args),
  sum: (...args) => applyAggregationFunction(sum, ...args),
  avg: (...args) => applyAggregationFunction(avg, ...args),
};

/** @privateRemarks Source: @carto/react-core */
export function aggregate(
  feature: FeatureData,
  keys?: string[],
  operation?: AggregationType
): unknown {
  if (!keys?.length) {
    throw new Error('Cannot aggregate a feature without having keys');
  } else if (keys.length === 1) {
    const value = feature[keys[0]];
    return isPotentiallyValidNumber(value) ? Number(value) : value;
  }

  const aggregationFn =
    aggregationFunctions[operation as Exclude<AggregationType, 'custom'>];

  if (!aggregationFn) {
    throw new Error(`${operation} isn't a valid aggregation function`);
  }

  return aggregationFn(
    keys.map((column) => {
      const value = feature[column];
      return isPotentiallyValidNumber(value) ? Number(value) : value;
    })
  );
}

/*
 * Forced casting to Number (just of non empty strings) allows to work-around
 * some specific situations, where a big numeric field is transformed into a string when generating the tileset(eg.PG)
 */
function isPotentiallyValidNumber(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

const applyAggregationFunction = (
  aggFn: AggregationFunction,
  values: unknown[] | FeatureData[],
  keys?: string[] | string,
  operation?: AggregationType
) => {
  const normalizedKeys = normalizeKeys(keys);
  const elements =
    (normalizedKeys?.length || 0) <= 1
      ? filterFalsyElements(values as unknown[], normalizedKeys || [])
      : values;
  return aggFn(elements, keys, operation);
};

function filterFalsyElements(
  values: unknown[] | FeatureData[],
  keys: string[]
) {
  const filterFn = (value: unknown) => value !== null && value !== undefined;

  if (!keys?.length) {
    return values.filter(filterFn);
  }

  return (values as FeatureData[]).filter((v) => filterFn(v[keys[0]]));
}

// Aggregation functions
function avg(
  values: unknown[] | FeatureData[],
  keys?: string[] | string,
  joinOperation?: AggregationType
): number {
  return sum(values, keys, joinOperation) / (values.length || 1);
}

function sum(
  values: unknown[] | FeatureData[],
  keys?: string[] | string,
  joinOperation?: AggregationType
): number {
  const normalizedKeys = normalizeKeys(keys);

  if (normalizedKeys) {
    return (values as FeatureData[]).reduce(
      (a, b) => a + (aggregate(b, normalizedKeys, joinOperation) as number),
      0
    );
  }

  return values.reduce((a: number, b: unknown) => a + (b as number), 0);
}

function min(
  values: unknown[] | FeatureData[],
  keys?: string[] | string,
  joinOperation?: AggregationType
): number {
  const normalizedKeys = normalizeKeys(keys);
  if (normalizedKeys) {
    return (values as FeatureData[]).reduce(
      (a, b) =>
        Math.min(a, aggregate(b, normalizedKeys, joinOperation) as number),
      Infinity
    );
  }
  return Math.min(...(values as number[]));
}

function max(
  values: unknown[] | FeatureData[],
  keys?: string[] | string,
  joinOperation?: AggregationType
): number {
  const normalizedKeys = normalizeKeys(keys);
  if (normalizedKeys) {
    return (values as FeatureData[]).reduce(
      (a, b) =>
        Math.max(a, aggregate(b, normalizedKeys, joinOperation) as number),
      -Infinity
    );
  }
  return Math.max(...(values as number[]));
}

// Aux

// Keys can come as a string (one column) or a strings array (multiple column)
// Use always an array to make the code easier
function normalizeKeys(keys: unknown): string[] | undefined {
  return Array.isArray(keys)
    ? keys
    : typeof keys === 'string'
      ? [keys]
      : undefined;
}

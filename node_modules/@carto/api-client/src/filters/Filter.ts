import {filterFunctions} from './FilterTypes.js';
import {Filter, FilterLogicalOperator, Filters} from '../types.js';
import {Feature} from 'geojson';
import {FilterType} from '../constants.js';
import {FeatureData} from '../types-internal.js';
import {BinaryFeature} from '@loaders.gl/schema';

const LOGICAL_OPERATOR_METHODS: Record<
  FilterLogicalOperator,
  'every' | 'some'
> = {
  and: 'every',
  or: 'some',
};

function passesFilter(
  columns: string[],
  filters: Filters,
  feature: FeatureData,
  filtersLogicalOperator: FilterLogicalOperator
): boolean {
  const method = LOGICAL_OPERATOR_METHODS[filtersLogicalOperator];
  return columns[method]((column) => {
    const columnFilters = filters[column];
    const columnFilterTypes = Object.keys(columnFilters) as FilterType[];

    if (!feature || feature[column] === null || feature[column] === undefined) {
      return false;
    }

    return columnFilterTypes.every((filter) => {
      const filterFunction = filterFunctions[filter];

      if (!filterFunction) {
        throw new Error(`"${filter}" filter is not implemented.`);
      }

      return filterFunction(
        columnFilters[filter]!.values,
        feature[column],
        (columnFilters[filter] as Filter[FilterType.STRING_SEARCH])!.params
      );
    });
  });
}

/**
 * @internal
 * @privateRemarks Exported for use in @deck.gl/carto's getDataFilterExtensionProps.
 */
export function _buildFeatureFilter({
  filters = {},
  type = 'boolean',
  filtersLogicalOperator = 'and',
}: {
  filters?: Filters;
  type?: 'number' | 'boolean';
  filtersLogicalOperator?: FilterLogicalOperator;
}) {
  const columns = Object.keys(filters);

  if (!columns.length) {
    return () => (type === 'number' ? 1 : true);
  }

  return (feature: Feature | FeatureData) => {
    const f = feature.properties || feature;
    const featurePassesFilter = passesFilter(
      columns,
      filters,
      f as FeatureData,
      filtersLogicalOperator
    );

    return type === 'number'
      ? Number(featurePassesFilter)
      : featurePassesFilter;
  };
}

/**
 * Apply certain filters to a collection of features.
 * @internal
 */
export function applyFilters(
  features: FeatureData[],
  filters: Filters,
  filtersLogicalOperator: FilterLogicalOperator
) {
  return Object.keys(filters).length
    ? features.filter(_buildFeatureFilter({filters, filtersLogicalOperator}))
    : features;
}

/**
 * Binary.
 * @internal
 */
export function buildBinaryFeatureFilter({filters = {}}: {filters: Filters}) {
  const columns = Object.keys(filters);

  if (!columns.length) {
    return () => 1;
  }

  return (featureIdIdx: number, binaryData: BinaryFeature) =>
    passesFilterUsingBinary(columns, filters, featureIdIdx, binaryData);
}

function getValueFromNumericProps(
  featureIdIdx: number,
  binaryData: BinaryFeature,
  {column}: {column: string}
) {
  return binaryData.numericProps?.[column]?.value[featureIdIdx];
}

function getValueFromProperties(
  featureIdIdx: number,
  binaryData: BinaryFeature,
  {column}: {column: string}
) {
  const propertyIdx = binaryData.featureIds.value[featureIdIdx];
  return (binaryData.properties[propertyIdx] as Record<string, unknown>)?.[
    column
  ];
}

const GET_VALUE_BY_BINARY_PROP = {
  properties: getValueFromProperties,
  numericProps: getValueFromNumericProps,
};

function getBinaryPropertyByFilterValues(filterValues: unknown[]) {
  return typeof filterValues.flat()[0] === 'string'
    ? 'properties'
    : 'numericProps';
}

function getFeatureValue(
  featureIdIdx: number,
  binaryData: any,
  filter: {type: FilterType; column: string; values: unknown[]}
) {
  const {column, values} = filter;
  const binaryProp = getBinaryPropertyByFilterValues(values);
  const getFeatureValueFn = GET_VALUE_BY_BINARY_PROP[binaryProp];
  return getFeatureValueFn(featureIdIdx, binaryData, {column});
}

function passesFilterUsingBinary(
  columns: string[],
  filters: Filters,
  featureIdIdx: number,
  binaryData: BinaryFeature
) {
  return columns.every((column) => {
    const columnFilters = filters[column];

    return Object.entries(columnFilters).every(([type, {values}]) => {
      const filterFn = filterFunctions[type as FilterType];
      if (!filterFn) {
        throw new Error(`"${type}" filter is not implemented.`);
      }

      if (!values) return 0;

      const featureValue = getFeatureValue(featureIdIdx, binaryData, {
        type: type as FilterType,
        column,
        values,
      });

      if (featureValue === undefined || featureValue === null) return 0;

      return filterFn(values, featureValue);
    });
  });
}

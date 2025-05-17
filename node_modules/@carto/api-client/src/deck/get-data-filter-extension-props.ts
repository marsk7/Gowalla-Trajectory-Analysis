import {Feature} from 'geojson';
import {FilterLogicalOperator, Filters} from '../types.js';
import {FilterType} from '../constants.js';
import {_buildFeatureFilter} from '../filters/index.js';
import {FeatureData} from '../types-internal.js';

type TimeFilter = Filters['string'][FilterType.TIME] & {
  params?: {offsetBy?: number};
};

/**
 * deck.gl's DataFilterExtension supports GPU filtering with 1–4 values. We
 * allocate filters[0] to generic filters and filters[1] to time filters.
 *
 * getFilterValue() _must_ return an array of the same size as the filterSize
 * used to initialize the DataFilterExtension. We document that users must use
 * filterSize=4 for compatibility with @link {getDataFilterExtensionProps}.
 */
const DEFAULT_FILTER_SIZE = 4;

/** @experimental Prefer type definition from deck.gl. */
export type _DataFilterExtensionProps = {
  filterRange: number[][];
  updateTriggers: Record<string, string>;
  getFilterValue: (feature: Feature | FeatureData) => number[];
};

/**
 * Creates props for DataFilterExtension, from `@deck.gl/extensions`, given
 * a set of filters. Requires that DataFilterExtension is initialized with
 * filterSize=4, where the CARTO filters will occupy the first two slots.
 *
 * @example To create a deck.gl layer with GPU data filtering:
 * ```typescript
 * import {DataFilterExtension} from '@deck.gl/extensions';
 * import {VectorTileLayer} from '@deck.gl/layers';
 * import {getDataFilterExtensionProps} from '@carto/api-client';
 *
 * const layer = new VectorTileLayer({
 *  data: data,
 *  extensions: [new DataFilterExtension({filterSize: 4})],
 *  ...getDataFilterExtensionProps(filters),
 * });
 * ```
 */
export function getDataFilterExtensionProps(
  filters: Filters,
  filtersLogicalOperator?: FilterLogicalOperator
): _DataFilterExtensionProps {
  const {filtersWithoutTimeType, timeColumn, timeFilter} =
    getFiltersByType(filters);
  return {
    filterRange: getFilterRange(timeFilter, DEFAULT_FILTER_SIZE),
    updateTriggers: getUpdateTriggers(
      filtersWithoutTimeType,
      timeColumn,
      timeFilter
    ),
    getFilterValue: getFilterValue(
      filtersWithoutTimeType,
      timeColumn,
      timeFilter,
      DEFAULT_FILTER_SIZE,
      filtersLogicalOperator
    ),
  };
}

/** @internal */
function getFiltersByType(filters: Filters) {
  const filtersWithoutTimeType: Filters = {};

  let timeColumn: string | null = null;
  let timeFilter: TimeFilter | null = null;

  for (const [column, columnData] of Object.entries(filters)) {
    for (const [type, typeData] of Object.entries(columnData) as [
      FilterType,
      unknown,
    ][]) {
      if (type === FilterType.TIME) {
        timeColumn = column;
        timeFilter = typeData as TimeFilter;
      } else {
        filtersWithoutTimeType[column] = {[type]: typeData};
      }
    }
  }

  return {
    filtersWithoutTimeType,
    timeColumn,
    timeFilter,
  };
}

/** @internal */
function getFilterRange(
  timeFilter: TimeFilter | null,
  filterSize: number
): number[][] {
  const result = Array(filterSize).fill([0, 0]);
  // According to getFilterValue all filters are resolved as 0 or 1 in the first position of the array
  // except the time filter value that is resolved with the real value of the feature in the second position of the array
  result[0] = [1, 1];
  if (timeFilter) {
    const offsetBy = timeFilter.params?.offsetBy || 0;
    result[1] = timeFilter.values[0].map((v) => v - offsetBy);
  }
  return result;
}

/** @internal */
function getUpdateTriggers(
  filtersWithoutTimeType: Filters,
  timeColumn: string | null,
  timeFilter: TimeFilter | null
) {
  const result: Record<string, object> = {...filtersWithoutTimeType};

  // We don't want to change the layer UpdateTriggers every time that the time filter changes
  // because this filter is changed by the time series widget during its animation
  // so we remove the time filter value from the `updateTriggers`
  if (timeColumn && timeFilter) {
    result[timeColumn] = {
      ...result[timeColumn],
      offsetBy: timeFilter.params?.offsetBy,
      [FilterType.TIME]: {}, // Allows working with other filters, without an impact on performance.
    };
  }
  return {
    getFilterValue: JSON.stringify(result),
  };
}

/** @internal */
function getFilterValue(
  filtersWithoutTimeType: Filters,
  timeColumn: string | null,
  timeFilter: TimeFilter | null,
  filterSize: number,
  filtersLogicalOperator?: FilterLogicalOperator
) {
  const result = Array(filterSize).fill(0);
  const featureFilter = _buildFeatureFilter({
    filters: filtersWithoutTimeType,
    type: 'number',
    filtersLogicalOperator,
  });

  // We evaluate all filters except the time filter using _buildFeatureFilter function.
  // For the time filter, we return the value of the feature and we will change the getFilterRange result
  // every time this filter changes
  return (feature: Feature | FeatureData) => {
    result[0] = featureFilter(feature);

    if (timeColumn && timeFilter) {
      const offsetBy = timeFilter.params?.offsetBy || 0;
      const f = (feature.properties || feature) as Record<string, unknown>;
      result[1] = (f[timeColumn] as number) - offsetBy;
    }
    return result;
  };
}

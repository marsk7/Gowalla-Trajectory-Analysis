import {firstBy} from 'thenby';
import {SortDirection} from '../types.js';
import {FeatureData} from '../types-internal.js';

// TODO(cleanup): Could this be simplified?
type SortColumns = string | string[] | object[];

interface SortOptions {
  sortBy?: SortColumns;
  sortByDirection?: SortDirection;
  sortByColumnType?: 'number' | 'string' | 'date';
}

/**
 * Apply sort structure to a collection of features
 * @param features
 * @param [sortOptions]
 * @param [sortOptions.sortBy] - One or more columns to sort by
 * @param [sortOptions.sortByDirection] - Direction by the columns will be sorted
 * @param [sortOptions.sortByColumnType] - Column type
 * @internal
 * @privateRemarks Source: @carto/react-core
 */
export function applySorting(
  features: FeatureData[],
  {
    sortBy,
    sortByDirection = 'asc',
    sortByColumnType = 'string',
  }: SortOptions = {}
): FeatureData[] {
  // If sortBy is undefined, pass all features
  if (sortBy === undefined) {
    return features;
  }

  // sortOptions exists, but are bad formatted
  const isValidSortBy =
    (Array.isArray(sortBy) && sortBy.length) || // sortBy can be an array of columns
    typeof sortBy === 'string'; // or just one column

  if (!isValidSortBy) {
    throw new Error('Sorting options are bad formatted');
  }
  const sortFn = createSortFn({
    sortBy,
    sortByDirection,
    sortByColumnType: sortByColumnType || 'string',
  });
  return features.sort(sortFn);
}

// Aux
function createSortFn({
  sortBy,
  sortByDirection,
  sortByColumnType,
}: Required<SortOptions>) {
  const [firstSortOption, ...othersSortOptions] = normalizeSortByOptions({
    sortBy,
    sortByDirection,
    sortByColumnType,
  }) as Parameters<typeof firstBy>[];

  let sortFn = firstBy(...firstSortOption);
  for (const sortOptions of othersSortOptions) {
    sortFn = sortFn.thenBy(...sortOptions);
  }

  return sortFn;
}

function normalizeSortByOptions({
  sortBy,
  sortByDirection,
  sortByColumnType,
}: Required<SortOptions>) {
  const numberFormat = sortByColumnType === 'number' && {
    cmp: (a: number, b: number) => a - b,
  };
  if (!Array.isArray(sortBy)) {
    sortBy = [sortBy];
  }
  return sortBy.map((sortByEl) => {
    // sortByEl is 'column'
    if (typeof sortByEl === 'string') {
      return [sortByEl, {direction: sortByDirection, ...numberFormat}];
    }

    if (Array.isArray(sortByEl)) {
      // sortBy is ['column']
      if (sortByEl[1] === undefined) {
        return [sortByEl, {direction: sortByDirection, ...numberFormat}];
      }

      // sortBy is ['column', { ... }]
      if (typeof sortByEl[1] === 'object') {
        const othersSortOptions = numberFormat
          ? {...numberFormat, ...sortByEl[1]}
          : sortByEl[1];
        return [
          sortByEl[0],
          {direction: sortByDirection, ...othersSortOptions},
        ];
      }
    }
    return sortByEl;
  });
}

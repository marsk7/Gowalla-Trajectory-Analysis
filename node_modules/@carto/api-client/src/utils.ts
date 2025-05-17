import {Filter} from './types.js';
import {FilterType} from './constants.js';

const FILTER_TYPES = new Set(Object.values(FilterType));
const isFilterType = (type: string): type is FilterType =>
  FILTER_TYPES.has(type as FilterType);

/**
 * @privateRemarks Source: @carto/react-widgets
 * @internal
 */
export function getApplicableFilters(
  owner?: string,
  filters?: Record<string, Filter>
): Record<string, Filter> {
  if (!filters) return {};

  const applicableFilters: Record<string, Filter> = {};

  for (const column in filters) {
    for (const type in filters[column]) {
      if (!isFilterType(type)) continue;

      const filter = filters[column][type];
      const isApplicable = !owner || !filter?.owner || filter?.owner !== owner;
      if (filter && isApplicable) {
        applicableFilters[column] ||= {};
        (applicableFilters[column][type] as typeof filter) = filter;
      }
    }
  }

  return applicableFilters;
}

type Row<T> = Record<string, T> | Record<string, T>[] | T[] | T;

/**
 * Due to each data warehouse having its own behavior with columns,
 * we need to normalize them and transform every key to lowercase.
 *
 * @privateRemarks Source: @carto/react-widgets
 * @internal
 */
export function normalizeObjectKeys<T, R extends Row<T>>(el: R): R {
  if (Array.isArray(el)) {
    return el.map((value) => normalizeObjectKeys(value)) as R;
  } else if (typeof el !== 'object') {
    return el;
  }

  return Object.entries(el as Record<string, T>).reduce(
    (acc, [key, value]) => {
      acc[key.toLowerCase()] =
        typeof value === 'object' && value ? normalizeObjectKeys(value) : value;
      return acc;
    },
    {} as Record<string, T>
  ) as R;
}

/** @privateRemarks Source: @carto/react-core */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * @privateRemarks Source: @carto/react-core
 * @internal
 */
export class InvalidColumnError extends Error {
  protected static readonly NAME = 'InvalidColumnError';

  constructor(message: string) {
    super(`${InvalidColumnError.NAME}: ${message}`);
    this.name = InvalidColumnError.NAME;
  }

  static is(error: unknown) {
    return (
      error instanceof InvalidColumnError ||
      (error as Error).message?.includes(InvalidColumnError.NAME)
    );
  }
}

export function isEmptyObject(object: object): boolean {
  for (const _ in object) {
    return false;
  }
  return true;
}

/** @internal */
export const isObject: (x: unknown) => boolean = (x) =>
  x !== null && typeof x === 'object';

/** @internal */
export const isPureObject: (x: any) => boolean = (x) =>
  isObject(x) && x.constructor === {}.constructor;

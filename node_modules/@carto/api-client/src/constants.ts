/**
 * Defines a comparator used when matching a column's values against given filter values.
 *
 * Example:
 *
 * ```javascript
 * import { FilterType } from '@carto/api-client';
 * const filters = {
 *   column_name: { [FilterType.IN]: { values: ['a', 'b', 'c'] } }
 * };
 * ```
 *
 * @privateRemarks Source: @carto/react-api, @deck.gl/carto
 */
export enum FilterType {
  IN = 'in',
  /** [a, b] both are included. */
  BETWEEN = 'between',
  /** [a, b) a is included, b is not. */
  CLOSED_OPEN = 'closed_open',
  TIME = 'time',
  STRING_SEARCH = 'stringSearch',
}

/** @privateRemarks Source: @carto/constants */
export enum ApiVersion {
  V1 = 'v1',
  V2 = 'v2',
  V3 = 'v3',
}

/** @privateRemarks Source: @carto/constants, @deck.gl/carto */
export const DEFAULT_API_BASE_URL = 'https://gcp-us-east1.api.carto.com';

/** @privateRemarks Source: @carto/react-core */
export enum TileFormat {
  MVT = 'mvt',
  JSON = 'json',
  GEOJSON = 'geojson',
  BINARY = 'binary',
}

/** @privateRemarks Source: @carto/react-core */
export enum SpatialIndex {
  H3 = 'h3',
  S2 = 's2',
  QUADBIN = 'quadbin',
}

/** @privateRemarks Source: @carto/react-core */
export enum Provider {
  BIGQUERY = 'bigquery',
  REDSHIFT = 'redshift',
  POSTGRES = 'postgres',
  SNOWFLAKE = 'snowflake',
  DATABRICKS = 'databricks',
  DATABRICKS_REST = 'databricksRest',
}

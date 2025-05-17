/* eslint-disable @typescript-eslint/require-await */
import {TilesetSourceOptions} from '../sources/index.js';
import type {ModelSource} from '../models/index.js';
import {
  CategoryRequestOptions,
  CategoryResponse,
  FeaturesResponse,
  FormulaRequestOptions,
  FormulaResponse,
  HistogramRequestOptions,
  HistogramResponse,
  RangeRequestOptions,
  RangeResponse,
  ScatterRequestOptions,
  ScatterResponse,
  TableRequestOptions,
  TableResponse,
  TimeSeriesRequestOptions,
  TimeSeriesResponse,
} from './types.js';
import {InvalidColumnError, assert, getApplicableFilters} from '../utils.js';
import {TileFormat} from '../constants.js';
import {Filter, Filters, SpatialFilter, Tile} from '../types.js';
import {
  TileFeatureExtractOptions,
  applyFilters,
  geojsonFeatures,
  tileFeatures,
} from '../filters/index.js';
import {
  aggregationFunctions,
  applySorting,
  groupValuesByColumn,
  groupValuesByDateColumn,
  histogram,
  scatterPlot,
} from '../operations/index.js';
import {FeatureData} from '../types-internal.js';
import {FeatureCollection} from 'geojson';
import {SpatialDataType} from '../sources/types.js';
import {WidgetSource, WidgetSourceProps} from './widget-source.js';
import {booleanEqual} from '@turf/boolean-equal';

// TODO(cleanup): Parameter defaults in source functions and widget API calls are
// currently duplicated and possibly inconsistent. Consider consolidating and
// operating on Required<T> objects. See:
// https://github.com/CartoDB/carto-api-client/issues/39

export type WidgetTilesetSourceProps = WidgetSourceProps &
  Omit<TilesetSourceOptions, 'filters'> & {
    tileFormat: TileFormat;
    spatialDataType: SpatialDataType;
  };

export type WidgetTilesetSourceResult = {widgetSource: WidgetTilesetSource};

/**
 * Source for Widget API requests on a data source defined by a tileset.
 *
 * Generally not intended to be constructed directly. Instead, call
 * {@link vectorTilesetSource}, {@link h3TilesetSource}, or {@link quadbinTilesetSource},
 * which can be shared with map layers. Sources contain a `widgetSource`
 * property, for use by widget implementations.
 *
 * Example:
 *
 * ```javascript
 * import { vectorTilesetSource } from '@carto/api-client';
 *
 * const data = vectorTilesetSource({
 *   accessToken: '••••',
 *   connectionName: 'carto_dw',
 *   tableName: 'carto-demo-data.demo_rasters.my_tileset_source'
 * });
 *
 * const { widgetSource } = await data;
 * ```
 */
export class WidgetTilesetSource extends WidgetSource<WidgetTilesetSourceProps> {
  private _tiles: Tile[] = [];
  private _features: FeatureData[] = [];
  private _tileFeatureExtractOptions: TileFeatureExtractOptions = {};
  private _tileFeatureExtractPreviousInputs: {spatialFilter?: SpatialFilter} =
    {};

  protected override getModelSource(
    filters: Filters | undefined,
    filterOwner: string
  ): ModelSource {
    return {
      ...super._getModelSource(filters, filterOwner),
      type: 'tileset',
      data: this.props.tableName,
    };
  }

  /**
   * Loads features as a list of tiles (typically provided by deck.gl).
   * After tiles are loaded, {@link extractTileFeatures} must be called
   * before computing statistics on the tiles.
   */
  loadTiles(tiles: unknown[]) {
    this._tiles = tiles as Tile[];
    this._features.length = 0;
  }

  /** Configures options used to extract features from tiles. */
  setTileFeatureExtractOptions(options: TileFeatureExtractOptions) {
    this._tileFeatureExtractOptions = options;
    this._features.length = 0;
  }

  protected _extractTileFeatures(spatialFilter: SpatialFilter) {
    // When spatial filter has not changed, don't redo extraction. If tiles or
    // tile extract options change, features will have been cleared already.
    const prevInputs = this._tileFeatureExtractPreviousInputs;
    if (
      this._features.length &&
      prevInputs.spatialFilter &&
      booleanEqual(prevInputs.spatialFilter, spatialFilter)
    ) {
      return;
    }

    this._features = tileFeatures({
      tiles: this._tiles,
      tileFormat: this.props.tileFormat,
      ...this._tileFeatureExtractOptions,

      spatialFilter,
      spatialDataColumn: this.props.spatialDataColumn,
      spatialDataType: this.props.spatialDataType,
    });

    prevInputs.spatialFilter = spatialFilter;
  }

  /**
   * Loads features as GeoJSON (used for testing).
   * @experimental
   * @internal Not for public use. Spatial filters in other method calls will be ignored.
   */
  loadGeoJSON({
    geojson,
    spatialFilter,
  }: {
    geojson: FeatureCollection;
    spatialFilter: SpatialFilter;
  }) {
    this._features = geojsonFeatures({
      geojson,
      spatialFilter,
      ...this._tileFeatureExtractOptions,
    });
    this._tileFeatureExtractPreviousInputs.spatialFilter = spatialFilter;
  }

  override async getFeatures(): Promise<FeaturesResponse> {
    throw new Error('getFeatures not supported for tilesets');
  }

  async getFormula({
    column = '*',
    operation = 'count',
    joinOperation,
    filters,
    filterOwner,
    spatialFilter,
  }: FormulaRequestOptions): Promise<FormulaResponse> {
    if (operation === 'custom') {
      throw new Error('Custom aggregation not supported for tilesets');
    }

    // Column is required except when operation is 'count'.
    if ((column && column !== '*') || operation !== 'count') {
      assertColumn(this._features, column);
    }

    const filteredFeatures = this._getFilteredFeatures(
      spatialFilter,
      filters,
      filterOwner
    );

    if (filteredFeatures.length === 0 && operation !== 'count') {
      return {value: null};
    }

    const targetOperation = aggregationFunctions[operation];
    return {
      value: targetOperation(filteredFeatures, column, joinOperation),
    };
  }

  override async getHistogram({
    operation = 'count',
    ticks,
    column,
    joinOperation,
    filters,
    filterOwner,
    spatialFilter,
  }: HistogramRequestOptions): Promise<HistogramResponse> {
    const filteredFeatures = this._getFilteredFeatures(
      spatialFilter,
      filters,
      filterOwner
    );

    assertColumn(this._features, column);

    if (!this._features.length) {
      return [];
    }

    return histogram({
      data: filteredFeatures,
      valuesColumns: normalizeColumns(column),
      joinOperation,
      ticks,
      operation,
    });
  }

  override async getCategories({
    column,
    operation = 'count',
    operationColumn,
    joinOperation,
    filters,
    filterOwner,
    spatialFilter,
  }: CategoryRequestOptions): Promise<CategoryResponse> {
    const filteredFeatures = this._getFilteredFeatures(
      spatialFilter,
      filters,
      filterOwner
    );

    if (!filteredFeatures.length) {
      return [];
    }

    assertColumn(this._features, column, operationColumn as string);

    const groups = groupValuesByColumn({
      data: filteredFeatures,
      valuesColumns: normalizeColumns(operationColumn || column),
      joinOperation,
      keysColumn: column,
      operation,
    });

    return groups || [];
  }

  override async getScatter({
    xAxisColumn,
    yAxisColumn,
    xAxisJoinOperation,
    yAxisJoinOperation,
    filters,
    filterOwner,
    spatialFilter,
  }: ScatterRequestOptions): Promise<ScatterResponse> {
    const filteredFeatures = this._getFilteredFeatures(
      spatialFilter,
      filters,
      filterOwner
    );

    if (!filteredFeatures.length) {
      return [];
    }

    assertColumn(this._features, xAxisColumn, yAxisColumn);

    return scatterPlot({
      data: filteredFeatures,
      xAxisColumns: normalizeColumns(xAxisColumn),
      xAxisJoinOperation,
      yAxisColumns: normalizeColumns(yAxisColumn),
      yAxisJoinOperation,
    });
  }

  override async getTable({
    columns,
    searchFilterColumn,
    searchFilterText,
    sortBy,
    sortDirection,
    sortByColumnType,
    offset = 0,
    limit = 10,
    filters,
    filterOwner,
    spatialFilter,
  }: TableRequestOptions): Promise<TableResponse> {
    // Filter.
    let filteredFeatures = this._getFilteredFeatures(
      spatialFilter,
      filters,
      filterOwner
    );

    if (!filteredFeatures.length) {
      return {rows: [], totalCount: 0};
    }

    // Search.
    if (searchFilterColumn && searchFilterText) {
      filteredFeatures = filteredFeatures.filter(
        (row) =>
          row[searchFilterColumn] &&
          String(row[searchFilterColumn] as unknown)
            .toLowerCase()
            .includes(String(searchFilterText).toLowerCase())
      );
    }

    // Sort.
    let rows = applySorting(filteredFeatures, {
      sortBy,
      sortByDirection: sortDirection,
      sortByColumnType,
    });
    const totalCount = rows.length;

    // Offset and limit.
    rows = rows.slice(
      Math.min(offset, totalCount),
      Math.min(offset + limit, totalCount)
    );

    // Select columns.
    rows = rows.map((srcRow: FeatureData) => {
      const dstRow: FeatureData = {};
      for (const column of columns) {
        dstRow[column] = srcRow[column];
      }
      return dstRow;
    });

    return {rows, totalCount} as TableResponse;
  }

  override async getTimeSeries({
    column,
    stepSize,
    operation,
    operationColumn,
    joinOperation,
    filters,
    filterOwner,
    spatialFilter,
  }: TimeSeriesRequestOptions): Promise<TimeSeriesResponse> {
    const filteredFeatures = this._getFilteredFeatures(
      spatialFilter,
      filters,
      filterOwner
    );

    if (!filteredFeatures.length) {
      return {rows: []};
    }

    assertColumn(this._features, column, operationColumn as string);

    const rows =
      groupValuesByDateColumn({
        data: filteredFeatures,
        valuesColumns: normalizeColumns(operationColumn || column),
        keysColumn: column,
        groupType: stepSize,
        operation,
        joinOperation,
      }) || [];

    return {rows};
  }

  override async getRange({
    column,
    filters,
    filterOwner,
    spatialFilter,
  }: RangeRequestOptions): Promise<RangeResponse> {
    assertColumn(this._features, column);

    const filteredFeatures = this._getFilteredFeatures(
      spatialFilter,
      filters,
      filterOwner
    );

    if (!this._features.length) {
      // TODO: Is this the only nullable response in the Widgets API? If so,
      // can we do something more consistent?
      return null;
    }

    return {
      min: aggregationFunctions.min(filteredFeatures, column),
      max: aggregationFunctions.max(filteredFeatures, column),
    };
  }

  /****************************************************************************
   * INTERNAL
   */

  private _getFilteredFeatures(
    spatialFilter?: SpatialFilter,
    filters?: Record<string, Filter>,
    filterOwner?: string
  ): FeatureData[] {
    assert(spatialFilter, 'spatialFilter required for tilesets');
    this._extractTileFeatures(spatialFilter);
    return applyFilters(
      this._features,
      getApplicableFilters(filterOwner, filters || this.props.filters),
      this.props.filtersLogicalOperator || 'and'
    );
  }
}

function assertColumn(
  features: FeatureData[],
  ...columnArgs: string[] | string[][]
) {
  // TODO(cleanup): Can drop support for multiple column shapes here?

  // Due to the multiple column shape, we normalise it as an array with normalizeColumns
  const columns = Array.from(new Set(columnArgs.map(normalizeColumns).flat()));

  const featureKeys = Object.keys(features[0]);

  const invalidColumns = columns.filter(
    (column) => !featureKeys.includes(column)
  );

  if (invalidColumns.length) {
    throw new InvalidColumnError(
      `Missing column(s): ${invalidColumns.join(', ')}`
    );
  }
}

function normalizeColumns(columns: string | string[]): string[] {
  return Array.isArray(columns)
    ? columns
    : typeof columns === 'string'
      ? [columns]
      : [];
}

import {executeModel} from '../models/index.js';
import {
  CategoryRequestOptions,
  CategoryResponse,
  FeaturesRequestOptions,
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
import {normalizeObjectKeys} from '../utils.js';
import {DEFAULT_TILE_RESOLUTION} from '../constants-internal.js';
import {WidgetSource, WidgetSourceProps} from './widget-source.js';

export type WidgetRemoteSourceProps = WidgetSourceProps;

/**
 * Source for Widget API requests.
 *
 * Abstract class. Use {@link WidgetQuerySource} or {@link WidgetTableSource}.
 */
export abstract class WidgetRemoteSource<
  Props extends WidgetRemoteSourceProps,
> extends WidgetSource<Props> {
  async getCategories(
    options: CategoryRequestOptions
  ): Promise<CategoryResponse> {
    const {
      signal,
      filters = this.props.filters,
      filterOwner,
      spatialFilter,
      spatialFiltersMode,
      ...params
    } = options;
    const {column, operation, operationColumn} = params;

    type CategoriesModelResponse = {rows: {name: string; value: number}[]};

    return executeModel({
      model: 'category',
      source: {
        ...this.getModelSource(filters, filterOwner),
        spatialFiltersMode,
        spatialFilter,
      },
      params: {
        column,
        operation,
        operationColumn: operationColumn || column,
      },
      opts: {signal, headers: this.props.headers},
    }).then((res: CategoriesModelResponse) => normalizeObjectKeys(res.rows));
  }

  async getFeatures(
    options: FeaturesRequestOptions
  ): Promise<FeaturesResponse> {
    const {
      abortController,
      signal = abortController?.signal,
      filters = this.props.filters,
      filterOwner,
      spatialFilter,
      spatialFiltersMode,
      ...params
    } = options;
    const {columns, dataType, featureIds, z, limit, tileResolution} = params;

    type FeaturesModelResponse = {rows: Record<string, unknown>[]};

    return executeModel({
      model: 'pick',
      source: {
        ...this.getModelSource(filters, filterOwner),
        spatialFiltersMode,
        spatialFilter,
      },
      params: {
        columns,
        dataType,
        featureIds,
        z,
        limit: limit || 1000,
        tileResolution: tileResolution || DEFAULT_TILE_RESOLUTION,
      },
      opts: {signal, headers: this.props.headers},
      // Avoid `normalizeObjectKeys()`, which changes column names.
    }).then(({rows}: FeaturesModelResponse) => ({rows}));
  }

  async getFormula(options: FormulaRequestOptions): Promise<FormulaResponse> {
    const {
      abortController,
      signal = abortController?.signal,
      filters = this.props.filters,
      filterOwner,
      spatialFilter,
      spatialFiltersMode,
      operationExp,
      ...params
    } = options;
    const {column, operation} = params;

    type FormulaModelResponse = {rows: {value: number}[]};

    return executeModel({
      model: 'formula',
      source: {
        ...this.getModelSource(filters, filterOwner),
        spatialFiltersMode,
        spatialFilter,
      },
      params: {
        column: column ?? '*',
        operation: operation ?? 'count',
        operationExp,
      },
      opts: {signal, headers: this.props.headers},
    }).then((res: FormulaModelResponse) => normalizeObjectKeys(res.rows[0]));
  }

  async getHistogram(
    options: HistogramRequestOptions
  ): Promise<HistogramResponse> {
    const {
      abortController,
      signal = abortController?.signal,
      filters = this.props.filters,
      filterOwner,
      spatialFilter,
      spatialFiltersMode,
      ...params
    } = options;
    const {column, operation, ticks} = params;

    type HistogramModelResponse = {rows: {tick: number; value: number}[]};

    const data = await executeModel({
      model: 'histogram',
      source: {
        ...this.getModelSource(filters, filterOwner),
        spatialFiltersMode,
        spatialFilter,
      },
      params: {column, operation, ticks},
      opts: {signal, headers: this.props.headers},
    }).then((res: HistogramModelResponse) => normalizeObjectKeys(res.rows));

    if (data.length) {
      // Given N ticks the API returns up to N+1 bins, omitting any empty bins. Bins
      // include 1 bin below the lowest tick, N-1 between ticks, and 1 bin above the highest tick.
      const result = Array(ticks.length + 1).fill(0);
      data.forEach(
        ({tick, value}: {tick: number; value: number}) => (result[tick] = value)
      );
      return result;
    }

    return [];
  }

  async getRange(options: RangeRequestOptions): Promise<RangeResponse> {
    const {
      abortController,
      signal = abortController?.signal,
      filters = this.props.filters,
      filterOwner,
      spatialFilter,
      spatialFiltersMode,
      ...params
    } = options;
    const {column} = params;

    type RangeModelResponse = {rows: {min: number; max: number}[]};

    return executeModel({
      model: 'range',
      source: {
        ...this.getModelSource(filters, filterOwner),
        spatialFiltersMode,
        spatialFilter,
      },
      params: {column},
      opts: {signal, headers: this.props.headers},
    }).then((res: RangeModelResponse) => normalizeObjectKeys(res.rows[0]));
  }

  async getScatter(options: ScatterRequestOptions): Promise<ScatterResponse> {
    const {
      abortController,
      signal = abortController?.signal,
      filters = this.props.filters,
      filterOwner,
      spatialFilter,
      spatialFiltersMode,
      ...params
    } = options;
    const {xAxisColumn, xAxisJoinOperation, yAxisColumn, yAxisJoinOperation} =
      params;

    // Make sure this is sync with the same constant in cloud-native/maps-api
    const HARD_LIMIT = 500;

    type ScatterModelResponse = {rows: {x: number; y: number}[]};

    return executeModel({
      model: 'scatterplot',
      source: {
        ...this.getModelSource(filters, filterOwner),
        spatialFiltersMode,
        spatialFilter,
      },
      params: {
        xAxisColumn,
        xAxisJoinOperation,
        yAxisColumn,
        yAxisJoinOperation,
        limit: HARD_LIMIT,
      },
      opts: {signal, headers: this.props.headers},
    })
      .then((res: ScatterModelResponse) => normalizeObjectKeys(res.rows))
      .then((res) => res.map(({x, y}: {x: number; y: number}) => [x, y]));
  }

  async getTable(options: TableRequestOptions): Promise<TableResponse> {
    const {
      abortController,
      signal = abortController?.signal,
      filters = this.props.filters,
      filterOwner,
      spatialFilter,
      spatialFiltersMode,
      ...params
    } = options;
    const {columns, sortBy, sortDirection, offset = 0, limit = 10} = params;

    type TableModelResponse = {
      rows: Record<string, number | string>[];
      metadata: {total: number};
    };

    return executeModel({
      model: 'table',
      source: {
        ...this.getModelSource(filters, filterOwner),
        spatialFiltersMode,
        spatialFilter,
      },
      params: {
        column: columns,
        sortBy,
        sortDirection,
        limit,
        offset,
      },
      opts: {signal, headers: this.props.headers},
    }).then((res: TableModelResponse) => ({
      // Avoid `normalizeObjectKeys()`, which changes column names.
      rows: res.rows ?? (res as any).ROWS,
      totalCount: res.metadata?.total ?? (res as any).METADATA?.TOTAL,
    }));
  }

  async getTimeSeries(
    options: TimeSeriesRequestOptions
  ): Promise<TimeSeriesResponse> {
    const {
      abortController,
      signal = abortController?.signal,
      filters = this.props.filters,
      filterOwner,
      spatialFilter,
      spatialFiltersMode,
      ...params
    } = options;
    const {
      column,
      operationColumn,
      joinOperation,
      operation,
      stepSize,
      stepMultiplier,
      splitByCategory,
      splitByCategoryLimit,
      splitByCategoryValues,
    } = params;

    type TimeSeriesModelResponse = {
      rows: {name: string; value: number}[];
      metadata: {categories: string[]};
    };

    return executeModel({
      model: 'timeseries',
      source: {
        ...this.getModelSource(filters, filterOwner),
        spatialFiltersMode,
        spatialFilter,
      },
      params: {
        column,
        stepSize,
        stepMultiplier,
        operationColumn: operationColumn || column,
        joinOperation,
        operation,
        splitByCategory,
        splitByCategoryLimit,
        splitByCategoryValues,
      },
      opts: {signal, headers: this.props.headers},
    }).then((res: TimeSeriesModelResponse) => ({
      rows: normalizeObjectKeys(res.rows),
      categories: res.metadata?.categories,
    }));
  }
}

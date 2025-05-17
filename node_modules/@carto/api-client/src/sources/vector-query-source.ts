// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {
  DEFAULT_GEO_COLUMN,
  DEFAULT_TILE_RESOLUTION,
} from '../constants-internal.js';
import {
  WidgetQuerySource,
  WidgetQuerySourceResult,
} from '../widget-sources/index.js';
import {baseSource} from './base-source.js';
import type {
  FilterOptions,
  SourceOptions,
  QuerySourceOptions,
  SpatialDataType,
  TilejsonResult,
  ColumnsOption,
} from './types.js';

export type VectorQuerySourceOptions = SourceOptions &
  QuerySourceOptions &
  FilterOptions &
  ColumnsOption;

type UrlParameters = {
  columns?: string;
  filters?: Record<string, unknown>;
  spatialDataType: SpatialDataType;
  spatialDataColumn?: string;
  tileResolution?: string;
  q: string;
  queryParameters?: Record<string, unknown> | unknown[];
  aggregationExp?: string;
};

export type VectorQuerySourceResponse = TilejsonResult &
  WidgetQuerySourceResult;

export const vectorQuerySource = async function (
  options: VectorQuerySourceOptions
): Promise<VectorQuerySourceResponse> {
  const {
    columns,
    filters,
    spatialDataColumn = DEFAULT_GEO_COLUMN,
    sqlQuery,
    tileResolution = DEFAULT_TILE_RESOLUTION,
    queryParameters,
    aggregationExp,
  } = options;

  const spatialDataType = 'geo';

  const urlParameters: UrlParameters = {
    spatialDataColumn,
    spatialDataType,
    tileResolution: tileResolution.toString(),
    q: sqlQuery,
  };

  if (columns) {
    urlParameters.columns = columns.join(',');
  }
  if (filters) {
    urlParameters.filters = filters;
  }
  if (queryParameters) {
    urlParameters.queryParameters = queryParameters;
  }
  if (aggregationExp) {
    urlParameters.aggregationExp = aggregationExp;
  }

  return baseSource<UrlParameters>('query', options, urlParameters).then(
    (result) => ({
      ...(result as TilejsonResult),
      widgetSource: new WidgetQuerySource({
        ...options,
        // NOTE: Parameters with default values above must be explicitly passed here.
        spatialDataColumn,
        spatialDataType,
        tileResolution,
      }),
    })
  );
};

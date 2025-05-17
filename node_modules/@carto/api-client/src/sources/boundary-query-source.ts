// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {QueryParameters} from '../types.js';
import {baseSource} from './base-source.js';
import type {FilterOptions, SourceOptions, TilejsonResult} from './types.js';

export type BoundaryQuerySourceOptions = SourceOptions &
  FilterOptions & {
    columns?: string[];
    tilesetTableName: string;
    propertiesSqlQuery: string;
    queryParameters?: QueryParameters;
  };
type UrlParameters = {
  columns?: string;
  filters?: Record<string, unknown>;
  tilesetTableName: string;
  propertiesSqlQuery: string;
  queryParameters?: Record<string, unknown> | unknown[];
};

export type BoundaryQuerySourceResponse = TilejsonResult;

export const boundaryQuerySource = async function (
  options: BoundaryQuerySourceOptions
): Promise<BoundaryQuerySourceResponse> {
  const {
    columns,
    filters,
    tilesetTableName,
    propertiesSqlQuery,
    queryParameters,
  } = options;
  const urlParameters: UrlParameters = {
    tilesetTableName,
    propertiesSqlQuery,
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

  return baseSource<UrlParameters>(
    'boundary',
    options,
    urlParameters
  ) as Promise<BoundaryQuerySourceResponse>;
};

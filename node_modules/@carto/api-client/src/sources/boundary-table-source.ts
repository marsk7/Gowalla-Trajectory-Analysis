// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {baseSource} from './base-source.js';
import type {FilterOptions, SourceOptions, TilejsonResult} from './types.js';

export type BoundaryTableSourceOptions = SourceOptions &
  FilterOptions & {
    tilesetTableName: string;
    columns?: string[];
    propertiesTableName: string;
  };
type UrlParameters = {
  filters?: Record<string, unknown>;
  tilesetTableName: string;
  columns?: string;
  propertiesTableName: string;
};

export type BoundaryTableSourceResponse = TilejsonResult;

export const boundaryTableSource = async function (
  options: BoundaryTableSourceOptions
): Promise<BoundaryTableSourceResponse> {
  const {filters, tilesetTableName, columns, propertiesTableName} = options;
  const urlParameters: UrlParameters = {
    tilesetTableName,
    propertiesTableName,
  };

  if (columns) {
    urlParameters.columns = columns.join(',');
  }
  if (filters) {
    urlParameters.filters = filters;
  }

  return baseSource<UrlParameters>(
    'boundary',
    options,
    urlParameters
  ) as Promise<BoundaryTableSourceResponse>;
};

// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {baseSource} from './base-source.js';
import type {
  FilterOptions,
  SourceOptions,
  TilejsonResult,
  TilesetSourceOptions,
} from './types.js';

export type RasterSourceOptions = SourceOptions &
  TilesetSourceOptions &
  FilterOptions;
type UrlParameters = {
  name: string;
  filters?: Record<string, unknown>;
};

export type RasterSourceResponse = TilejsonResult;

export const rasterSource = async function (
  options: RasterSourceOptions
): Promise<RasterSourceResponse> {
  const {tableName, filters} = options;
  const urlParameters: UrlParameters = {name: tableName};
  if (filters) {
    urlParameters.filters = filters;
  }

  return baseSource<UrlParameters>(
    'raster',
    options,
    urlParameters
  ) as Promise<RasterSourceResponse>;
};

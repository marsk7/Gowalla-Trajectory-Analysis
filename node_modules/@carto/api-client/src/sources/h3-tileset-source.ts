// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {baseSource} from './base-source.js';
import type {
  SourceOptions,
  TilejsonResult,
  TilesetSourceOptions,
} from './types.js';

export type H3TilesetSourceOptions = SourceOptions & TilesetSourceOptions;
type UrlParameters = {name: string};

export type H3TilesetSourceResponse = TilejsonResult;

export const h3TilesetSource = async function (
  options: H3TilesetSourceOptions
): Promise<H3TilesetSourceResponse> {
  const {tableName} = options;
  const urlParameters: UrlParameters = {name: tableName};

  return baseSource<UrlParameters>(
    'tileset',
    options,
    urlParameters
  ) as Promise<H3TilesetSourceResponse>;
};

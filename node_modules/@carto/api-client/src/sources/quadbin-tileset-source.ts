// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {baseSource} from './base-source.js';
import type {
  SourceOptions,
  TilejsonResult,
  TilesetSourceOptions,
} from './types.js';

export type QuadbinTilesetSourceOptions = SourceOptions & TilesetSourceOptions;
type UrlParameters = {name: string};

export type QuadbinTilesetSourceResponse = TilejsonResult;

export const quadbinTilesetSource = async function (
  options: QuadbinTilesetSourceOptions
): Promise<QuadbinTilesetSourceResponse> {
  const {tableName} = options;
  const urlParameters: UrlParameters = {name: tableName};

  return baseSource<UrlParameters>(
    'tileset',
    options,
    urlParameters
  ) as Promise<QuadbinTilesetSourceResponse>;
};

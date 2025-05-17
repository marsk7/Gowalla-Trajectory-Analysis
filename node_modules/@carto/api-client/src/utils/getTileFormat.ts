import {TileFormat} from '../constants.js';
import {Tilejson} from '../sources/types.js';

export function getTileFormat(tilejson: Tilejson): TileFormat {
  const tileParams = new URL(tilejson.tiles[0]).searchParams;
  return tileParams.get('formatTiles') === 'mvt'
    ? TileFormat.MVT
    : TileFormat.BINARY;
}

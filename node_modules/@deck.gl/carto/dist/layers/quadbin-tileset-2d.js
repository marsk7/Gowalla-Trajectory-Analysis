// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { _Tileset2D as Tileset2D } from '@deck.gl/geo-layers';
import { bigIntToHex, cellToParent, cellToTile, getResolution, tileToCell } from 'quadbin';
export default class QuadbinTileset2D extends Tileset2D {
    // @ts-expect-error for spatial indices, TileSet2d should be parametrized by TileIndexT
    getTileIndices(opts) {
        return super
            .getTileIndices(opts)
            .map(tileToCell)
            .map(q => ({ q, i: bigIntToHex(q) }));
    }
    // @ts-expect-error TileIndex must be generic
    getTileId({ q, i }) {
        return i || bigIntToHex(q);
    }
    // @ts-expect-error TileIndex must be generic
    getTileMetadata({ q }) {
        return super.getTileMetadata(cellToTile(q));
    }
    // @ts-expect-error TileIndex must be generic
    getTileZoom({ q }) {
        return Number(getResolution(q));
    }
    // @ts-expect-error TileIndex must be generic
    getParentIndex({ q }) {
        return { q: cellToParent(q) };
    }
}
//# sourceMappingURL=quadbin-tileset-2d.js.map
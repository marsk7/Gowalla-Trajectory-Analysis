// loaders.gl
// SPDX-License-Identifier: MIT AND Apache-2.0
// Copyright vis.gl contributors
import { parse3DTileHeaderSync } from "./helpers/parse-3d-tile-header.js";
// eslint-disable-next-line max-params
export async function parseComposite3DTile(tile, arrayBuffer, byteOffset, options, context, parse3DTile) {
    byteOffset = parse3DTileHeaderSync(tile, arrayBuffer, byteOffset);
    const view = new DataView(arrayBuffer);
    // Extract number of tiles
    tile.tilesLength = view.getUint32(byteOffset, true);
    byteOffset += 4;
    // extract each tile from the byte stream
    tile.tiles = [];
    while (tile.tiles.length < tile.tilesLength && (tile.byteLength || 0) - byteOffset > 12) {
        const subtile = { shape: 'tile3d' };
        tile.tiles.push(subtile);
        byteOffset = await parse3DTile(arrayBuffer, byteOffset, options, context, subtile);
        // TODO - do we need to add any padding in between tiles?
    }
    return byteOffset;
}

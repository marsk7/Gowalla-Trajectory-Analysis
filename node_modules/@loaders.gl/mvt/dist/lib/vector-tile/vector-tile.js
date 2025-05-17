// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors
// This code is forked from https://github.com/mapbox/vector-tile-js under BSD 3-clause license.
import { VectorTileLayer } from "./vector-tile-layer.js";
export class VectorTile {
    layers;
    constructor(pbf, end) {
        this.layers = pbf.readFields(readTile, {}, end);
    }
}
/**
 *
 * @param tag
 * @param layers
 * @param pbf
 */
function readTile(tag, layers, pbf) {
    if (tag === 3) {
        if (pbf) {
            const layer = new VectorTileLayer(pbf, pbf.readVarint() + pbf.pos);
            if (layer.length && layers) {
                layers[layer.name] = layer;
            }
        }
    }
}

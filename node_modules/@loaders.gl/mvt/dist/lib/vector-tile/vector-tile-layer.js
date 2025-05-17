// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors
import { VectorTileFeature } from "./vector-tile-feature.js";
export class VectorTileLayer {
    version;
    name;
    extent;
    length;
    _pbf;
    _keys;
    _values;
    _features;
    constructor(pbf, end) {
        // Public
        this.version = 1;
        this.name = '';
        this.extent = 4096;
        this.length = 0;
        // Private
        this._pbf = pbf;
        this._keys = [];
        this._values = [];
        this._features = [];
        pbf.readFields(readLayer, this, end);
        this.length = this._features.length;
    }
    /**
     * return feature `i` from this layer as a `VectorTileFeature`
     * @param index
     * @returns feature
     */
    getGeoJSONFeature(i) {
        if (i < 0 || i >= this._features.length) {
            throw new Error('feature index out of bounds');
        }
        this._pbf.pos = this._features[i];
        const end = this._pbf.readVarint() + this._pbf.pos;
        return new VectorTileFeature(this._pbf, end, this.extent, this._keys, this._values);
    }
    /**
     * return binary feature `i` from this layer as a `VectorTileFeature`
     *
     * @param index
     * @param geometryInfo
     * @returns binary feature
     */
    getBinaryFeature(i, geometryInfo) {
        if (i < 0 || i >= this._features.length) {
            throw new Error('feature index out of bounds');
        }
        this._pbf.pos = this._features[i];
        const end = this._pbf.readVarint() + this._pbf.pos;
        return new VectorTileFeature(this._pbf, end, this.extent, this._keys, this._values, geometryInfo);
    }
}
/**
 *
 * @param tag
 * @param layer
 * @param pbf
 */
function readLayer(tag, layer, pbf) {
    if (layer && pbf) {
        if (tag === 15)
            layer.version = pbf.readVarint();
        else if (tag === 1)
            layer.name = pbf.readString();
        else if (tag === 5)
            layer.extent = pbf.readVarint();
        else if (tag === 2)
            layer._features.push(pbf.pos);
        else if (tag === 3)
            layer._keys.push(pbf.readString());
        else if (tag === 4)
            layer._values.push(readValueMessage(pbf));
    }
}
/**
 *
 * @param pbf
 * @returns value
 */
function readValueMessage(pbf) {
    let value = null;
    const end = pbf.readVarint() + pbf.pos;
    while (pbf.pos < end) {
        const tag = pbf.readVarint() >> 3;
        value =
            tag === 1
                ? pbf.readString()
                : tag === 2
                    ? pbf.readFloat()
                    : tag === 3
                        ? pbf.readDouble()
                        : tag === 4
                            ? pbf.readVarint64()
                            : tag === 5
                                ? pbf.readVarint()
                                : tag === 6
                                    ? pbf.readSVarint()
                                    : tag === 7
                                        ? pbf.readBoolean()
                                        : null;
    }
    return value;
}

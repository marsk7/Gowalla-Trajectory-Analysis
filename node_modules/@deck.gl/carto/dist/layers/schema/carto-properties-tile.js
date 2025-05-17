// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { NumericPropKeyValueReader, PropertiesReader } from "./carto-tile.js";
export class TileReader {
    static read(pbf, end) {
        return pbf.readFields(TileReader._readField, { properties: [], numericProps: {} }, end);
    }
    static _readField(tag, obj, pbf) {
        if (tag === 1)
            obj.properties.push(PropertiesReader.read(pbf, pbf.readVarint() + pbf.pos));
        else if (tag === 2) {
            const entry = NumericPropKeyValueReader.read(pbf, pbf.readVarint() + pbf.pos);
            obj.numericProps[entry.key] = entry.value;
        }
    }
}
//# sourceMappingURL=carto-properties-tile.js.map
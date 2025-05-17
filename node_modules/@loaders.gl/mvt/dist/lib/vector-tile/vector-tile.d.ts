import { VectorTileLayer } from "./vector-tile-layer.js";
import Protobuf from 'pbf';
export declare class VectorTile {
    layers: {
        [x: string]: VectorTileLayer;
    };
    constructor(pbf: Protobuf, end?: number);
}
//# sourceMappingURL=vector-tile.d.ts.map
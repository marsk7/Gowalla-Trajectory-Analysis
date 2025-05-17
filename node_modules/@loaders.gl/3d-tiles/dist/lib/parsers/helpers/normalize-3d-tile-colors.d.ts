import { Tile3DBatchTable } from '@loaders.gl/3d-tiles';
import { Tiles3DTileContent } from "../../../types.js";
export declare function normalize3DTileColorAttribute(tile: Tiles3DTileContent, colors: Uint8ClampedArray | null, batchTable?: Tile3DBatchTable): {
    type: number;
    value: Uint8ClampedArray;
    size: number;
    normalized: boolean;
} | null;
//# sourceMappingURL=normalize-3d-tile-colors.d.ts.map
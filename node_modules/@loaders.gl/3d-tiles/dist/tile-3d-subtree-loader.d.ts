import type { Subtree } from "./types.js";
import parse3DTilesSubtree from "./lib/parsers/helpers/parse-3d-tile-subtree.js";
/**
 * Loader for 3D Tiles Subtree
 */
export declare const Tile3DSubtreeLoader: {
    readonly dataType: Subtree;
    readonly batchType: never;
    readonly id: "3d-tiles-subtree";
    readonly name: "3D Tiles Subtree";
    readonly module: "3d-tiles";
    readonly version: any;
    readonly extensions: ["subtree"];
    readonly mimeTypes: ["application/octet-stream"];
    readonly tests: ["subtree"];
    readonly parse: typeof parse3DTilesSubtree;
    readonly options: {};
};
//# sourceMappingURL=tile-3d-subtree-loader.d.ts.map
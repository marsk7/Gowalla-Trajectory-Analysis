import type { LoaderOptions, LoaderContext } from '@loaders.gl/loader-utils';
import type { DracoLoaderOptions } from '@loaders.gl/draco';
import type { ImageLoaderOptions } from '@loaders.gl/images';
import { Tiles3DTileContent, Tiles3DTilesetJSONPostprocessed } from "./types.js";
export type Tiles3DLoaderOptions = LoaderOptions & DracoLoaderOptions & ImageLoaderOptions & {
    '3d-tiles'?: {
        /** Whether to parse any embedded glTF binaries (or extract memory for independent glTF parsing) */
        loadGLTF?: boolean;
        /** If renderer doesn't support quantized positions, loader can decode them on CPU */
        decodeQuantizedPositions?: boolean;
        /** Whether this is a tileset or a tile */
        isTileset?: boolean | 'auto';
        /** Controls which axis is "up" in glTF files */
        assetGltfUpAxis?: 'x' | 'y' | 'z' | null;
    };
};
/**
 * Loader for 3D Tiles
 */
export declare const Tiles3DLoader: {
    readonly dataType: any;
    readonly batchType: never;
    readonly id: "3d-tiles";
    readonly name: "3D Tiles";
    readonly module: "3d-tiles";
    readonly version: any;
    readonly extensions: ["cmpt", "pnts", "b3dm", "i3dm"];
    readonly mimeTypes: ["application/octet-stream"];
    readonly tests: ["cmpt", "pnts", "b3dm", "i3dm"];
    readonly parse: typeof parse;
    readonly options: {
        readonly '3d-tiles': {
            readonly loadGLTF: true;
            readonly decodeQuantizedPositions: false;
            readonly isTileset: "auto";
            readonly assetGltfUpAxis: null;
        };
    };
};
/** Parses a tileset or tile */
declare function parse(data: any, options?: Tiles3DLoaderOptions, context?: LoaderContext): Promise<Tiles3DTileContent | Tiles3DTilesetJSONPostprocessed>;
export {};
//# sourceMappingURL=tiles-3d-loader.d.ts.map
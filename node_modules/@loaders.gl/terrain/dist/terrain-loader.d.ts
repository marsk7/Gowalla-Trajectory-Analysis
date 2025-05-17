import type { ImageLoaderOptions } from '@loaders.gl/images';
import { TerrainOptions } from "./lib/parse-terrain.js";
import { Mesh } from '@loaders.gl/schema';
/** TerrainLoader options */
export type TerrainLoaderOptions = ImageLoaderOptions & {
    /** TerrainLoader options */
    terrain?: TerrainOptions & {
        /** Override the URL to the worker bundle (by default loads from unpkg.com) */
        workerUrl?: string;
    };
};
/**
 * Worker loader for image encoded terrain
 */
export declare const TerrainLoader: {
    readonly dataType: Mesh;
    readonly batchType: never;
    readonly name: "Terrain";
    readonly id: "terrain";
    readonly module: "terrain";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["png", "pngraw", "jpg", "jpeg", "gif", "webp", "bmp"];
    readonly mimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp", "image/bmp"];
    readonly options: {
        readonly terrain: {
            readonly tesselator: "auto";
            readonly bounds: never;
            readonly meshMaxError: 10;
            readonly elevationDecoder: {
                readonly rScaler: 1;
                readonly gScaler: 0;
                readonly bScaler: 0;
                readonly offset: 0;
            };
            readonly skirtHeight: undefined;
        };
    };
};
//# sourceMappingURL=terrain-loader.d.ts.map
import type { LoaderOptions } from '@loaders.gl/loader-utils';
import { parseNPY, NPYTile } from "./lib/parsers/parse-npy.js";
/** NPYLoader for numpy tiles */
export type NPYLoaderOptions = LoaderOptions & {
    /** NPYLoader for numpy tiles */
    npy?: {
        /** Override the URL to the worker bundle (by default loads from unpkg.com) */
        workerUrl?: string;
    };
};
/**
 * Worker loader for numpy "tiles"
 */
export declare const NPYWorkerLoader: {
    readonly dataType: NPYTile;
    readonly batchType: never;
    readonly name: "NPY";
    readonly id: "npy";
    readonly module: "textures";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["npy"];
    readonly mimeTypes: [];
    readonly tests: [ArrayBufferLike];
    readonly options: {
        readonly npy: {};
    };
};
/**
 * Loader for numpy "tiles"
 */
export declare const NPYLoader: {
    readonly parseSync: typeof parseNPY;
    readonly parse: (arrayBuffer: ArrayBuffer, options?: LoaderOptions) => Promise<NPYTile>;
    readonly dataType: NPYTile;
    readonly batchType: never;
    readonly name: "NPY";
    readonly id: "npy";
    readonly module: "textures";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["npy"];
    readonly mimeTypes: [];
    readonly tests: [ArrayBufferLike];
    readonly options: {
        readonly npy: {};
    };
};
//# sourceMappingURL=npy-loader.d.ts.map
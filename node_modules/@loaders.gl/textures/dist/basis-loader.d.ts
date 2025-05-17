import type { LoaderOptions } from '@loaders.gl/loader-utils';
import type { TextureLevel } from '@loaders.gl/schema';
import { parseBasis } from "./lib/parsers/parse-basis.js";
/** Options for the BasisLoader */
export type BasisLoaderOptions = LoaderOptions & {
    /** Options for the BasisLoader */
    basis?: {
        /** Format for texture data. auto selects based on platform caps (but gl context doesn't exist on a worker thread) */
        format: 'auto' | 'rgb565' | 'etc1s' | 'etc2' | 'astc' | 'dxt1' | 'dxt3' | 'dxt5';
        /** @deprecated specify path of basis library */
        libraryPath?: string;
        /** What container format is used? */
        containerFormat: 'auto' | 'ktx2' | 'basis';
        /** What module to use for transcoding? */
        module?: 'transcoder' | 'encoder';
        /** Override the URL to the worker bundle (by default loads from unpkg.com) */
        workerUrl?: string;
    };
};
/**
 * Worker loader for Basis super compressed textures
 */
export declare const BasisWorkerLoader: {
    readonly dataType: TextureLevel[][];
    readonly batchType: never;
    readonly name: "Basis";
    readonly id: "basis";
    readonly module: "textures";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["basis", "ktx2"];
    readonly mimeTypes: ["application/octet-stream", "image/ktx2"];
    readonly tests: ["sB"];
    readonly binary: true;
    readonly options: {
        readonly basis: {
            readonly format: "auto";
            readonly libraryPath: "libs/";
            readonly containerFormat: "auto";
            readonly module: "transcoder";
        };
    };
};
/**
 * Loader for Basis super compressed textures
 */
export declare const BasisLoader: {
    readonly parse: typeof parseBasis;
    readonly dataType: TextureLevel[][];
    readonly batchType: never;
    readonly name: "Basis";
    readonly id: "basis";
    readonly module: "textures";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["basis", "ktx2"];
    readonly mimeTypes: ["application/octet-stream", "image/ktx2"];
    readonly tests: ["sB"];
    readonly binary: true;
    readonly options: {
        readonly basis: {
            readonly format: "auto";
            readonly libraryPath: "libs/";
            readonly containerFormat: "auto";
            readonly module: "transcoder";
        };
    };
};
//# sourceMappingURL=basis-loader.d.ts.map
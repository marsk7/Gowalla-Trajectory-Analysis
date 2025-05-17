import type { LoaderOptions } from '@loaders.gl/loader-utils';
import type { DracoMesh } from "./lib/draco-types.js";
import type { DracoParseOptions } from "./lib/draco-parser.js";
export type DracoLoaderOptions = LoaderOptions & {
    draco?: DracoParseOptions & {
        /** @deprecated WASM decoding is faster but JS is more backwards compatible */
        decoderType?: 'wasm' | 'js';
        /** @deprecated Specify where to load the Draco decoder library */
        libraryPath?: string;
        /** Override the URL to the worker bundle (by default loads from unpkg.com) */
        workerUrl?: string;
    };
};
/**
 * Worker loader for Draco3D compressed geometries
 */
export declare const DracoLoader: {
    readonly dataType: DracoMesh;
    readonly batchType: never;
    readonly name: "Draco";
    readonly id: "draco";
    readonly module: "draco";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["drc"];
    readonly mimeTypes: ["application/octet-stream"];
    readonly binary: true;
    readonly tests: ["DRACO"];
    readonly options: {
        readonly draco: {
            readonly decoderType: "wasm" | "js";
            readonly libraryPath: "libs/";
            readonly extraAttributes: {};
            readonly attributeNameEntry: undefined;
        };
    };
};
//# sourceMappingURL=draco-loader.d.ts.map
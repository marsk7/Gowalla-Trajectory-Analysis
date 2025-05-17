import type { DracoMesh, DracoLoaderData } from "./lib/draco-types.js";
import type { DracoLoaderOptions } from "./draco-loader.js";
import { DracoLoader as DracoWorkerLoader } from "./draco-loader.js";
export { DRACO_EXTERNAL_LIBRARIES, DRACO_EXTERNAL_LIBRARY_URLS } from "./lib/draco-module-loader.js";
export type { DracoMesh, DracoLoaderData };
export type { DracoWriterOptions } from "./draco-writer.js";
export { DracoWriter } from "./draco-writer.js";
/**
 * Browser worker doesn't work because of issue during "draco_encoder.js" loading.
 * Refused to execute script from 'https://raw.githubusercontent.com/google/draco/1.4.1/javascript/draco_encoder.js' because its MIME type ('') is not executable.
 */
export declare const DracoWriterWorker: {
    id: string;
    name: string;
    module: string;
    version: any;
    worker: boolean;
    options: {
        draco: {};
        source: null;
    };
};
export type { DracoLoaderOptions };
export { DracoWorkerLoader };
/**
 * Loader for Draco3D compressed geometries
 */
export declare const DracoLoader: {
    readonly parse: typeof parse;
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
declare function parse(arrayBuffer: ArrayBuffer, options?: DracoLoaderOptions): Promise<DracoMesh>;
//# sourceMappingURL=index.d.ts.map
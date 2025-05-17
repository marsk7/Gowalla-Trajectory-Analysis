import type { LoaderOptions } from '@loaders.gl/loader-utils';
import { LoaderContext } from '@loaders.gl/loader-utils';
export type NullLoaderOptions = LoaderOptions & {
    null?: {};
};
/**
 * Loads any data and returns null (or optionally passes through data unparsed)
 */
export declare const NullWorkerLoader: {
    readonly dataType: null;
    readonly batchType: never;
    readonly name: "Null loader";
    readonly id: "null";
    readonly module: "core";
    readonly version: any;
    readonly worker: true;
    readonly mimeTypes: ["application/x.empty"];
    readonly extensions: ["null"];
    readonly tests: [() => false];
    readonly options: {
        readonly null: {};
    };
};
/**
 * Loads any data and returns null (or optionally passes through data unparsed)
 */
export declare const NullLoader: {
    readonly dataType: null;
    readonly batchType: null;
    readonly name: "Null loader";
    readonly id: "null";
    readonly module: "core";
    readonly version: any;
    readonly mimeTypes: ["application/x.empty"];
    readonly extensions: ["null"];
    readonly parse: (arrayBuffer: ArrayBuffer, options?: NullLoaderOptions, context?: LoaderContext) => Promise<null>;
    readonly parseSync: typeof parseSync;
    readonly parseInBatches: (asyncIterator: Iterable<ArrayBuffer> | AsyncIterable<ArrayBuffer>, options: NullLoaderOptions | undefined, context: LoaderContext | undefined) => AsyncGenerator<null, void, any>;
    readonly tests: [() => false];
    readonly options: {
        readonly null: {};
    };
};
/**
 * Returns arguments passed to the parse API in a format that can be transferred to a
 * web worker. The `context` parameter is stripped using JSON.stringify & parse.
 */
declare function parseSync(arrayBuffer: ArrayBuffer, options?: NullLoaderOptions, context?: LoaderContext): null;
export {};
//# sourceMappingURL=null-loader.d.ts.map
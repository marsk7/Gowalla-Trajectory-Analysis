import type { LoaderOptions } from "./loader-types.js";
import type { Table, TableBatch } from '@loaders.gl/schema';
export type JSONLoaderOptions = LoaderOptions;
/**
 * A JSON Micro loader (minimal bundle size)
 * Alternative to `@loaders.gl/json`
 */
export declare const JSONLoader: {
    readonly dataType: Table;
    readonly batchType: TableBatch;
    readonly name: "JSON";
    readonly id: "json";
    readonly module: "json";
    readonly version: any;
    readonly extensions: ["json", "geojson"];
    readonly mimeTypes: ["application/json"];
    readonly category: "json";
    readonly text: true;
    readonly parseTextSync: typeof parseTextSync;
    readonly parse: (arrayBuffer: ArrayBuffer) => Promise<any>;
    readonly options: {};
};
declare function parseTextSync(text: any): any;
export {};
//# sourceMappingURL=json-loader.d.ts.map
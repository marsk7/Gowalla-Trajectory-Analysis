import type { LoaderOptions } from '@loaders.gl/loader-utils';
import type { Geometry } from "./lib/parsers/gml/parse-gml.js";
export type GMLLoaderOptions = LoaderOptions & {
    gml?: {};
};
/**
 * Loader for the response to the GML GetCapability request
 */
export declare const GMLLoader: {
    readonly dataType: Geometry | null;
    readonly batchType: never;
    readonly name: "GML";
    readonly id: "gml";
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.gml", "application/xml", "text/xml"];
    readonly testText: typeof testXMLFile;
    readonly options: {
        readonly gml: {};
    };
    readonly parse: (arrayBuffer: ArrayBuffer, options?: GMLLoaderOptions) => Promise<Geometry | null>;
    readonly parseTextSync: (text: string, options?: GMLLoaderOptions) => Geometry | null;
};
declare function testXMLFile(text: string): boolean;
export {};
//# sourceMappingURL=gml-loader.d.ts.map
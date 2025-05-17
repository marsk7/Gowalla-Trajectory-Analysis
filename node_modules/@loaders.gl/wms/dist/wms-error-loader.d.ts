import type { LoaderOptions } from '@loaders.gl/loader-utils';
export type WMSLoaderOptions = LoaderOptions & {
    wms?: {
        /** By default the error loader will throw an error with the parsed error message */
        throwOnError?: boolean;
        /** Do not add any text to errors */
        minimalErrors?: boolean;
    };
};
/**
 * Loader for the response to the WMS GetCapability request
 */
export declare const WMSErrorLoader: {
    readonly dataType: string;
    readonly batchType: never;
    readonly id: "wms-error";
    readonly name: "WMS Error";
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.se_xml", "application/xml", "text/xml"];
    readonly testText: typeof testXMLFile;
    readonly options: {
        readonly wms: {
            readonly throwOnError: false;
        };
    };
    readonly parse: (arrayBuffer: ArrayBuffer, options?: WMSLoaderOptions) => Promise<string>;
    readonly parseSync: (arrayBuffer: ArrayBuffer, options?: WMSLoaderOptions) => string;
    readonly parseTextSync: (text: string, options?: WMSLoaderOptions) => string;
};
declare function testXMLFile(text: string): boolean;
export {};
//# sourceMappingURL=wms-error-loader.d.ts.map
import type { LoaderWithParser, LoaderOptions } from '@loaders.gl/loader-utils';
import type { WCSCapabilities } from "./lib/wcs/parse-wcs-capabilities.js";
export { WCSCapabilities };
export type WCSLoaderOptions = LoaderOptions & {
    wcs?: {};
};
/**
 * Loader for the response to the WCS GetCapability request
 */
export declare const WCSCapabilitiesLoader: {
    readonly dataType: WCSCapabilities;
    readonly batchType: never;
    readonly id: "wcs-capabilities";
    readonly name: "WFS Capabilities";
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.wcs_xml", "application/xml", "text/xml"];
    readonly testText: typeof testXMLFile;
    readonly options: {
        readonly wms: {};
    };
    readonly parse: (arrayBuffer: ArrayBuffer, options?: WCSLoaderOptions) => Promise<WCSCapabilities>;
    readonly parseTextSync: (text: string, options?: WCSLoaderOptions) => WCSCapabilities;
};
declare function testXMLFile(text: string): boolean;
export declare const _typecheckWFSCapabilitiesLoader: LoaderWithParser;
//# sourceMappingURL=wcs-capabilities-loader.d.ts.map
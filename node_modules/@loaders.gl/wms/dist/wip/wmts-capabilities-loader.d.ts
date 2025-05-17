import type { LoaderWithParser } from '@loaders.gl/loader-utils';
import type { XMLLoaderOptions } from '@loaders.gl/xml';
import { WMTSCapabilities } from "./lib/wmts/parse-wmts-capabilities.js";
export type WMTSLoaderOptions = XMLLoaderOptions & {
    wmts?: {};
};
/**
 * Loader for the response to the WMTS GetCapability request
 */
export declare const WMTSCapabilitiesLoader: {
    readonly dataType: WMTSCapabilities;
    readonly batchType: never;
    readonly id: "wmts-capabilities";
    readonly name: "WMTS Capabilities";
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.wmts_xml", "application/xml", "text/xml"];
    readonly testText: typeof testXMLFile;
    readonly options: {
        readonly wms: {};
    };
    readonly parse: (arrayBuffer: ArrayBuffer, options?: WMTSLoaderOptions) => Promise<WMTSCapabilities>;
    readonly parseTextSync: (text: string, options?: WMTSLoaderOptions) => WMTSCapabilities;
};
declare function testXMLFile(text: string): boolean;
export declare const _typecheckWMTSCapabilitiesLoader: LoaderWithParser;
export {};
//# sourceMappingURL=wmts-capabilities-loader.d.ts.map
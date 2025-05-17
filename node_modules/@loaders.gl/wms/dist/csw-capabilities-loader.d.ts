import type { XMLLoaderOptions } from '@loaders.gl/xml';
import type { CSWCapabilities } from "./lib/parsers/csw/parse-csw-capabilities.js";
export type { CSWCapabilities };
/** CSW loader options */
export type CSWLoaderOptions = XMLLoaderOptions & {
    csw?: {};
};
/**
 * Loader for the response to the CSW GetCapability request
 */
export declare const CSWCapabilitiesLoader: {
    readonly dataType: CSWCapabilities;
    readonly batchType: never;
    readonly id: "csw-capabilities";
    readonly name: "CSW Capabilities";
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.csw_xml", "application/xml", "text/xml"];
    readonly testText: typeof testXMLFile;
    readonly options: {
        readonly csw: {};
    };
    readonly parse: (arrayBuffer: ArrayBuffer, options?: CSWLoaderOptions) => Promise<CSWCapabilities>;
    readonly parseTextSync: (text: string, options?: CSWLoaderOptions) => CSWCapabilities;
};
declare function testXMLFile(text: string): boolean;
//# sourceMappingURL=csw-capabilities-loader.d.ts.map
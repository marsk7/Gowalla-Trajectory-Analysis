import type { XMLLoaderOptions } from '@loaders.gl/xml';
import { WMSCapabilities } from "./lib/parsers/wms/parse-wms-capabilities.js";
export type { WMSCapabilities, WMSLayer, WMSBoundingBox, WMSDimension, WMSRequest, WMSExceptions } from "./lib/parsers/wms/parse-wms-capabilities.js";
export type WMSCapabilitiesLoaderOptions = XMLLoaderOptions & {
    wms?: {
        /** Add inherited layer information to sub layers */
        inheritedLayerProps?: boolean;
        /** Include the "raw" JSON (parsed but untyped, unprocessed XML). May contain additional fields */
        includeRawJSON?: boolean;
        /** Include the original XML document text. May contain additional information. */
        includeXMLText?: boolean;
    };
};
/**
 * Loader for the response to the WMS GetCapability request
 */
export declare const WMSCapabilitiesLoader: {
    readonly dataType: WMSCapabilities;
    readonly batchType: never;
    readonly id: "wms-capabilities";
    readonly name: "WMS Capabilities";
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.wms_xml", "application/xml", "text/xml"];
    readonly testText: typeof testXMLFile;
    readonly options: {
        readonly wms: {};
    };
    readonly parse: (arrayBuffer: ArrayBuffer, options?: WMSCapabilitiesLoaderOptions) => Promise<WMSCapabilities>;
    readonly parseTextSync: (text: string, options?: WMSCapabilitiesLoaderOptions) => WMSCapabilities;
};
declare function testXMLFile(text: string): boolean;
//# sourceMappingURL=wms-capabilities-loader.d.ts.map
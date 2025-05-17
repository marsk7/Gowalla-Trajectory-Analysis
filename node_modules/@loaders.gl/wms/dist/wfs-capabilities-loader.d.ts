import type { LoaderWithParser, LoaderOptions } from '@loaders.gl/loader-utils';
import type { WFSCapabilities } from "./lib/parsers/wfs/parse-wfs-capabilities.js";
export type { WFSCapabilities };
export type WFSLoaderOptions = LoaderOptions & {
    wfs?: {};
};
/**
 * Loader for the response to the WFS GetCapability request
 * @deprecated Warning: this loader is still experimental and incomplete
 */
export declare const WFSCapabilitiesLoader: {
    readonly dataType: WFSCapabilities;
    readonly batchType: never;
    readonly id: "wfs-capabilities";
    readonly name: "WFS Capabilities";
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.wfs_xml", "application/xml", "text/xml"];
    readonly testText: typeof testXMLFile;
    readonly options: {
        readonly wfs: {};
    };
    readonly parse: (arrayBuffer: ArrayBuffer, options?: WFSLoaderOptions) => Promise<WFSCapabilities>;
    readonly parseTextSync: (text: string, options?: WFSLoaderOptions) => WFSCapabilities;
};
declare function testXMLFile(text: string): boolean;
export declare const _typecheckWFSCapabilitiesLoader: LoaderWithParser;
//# sourceMappingURL=wfs-capabilities-loader.d.ts.map
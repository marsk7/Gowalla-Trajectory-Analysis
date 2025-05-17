import type { XMLLoaderOptions } from '@loaders.gl/xml';
import type { CSWDomain } from "./lib/parsers/csw/parse-csw-domain.js";
export type { CSWDomain };
export type CSWLoaderOptions = XMLLoaderOptions & {
    csw?: {};
};
/**
 * Loader for the response to the CSW GetCapability request
 */
export declare const CSWDomainLoader: {
    readonly dataType: CSWDomain;
    readonly batchType: never;
    readonly id: "csw-domain";
    readonly name: "CSW Domain";
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.csw_xml", "application/xml", "text/xml"];
    readonly testText: typeof testXMLFile;
    readonly options: {
        readonly csw: {};
    };
    readonly parse: (arrayBuffer: ArrayBuffer, options?: CSWLoaderOptions) => Promise<CSWDomain>;
    readonly parseTextSync: (text: string, options?: CSWLoaderOptions) => CSWDomain;
};
declare function testXMLFile(text: string): boolean;
//# sourceMappingURL=csw-domain-loader.d.ts.map
import type { XMLLoaderOptions } from '@loaders.gl/xml';
import type { CSWRecords } from "./lib/parsers/csw/parse-csw-records.js";
export { CSWRecords };
export type CSWLoaderOptions = XMLLoaderOptions & {
    csw?: {};
};
/**
 * Loader for the response to the CSW GetCapability request
 */
export declare const CSWRecordsLoader: {
    readonly dataType: CSWRecords;
    readonly batchType: never;
    readonly id: "csw-records";
    readonly name: "CSW Records";
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.csw_xml", "application/xml", "text/xml"];
    readonly testText: typeof testXMLFile;
    readonly options: {
        readonly csw: {};
    };
    readonly parse: (arrayBuffer: ArrayBuffer, options?: CSWLoaderOptions) => Promise<CSWRecords>;
    readonly parseTextSync: (text: string, options?: CSWLoaderOptions) => CSWRecords;
};
declare function testXMLFile(text: string): boolean;
//# sourceMappingURL=csw-records-loader.d.ts.map
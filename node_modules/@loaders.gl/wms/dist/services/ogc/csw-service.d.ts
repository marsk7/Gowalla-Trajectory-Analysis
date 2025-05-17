import type { DataSourceProps } from '@loaders.gl/loader-utils';
import { DataSource } from '@loaders.gl/loader-utils';
import type { CSWCapabilities } from "../../csw-capabilities-loader.js";
import type { CSWRecords } from "../../csw-records-loader.js";
import type { CSWDomain } from "../../csw-domain-loader.js";
export type CSWServiceProps = DataSourceProps & {
    url: string;
};
/** Describes a service or resource exposed by the catalog */
export type Service = {
    /** name of service or resource */
    name: string;
    /** type of service or resource */
    type: string;
    url: string;
    params?: string;
    scheme?: string;
};
type CSWCommonParameters = {
    /** In case the endpoint supports multiple services */
    service?: 'CSW';
    /** In case the endpoint supports multiple CSW versions */
    version?: '1.1.1' | '2.0.0' | '2.0.1' | '3.0.0';
};
export type CSWGetCapabilitiesParameters = CSWCommonParameters & {
    /** Request type */
    request?: 'GetCapabilities';
};
export type CSWGetRecordsParameters = CSWCommonParameters & {
    /** Request type */
    request?: 'GetRecords';
    /** type of records */
    typenames: 'csw:Record';
};
export type CSWGetDomainParameters = CSWCommonParameters & {
    /** Request type */
    request?: 'GetDomain';
};
/**
 * The CSWService class
 * - provides type safe methods to form URLs to a CSW service
 * - provides type safe methods to query and parse results (and errors) from a CSW service
 * @note Only the URL parameter conversion is supported. XML posts are not supported.
 */
export declare class CSWService extends DataSource<CSWServiceProps> {
    static readonly type = "csw";
    static testURL: (url: string) => boolean;
    capabilities: CSWCapabilities | null;
    data: string;
    url: string;
    /** A list of loaders used by the CSWService methods */
    readonly loaders: ({
        readonly dataType: CSWCapabilities;
        readonly batchType: never;
        readonly id: "csw-capabilities";
        readonly name: "CSW Capabilities";
        readonly module: "wms";
        readonly version: any;
        readonly worker: false;
        readonly extensions: ["xml"];
        readonly mimeTypes: ["application/vnd.ogc.csw_xml", "application/xml", "text/xml"];
        readonly testText: (text: string) => boolean;
        readonly options: {
            readonly csw: {};
        };
        readonly parse: (arrayBuffer: ArrayBuffer, options?: import("../../csw-capabilities-loader").CSWLoaderOptions) => Promise<CSWCapabilities>;
        readonly parseTextSync: (text: string, options?: import("../../csw-capabilities-loader").CSWLoaderOptions) => CSWCapabilities;
    } | {
        readonly dataType: string;
        readonly batchType: never;
        readonly id: "wms-error";
        readonly name: "WMS Error";
        readonly module: "wms";
        readonly version: any;
        readonly worker: false;
        readonly extensions: ["xml"];
        readonly mimeTypes: ["application/vnd.ogc.se_xml", "application/xml", "text/xml"];
        readonly testText: (text: string) => boolean;
        readonly options: {
            readonly wms: {
                readonly throwOnError: false;
            };
        };
        readonly parse: (arrayBuffer: ArrayBuffer, options?: import("../../wms-error-loader").WMSLoaderOptions) => Promise<string>;
        readonly parseSync: (arrayBuffer: ArrayBuffer, options?: import("../../wms-error-loader").WMSLoaderOptions) => string;
        readonly parseTextSync: (text: string, options?: import("../../wms-error-loader").WMSLoaderOptions) => string;
    })[];
    /** Create a CSWService */
    constructor(props: CSWServiceProps);
    getMetadata(): Promise<CSWCapabilities>;
    normalizeMetadata(capabilities: CSWCapabilities): CSWCapabilities;
    getServiceDirectory(options?: {
        includeUnknown?: boolean;
    }): Promise<Service[]>;
    _parseOGCUrl(url: string): {
        url: string;
        params: string;
    };
    /** Get Capabilities */
    getCapabilities(wmsParameters?: CSWGetCapabilitiesParameters, vendorParameters?: Record<string, unknown>): Promise<CSWCapabilities>;
    /** Get Records */
    getRecords(wmsParameters?: CSWGetRecordsParameters, vendorParameters?: Record<string, unknown>): Promise<CSWRecords>;
    /** Get Domain */
    getDomain(wmsParameters?: CSWGetDomainParameters, vendorParameters?: Record<string, unknown>): Promise<CSWDomain>;
    /** Generate a URL for the GetCapabilities request */
    getCapabilitiesURL(wmsParameters?: CSWGetCapabilitiesParameters, vendorParameters?: Record<string, unknown>): string;
    /** Generate a URL for the GetCapabilities request */
    getRecordsURL(wmsParameters?: CSWGetRecordsParameters, vendorParameters?: Record<string, unknown>): string;
    /** Generate a URL for the GetCapabilities request */
    getDomainURL(wmsParameters?: CSWGetDomainParameters, vendorParameters?: Record<string, unknown>): string;
    /**
     * @note case _getCSWUrl may need to be overridden to handle certain backends?
     * */
    protected _getCSWUrl(options: Record<string, unknown>, vendorParameters?: Record<string, unknown>): string;
    /** Checks for and parses a CSW XML formatted ServiceError and throws an exception */
    protected _checkResponse(response: Response, arrayBuffer: ArrayBuffer): void;
    /** Error situation detected */
    protected _parseError(arrayBuffer: ArrayBuffer): Error;
}
export {};
//# sourceMappingURL=csw-service.d.ts.map
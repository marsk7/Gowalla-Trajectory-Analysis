import { Schema, GeoJSONTable } from '@loaders.gl/schema';
import type { VectorSourceProps, VectorSourceMetadata, LoaderWithParser, GetFeaturesParameters } from '@loaders.gl/loader-utils';
import { VectorSource } from '@loaders.gl/loader-utils';
import type { WFSCapabilities } from "../../wfs-capabilities-loader.js";
/**
 * @ndeprecated This is a WIP, not fully implemented
 * @see https://developers.arcgis.com/rest/services-reference/enterprise/feature-service.htm
 */
export declare const WFSSource: {
    readonly name: "WFS";
    readonly id: "wfs";
    readonly module: "wms";
    readonly version: "0.0.0";
    readonly extensions: [];
    readonly mimeTypes: [];
    readonly options: {
        readonly url: never;
        readonly wfs: {
            /** Tabular loaders, normally the GeoJSONLoader */
            readonly loaders: [];
        };
    };
    readonly type: "wfs";
    readonly fromUrl: true;
    readonly fromBlob: false;
    readonly testURL: (url: string) => boolean;
    readonly createDataSource: (url: string | Blob, props: WFSVectorSourceProps) => WFSVectorSource;
};
/** Properties for creating a enw WFS service */
export type WFSVectorSourceProps = VectorSourceProps & {
    url: string;
    wfs?: {
        loaders: LoaderWithParser[];
        /** In 1.3.0, replaces references to EPSG:4326 with CRS:84 */
        substituteCRS84?: boolean;
        /** Default WFS parameters. If not provided here, must be provided in the various request */
        wmsParameters?: WFSParameters;
        /** Any additional service specific parameters */
        vendorParameters?: Record<string, unknown>;
    };
};
/**
 * "Static" WFS parameters (not viewport or selected pixel dependent)
 * These can be provided as defaults in the WFSVectorSource constructor
 */
export type WFSParameters = {
    /** WFS version (all requests) */
    version?: '1.3.0' | '1.1.1';
    /** Layers to render (GetMap, GetFeatureInfo) */
    layers?: string[];
    /** list of layers to query.. (GetFeatureInfo) */
    query_layers?: string[];
    /** Coordinate Reference System (CRS) for the image (not the bounding box) */
    crs?: string;
    /** Requested format for the return image (GetMap, GetLegendGraphic) */
    format?: 'image/png';
    /** Requested MIME type of returned feature info (GetFeatureInfo) */
    info_format?: 'text/plain' | 'application/geojson' | 'application/vnd.ogc.gml';
    /** Styling - Not yet supported */
    styles?: unknown;
    /** Any additional parameters specific to this WFSVectorSource (GetMap) */
    transparent?: boolean;
    /** If layer supports time dimension */
    time?: string;
    /** If layer supports elevation dimension */
    elevation?: string;
};
/** Parameters for GetCapabilities */
export type WFSGetCapabilitiesParameters = {
    /** In case the endpoint supports multiple WFS versions */
    version?: '1.3.0' | '1.1.1';
};
/** Parameters for GetMap */
export type WFSGetMapParameters = {
    /** In case the endpoint supports multiple WFS versions */
    version?: '1.3.0' | '1.1.1';
    /** bounding box of the requested map image `[[w, s], [e, n]]`  */
    /** bounding box of the requested map image @deprecated Use .boundingBox */
    bbox: [number, number, number, number];
    /** pixel width of returned image */
    width: number;
    /** pixels */
    height: number;
    /** requested format for the return image. can be provided in service constructor */
    format?: 'image/png';
    /** Layers to render - can be provided in service constructor */
    layers?: string | string[];
    /** Coordinate Reference System for the image (not bounding box). can be provided in service constructor. */
    crs?: string;
    /** Styling. can be provided in service constructor */
    styles?: unknown;
    /** Don't render background when no data. can be provided in service constructor */
    transparent?: boolean;
    /** If layer supports time dimension */
    time?: string;
    /** If layer supports elevation dimension */
    elevation?: string;
};
/**
 * Parameters for GetFeatureInfo
 * @see https://imagery.pasda.psu.edu/arcgis/services/pasda/UrbanTreeCanopy_Landcover/MapServer/WmsServer?SERVICE=WFS&
 */
export type WFSGetFeatureInfoParameters = {
    /** In case the endpoint supports multiple WFS versions */
    version?: '1.3.0' | '1.1.1';
    /** x coordinate for the feature info request */
    x: number;
    /** y coordinate for the feature info request */
    y: number;
    /** MIME type of returned feature info. Can be specified in service constructor */
    info_format?: 'text/plain' | 'application/geojson' | 'application/vnd.ogc.gml';
    /** list of layers to query. Required but can be specified in service constructor. */
    query_layers?: string[];
    /** Layers to render. Required, but can be specified in service constructor */
    layers?: string[];
    /** Styling */
    styles?: unknown;
    /** bounding box of the requested map image */
    bbox: [number, number, number, number];
    /** pixel width of returned image */
    width: number;
    /** pixels */
    height: number;
    /** srs for the image (not the bounding box) */
    crs?: string;
};
/** GetMap parameters that are specific to the current view */
export type WFSGetFeatureInfoViewParameters = {
    /** x coordinate for the feature info request */
    x: number;
    /** y coordinate for the feature info request */
    y: number;
    /** pixel width of returned image */
    width: number;
    /** pixels */
    height: number;
    /** bounding box of the requested map image */
    bbox: [number, number, number, number];
    /** srs for the image (not the bounding box) */
    crs?: string;
};
/** Parameters for DescribeLayer */
export type WFSDescribeLayerParameters = {
    /** In case the endpoint supports multiple WFS versions */
    version?: '1.3.0' | '1.1.1';
};
/** Parameters for GetLegendGraphic */
export type WFSGetLegendGraphicParameters = {
    /** In case the endpoint supports multiple WFS versions */
    version?: '1.3.0' | '1.1.1';
};
/**
 * The WFSVectorSource class provides
 * - provides type safe methods to form URLs to a WFS service
 * - provides type safe methods to query and parse results (and errors) from a WFS service
 * - implements the VectorSource interface
 * @note Only the URL parameter conversion is supported. XML posts are not supported.
 */
export declare class WFSVectorSource extends VectorSource<WFSVectorSourceProps> {
    /** Base URL to the service */
    readonly url: string;
    readonly data: string;
    /** Default static vendor parameters */
    vendorParameters?: Record<string, unknown>;
    capabilities: WFSCapabilities | null;
    /** Create a WFSVectorSource */
    constructor(props: WFSVectorSourceProps);
    getSchema(): Promise<Schema>;
    getMetadata(): Promise<VectorSourceMetadata>;
    getFeatures(parameters: GetFeaturesParameters): Promise<GeoJSONTable>;
    normalizeMetadata(capabilities: WFSCapabilities): VectorSourceMetadata;
    /** Get Capabilities */
    getCapabilities(wmsParameters?: WFSGetCapabilitiesParameters, vendorParameters?: Record<string, unknown>): Promise<WFSCapabilities>;
    /** Get a map image *
    async getMap(
      wmsParameters: WFSGetMapParameters,
      vendorParameters?: Record<string, unknown>
    ): Promise<ImageType> {
      const url = this.getMapURL(wmsParameters, vendorParameters);
      const response = await this.fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this._checkResponse(response, arrayBuffer);
      try {
        return await ImageLoader.parse(arrayBuffer, this.loadOptions);
      } catch {
        throw this._parseError(arrayBuffer);
      }
    }
  
    /** Get Feature Info for a coordinate *
    async getFeatureInfo(
      wmsParameters: WFSGetFeatureInfoParameters,
      vendorParameters?: Record<string, unknown>
    ): Promise<WFSFeatureInfo> {
      const url = this.getFeatureInfoURL(wmsParameters, vendorParameters);
      const response = await this.fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this._checkResponse(response, arrayBuffer);
      return await WFSFeatureInfoLoader.parse(arrayBuffer, this.loadOptions);
    }
  
    /** Get Feature Info for a coordinate *
    async getFeatureInfoText(
      wmsParameters: WFSGetFeatureInfoParameters,
      vendorParameters?: Record<string, unknown>
    ): Promise<string> {
      const url = this.getFeatureInfoURL(wmsParameters, vendorParameters);
      const response = await this.fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this._checkResponse(response, arrayBuffer);
      return new TextDecoder().decode(arrayBuffer);
    }
  
    /** Get more information about a layer *
    async describeLayer(
      wmsParameters: WFSDescribeLayerParameters,
      vendorParameters?: Record<string, unknown>
    ): Promise<WFSLayerDescription> {
      const url = this.describeLayerURL(wmsParameters, vendorParameters);
      const response = await this.fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this._checkResponse(response, arrayBuffer);
      return await WFSLayerDescriptionLoader.parse(arrayBuffer, this.loadOptions);
    }
  
    /** Get an image with a semantic legend *
    async getLegendGraphic(
      wmsParameters: WFSGetLegendGraphicParameters,
      vendorParameters?: Record<string, unknown>
    ): Promise<ImageType> {
      const url = this.getLegendGraphicURL(wmsParameters, vendorParameters);
      const response = await this.fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this._checkResponse(response, arrayBuffer);
      try {
        return await ImageLoader.parse(arrayBuffer, this.loadOptions);
      } catch {
        throw this._parseError(arrayBuffer);
      }
    }
    */
    /** Generate a URL for the GetCapabilities request */
    getCapabilitiesURL(wmsParameters?: WFSGetCapabilitiesParameters, vendorParameters?: Record<string, unknown>): string;
    /** Generate a URL for the GetMap request */
    getMapURL(wmsParameters: WFSGetMapParameters, vendorParameters?: Record<string, unknown>): string;
    /** Generate a URL for the GetFeatureInfo request */
    getFeatureInfoURL(wmsParameters: WFSGetFeatureInfoParameters, vendorParameters?: Record<string, unknown>): string;
    /** Generate a URL for the GetFeatureInfo request */
    describeLayerURL(wmsParameters: WFSDescribeLayerParameters, vendorParameters?: Record<string, unknown>): string;
    getLegendGraphicURL(wmsParameters: WFSGetLegendGraphicParameters, vendorParameters?: Record<string, unknown>): string;
    _parseWFSUrl(url: string): {
        url: string;
        parameters: Record<string, unknown>;
    };
    /**
     * Generate a URL with parameters
     * @note case _getWFSUrl may need to be overridden to handle certain backends?
     * @note at the moment, only URLs with parameters are supported (no XML payloads)
     * */
    protected _getWFSUrl(request: string, wmsParameters: {
        version?: '1.3.0' | '1.1.1';
        [key: string]: unknown;
    }, vendorParameters?: Record<string, unknown>): string;
    _getWFS130Parameters<ParametersT extends {
        crs?: string;
        srs?: string;
    }>(wmsParameters: ParametersT): ParametersT;
    _getURLParameter(key: string, value: unknown, wmsParameters: WFSParameters): string;
    /** Coordinate order is flipped for certain CRS in WFS 1.3.0 */
    _flipBoundingBox(bboxValue: unknown, wmsParameters: WFSParameters): [number, number, number, number] | null;
    /** Fetches an array buffer and checks the response (boilerplate reduction) */
    protected _fetchArrayBuffer(url: string): Promise<ArrayBuffer>;
    /** Checks for and parses a WFS XML formatted ServiceError and throws an exception */
    protected _checkResponse(response: Response, arrayBuffer: ArrayBuffer): void;
    /** Error situation detected */
    protected _parseError(arrayBuffer: ArrayBuffer): Error;
}
//# sourceMappingURL=wfs-service.d.ts.map
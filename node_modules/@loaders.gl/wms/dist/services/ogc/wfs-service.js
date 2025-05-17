// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VectorSource, mergeLoaderOptions } from '@loaders.gl/loader-utils';
import { WFSCapabilitiesLoader } from "../../wfs-capabilities-loader.js";
import { WMSErrorLoader } from "../../wms-error-loader.js";
/* eslint-disable camelcase */ // WFS XML parameters use snake_case
/**
 * @ndeprecated This is a WIP, not fully implemented
 * @see https://developers.arcgis.com/rest/services-reference/enterprise/feature-service.htm
 */
export const WFSSource = {
    name: 'WFS',
    id: 'wfs',
    module: 'wms',
    version: '0.0.0',
    extensions: [],
    mimeTypes: [],
    options: {
        url: undefined,
        wfs: {
            /** Tabular loaders, normally the GeoJSONLoader */
            loaders: []
        }
    },
    type: 'wfs',
    fromUrl: true,
    fromBlob: false,
    testURL: (url) => url.toLowerCase().includes('wfs'),
    createDataSource: (url, props) => new WFSVectorSource(props)
};
//
/**
 * The WFSVectorSource class provides
 * - provides type safe methods to form URLs to a WFS service
 * - provides type safe methods to query and parse results (and errors) from a WFS service
 * - implements the VectorSource interface
 * @note Only the URL parameter conversion is supported. XML posts are not supported.
 */
export class WFSVectorSource extends VectorSource {
    /** Base URL to the service */
    url;
    data;
    // /** In WFS 1.3.0, replaces references to EPSG:4326 with CRS:84. But not always supported. Default: false */
    // substituteCRS84: boolean;
    // /** In WFS 1.3.0, flips x,y (lng, lat) coordinates for the supplied coordinate systems. Default: ['ESPG:4326'] */
    // flipCRS: string[];
    // /** Default static WFS parameters */
    // wmsParameters: Required<WFSParameters>;
    /** Default static vendor parameters */
    vendorParameters;
    capabilities = null;
    /** Create a WFSVectorSource */
    constructor(props) {
        super(props);
        // TODO - defaults such as version, layers etc could be extracted from a base URL with parameters
        // This would make pasting in any WFS URL more likely to make this class just work.
        // const {baseUrl, parameters} = this._parseWFSUrl(props.url);
        this.url = props.url;
        this.data = props.url;
        // this.substituteCRS84 = props.substituteCRS84 ?? false;
        // this.flipCRS = ['EPSG:4326'];
        // this.wmsParameters = {
        //   layers: undefined!,
        //   query_layers: undefined!,
        //   styles: undefined,
        //   version: '1.3.0',
        //   crs: 'EPSG:4326',
        //   format: 'image/png',
        //   info_format: 'text/plain',
        //   transparent: undefined!,
        //   time: undefined!,
        //   elevation: undefined!,
        //   ...props.wmsParameters
        // };
        // this.vendorParameters = props.vendorParameters || {};
    }
    async getSchema() {
        return { metadata: {}, fields: [] };
    }
    // VectorSource implementation
    async getMetadata() {
        const capabilities = await this.getCapabilities();
        return this.normalizeMetadata(capabilities);
    }
    async getFeatures(parameters) {
        // Replace the GetImage `boundingBox` parameter with the WFS flat `bbox` parameter.
        // const {boundingBox, bbox, ...rest} = parameters;
        // const wmsParameters: WFSGetMapParameters = {
        //   bbox: boundingBox ? [...boundingBox[0], ...boundingBox[1]] : bbox!,
        //   ...rest
        // };
        return { shape: 'geojson-table', type: 'FeatureCollection', features: [] };
    }
    normalizeMetadata(capabilities) {
        return capabilities;
    }
    // WFS Service API Stubs
    /** Get Capabilities */
    async getCapabilities(wmsParameters, vendorParameters) {
        const url = this.getCapabilitiesURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        const capabilities = await WFSCapabilitiesLoader.parse(arrayBuffer, this.loadOptions);
        this.capabilities = capabilities;
        return capabilities;
    }
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
    // Typed URL creators
    // For applications that want full control of fetching and parsing
    /** Generate a URL for the GetCapabilities request */
    getCapabilitiesURL(wmsParameters, vendorParameters) {
        // @ts-expect-error
        const options = {
            // version: this.wmsParameters.version,
            ...wmsParameters
        };
        return this._getWFSUrl('GetCapabilities', options, vendorParameters);
    }
    /** Generate a URL for the GetMap request */
    getMapURL(wmsParameters, vendorParameters) {
        wmsParameters = this._getWFS130Parameters(wmsParameters);
        // @ts-expect-error
        const options = {
            // version: this.wmsParameters.version,
            // format: this.wmsParameters.format,
            // transparent: this.wmsParameters.transparent,
            // time: this.wmsParameters.time,
            // elevation: this.wmsParameters.elevation,
            // layers: this.wmsParameters.layers,
            // styles: this.wmsParameters.styles,
            // crs: this.wmsParameters.crs,
            // bbox: [-77.87304, 40.78975, -77.85828, 40.80228],
            // width: 1200,
            // height: 900,
            ...wmsParameters
        };
        return this._getWFSUrl('GetMap', options, vendorParameters);
    }
    /** Generate a URL for the GetFeatureInfo request */
    getFeatureInfoURL(wmsParameters, vendorParameters) {
        wmsParameters = this._getWFS130Parameters(wmsParameters);
        // Replace the GetImage `boundingBox` parameter with the WFS flat `bbox` parameter.
        const { boundingBox, bbox } = wmsParameters;
        wmsParameters.bbox = boundingBox ? [...boundingBox[0], ...boundingBox[1]] : bbox;
        // @ts-expect-error
        const options = {
            // version: this.wmsParameters.version,
            // // query_layers: [],
            // // format: this.wmsParameters.format,
            // info_format: this.wmsParameters.info_format,
            // layers: this.wmsParameters.layers,
            // query_layers: this.wmsParameters.query_layers,
            // styles: this.wmsParameters.styles,
            // crs: this.wmsParameters.crs,
            // bbox: [-77.87304, 40.78975, -77.85828, 40.80228],
            // width: 1200,
            // height: 900,
            // x: undefined!,
            // y: undefined!,
            ...wmsParameters
        };
        return this._getWFSUrl('GetFeatureInfo', options, vendorParameters);
    }
    /** Generate a URL for the GetFeatureInfo request */
    describeLayerURL(wmsParameters, vendorParameters) {
        // @ts-expect-error
        const options = {
            // version: this.wmsParameters.version,
            ...wmsParameters
        };
        return this._getWFSUrl('DescribeLayer', options, vendorParameters);
    }
    getLegendGraphicURL(wmsParameters, vendorParameters) {
        // @ts-expect-error
        const options = {
            // version: this.wmsParameters.version,
            // format?
            ...wmsParameters
        };
        return this._getWFSUrl('GetLegendGraphic', options, vendorParameters);
    }
    // INTERNAL METHODS
    _parseWFSUrl(url) {
        const [baseUrl, search] = url.split('?');
        const searchParams = search.split('&');
        const parameters = {};
        for (const parameter of searchParams) {
            const [key, value] = parameter.split('=');
            parameters[key] = value;
        }
        return { url: baseUrl, parameters };
    }
    /**
     * Generate a URL with parameters
     * @note case _getWFSUrl may need to be overridden to handle certain backends?
     * @note at the moment, only URLs with parameters are supported (no XML payloads)
     * */
    _getWFSUrl(request, wmsParameters, vendorParameters) {
        let url = this.url;
        let first = true;
        // Add any vendor searchParams
        const allParameters = {
            service: 'WFS',
            version: wmsParameters.version,
            request,
            ...wmsParameters,
            ...this.vendorParameters,
            ...vendorParameters
        };
        // Encode the keys
        const IGNORE_EMPTY_KEYS = ['transparent', 'time', 'elevation'];
        for (const [key, value] of Object.entries(allParameters)) {
            // hack to preserve test cases. Not super clear if keys should be included when values are undefined
            if (!IGNORE_EMPTY_KEYS.includes(key) || value) {
                url += first ? '?' : '&';
                first = false;
                url += this._getURLParameter(key, value, wmsParameters);
            }
        }
        return encodeURI(url);
    }
    _getWFS130Parameters(wmsParameters) {
        const newParameters = { ...wmsParameters };
        if (newParameters.srs) {
            newParameters.crs = newParameters.crs || newParameters.srs;
            delete newParameters.srs;
        }
        return newParameters;
    }
    // eslint-disable-next-line complexity
    _getURLParameter(key, value, wmsParameters) {
        // Substitute by key
        switch (key) {
            case 'crs':
                // CRS was called SRS before WFS 1.3.0
                if (wmsParameters.version !== '1.3.0') {
                    key = 'srs';
                    // } else if (this.substituteCRS84 && value === 'EPSG:4326') {
                    //   /** In 1.3.0, replaces references to 'EPSG:4326' with the new backwards compatible CRS:84 */
                    //   // Substitute by value
                    //   value = 'CRS:84';
                }
                break;
            case 'srs':
                // CRS was called SRS before WFS 1.3.0
                if (wmsParameters.version === '1.3.0') {
                    key = 'crs';
                }
                break;
            case 'bbox':
                // Coordinate order is flipped for certain CRS in WFS 1.3.0
                const bbox = this._flipBoundingBox(value, wmsParameters);
                if (bbox) {
                    value = bbox;
                }
                break;
            case 'x':
                // i is the parameter used in WFS 1.3
                // TODO - change parameter to `i` and convert to `x` if not 1.3
                if (wmsParameters.version === '1.3.0') {
                    key = 'i';
                }
                break;
            case 'y':
                // j is the parameter used in WFS 1.3
                // TODO - change parameter to `j` and convert to `y` if not 1.3
                if (wmsParameters.version === '1.3.0') {
                    key = 'j';
                }
                break;
            default:
            // do nothing
        }
        key = key.toUpperCase();
        return Array.isArray(value)
            ? `${key}=${value.join(',')}`
            : `${key}=${value ? String(value) : ''}`;
    }
    /** Coordinate order is flipped for certain CRS in WFS 1.3.0 */
    _flipBoundingBox(bboxValue, wmsParameters) {
        // Sanity checks
        if (!Array.isArray(bboxValue) || bboxValue.length !== 4) {
            return null;
        }
        const flipCoordinates = false;
        // // Only affects WFS 1.3.0
        // wmsParameters.version === '1.3.0' &&
        // // Flip if we are dealing with a CRS that was flipped in 1.3.0
        // this.flipCRS.includes(wmsParameters.crs || '') &&
        // // Don't flip if we are substituting EPSG:4326 with CRS:84
        // !(this.substituteCRS84 && wmsParameters.crs === 'EPSG:4326');
        const bbox = bboxValue;
        return flipCoordinates ? [bbox[1], bbox[0], bbox[3], bbox[2]] : bbox;
    }
    /** Fetches an array buffer and checks the response (boilerplate reduction) */
    async _fetchArrayBuffer(url) {
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        return arrayBuffer;
    }
    /** Checks for and parses a WFS XML formatted ServiceError and throws an exception */
    _checkResponse(response, arrayBuffer) {
        const contentType = response.headers['content-type'];
        if (!response.ok || WMSErrorLoader.mimeTypes.includes(contentType)) {
            // We want error responses to throw exceptions, the WMSErrorLoader can do this
            const loadOptions = mergeLoaderOptions(this.loadOptions, {
                wms: { throwOnError: true }
            });
            const error = WMSErrorLoader.parseSync?.(arrayBuffer, loadOptions);
            throw new Error(error);
        }
    }
    /** Error situation detected */
    _parseError(arrayBuffer) {
        const error = WMSErrorLoader.parseSync?.(arrayBuffer, this.loadOptions);
        return new Error(error);
    }
}

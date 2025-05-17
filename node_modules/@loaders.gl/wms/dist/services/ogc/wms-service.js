// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { ImageLoader } from '@loaders.gl/images';
import { mergeLoaderOptions, ImageSource } from '@loaders.gl/loader-utils';
import { WMSCapabilitiesLoader } from "../../wms-capabilities-loader.js";
import { WMSFeatureInfoLoader } from "../../wip/wms-feature-info-loader.js";
import { WMSLayerDescriptionLoader } from "../../wip/wms-layer-description-loader.js";
import { WMSErrorLoader } from "../../wms-error-loader.js";
export const WMSSource = {
    name: 'Web Map Service (OGC WMS)',
    id: 'wms',
    module: 'wms',
    version: '0.0.0',
    extensions: [],
    mimeTypes: [],
    options: {
        wms: {
        // TODO - add options here
        }
    },
    type: 'wms',
    fromUrl: true,
    fromBlob: false,
    testURL: (url) => url.toLowerCase().includes('wms'),
    createDataSource: (url, props) => new WMSImageSource(url, props)
};
//
/**
 * The WMSImageSource class provides
 * - provides type safe methods to form URLs to a WMS service
 * - provides type safe methods to query and parse results (and errors) from a WMS service
 * - implements the ImageSource interface
 * @note Only the URL parameter conversion is supported. XML posts are not supported.
 */
export class WMSImageSource extends ImageSource {
    /** Base URL to the service */
    url;
    data;
    /** In WMS 1.3.0, replaces references to EPSG:4326 with CRS:84. But not always supported. Default: false */
    substituteCRS84;
    /** In WMS 1.3.0, flips x,y (lng, lat) coordinates for the supplied coordinate systems. Default: ['ESPG:4326'] */
    flipCRS;
    /** Default static WMS parameters */
    wmsParameters;
    /** Default static vendor parameters */
    vendorParameters;
    capabilities = null;
    /** Create a WMSImageSource */
    constructor(url, props) {
        super(props);
        // TODO - defaults such as version, layers etc could be extracted from a base URL with parameters
        // This would make pasting in any WMS URL more likely to make this class just work.
        // const {baseUrl, parameters} = this._parseWMSUrl(props.url);
        this.url = url;
        this.data = url;
        this.substituteCRS84 = props.wms?.substituteCRS84 ?? props.substituteCRS84 ?? false;
        this.flipCRS = ['EPSG:4326'];
        this.wmsParameters = {
            layers: undefined,
            query_layers: undefined,
            styles: undefined,
            version: '1.3.0',
            crs: 'EPSG:4326',
            format: 'image/png',
            info_format: 'text/plain',
            transparent: undefined,
            time: undefined,
            elevation: undefined,
            ...props.wmsParameters, // deprecated
            ...props.wms?.wmsParameters
        };
        this.vendorParameters = props.wms?.vendorParameters || props.vendorParameters || {};
    }
    // ImageSource implementation
    async getMetadata() {
        const capabilities = await this.getCapabilities();
        return this.normalizeMetadata(capabilities);
    }
    async getImage(parameters) {
        // Replace the GetImage `boundingBox` parameter with the WMS flat `bbox` parameter.
        const { boundingBox, bbox, ...rest } = parameters;
        const wmsParameters = {
            bbox: boundingBox ? [...boundingBox[0], ...boundingBox[1]] : bbox,
            ...rest
        };
        return await this.getMap(wmsParameters);
    }
    normalizeMetadata(capabilities) {
        return capabilities;
    }
    // WMS Service API Stubs
    /** Get Capabilities */
    async getCapabilities(wmsParameters, vendorParameters) {
        const url = this.getCapabilitiesURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        const capabilities = await WMSCapabilitiesLoader.parse(arrayBuffer, this.loadOptions);
        this.capabilities = capabilities;
        return capabilities;
    }
    /** Get a map image */
    async getMap(wmsParameters, vendorParameters) {
        const url = this.getMapURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        try {
            return await ImageLoader.parse(arrayBuffer, this.loadOptions);
        }
        catch {
            throw this._parseError(arrayBuffer);
        }
    }
    /** Get Feature Info for a coordinate */
    async getFeatureInfo(wmsParameters, vendorParameters) {
        const url = this.getFeatureInfoURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        return await WMSFeatureInfoLoader.parse(arrayBuffer, this.loadOptions);
    }
    /** Get Feature Info for a coordinate */
    async getFeatureInfoText(wmsParameters, vendorParameters) {
        const url = this.getFeatureInfoURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        return new TextDecoder().decode(arrayBuffer);
    }
    /** Get more information about a layer */
    async describeLayer(wmsParameters, vendorParameters) {
        const url = this.describeLayerURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        return await WMSLayerDescriptionLoader.parse(arrayBuffer, this.loadOptions);
    }
    /** Get an image with a semantic legend */
    async getLegendGraphic(wmsParameters, vendorParameters) {
        const url = this.getLegendGraphicURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        try {
            return await ImageLoader.parse(arrayBuffer, this.loadOptions);
        }
        catch {
            throw this._parseError(arrayBuffer);
        }
    }
    // Typed URL creators
    // For applications that want full control of fetching and parsing
    /** Generate a URL for the GetCapabilities request */
    getCapabilitiesURL(wmsParameters, vendorParameters) {
        const options = {
            version: this.wmsParameters.version,
            ...wmsParameters
        };
        return this._getWMSUrl('GetCapabilities', options, vendorParameters);
    }
    /** Generate a URL for the GetMap request */
    getMapURL(wmsParameters, vendorParameters) {
        wmsParameters = this._getWMS130Parameters(wmsParameters);
        const options = {
            version: this.wmsParameters.version,
            format: this.wmsParameters.format,
            transparent: this.wmsParameters.transparent,
            time: this.wmsParameters.time,
            elevation: this.wmsParameters.elevation,
            layers: this.wmsParameters.layers,
            styles: this.wmsParameters.styles,
            crs: this.wmsParameters.crs,
            // bbox: [-77.87304, 40.78975, -77.85828, 40.80228],
            // width: 1200,
            // height: 900,
            ...wmsParameters
        };
        return this._getWMSUrl('GetMap', options, vendorParameters);
    }
    /** Generate a URL for the GetFeatureInfo request */
    getFeatureInfoURL(wmsParameters, vendorParameters) {
        wmsParameters = this._getWMS130Parameters(wmsParameters);
        // Replace the GetImage `boundingBox` parameter with the WMS flat `bbox` parameter.
        const { boundingBox, bbox } = wmsParameters;
        wmsParameters.bbox = boundingBox ? [...boundingBox[0], ...boundingBox[1]] : bbox;
        const options = {
            version: this.wmsParameters.version,
            // query_layers: [],
            // format: this.wmsParameters.format,
            info_format: this.wmsParameters.info_format,
            layers: this.wmsParameters.layers,
            query_layers: this.wmsParameters.query_layers,
            styles: this.wmsParameters.styles,
            crs: this.wmsParameters.crs,
            // bbox: [-77.87304, 40.78975, -77.85828, 40.80228],
            // width: 1200,
            // height: 900,
            // x: undefined!,
            // y: undefined!,
            ...wmsParameters
        };
        return this._getWMSUrl('GetFeatureInfo', options, vendorParameters);
    }
    /** Generate a URL for the GetFeatureInfo request */
    describeLayerURL(wmsParameters, vendorParameters) {
        const options = {
            version: this.wmsParameters.version,
            ...wmsParameters
        };
        return this._getWMSUrl('DescribeLayer', options, vendorParameters);
    }
    getLegendGraphicURL(wmsParameters, vendorParameters) {
        const options = {
            version: this.wmsParameters.version,
            // format?
            ...wmsParameters
        };
        return this._getWMSUrl('GetLegendGraphic', options, vendorParameters);
    }
    // INTERNAL METHODS
    _parseWMSUrl(url) {
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
     * @note case _getWMSUrl may need to be overridden to handle certain backends?
     * @note at the moment, only URLs with parameters are supported (no XML payloads)
     * */
    _getWMSUrl(request, wmsParameters, vendorParameters) {
        let url = this.url;
        let first = true;
        // Add any vendor searchParams
        const allParameters = {
            service: 'WMS',
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
    _getWMS130Parameters(wmsParameters) {
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
                // CRS was called SRS before WMS 1.3.0
                if (wmsParameters.version !== '1.3.0') {
                    key = 'srs';
                }
                else if (this.substituteCRS84 && value === 'EPSG:4326') {
                    /** In 1.3.0, replaces references to 'EPSG:4326' with the new backwards compatible CRS:84 */
                    // Substitute by value
                    value = 'CRS:84';
                }
                break;
            case 'srs':
                // CRS was called SRS before WMS 1.3.0
                if (wmsParameters.version === '1.3.0') {
                    key = 'crs';
                }
                break;
            case 'bbox':
                // Coordinate order is flipped for certain CRS in WMS 1.3.0
                const bbox = this._flipBoundingBox(value, wmsParameters);
                if (bbox) {
                    value = bbox;
                }
                break;
            case 'x':
                // i is the parameter used in WMS 1.3
                // TODO - change parameter to `i` and convert to `x` if not 1.3
                if (wmsParameters.version === '1.3.0') {
                    key = 'i';
                }
                break;
            case 'y':
                // j is the parameter used in WMS 1.3
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
    /** Coordinate order is flipped for certain CRS in WMS 1.3.0 */
    _flipBoundingBox(bboxValue, wmsParameters) {
        // Sanity checks
        if (!Array.isArray(bboxValue) || bboxValue.length !== 4) {
            return null;
        }
        const flipCoordinates = 
        // Only affects WMS 1.3.0
        wmsParameters.version === '1.3.0' &&
            // Flip if we are dealing with a CRS that was flipped in 1.3.0
            this.flipCRS.includes(wmsParameters.crs || '') &&
            // Don't flip if we are substituting EPSG:4326 with CRS:84
            !(this.substituteCRS84 && wmsParameters.crs === 'EPSG:4326');
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
    /** Checks for and parses a WMS XML formatted ServiceError and throws an exception */
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

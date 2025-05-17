// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { DataSource } from '@loaders.gl/loader-utils';
import { CSWCapabilitiesLoader } from "../../csw-capabilities-loader.js";
import { CSWRecordsLoader } from "../../csw-records-loader.js";
import { CSWDomainLoader } from "../../csw-domain-loader.js";
import { WMSErrorLoader as CSWErrorLoader } from "../../wms-error-loader.js";
/**
 * The CSWService class
 * - provides type safe methods to form URLs to a CSW service
 * - provides type safe methods to query and parse results (and errors) from a CSW service
 * @note Only the URL parameter conversion is supported. XML posts are not supported.
 */
export class CSWService extends DataSource {
    static type = 'csw';
    static testURL = (url) => url.toLowerCase().includes('csw');
    capabilities = null;
    data;
    url;
    /** A list of loaders used by the CSWService methods */
    loaders = [CSWErrorLoader, CSWCapabilitiesLoader];
    /** Create a CSWService */
    constructor(props) {
        super(props);
        this.url = props.url;
        this.data = props.url;
    }
    async getMetadata() {
        const capabilities = await this.getCapabilities();
        return this.normalizeMetadata(capabilities);
    }
    normalizeMetadata(capabilities) {
        return capabilities;
    }
    async getServiceDirectory(options) {
        const services = [];
        const unknownServices = [];
        const records = await this.getRecords();
        for (const record of records.records) {
            for (const reference of record.references) {
                const url = reference.value;
                switch (reference.scheme) {
                    case 'OGC:WMS':
                        services.push({ name: record.title, type: 'ogc-wms-service', ...this._parseOGCUrl(url) });
                        break;
                    case 'OGC:WMTS':
                        services.push({
                            name: record.title,
                            type: 'ogc-wmts-service',
                            ...this._parseOGCUrl(url)
                        });
                        break;
                    case 'OGC:WFS':
                        services.push({ name: record.title, type: 'ogc-wfs-service', ...this._parseOGCUrl(url) });
                        break;
                    default:
                        unknownServices.push({
                            name: record.title,
                            type: 'unknown',
                            url: reference.value,
                            scheme: reference.scheme
                        });
                }
            }
        }
        return options?.includeUnknown ? services.concat(unknownServices) : services;
    }
    _parseOGCUrl(url) {
        const parts = url.split('?');
        return {
            url: parts[0],
            params: parts[1] || ''
        };
    }
    // CSW Service API Stubs
    /** Get Capabilities */
    async getCapabilities(wmsParameters, vendorParameters) {
        const url = this.getCapabilitiesURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        const capabilities = await CSWCapabilitiesLoader.parse(arrayBuffer, this.props.loadOptions);
        return capabilities;
    }
    /** Get Records */
    async getRecords(wmsParameters, vendorParameters) {
        const url = this.getRecordsURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        return await CSWRecordsLoader.parse(arrayBuffer, this.props.loadOptions);
    }
    /** Get Domain */
    async getDomain(wmsParameters, vendorParameters) {
        const url = this.getDomainURL(wmsParameters, vendorParameters);
        const response = await this.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this._checkResponse(response, arrayBuffer);
        return await CSWDomainLoader.parse(arrayBuffer, this.props.loadOptions);
    }
    // Typed URL creators
    // For applications that want full control of fetching and parsing
    /** Generate a URL for the GetCapabilities request */
    getCapabilitiesURL(wmsParameters, vendorParameters) {
        const options = {
            version: '3.0.0',
            ...wmsParameters,
            ...vendorParameters,
            service: 'CSW',
            request: 'GetCapabilities'
        };
        return this._getCSWUrl(options, vendorParameters);
    }
    /** Generate a URL for the GetCapabilities request */
    getRecordsURL(wmsParameters, vendorParameters) {
        const options = {
            version: '3.0.0',
            typenames: 'csw:Record',
            ...wmsParameters,
            ...vendorParameters,
            service: 'CSW',
            request: 'GetRecords'
        };
        return this._getCSWUrl(options, vendorParameters);
    }
    /** Generate a URL for the GetCapabilities request */
    getDomainURL(wmsParameters, vendorParameters) {
        const options = {
            version: '3.0.0',
            ...wmsParameters,
            ...vendorParameters,
            service: 'CSW',
            request: 'GetDomain'
        };
        return this._getCSWUrl(options, vendorParameters);
    }
    // INTERNAL METHODS
    /**
     * @note case _getCSWUrl may need to be overridden to handle certain backends?
     * */
    _getCSWUrl(options, vendorParameters) {
        let url = this.props.url;
        let first = true;
        for (const [key, value] of Object.entries(options)) {
            url += first ? '?' : '&';
            first = false;
            if (Array.isArray(value)) {
                url += `${key.toUpperCase()}=${value.join(',')}`;
            }
            else {
                url += `${key.toUpperCase()}=${value ? String(value) : ''}`;
            }
        }
        return encodeURI(url);
    }
    /** Checks for and parses a CSW XML formatted ServiceError and throws an exception */
    _checkResponse(response, arrayBuffer) {
        const contentType = response.headers['content-type'];
        if (!response.ok || CSWErrorLoader.mimeTypes.includes(contentType)) {
            const error = CSWErrorLoader.parseSync?.(arrayBuffer, this.props.loadOptions);
            throw new Error(error);
        }
    }
    /** Error situation detected */
    _parseError(arrayBuffer) {
        const error = CSWErrorLoader.parseSync?.(arrayBuffer, this.props.loadOptions);
        return new Error(error);
    }
}

// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { isResponse, isBlob } from "../../javascript-utils/is-type.js";
import { parseMIMEType, parseMIMETypeFromURL } from "./mime-type-utils.js";
import { stripQueryString } from "./url-utils.js";
/**
 * Returns the URL associated with this resource.
 * The returned value may include a query string and need further processing.
 * If it cannot determine url, the corresponding value will be an empty string
 *
 * @todo string parameters are assumed to be URLs
 */
export function getResourceUrl(resource) {
    // If resource is a `Response`, it contains the information directly as a field
    if (isResponse(resource)) {
        const response = resource;
        return response.url;
    }
    // If the resource is a Blob or a File (subclass of Blob)
    if (isBlob(resource)) {
        const blob = resource;
        // File objects have a "name" property. Blob objects don't have any
        // url (name) information
        return blob.name || '';
    }
    if (typeof resource === 'string') {
        return resource;
    }
    // Unknown
    return '';
}
/**
 * Returns the URL associated with this resource.
 * The returned value may include a query string and need further processing.
 * If it cannot determine url, the corresponding value will be an empty string
 *
 * @todo string parameters are assumed to be URLs
 */
export function getResourceMIMEType(resource) {
    // If resource is a response, it contains the information directly
    if (isResponse(resource)) {
        const response = resource;
        const contentTypeHeader = response.headers.get('content-type') || '';
        const noQueryUrl = stripQueryString(response.url);
        return parseMIMEType(contentTypeHeader) || parseMIMETypeFromURL(noQueryUrl);
    }
    // If the resource is a Blob or a File (subclass of Blob)
    if (isBlob(resource)) {
        const blob = resource;
        return blob.type || '';
    }
    if (typeof resource === 'string') {
        return parseMIMETypeFromURL(resource);
    }
    // Unknown
    return '';
}
/**
  * Returns (approximate) content length for a resource if it can be determined.
  * Returns -1 if content length cannot be determined.
  * @param resource

  * @note string parameters are NOT assumed to be URLs
  */
export function getResourceContentLength(resource) {
    if (isResponse(resource)) {
        const response = resource;
        return response.headers['content-length'] || -1;
    }
    if (isBlob(resource)) {
        const blob = resource;
        return blob.size;
    }
    if (typeof resource === 'string') {
        // TODO - handle data URL?
        return resource.length;
    }
    if (resource instanceof ArrayBuffer) {
        return resource.byteLength;
    }
    if (ArrayBuffer.isView(resource)) {
        return resource.byteLength;
    }
    return -1;
}

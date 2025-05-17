// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { XMLLoader } from '@loaders.gl/xml';
import { getXMLArray, getXMLStringArray, getXMLInteger, getXMLFloat, getXMLBoolean } from "../xml/parse-xml-helpers.js";
/**
 * Parses a typed data structure from raw XML for `GetCapabilities` response
 * @note Error handlings is fairly weak
 */
export function parseWMSCapabilities(xmlText, options) {
    const parsedXML = XMLLoader.parseTextSync?.(xmlText, options);
    const xmlCapabilities = parsedXML.WMT_MS_Capabilities || parsedXML.WMS_Capabilities || parsedXML;
    const capabilities = extractCapabilities(xmlCapabilities);
    // In case the processed, normalized capabilities do not contain everything,
    // the user can get the parsed XML structure.
    if (options?.inheritedLayerProps) {
        // Traverse layers and inject missing props from parents
        for (const layer of capabilities.layers) {
            addInheritedLayerProps(layer, null);
        }
        // Not yet implemented
    }
    if (options?.includeRawJSON) {
        capabilities.json = xmlCapabilities;
    }
    if (options?.includeXMLText) {
        capabilities.xml = xmlText;
    }
    return capabilities;
}
/** Extract typed capability data from XML */
function extractCapabilities(xml) {
    const capabilities = {
        version: String(xml.version || ''),
        name: String(xml.Service?.Name || 'unnamed'),
        title: xml.Service?.Title ? String(xml.Service?.Title) : undefined,
        abstract: xml.Service?.Abstract ? String(xml.Service?.Abstract) : undefined,
        keywords: getXMLStringArray(xml.Service?.KeywordList?.Keyword),
        fees: xml.Service?.Fees ? JSON.stringify(xml.Service?.Fees) : undefined,
        accessConstraints: xml.Service?.AccessConstraints
            ? JSON.stringify(xml.Service?.AccessConstraints)
            : undefined,
        layerLimit: getXMLInteger(xml.Service?.LayerLimit),
        maxWidth: getXMLInteger(xml.Service?.maxWidth),
        maxHeight: getXMLInteger(xml.Service?.maxHeight),
        layers: [],
        requests: extractRequests(xml.Capability?.Request),
        exceptions: extractExceptions(xml.Exception)
        // contact field is a mess of largely irrelevant information, put it last
        // contact: xml.Service?.Contact ? JSON.stringify(xml.Service?.Contact) : undefined,
    };
    // LAYERS
    const xmlLayers = getXMLArray(xml.Capability?.Layer);
    for (const xmlSubLayer of xmlLayers) {
        capabilities.layers.push(extractLayer(xmlSubLayer));
    }
    // Clean up object
    for (const [key, value] of Object.entries(capabilities)) {
        if (value === undefined) {
            delete capabilities[key];
        }
    }
    return capabilities;
}
/** Extract typed request metadata from XML requests field */
function extractRequests(xmlRequests) {
    const requests = {};
    for (const [name, xmlRequest] of Object.entries(xmlRequests || {})) {
        const mimeTypes = getXMLStringArray(xmlRequest?.Format);
        requests[name] = { mimeTypes };
    }
    return requests;
}
function extractExceptions(xmlException) {
    const xmlExceptionFormats = getXMLArray(xmlException?.Format);
    if (xmlExceptionFormats.length > 0) {
        return {
            mimeTypes: getXMLStringArray(xmlException)
        };
    }
    return undefined;
}
/** Extract request data */
// eslint-disable-next-line complexity, max-statements
function extractLayer(xmlLayer) {
    const layer = {
        // All layers must have a title
        title: String(xmlLayer?.Title || ''),
        // Name is required only if renderable
        name: xmlLayer?.Name && String(xmlLayer?.Name),
        abstract: xmlLayer?.Name && String(xmlLayer?.Abstract),
        keywords: getXMLStringArray(xmlLayer.KeywordList?.Keyword)
    };
    // WMS 1.3.0 changes SRS to CRS
    const crs = xmlLayer?.CRS || xmlLayer?.SRS;
    if (crs && Array.isArray(crs) && crs.every((_) => typeof _ === 'string')) {
        layer.crs = crs;
    }
    // v1.3.0 extract simple geographic bounding box
    let geographicBoundingBox = xmlLayer?.EX_GeographicBoundingBox && extractEXBoundingBox(xmlLayer?.EX_GeographicBoundingBox);
    if (geographicBoundingBox) {
        layer.geographicBoundingBox = geographicBoundingBox;
    }
    // v1.1.1 extract simple geographic bounding box
    geographicBoundingBox =
        xmlLayer?.LatLonBoundingBox && extractLatLonBoundingBox(xmlLayer?.LatLonBoundingBox);
    if (geographicBoundingBox) {
        layer.geographicBoundingBox = geographicBoundingBox;
    }
    // Extract per-CRS bounding boxes
    const boundingBoxes = xmlLayer?.BoundingBox && extractWMSBoundingBoxes(xmlLayer?.BoundingBox);
    if (boundingBoxes && boundingBoxes.length > 0) {
        layer.boundingBoxes = boundingBoxes;
    }
    // Extract dimensions
    const xmlDimensions = getXMLArray(xmlLayer?.Dimension);
    const dimensions = xmlDimensions.map((xml) => extractDimension(xml));
    if (dimensions.length) {
        layer.dimensions = dimensions;
    }
    if (xmlLayer?.opaque) {
        layer.opaque = getXMLBoolean(xmlLayer?.opaque);
    }
    if (xmlLayer?.cascaded) {
        layer.cascaded = getXMLBoolean(xmlLayer?.cascaded);
    }
    if (xmlLayer?.queryable) {
        layer.queryable = getXMLBoolean(xmlLayer?.queryable);
    }
    // Single layer is not represented as array in XML
    const xmlLayers = getXMLArray(xmlLayer?.Layer);
    const layers = [];
    for (const xmlSubLayer of xmlLayers) {
        layers.push(extractLayer(xmlSubLayer));
    }
    if (layers.length > 0) {
        layer.layers = layers;
    }
    // Clean up object
    for (const [key, value] of Object.entries(layer)) {
        if (value === undefined) {
            delete layer[key];
        }
    }
    return layer;
}
/** WMS 1.3.0 Loosely defined geospatial bounding box in unspecified CRS for quick content searches */
function extractEXBoundingBox(xmlBoundingBox) {
    const { westBoundLongitude: w, northBoundLatitude: n, eastBoundLongitude: e, southBoundLatitude: s } = xmlBoundingBox;
    return [
        [w, s],
        [e, n]
    ];
}
/** WMS 1.1.1 Loosely defined geospatial bounding box in unspecified CRS for quick content searches */
function extractLatLonBoundingBox(xmlBoundingBox) {
    const { minx, miny, maxx, maxy } = xmlBoundingBox;
    return [
        [minx, miny],
        [maxx, maxy]
    ];
}
/** Loosely defined geospatial bounding box in unspecified CRS for quick content searches */
function extractWMSBoundingBoxes(xmlBoundingBoxes) {
    const xmlBoxes = getXMLArray(xmlBoundingBoxes);
    return xmlBoxes.map((xmlBox) => extractWMSBoundingBox(xmlBox));
}
/** Loosely defined geospatial bounding box in unspecified CRS for quick content searches */
function extractWMSBoundingBox(xmlBoundingBox) {
    const { CRS, SRS, minx, miny, maxx, maxy, resx, resy } = xmlBoundingBox;
    const boundingBox = {
        // CRS in 1.3.0, SRS in 1.1.1
        crs: CRS || SRS,
        boundingBox: [
            [getXMLFloat(minx), getXMLFloat(miny)],
            [getXMLFloat(maxx), getXMLFloat(maxy)]
        ]
    };
    if (resx) {
        boundingBox.xResolution = resx;
    }
    if (resy) {
        boundingBox.yResolution = resy;
    }
    return boundingBox;
}
/**
 * Extracts optional WMS Dimension layer field
 * @param xmlDimension
 * @example <Dimension name="time" units="ISO8601" default="2018-01-01" nearestValue="0">2001-01-01/2018-01-01/P1Y</Dimension>
 * @see https://mapserver.org/ogc/wms_dimension.html
 */
function extractDimension(xmlDimension) {
    const { name, units, value: extent } = xmlDimension;
    const dimension = { name, units, extent };
    if (xmlDimension.unitSymbol) {
        dimension.unitSymbol = xmlDimension.unitSymbol;
    }
    if (xmlDimension.default) {
        dimension.defaultValue = xmlDimension.default;
    }
    if (xmlDimension.multipleValues) {
        dimension.multipleValues = getXMLBoolean(xmlDimension.multipleValues);
    }
    if (xmlDimension.nearestValue) {
        dimension.nearestValue = getXMLBoolean(xmlDimension.nearestValue);
    }
    if (xmlDimension.current) {
        dimension.current = getXMLBoolean(xmlDimension.current);
    }
    return dimension;
}
/** Traverse layers and inject missing props from parents */
// eslint-disable-next-line complexity
function addInheritedLayerProps(layer, parent) {
    if (parent?.geographicBoundingBox && !layer.geographicBoundingBox) {
        layer.geographicBoundingBox = [...parent.geographicBoundingBox];
    }
    if (parent?.crs && !layer.crs) {
        layer.crs = [...parent.crs];
    }
    if (parent?.boundingBoxes && !layer.boundingBoxes) {
        layer.boundingBoxes = [...parent.boundingBoxes];
    }
    if (parent?.dimensions && !layer.dimensions) {
        layer.dimensions = [...parent.dimensions];
    }
    for (const subLayer of layer.layers || []) {
        addInheritedLayerProps(subLayer, layer);
    }
}

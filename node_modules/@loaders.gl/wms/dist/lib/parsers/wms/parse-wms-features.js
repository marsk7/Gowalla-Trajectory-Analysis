// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { XMLLoader } from '@loaders.gl/xml';
/**
 * Parses a typed data structure from raw XML for `GetFeatureInfo` response
 * @note Error handlings is fairly weak
 */
export function parseWMSFeatureInfo(text, options) {
    const parsedXML = XMLLoader.parseTextSync?.(text, options);
    const xmlFeatureInfo = parsedXML.FeatureInfoResponse?.FIELDS || [];
    const xmlFeatures = Array.isArray(xmlFeatureInfo) ? xmlFeatureInfo : [xmlFeatureInfo];
    return {
        features: xmlFeatures.map((xmlFeature) => extractFeature(xmlFeature))
    };
}
function extractFeature(xmlFeature) {
    const xmlFields = xmlFeature || {};
    // TODO - not correct
    return {
        attributes: xmlFields,
        type: '',
        bounds: { bottom: 0, top: 0, left: 0, right: 0 }
    };
}

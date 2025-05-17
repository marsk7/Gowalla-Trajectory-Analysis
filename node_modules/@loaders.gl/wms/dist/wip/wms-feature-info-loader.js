// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors
import { WMSCapabilitiesLoader } from "../wms-capabilities-loader.js";
import { parseWMSFeatureInfo } from "../lib/parsers/wms/parse-wms-features.js";
/**
 * Loader for the response to the WMS GetFeatureInfo request
 */
export const WMSFeatureInfoLoader = {
    ...WMSCapabilitiesLoader,
    dataType: null,
    id: 'wms-feature-info',
    name: 'WMS FeatureInfo',
    parse: async (arrayBuffer, options) => parseWMSFeatureInfo(new TextDecoder().decode(arrayBuffer), options),
    parseTextSync: (text, options) => parseWMSFeatureInfo(text, options)
};

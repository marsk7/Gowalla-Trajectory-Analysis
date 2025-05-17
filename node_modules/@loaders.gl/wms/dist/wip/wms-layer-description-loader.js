// loaders.gl, MIT license
import { WMSCapabilitiesLoader } from "../wms-capabilities-loader.js";
import { parseWMSLayerDescription } from "../lib/parsers/wms/parse-wms-layer-description.js";
/**
 * Loader for the response to the WMS DescribeLayer request
 */
export const WMSLayerDescriptionLoader = {
    ...WMSCapabilitiesLoader,
    dataType: null,
    id: 'wms-layer-description',
    name: 'WMS DescribeLayer',
    parse: async (arrayBuffer, options) => parseWMSLayerDescription(new TextDecoder().decode(arrayBuffer), options),
    parseTextSync: (text, options) => parseWMSLayerDescription(text, options)
};

// loaders.gl, MIT license
import { XMLLoader } from '@loaders.gl/xml';
/**
 * Parses a typed data structure from raw XML for `GetCapabilities` response
 * @note Error handlings is fairly weak
 */
export function parseWCSCapabilities(text, options) {
    const parsedXML = XMLLoader.parseTextSync?.(text, { ...options, xml: { ...options?.xml, removeNSPrefix: true } });
    const xmlCapabilities = parsedXML.Capabilities || parsedXML;
    return xmlCapabilities;
}

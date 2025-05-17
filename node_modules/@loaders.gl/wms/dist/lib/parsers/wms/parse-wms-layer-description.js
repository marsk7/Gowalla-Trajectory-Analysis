// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { XMLLoader } from '@loaders.gl/xml';
/**
 * Parses a typed data structure from raw XML for `GetFeatureInfo` response
 * @note Error handlings is fairly weak
 */
export function parseWMSLayerDescription(text, options) {
    const parsedXML = XMLLoader.parseTextSync?.(text, options);
    // TODO - implement parser
    return parsedXML;
}

// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { XMLLoader } from '@loaders.gl/xml';
import { parseExceptionReport } from "./parse-exception-report.js";
/**
 * Parses a typed data structure from raw XML for `GetCapabilities` response
 * @note Error handlings is fairly weak
 */
export function parseCSWCapabilities(text, options) {
    const parsedXML = XMLLoader.parseTextSync?.(text, {
        ...options,
        xml: {
            ...options?.xml,
            removeNSPrefix: true,
            uncapitalizeKeys: true
        }
    });
    parseExceptionReport(parsedXML);
    const xmlCapabilities = parsedXML.capabilities || parsedXML;
    return xmlCapabilities;
}

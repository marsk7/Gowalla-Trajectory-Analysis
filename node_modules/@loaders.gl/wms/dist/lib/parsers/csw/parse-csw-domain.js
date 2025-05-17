// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { XMLLoader } from '@loaders.gl/xml';
import { parseExceptionReport } from "./parse-exception-report.js";
/**
 * Parses a typed data structure from raw XML for `GetDomain` response
 * @note Error handlings is fairly weak
 */
export function parseCSWDomain(text, options) {
    const parsedXML = XMLLoader.parseTextSync?.(text, {
        ...options,
        xml: {
            ...options?.xml,
            removeNSPrefix: true,
            uncapitalizeKeys: true,
            arrayPaths: [
                'GetDomainResponse.DomainValues',
                'GetDomainResponse.DomainValues.ListOfValues.value'
            ]
        }
    });
    parseExceptionReport(parsedXML);
    const xmlDomain = parsedXML.getDomainResponse;
    for (const domainValue of xmlDomain.domainValues) {
        // Drop the nested <listOfValues><value><value><listOfValues>  => values[]
        domainValue.values = domainValue.listOfValues?.value;
        delete domainValue.listOfValues;
    }
    return xmlDomain;
}

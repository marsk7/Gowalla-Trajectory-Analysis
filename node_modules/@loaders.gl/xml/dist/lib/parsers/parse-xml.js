// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { StreamingXMLParser } from "./streaming-xml-parser.js";
import { uncapitalizeKeys } from "../xml-utils/uncapitalize.js";
import { XMLParser as FastXMLParser } from 'fast-xml-parser';
export function parseXMLSync(text, options) {
    if (options?._parser && options._parser !== 'fast-xml-parser') {
        throw new Error(options?._parser);
    }
    const fastXMLOptions = {
        // Default FastXML options
        // https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md#allowbooleanattributes
        allowBooleanAttributes: true,
        // https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md#ignoredeclaration
        ignoreDeclaration: true,
        // https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md#removensprefix
        removeNSPrefix: options?.removeNSPrefix,
        // https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md#textnodename
        textNodeName: options?.textNodeName,
        // Let's application specify keys that are always arrays
        isArray: (name, jpath, isLeafNode, isAttribute) => {
            const array = Boolean(options?.arrayPaths?.some((path) => jpath === path));
            return array;
        },
        // Application overrides
        ...options?._fastXML
    };
    const xml = fastParseXML(text, fastXMLOptions);
    // Note - could be done with FastXML tag processing
    return options?.uncapitalizeKeys ? uncapitalizeKeys(xml) : xml;
}
export function fastParseXML(text, options) {
    const parser = new FastXMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
        ...options
    });
    const parsedXML = parser.parse(text);
    return parsedXML;
}
/**
 * @todo Build a streaming XML parser based on sax-js
 * @param text
 * @param options
 * @returns
 */
export function parseXMLInBatches(text, options = {}) {
    const parser = new StreamingXMLParser({
        ...options,
        strict: true
    });
    parser.write(text);
    parser.close();
    return parser.result;
}

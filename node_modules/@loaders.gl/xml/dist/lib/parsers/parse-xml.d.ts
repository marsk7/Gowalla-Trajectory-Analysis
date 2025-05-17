import type { SAXParserOptions } from "../../sax-ts/sax.js";
import type { X2jOptions } from 'fast-xml-parser';
export type ParseXMLOptions = {
    /** XML is typically PascalCase, JavaScript prefects camelCase */
    uncapitalizeKeys?: boolean;
    removeNSPrefix?: boolean;
    textNodeName?: string;
    arrayPaths?: string[];
    _parser?: 'fast-xml-parser' | 'sax';
    /** @deprecated Experimental, passes options to fast-xml-parser, IF it is being used */
    _fastXML?: _FastParseXMLOptions;
    /** @deprecated Experimental, passes options to the SAX XML parser, IF it is being used. */
    _sax?: SAXParserOptions;
};
/** Type for passing through fast-xml-parser options */
export type _FastParseXMLOptions = Partial<X2jOptions>;
export declare function parseXMLSync(text: string, options?: ParseXMLOptions): any;
export declare function fastParseXML(text: string, options: _FastParseXMLOptions): any;
/**
 * @todo Build a streaming XML parser based on sax-js
 * @param text
 * @param options
 * @returns
 */
export declare function parseXMLInBatches(text: string, options?: {}): any;
//# sourceMappingURL=parse-xml.d.ts.map
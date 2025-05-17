/**
 * Compare two MIME types, case insensitively etc.
 * @param mimeType1
 * @param mimeType2
 * @returns true if the MIME types are equivalent
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#structure_of_a_mime_type
 */
export declare function compareMIMETypes(mimeType1: string, mimeType2: string): boolean;
/**
 * Remove extra data like `charset` from MIME types
 * @param mimeString
 * @returns A clean MIME type, or an empty string
 *
 * @todo - handle more advanced MIMETYpes, multiple types
 * @todo - extract charset etc
 */
export declare function parseMIMEType(mimeString: string): string;
/**
 * Extract MIME type from data URL
 *
 * @param mimeString
 * @returns A clean MIME type, or an empty string
 *
 * @todo - handle more advanced MIMETYpes, multiple types
 * @todo - extract charset etc
 */
export declare function parseMIMETypeFromURL(url: string): string;
//# sourceMappingURL=mime-type-utils.d.ts.map
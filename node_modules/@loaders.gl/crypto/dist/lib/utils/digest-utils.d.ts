/**
 * Encode a number (usually a digest from a hash function / cipher) as either hex or base64
 * Suitable for hashes like CRC32 where the number of required bits fit withing a JavaScript number.
 */
export declare function encodeNumber(number: number, encoding: 'hex' | 'base64'): string;
/** Encode a hex string, aeither return hex or re-encode as base64 */
export declare function encodeHex(hex: string, encoding: 'hex' | 'base64'): string;
export declare function encodeBase64(base64: string, encoding: 'hex' | 'base64'): string;
//# sourceMappingURL=digest-utils.d.ts.map
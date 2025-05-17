/**
 * `btoa()` polyfill as defined by the HTML and Infra specs, which mostly just references
 * RFC 4648.
 */
export declare function asciiToBase64(string: string): string | null;
/**
 * Implementation of atob() according to the HTML and Infra specs, except that
 * instead of throwing INVALID_CHARACTER_ERR we return null.
 *
 * @note Forked from https://github.com/jsdom/abab under BSD 3 clause license
 */
export declare function base64ToAscii(data: string): string;
//# sourceMappingURL=base64-utils.d.ts.map
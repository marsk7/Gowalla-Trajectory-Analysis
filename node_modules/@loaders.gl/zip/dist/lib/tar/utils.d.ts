/**
 * Returns the memory area specified by length
 * @param length
 * @returns {Uint8Array}
 */
export declare function clean(length: number): Uint8Array;
/**
 * Converting data to a string
 * @param num
 * @param bytes
 * @param base
 * @returns string
 */
export declare function pad(num: number, bytes: number, base?: number): string;
/**
 * Converting input to binary data
 * @param input
 * @param out
 * @param offset
 * @returns {Uint8Array}
 */
export declare function stringToUint8(input: string, out?: Uint8Array, offset?: number): Uint8Array;
//# sourceMappingURL=utils.d.ts.map
import type { CompressionOptions } from "./compression.js";
import { Compression } from "./compression.js";
/**
 * LZ4 compression / decompression
 */
export declare class LZ4Compression extends Compression {
    readonly name: string;
    readonly extensions: string[];
    readonly contentEncodings: string[];
    readonly isSupported = true;
    readonly options: CompressionOptions;
    constructor(options: CompressionOptions);
    preload(modules?: Record<string, any>): Promise<void>;
    compressSync(input: ArrayBuffer): ArrayBuffer;
    /**
     * Decompresses an ArrayBuffer containing an Lz4 frame. maxSize is optional; if not
     * provided, a maximum size will be determined by examining the data. The
     * returned ArrayBuffer will always be perfectly sized.
     * If data provided without magic number we will parse it as block
     */
    decompressSync(data: ArrayBuffer, maxSize?: number): ArrayBuffer;
    /**
     * Decode lz4 file as block
     * Solution taken from here
     * https://github.com/pierrec/node-lz4/blob/0dac687262403fd34f905b963da7220692f2a4a1/lib/binding.js#L25
     * @param input
     * @param output
     * @param startIndex
     * @param endIndex
     */
    decodeBlock(data: Uint8Array, output: Uint8Array, startIndex?: number, endIndex?: number): number;
    /**
     * Compare file magic with lz4 magic number
     * @param input
     */
    checkMagicNumber(data: ArrayBuffer): boolean;
}
//# sourceMappingURL=lz4-compression.d.ts.map
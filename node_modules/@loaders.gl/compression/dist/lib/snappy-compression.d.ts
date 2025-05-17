import type { CompressionOptions } from "./compression.js";
import { Compression } from "./compression.js";
/**
 * Snappy/zippy compression / decompression
 */
export declare class SnappyCompression extends Compression {
    readonly name: string;
    readonly extensions: never[];
    readonly contentEncodings: never[];
    readonly isSupported = true;
    readonly options: CompressionOptions;
    constructor(options?: CompressionOptions);
    compressSync(input: ArrayBuffer): ArrayBuffer;
    decompressSync(input: ArrayBuffer): ArrayBuffer;
}
//# sourceMappingURL=snappy-compression.d.ts.map
import type { CompressionOptions } from "./compression.js";
import { Compression } from "./compression.js";
/**
 * Applies no compression.
 */
export declare class NoCompression extends Compression {
    readonly name: string;
    readonly extensions: string[];
    readonly contentEncodings: string[];
    readonly isSupported = true;
    readonly options: CompressionOptions;
    constructor(options?: CompressionOptions);
    compressSync(input: ArrayBuffer): ArrayBuffer;
    decompressSync(input: ArrayBuffer): ArrayBuffer;
    compressBatches(asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>): AsyncIterable<ArrayBuffer>;
    decompressBatches(asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>): AsyncIterable<ArrayBuffer>;
}
//# sourceMappingURL=no-compression.d.ts.map
import type { CompressionOptions } from "./compression.js";
import { Compression } from "./compression.js";
import pako from 'pako';
export type DeflateCompressionOptions = CompressionOptions & {
    deflate?: pako.InflateOptions & pako.DeflateOptions & {
        useZlib?: boolean;
    };
    /** creates raw data, without wrapper (header and adler32 crc). */
    raw?: boolean;
};
/**
 * DEFLATE compression / decompression
 */
export declare class DeflateCompression extends Compression {
    readonly name: string;
    readonly extensions: string[];
    readonly contentEncodings: string[];
    readonly isSupported = true;
    readonly options: DeflateCompressionOptions;
    private _chunks;
    constructor(options?: DeflateCompressionOptions);
    compress(input: ArrayBuffer): Promise<ArrayBuffer>;
    decompress(input: ArrayBuffer): Promise<ArrayBuffer>;
    compressSync(input: ArrayBuffer): ArrayBuffer;
    decompressSync(input: ArrayBuffer): ArrayBuffer;
    compressBatches(asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>): AsyncIterable<ArrayBuffer>;
    decompressBatches(asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>): AsyncIterable<ArrayBuffer>;
    transformBatches(pakoProcessor: pako.Inflate | pako.Deflate, asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>): AsyncIterable<ArrayBuffer>;
    _onData(chunk: any): void;
    _onEnd(status: any): void;
    _getChunks(): ArrayBuffer[];
    _getError(code?: number): string;
}
//# sourceMappingURL=deflate-compression.d.ts.map
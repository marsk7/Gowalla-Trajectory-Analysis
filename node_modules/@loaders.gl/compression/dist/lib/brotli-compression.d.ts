import type { CompressionOptions } from "./compression.js";
import { Compression } from "./compression.js";
export type BrotliCompressionOptions = CompressionOptions & {
    brotli?: {
        mode?: number;
        quality?: number;
        lgwin?: number;
        useZlib?: boolean;
    };
};
/**
 * brotli compression / decompression
 */
export declare class BrotliCompression extends Compression {
    readonly name: string;
    readonly extensions: string[];
    readonly contentEncodings: string[];
    readonly isSupported = true;
    readonly options: BrotliCompressionOptions;
    constructor(options: BrotliCompressionOptions);
    /**
     * brotli is an injectable dependency due to big size
     * @param options
     */
    preload(modules?: Record<string, any>): Promise<void>;
    compress(input: ArrayBuffer): Promise<ArrayBuffer>;
    compressSync(input: ArrayBuffer): ArrayBuffer;
    decompress(input: ArrayBuffer): Promise<ArrayBuffer>;
    decompressSync(input: ArrayBuffer): ArrayBuffer;
}
//# sourceMappingURL=brotli-compression.d.ts.map
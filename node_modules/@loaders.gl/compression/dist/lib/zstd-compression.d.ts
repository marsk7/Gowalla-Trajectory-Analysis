import type { CompressionOptions } from "./compression.js";
import { Compression } from "./compression.js";
/**
 * Zstandard compression / decompression
 */
export declare class ZstdCompression extends Compression {
    readonly name: string;
    readonly extensions: never[];
    readonly contentEncodings: never[];
    readonly isSupported = true;
    readonly options: CompressionOptions;
    /**
     * zstd-codec is an injectable dependency due to big size
     * @param options
     */
    constructor(options: CompressionOptions);
    preload(modules?: Record<string, any>): Promise<void>;
    compressSync(input: ArrayBuffer): ArrayBuffer;
    decompressSync(input: ArrayBuffer): ArrayBuffer;
    decompress(input: ArrayBuffer, size?: number): Promise<ArrayBuffer>;
}
//# sourceMappingURL=zstd-compression.d.ts.map
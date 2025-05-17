/** Compression options */
export type CompressionOptions = {
    modules?: {
        [moduleName: string]: any;
    };
};
/** Compression */
export declare abstract class Compression {
    abstract readonly name: string;
    abstract readonly extensions: string[];
    abstract readonly contentEncodings: string[];
    abstract readonly isSupported: boolean;
    constructor(options?: CompressionOptions);
    /** Preloads any dynamic libraries. May enable sync functions */
    preload(modules?: Record<string, any>): Promise<void>;
    /** Asynchronously compress data */
    compress(input: ArrayBuffer): Promise<ArrayBuffer>;
    /** Asynchronously decompress data */
    decompress(input: ArrayBuffer, size?: number): Promise<ArrayBuffer>;
    /** Synchronously compress data */
    compressSync(input: ArrayBuffer): ArrayBuffer;
    /** Synchronously compress data */
    decompressSync(input: ArrayBuffer, size?: number): ArrayBuffer;
    /** Compress batches */
    compressBatches(asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>): AsyncIterable<ArrayBuffer>;
    /** Decompress batches */
    decompressBatches(asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>): AsyncIterable<ArrayBuffer>;
    protected concatenate(asyncIterator: any): Promise<ArrayBuffer>;
    protected improveError(error: any): any;
}
//# sourceMappingURL=compression.d.ts.map
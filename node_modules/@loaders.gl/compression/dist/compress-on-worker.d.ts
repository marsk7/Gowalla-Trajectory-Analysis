export type CompressionWorkerOptions = {
    compression: string;
    operation: 'compress' | 'decompress';
};
/**
 * Worker for Zlib real-time compression and decompression
 */
export declare const CompressionWorker: {
    id: string;
    name: string;
    module: string;
    version: any;
    options: {};
};
/**
 * Provide type safety
 */
export declare function compressOnWorker(data: ArrayBuffer, options: CompressionWorkerOptions): Promise<ArrayBuffer>;
//# sourceMappingURL=compress-on-worker.d.ts.map
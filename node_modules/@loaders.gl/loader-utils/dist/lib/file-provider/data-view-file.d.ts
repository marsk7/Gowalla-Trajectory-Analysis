import { FileProviderInterface } from "./file-provider-interface.js";
/**
 * Provides file data using DataView
 * @deprecated - will be replaced with ReadableFile
 */
export declare class DataViewFile implements FileProviderInterface {
    /** The DataView from which data is provided */
    private file;
    constructor(file: DataView);
    destroy(): Promise<void>;
    /**
     * Gets an unsigned 8-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    getUint8(offset: bigint): Promise<number>;
    /**
     * Gets an unsigned 16-bit intege at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    getUint16(offset: bigint): Promise<number>;
    /**
     * Gets an unsigned 32-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    getUint32(offset: bigint): Promise<number>;
    /**
     * Gets an unsigned 64-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    getBigUint64(offset: bigint): Promise<bigint>;
    /**
     * returns an ArrayBuffer whose contents are a copy of this file bytes from startOffset, inclusive, up to endOffset, exclusive.
     * @param startOffset The offset, in bytes, from the start of the file where to start reading the data.
     * @param endOffset The offset, in bytes, from the start of the file where to end reading the data.
     */
    slice(startOffset: bigint, endOffset: bigint): Promise<ArrayBuffer>;
    /** the length (in bytes) of the data. */
    get length(): bigint;
}
//# sourceMappingURL=data-view-file.d.ts.map
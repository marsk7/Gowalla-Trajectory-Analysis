import { ReadableFile } from "../files/file.js";
import { FileProviderInterface } from "./file-provider-interface.js";
/**
 * Provides file data using range requests to the server
 * @deprecated - will be replaced with ReadableFile
 */
export declare class FileProvider implements FileProviderInterface {
    /** The File object from which data is provided */
    private file;
    private size;
    /** Create a new BrowserFile */
    private constructor();
    static create(file: ReadableFile): Promise<FileProvider>;
    /**
     * Truncates the file descriptor.
     * @param length desired file lenght
     */
    truncate(length: number): Promise<void>;
    /**
     * Append data to a file.
     * @param buffer data to append
     */
    append(buffer: Uint8Array): Promise<void>;
    /** Close file */
    destroy(): Promise<void>;
    /**
     * Gets an unsigned 8-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    getUint8(offset: number | bigint): Promise<number>;
    /**
     * Gets an unsigned 16-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    getUint16(offset: number | bigint): Promise<number>;
    /**
     * Gets an unsigned 32-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    getUint32(offset: number | bigint): Promise<number>;
    /**
     * Gets an unsigned 32-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    getBigUint64(offset: number | bigint): Promise<bigint>;
    /**
     * returns an ArrayBuffer whose contents are a copy of this file bytes from startOffset, inclusive, up to endOffset, exclusive.
     * @param startOffset The offset, in byte, from the start of the file where to start reading the data.
     * @param endOffset The offset, in bytes, from the start of the file where to end reading the data.
     */
    slice(startOffset: bigint | number, endOffset: bigint | number): Promise<ArrayBuffer>;
    /**
     * the length (in bytes) of the data.
     */
    get length(): bigint;
}
//# sourceMappingURL=file-provider.d.ts.map
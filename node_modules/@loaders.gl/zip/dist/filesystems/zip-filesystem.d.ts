import { FileSystem, FileProviderInterface } from '@loaders.gl/loader-utils';
import { ZipCDFileHeader } from "../parse-zip/cd-file-header.js";
import { IndexedArchive } from "./IndexedArchive.js";
export type CompressionHandler = (compressedFile: ArrayBuffer) => Promise<ArrayBuffer>;
/** Handling different compression types in zip */
export declare const ZIP_COMPRESSION_HANDLERS: {
    [key: number]: CompressionHandler;
};
/**
 * FileSystem adapter for a ZIP file
 * Holds FileProvider object that provides random access to archived files
 */
export declare class ZipFileSystem implements FileSystem {
    /** FileProvider instance promise */
    fileProvider: FileProviderInterface | null;
    fileName?: string;
    archive: IndexedArchive | null;
    /**
     * Constructor
     * @param file - instance of FileProvider or file path string
     */
    constructor(file: FileProviderInterface | IndexedArchive | string);
    /** Clean up resources */
    destroy(): Promise<void>;
    /**
     * Get file names list from zip archive
     * @returns array of file names
     */
    readdir(): Promise<string[]>;
    /**
     * Get file metadata
     * @param filename - name of a file
     * @returns central directory data
     */
    stat(filename: string): Promise<ZipCDFileHeader & {
        size: number;
    }>;
    /**
     * Implementation of fetch against this file system
     * @param filename - name of a file
     * @returns - Response with file data
     */
    fetch(filename: string): Promise<Response>;
    /**
     * Get central directory file header
     * @param filename - name of a file
     * @returns central directory file header
     */
    private getCDFileHeader;
}
//# sourceMappingURL=zip-filesystem.d.ts.map
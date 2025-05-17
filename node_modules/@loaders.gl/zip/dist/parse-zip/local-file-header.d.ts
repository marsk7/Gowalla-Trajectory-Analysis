import { FileProviderInterface } from '@loaders.gl/loader-utils';
import { ZipSignature } from "./search-from-the-end.js";
/**
 * zip local file header info
 * according to https://en.wikipedia.org/wiki/ZIP_(file_format)
 */
export type ZipLocalFileHeader = {
    /** File name length */
    fileNameLength: number;
    /** File name */
    fileName: string;
    /** Extra field length */
    extraFieldLength: number;
    /** Offset of the file data */
    fileDataOffset: bigint;
    /** Compressed size */
    compressedSize: bigint;
    /** Compression method */
    compressionMethod: number;
};
export declare const signature: ZipSignature;
/**
 * Parses local file header of zip file
 * @param headerOffset - offset in the archive where header starts
 * @param buffer - buffer containing whole array
 * @returns Info from the header
 */
export declare const parseZipLocalFileHeader: (headerOffset: bigint, file: FileProviderInterface) => Promise<ZipLocalFileHeader | null>;
/** info that can be placed into cd header */
type GenerateLocalOptions = {
    /** CRC-32 of uncompressed data */
    crc32: number;
    /** File name */
    fileName: string;
    /** File size */
    length: number;
};
/**
 * generates local header for the file
 * @param options info that can be placed into local header
 * @returns buffer with header
 */
export declare function generateLocalHeader(options: GenerateLocalOptions): ArrayBuffer;
export {};
//# sourceMappingURL=local-file-header.d.ts.map
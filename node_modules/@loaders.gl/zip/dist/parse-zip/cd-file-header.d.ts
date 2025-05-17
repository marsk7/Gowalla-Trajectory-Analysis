import { FileProviderInterface } from '@loaders.gl/loader-utils';
import { ZipSignature } from "./search-from-the-end.js";
/**
 * zip central directory file header info
 * according to https://en.wikipedia.org/wiki/ZIP_(file_format)
 */
export type ZipCDFileHeader = {
    /** Compressed size */
    compressedSize: bigint;
    /** Uncompressed size */
    uncompressedSize: bigint;
    /** Extra field size */
    extraFieldLength: number;
    /** File name length */
    fileNameLength: number;
    /** File name */
    fileName: string;
    /** Extra field offset */
    extraOffset: bigint;
    /** Relative offset of local file header */
    localHeaderOffset: bigint;
};
export declare const signature: ZipSignature;
/**
 * Parses central directory file header of zip file
 * @param headerOffset - offset in the archive where header starts
 * @param buffer - buffer containing whole array
 * @returns Info from the header
 */
export declare const parseZipCDFileHeader: (headerOffset: bigint, file: FileProviderInterface) => Promise<ZipCDFileHeader | null>;
/**
 * Create iterator over files of zip archive
 * @param fileProvider - file provider that provider random access to the file
 */
export declare function makeZipCDHeaderIterator(fileProvider: FileProviderInterface): AsyncIterable<ZipCDFileHeader>;
/** info that can be placed into cd header */
type GenerateCDOptions = {
    /** CRC-32 of uncompressed data */
    crc32: number;
    /** File name */
    fileName: string;
    /** File size */
    length: number;
    /** Relative offset of local file header */
    offset: bigint;
};
/**
 * generates cd header for the file
 * @param options info that can be placed into cd header
 * @returns buffer with header
 */
export declare function generateCDHeader(options: GenerateCDOptions): ArrayBuffer;
export {};
//# sourceMappingURL=cd-file-header.d.ts.map
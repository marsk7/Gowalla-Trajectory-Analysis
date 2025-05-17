import { FileProviderInterface } from '@loaders.gl/loader-utils';
import { ZipCDFileHeader } from "./parse-zip/cd-file-header.js";
/**
 * Reads hash file from buffer and returns it in ready-to-use form
 * @param arrayBuffer - buffer containing hash file
 * @returns Map containing hash and offset
 */
export declare function parseHashTable(arrayBuffer: ArrayBuffer): Record<string, bigint>;
/**
 * generates hash info from zip files "central directory"
 * @param fileProvider - provider of the archive
 * @returns ready to use hash info
 */
export declare function makeHashTableFromZipHeaders(fileProvider: FileProviderInterface): Promise<Record<string, bigint>>;
/**
 * creates hash table from file offset iterator
 * @param zipCDIterator iterator to use
 * @returns hash table
 */
export declare function getHashTable(zipCDIterator: AsyncIterable<ZipCDFileHeader>): Promise<Record<string, bigint>>;
/** item of the file offset list */
type FileListItem = {
    fileName: string;
    localHeaderOffset: bigint;
};
/**
 * creates hash file that later can be added to the SLPK archive
 * @param zipCDIterator iterator to use
 * @returns ArrayBuffer containing hash file
 */
export declare function composeHashFile(zipCDIterator: AsyncIterable<FileListItem> | Iterable<FileListItem>): Promise<ArrayBuffer>;
export {};
//# sourceMappingURL=hash-file-utility.d.ts.map
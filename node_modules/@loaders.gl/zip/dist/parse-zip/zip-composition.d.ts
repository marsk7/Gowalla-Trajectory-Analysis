import { NodeFilesystem } from '@loaders.gl/loader-utils';
/**
 * adds one file in the end of the archieve
 * @param zipUrl path to the file
 * @param fileToAdd new file body
 * @param fileName new file name
 */
export declare function addOneFile(zipUrl: string, fileToAdd: ArrayBuffer, fileName: string): Promise<void>;
/**
 * creates zip archive with no compression
 * @note This is a node specific function that works on files
 * @param inputPath path where files for the achive are stored
 * @param outputPath path where zip archive will be placed
 */
export declare function createZip(inputPath: string, outputPath: string, createAdditionalData?: (fileList: {
    fileName: string;
    localHeaderOffset: bigint;
}[]) => Promise<{
    path: string;
    file: ArrayBuffer;
}>): Promise<void>;
/**
 * creates iterator providing buffer with file content and path to every file in the input folder
 * @param inputPath path to the input folder
 * @returns iterator
 */
export declare function getFileIterator(inputPath: string): AsyncIterable<{
    path: string;
    file: ArrayBuffer;
}>;
/**
 * creates a list of relative paths to all files in the provided folder
 * @param basePath path of the root folder
 * @param subfolder relative path from the root folder.
 * @returns list of paths
 */
export declare function getAllFiles(basePath: string, subfolder?: string, fsPassed?: NodeFilesystem): Promise<string[]>;
//# sourceMappingURL=zip-composition.d.ts.map
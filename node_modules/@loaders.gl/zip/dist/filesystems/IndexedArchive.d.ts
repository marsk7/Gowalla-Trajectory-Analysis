import { FileProviderInterface } from '@loaders.gl/loader-utils';
/**
 * Abstract class for fetching indexed archive formats (SLPK, 3TZ). Those types of zip archive has
 * a hash file inside that allows to increase reading speed
 */
export declare abstract class IndexedArchive {
    fileProvider: FileProviderInterface;
    fileName?: string;
    /**
     * Constructor
     * @param fileProvider - instance of a binary data reader
     * @param hashTable - pre-loaded hashTable. If presented, getFile will skip reading the hash file
     * @param fileName - name of the archive. It is used to add to an URL of a loader context
     */
    constructor(fileProvider: FileProviderInterface, hashTable?: Record<string, bigint>, fileName?: string);
    /**
     * Get internal file from the archive
     * @param path - path to the file
     * @param mode - path mode - the logic is implemented in subclasses
     */
    abstract getFile(path: string, mode?: string): Promise<ArrayBuffer>;
    /**
     * Get file as from order ZIP arhive without using the hash file
     * @param filename - path to the internal file
     * @returns
     */
    protected getFileWithoutHash(filename: string): Promise<ArrayBuffer>;
}
//# sourceMappingURL=IndexedArchive.d.ts.map
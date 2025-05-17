import { FileProviderInterface } from '@loaders.gl/loader-utils';
import { IndexedArchive } from '@loaders.gl/zip';
/**
 * Class for handling information about 3tz file
 */
export declare class Tiles3DArchive extends IndexedArchive {
    /** hash info */
    private hashTable?;
    /**
     * creates Tiles3DArchive handler
     * @param fileProvider - FileProvider with the whole file
     * @param hashTable - hash info
     */
    constructor(fileProvider: FileProviderInterface, hashTable?: Record<string, bigint>, fileName?: string);
    /**
     * Returns file with the given path from 3tz archive
     * @param path - path inside the 3tz
     * @returns buffer with ready to use file
     */
    getFile(path: string): Promise<ArrayBuffer>;
    /**
     * Trying to get raw file data by adress
     * @param path - path inside the archive
     * @returns buffer with the raw file data
     */
    private getFileBytes;
}
//# sourceMappingURL=3d-tiles-archive-archive.d.ts.map
import { ZipFileSystem } from "./zip-filesystem.js";
/**
 * Abstract class for fetching indexed archive formats (SLPK, 3TZ). Those types of zip archive has
 * a hash file inside that allows to increase reading speed
 */
export class IndexedArchive {
    fileProvider;
    fileName;
    /**
     * Constructor
     * @param fileProvider - instance of a binary data reader
     * @param hashTable - pre-loaded hashTable. If presented, getFile will skip reading the hash file
     * @param fileName - name of the archive. It is used to add to an URL of a loader context
     */
    constructor(fileProvider, hashTable, fileName) {
        this.fileProvider = fileProvider;
        this.fileName = fileName;
    }
    /**
     * Get file as from order ZIP arhive without using the hash file
     * @param filename - path to the internal file
     * @returns
     */
    async getFileWithoutHash(filename) {
        const zipFS = new ZipFileSystem(this.fileProvider);
        const response = await zipFS.fetch(filename);
        return await response.arrayBuffer();
    }
}

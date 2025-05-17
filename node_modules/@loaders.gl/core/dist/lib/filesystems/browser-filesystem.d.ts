import type { FileSystem, ReadableFile } from '@loaders.gl/loader-utils';
type BrowserFileSystemOptions = {
    fetch?: typeof fetch;
};
/**
 * FileSystem adapter for a browser FileList.
 * Holds a list of browser 'File' objects.
 */
export declare class BrowserFileSystem implements FileSystem {
    private _fetch;
    private files;
    private lowerCaseFiles;
    private usedFiles;
    /**
     * A FileSystem API wrapper around a list of browser 'File' objects
     * @param files
     * @param options
     */
    constructor(files: FileList | File[], options?: BrowserFileSystemOptions);
    /**
     * Implementation of fetch against this file system
     * Delegates to global fetch for http{s}:// or data://
     */
    fetch(path: string, options?: RequestInit): Promise<Response>;
    /**
     * List filenames in this filesystem
     * @param dirname
     * @returns
     */
    readdir(dirname?: string): Promise<string[]>;
    /**
     * Return information (size) about files in this file system
     */
    stat(path: string, options?: object): Promise<{
        size: number;
    }>;
    /**
     * Just removes the file from the list
     */
    unlink(path: string): Promise<void>;
    openReadableFile(pathname: string, flags: unknown): Promise<ReadableFile>;
    _getFile(path: string, used: boolean): File;
}
export {};
//# sourceMappingURL=browser-filesystem.d.ts.map
import { Stat } from "../files/file.js";
import { NodeFileFacade as NodeFile } from "../files/node-file-facade.js";
import { RandomAccessFileSystem } from "./filesystem.js";
/**
 * FileSystem pass-through for Node.js
 * Compatible with BrowserFileSystem.
 * @note Dummy implementation, not used (constructor returns a real NodeFileSystem instance)
 * @param options
 */
export declare class NodeFileSystemFacade implements RandomAccessFileSystem {
    constructor(options: {
        [key: string]: any;
    });
    readonly readable = true;
    readonly writable = true;
    openReadableFile(path: string, flags: any): Promise<NodeFile>;
    openWritableFile(path: string, flags: any, mode: any): Promise<NodeFile>;
    readdir(dirname?: string, options?: {}): Promise<string[]>;
    stat(path: string, options?: {}): Promise<Stat>;
    unlink(path: string): Promise<void>;
    fetch(path: RequestInfo, options?: RequestInit): Promise<Response>;
}
//# sourceMappingURL=node-filesystem-facade.d.ts.map
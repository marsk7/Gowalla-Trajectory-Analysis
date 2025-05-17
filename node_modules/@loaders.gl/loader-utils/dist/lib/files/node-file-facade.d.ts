import { ReadableFile, WritableFile, Stat } from "./file.js";
/** This class is a facade that gets replaced with an actual NodeFile instance  */
export declare class NodeFileFacade implements ReadableFile, WritableFile {
    handle: unknown;
    size: number;
    bigsize: bigint;
    url: string;
    constructor(url: string, flags?: 'r' | 'w' | 'wx' | 'a+', mode?: number);
    /** Read data */
    read(start?: number | bigint, length?: number): Promise<ArrayBuffer>;
    /** Write to file. The number of bytes written will be returned */
    write(arrayBuffer: ArrayBuffer, offset?: number | bigint, length?: number | bigint): Promise<number>;
    /** Get information about file */
    stat(): Promise<Stat>;
    /** Truncates the file descriptor. Only available on NodeFile. */
    truncate(length: number): Promise<void>;
    /** Append data to a file. Only available on NodeFile. */
    append(data: Uint8Array): Promise<void>;
    /** Close the file */
    close(): Promise<void>;
}
//# sourceMappingURL=node-file-facade.d.ts.map
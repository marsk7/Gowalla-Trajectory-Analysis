import { ReadableFile } from "./file.js";
/**
 * BlobFile provides a "file like interface" to the data in a Blob or File object
 */
export declare class BlobFile implements ReadableFile {
    readonly handle: Blob;
    readonly size: number;
    readonly bigsize: bigint;
    readonly url: string;
    constructor(blob: Blob | File | ArrayBuffer);
    close(): Promise<void>;
    stat(): Promise<{
        size: number;
        bigsize: bigint;
        isDirectory: boolean;
    }>;
    read(start?: number | bigint, length?: number): Promise<ArrayBuffer>;
}
//# sourceMappingURL=blob-file.d.ts.map
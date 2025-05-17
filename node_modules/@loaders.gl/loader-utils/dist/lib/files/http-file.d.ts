import { ReadableFile, Stat } from "./file.js";
export declare class HttpFile implements ReadableFile {
    readonly handle: string;
    readonly size: number;
    readonly bigsize: bigint;
    readonly url: string;
    constructor(url: string);
    close(): Promise<void>;
    stat(): Promise<Stat>;
    read(offset?: number | bigint, length?: number): Promise<ArrayBuffer>;
    /**
     *
     * @param offset
     * @param length
     * @param signal
     * @returns
     * @see https://github.com/protomaps/PMTiles
     */
    fetchRange(offset: number | bigint, length: number, signal?: AbortSignal): Promise<Response>;
}
//# sourceMappingURL=http-file.d.ts.map
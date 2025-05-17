import type { TarBlocks, TarOptions } from "./types.js";
declare class Tar {
    written: number;
    out: Uint8Array;
    blocks: TarBlocks;
    length: number;
    /**
     * @param [recordsPerBlock]
     */
    constructor(recordsPerBlock: number | undefined);
    /**
     * Append a file to the tar archive
     * @param filepath
     * @param input
     * @param [opts]
     */
    append(filepath: string, input: string | Uint8Array, opts?: TarOptions | undefined): void;
    /**
     * Compiling data to a Blob object
     * @returns {Blob}
     */
    save(): Blob;
    /**
     * Clear the data by its blocksize
     */
    clear(): void;
}
export default Tar;
//# sourceMappingURL=tar.d.ts.map
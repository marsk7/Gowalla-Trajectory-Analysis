import { Hash } from "./hash.js";
/**
 * A transform that calculates CRC32c Hash
 */
export declare class CRC32CHash extends Hash {
    readonly name = "crc32c";
    options: any;
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    constructor(options?: {});
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    hash(input: ArrayBuffer, encoding: 'hex' | 'base64'): Promise<string>;
    hashSync(input: ArrayBuffer, encoding: 'hex' | 'base64'): string;
    hashBatches(asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>, encoding?: 'hex' | 'base64'): AsyncIterable<ArrayBuffer>;
}
//# sourceMappingURL=crc32c-hash.d.ts.map
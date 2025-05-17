import { Hash } from "./hash.js";
/**
 * Calculates CRC32 Cryptographic Hash
 */
export declare class CRC32Hash extends Hash {
    readonly name = "crc32";
    options: any;
    constructor(options?: {});
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    hash(input: ArrayBuffer, encoding: 'hex' | 'base64'): Promise<string>;
    hashSync(input: ArrayBuffer, encoding: 'hex' | 'base64'): string;
    hashBatches(asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>, encoding?: 'hex' | 'base64'): AsyncIterable<ArrayBuffer>;
}
//# sourceMappingURL=crc32-hash.d.ts.map
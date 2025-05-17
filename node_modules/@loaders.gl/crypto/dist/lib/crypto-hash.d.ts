import { Hash } from "./hash.js";
type CryptoHashOptions = {
    modules?: {
        [moduleName: string]: any;
    };
    crypto: {
        algorithm: string;
        onEnd?: (result: {
            hash: string;
        }) => any;
    };
};
/**
 * A transform that calculates Cryptographic Hash using Crypto JS library
 * @deprecated Warning, experimental class
 */
export declare class CryptoHash extends Hash {
    readonly name: any;
    options: CryptoHashOptions;
    /** Name of digest algorithm */
    private _algorithm;
    /** CryptoJS algorithm */
    private _algo;
    constructor(options: CryptoHashOptions);
    preload(): Promise<void>;
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    hash(input: ArrayBuffer, encoding: 'hex' | 'base64'): Promise<string>;
    hashBatches(asyncIterator: AsyncIterable<ArrayBuffer> | Iterable<ArrayBuffer>, encoding?: 'hex' | 'base64'): AsyncIterable<ArrayBuffer>;
}
export {};
//# sourceMappingURL=crypto-hash.d.ts.map
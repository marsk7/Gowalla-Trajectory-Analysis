import { Hash } from "./hash.js";
type NodeHashOptions = {
    crypto: {
        algorithm: string;
        onEnd?: (result: {
            hash: string;
        }) => any;
    };
};
/**
 * A transform that calculates Cryptographic Hash using Node's Crypto library
 * @deprecated Only available in Node.js
 */
export declare class NodeHash extends Hash {
    readonly name: any;
    readonly options: NodeHashOptions;
    constructor(options: NodeHashOptions);
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    hash(input: ArrayBuffer, encoding: 'hex' | 'base64'): Promise<string>;
}
export {};
//# sourceMappingURL=node-hash.d.ts.map
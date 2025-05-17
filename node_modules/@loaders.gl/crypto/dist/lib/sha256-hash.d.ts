import { CryptoHash } from "./crypto-hash.js";
type CryptoHashOptions = {
    modules: {
        [moduleName: string]: any;
    };
    crypto?: {
        onEnd?: (result: {
            hash: string;
        }) => any;
    };
};
/**
 * A transform that calculates Cryptographic Hash
 */
export declare class SHA256Hash extends CryptoHash {
    constructor(options: CryptoHashOptions);
}
export {};
//# sourceMappingURL=sha256-hash.d.ts.map
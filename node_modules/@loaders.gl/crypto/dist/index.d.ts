export { Hash } from "./lib/hash.js";
export { CRC32Hash } from "./lib/crc32-hash.js";
export { CRC32CHash } from "./lib/crc32c-hash.js";
export { MD5Hash } from "./lib/md5-hash.js";
export { SHA256Hash } from "./lib/sha256-hash.js";
export { CryptoHash } from "./lib/crypto-hash.js";
export { NodeHash } from "./lib/node-hash.js";
/**
 * Small, fast worker for CRC32, CRC32c and MD5 Hashes
 */
export declare const CryptoWorker: {
    id: string;
    name: string;
    module: string;
    version: any;
    options: {
        crypto: {};
    };
};
/**
 * Large worker for full complement of Cryptographic Hashes
 * bundles the full crypto.js library
 */
export declare const CryptoJSWorker: {
    id: string;
    name: string;
    module: string;
    version: any;
    options: {
        cryptojs: {};
    };
};
export { encodeNumber, encodeHex, encodeBase64 } from "./lib/utils/digest-utils.js";
export { asciiToBase64, base64ToAscii } from "./lib/utils/base64-utils.js";
//# sourceMappingURL=index.d.ts.map
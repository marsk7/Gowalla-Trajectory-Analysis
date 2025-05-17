// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Hash } from "./hash.js";
import CRC32 from "./algorithms/crc32.js";
import { encodeNumber } from "./utils/digest-utils.js";
/**
 * Calculates CRC32 Cryptographic Hash
 */
export class CRC32Hash extends Hash {
    name = 'crc32';
    options;
    constructor(options = {}) {
        super();
        this.options = { crypto: {}, ...options };
        this.hashBatches = this.hashBatches.bind(this);
    }
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    async hash(input, encoding) {
        return this.hashSync(input, encoding);
    }
    hashSync(input, encoding) {
        const hash = new CRC32();
        hash.update(input);
        const digest = hash.finalize();
        return encodeNumber(digest, encoding);
    }
    async *hashBatches(asyncIterator, encoding = 'base64') {
        const hash = new CRC32();
        for await (const chunk of asyncIterator) {
            hash.update(chunk);
            yield chunk;
        }
        const digest = hash.finalize();
        this.options.crypto?.onEnd?.({ hash: encodeNumber(digest, encoding) });
    }
}

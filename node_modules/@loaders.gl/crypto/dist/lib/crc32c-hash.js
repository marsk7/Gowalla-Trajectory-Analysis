// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Hash } from "./hash.js";
import CRC32C from "./algorithms/crc32c.js";
import { encodeNumber } from "./utils/digest-utils.js";
/**
 * A transform that calculates CRC32c Hash
 */
export class CRC32CHash extends Hash {
    name = 'crc32c';
    options;
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    constructor(options = {}) {
        super();
        this.options = { crypto: {}, ...options };
    }
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    async hash(input, encoding) {
        return this.hashSync(input, encoding);
    }
    hashSync(input, encoding) {
        const hash = new CRC32C(this.options);
        hash.update(input);
        const digest = hash.finalize();
        return encodeNumber(digest, encoding);
    }
    // runInBatches inherited
    async *hashBatches(asyncIterator, encoding = 'base64') {
        const hash = new CRC32C(this.options);
        for await (const chunk of asyncIterator) {
            hash.update(chunk);
            yield chunk;
        }
        const digest = hash.finalize();
        this.options.crypto?.onEnd?.({ hash: encodeNumber(digest, encoding) });
    }
}

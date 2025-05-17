// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { CryptoHash } from "./crypto-hash.js";
/**
 * A transform that calculates Cryptographic Hash
 */
export class SHA256Hash extends CryptoHash {
    constructor(options) {
        super({ ...options, crypto: { ...options.crypto, algorithm: 'SHA256' } });
    }
}

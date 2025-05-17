// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Fork of https://github.com/briantbutton/md5-wasm under MIT license
import { Hash } from "./hash.js";
import md5WASM from "./algorithms/md5-wasm.js";
import { encodeHex } from "./utils/digest-utils.js";
/**
 * A transform that calculates MD5 hashes, passing data through
 */
export class MD5Hash extends Hash {
    name = 'md5';
    options;
    constructor(options = {}) {
        super();
        this.options = options;
    }
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    async hash(input, encoding) {
        const md5Promise = new Promise((resolve, reject) => 
        // @ts-expect-error
        md5WASM(input).then(resolve).catch(reject));
        const hex = await md5Promise;
        return encodeHex(hex, encoding);
    }
}

// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Compression } from "./compression.js";
/**
 * Applies no compression.
 */
export class NoCompression extends Compression {
    name = 'uncompressed';
    extensions = [];
    contentEncodings = [];
    isSupported = true;
    options;
    constructor(options) {
        super(options);
        this.options = options || {};
    }
    compressSync(input) {
        return input;
    }
    decompressSync(input) {
        return input;
    }
    async *compressBatches(asyncIterator) {
        return yield* asyncIterator;
    }
    async *decompressBatches(asyncIterator) {
        return yield* asyncIterator;
    }
}

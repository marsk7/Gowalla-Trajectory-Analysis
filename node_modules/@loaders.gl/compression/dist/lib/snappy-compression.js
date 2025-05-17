// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Compression } from "./compression.js";
import { compress, uncompress } from 'snappyjs'; // https://bundlephobia.com/package/snappy
/**
 * Snappy/zippy compression / decompression
 */
export class SnappyCompression extends Compression {
    name = 'snappy';
    extensions = [];
    contentEncodings = [];
    isSupported = true;
    options;
    constructor(options) {
        super(options);
        this.options = options || {};
    }
    compressSync(input) {
        // Accepts arrayBuffer - https://github.com/zhipeng-jia/snappyjs#usage
        return compress(input);
    }
    decompressSync(input) {
        // Accepts arrayBuffer - https://github.com/zhipeng-jia/snappyjs#usage
        return uncompress(input);
    }
}

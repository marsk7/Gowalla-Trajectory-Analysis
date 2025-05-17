// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { DeflateCompression } from "./deflate-compression.js";
/**
 * GZIP compression / decompression
 */
export class GZipCompression extends DeflateCompression {
    name = 'gzip';
    extensions = ['gz', 'gzip'];
    contentEncodings = ['gzip', 'x-gzip'];
    isSupported = true;
    constructor(options) {
        super({ ...options, deflate: { ...options?.gzip, gzip: true } });
    }
}

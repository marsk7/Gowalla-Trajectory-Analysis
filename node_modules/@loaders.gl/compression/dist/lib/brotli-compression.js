// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Compression } from "./compression.js";
import { isBrowser, toArrayBuffer, registerJSModules, getJSModule, getJSModuleOrNull, promisify1 } from '@loaders.gl/loader-utils';
// import brotli from 'brotli';  // https://bundlephobia.com/package/brotli
import { BrotliDecode } from "../brotli/decode.js";
import zlib from 'zlib';
const DEFAULT_BROTLI_OPTIONS = {
    brotli: {
        mode: 0,
        quality: 8,
        lgwin: 22
    }
};
/**
 * brotli compression / decompression
 */
export class BrotliCompression extends Compression {
    name = 'brotli';
    extensions = ['br'];
    contentEncodings = ['br'];
    isSupported = true;
    options;
    constructor(options) {
        super(options);
        this.options = options;
        registerJSModules(options?.modules);
    }
    /**
     * brotli is an injectable dependency due to big size
     * @param options
     */
    async preload(modules = {}) {
        registerJSModules(modules);
    }
    async compress(input) {
        // On Node.js we can use built-in zlib
        if (!isBrowser && this.options.brotli?.useZlib) {
            const buffer = await promisify1(zlib.brotliCompress)(input);
            return toArrayBuffer(buffer);
        }
        return this.compressSync(input);
    }
    compressSync(input) {
        // On Node.js we can use built-in zlib
        if (!isBrowser && this.options.brotli?.useZlib) {
            const buffer = zlib.brotliCompressSync(input);
            return toArrayBuffer(buffer);
        }
        const brotliOptions = { ...DEFAULT_BROTLI_OPTIONS.brotli, ...this.options?.brotli };
        const inputArray = new Uint8Array(input);
        const brotli = getJSModule('brotli', this.name);
        // @ts-ignore brotli types state that only Buffers are accepted...
        const outputArray = brotli.compress(inputArray, brotliOptions);
        return outputArray.buffer;
    }
    async decompress(input) {
        // On Node.js we can use built-in zlib
        if (!isBrowser && this.options.brotli?.useZlib) {
            const buffer = await promisify1(zlib.brotliDecompress)(input);
            return toArrayBuffer(buffer);
        }
        return this.decompressSync(input);
    }
    decompressSync(input) {
        // On Node.js we can use built-in zlib
        if (!isBrowser && this.options.brotli?.useZlib) {
            const buffer = zlib.brotliDecompressSync(input);
            return toArrayBuffer(buffer);
        }
        const brotliOptions = { ...DEFAULT_BROTLI_OPTIONS.brotli, ...this.options?.brotli };
        const inputArray = new Uint8Array(input);
        const brotli = getJSModuleOrNull('brotli');
        if (brotli) {
            // @ts-ignore brotli types state that only Buffers are accepted...
            const outputArray = brotli.decompress(inputArray, brotliOptions);
            return outputArray.buffer;
        }
        const outputArray = BrotliDecode(inputArray, undefined);
        return outputArray.buffer;
    }
}

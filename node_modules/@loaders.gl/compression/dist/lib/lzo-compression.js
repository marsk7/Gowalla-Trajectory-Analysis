// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// LZO
// import {loadLibrary} from '@loaders.gl/worker-utils';
import { registerJSModules, getJSModule, toBuffer } from '@loaders.gl/loader-utils';
import { Compression } from "./compression.js";
// import {isBrowser} from '@loaders.gl/loader-utils';
// import lzo from 'lzo'; // https://bundlephobia.com/package/lzo
// import {decompress} from 'lzo-wasm';
// const LZO_WASM_JS_URL = './node_modules/lzo-wasm/lzo-wasm.js';
// const LZO_WASM_WASM_URL = './node_modules/lzo-wasm/lzo-wasm.wasm';
/**
 * Lempel-Ziv-Oberheimer compression / decompression
 */
export class LZOCompression extends Compression {
    name = 'lzo';
    extensions = [];
    contentEncodings = [];
    isSupported = false; // !isBrowser;
    options;
    /**
     * lzo is an injectable dependency due to big size
     * @param options
     */
    constructor(options) {
        super(options);
        this.options = options;
        registerJSModules(options?.modules);
    }
    async preload(modules = {}) {
        registerJSModules(modules);
        // await loadLibrary(LZO_WASM_JS_URL);
        // await loadLibrary(LZO_WASM_WASM_URL);
    }
    async compress(input) {
        await this.preload();
        const lzo = getJSModule('lzo', this.name);
        // const inputArray = new Uint8Array(input);
        const inputBuffer = toBuffer(input);
        return lzo.compress(inputBuffer).buffer;
    }
    async decompress(input) {
        try {
            await this.preload();
            const lzo = getJSModule('lzo', this.name);
            // const inputArray = new Uint8Array(input);
            const inputBuffer = toBuffer(input);
            return lzo.decompress(inputBuffer).buffer;
        }
        catch (error) {
            // TODO - solve SharedArrayBuffer issues
            // return decompress(input);
            throw error;
        }
    }
}

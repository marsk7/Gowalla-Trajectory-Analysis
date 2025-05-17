// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Compression interface
import { concatenateArrayBuffersAsync, registerJSModules } from '@loaders.gl/loader-utils';
/** Compression */
export class Compression {
    constructor(options) {
        this.compressBatches = this.compressBatches.bind(this);
        this.decompressBatches = this.decompressBatches.bind(this);
    }
    /** Preloads any dynamic libraries. May enable sync functions */
    async preload(modules = {}) {
        registerJSModules(modules);
        return;
    }
    /** Asynchronously compress data */
    async compress(input) {
        await this.preload();
        return this.compressSync(input);
    }
    /** Asynchronously decompress data */
    async decompress(input, size) {
        await this.preload();
        return this.decompressSync(input, size);
    }
    /** Synchronously compress data */
    compressSync(input) {
        throw new Error(`${this.name}: sync compression not supported`);
    }
    /** Synchronously compress data */
    decompressSync(input, size) {
        throw new Error(`${this.name}: sync decompression not supported`);
    }
    /** Compress batches */
    async *compressBatches(asyncIterator) {
        // TODO - implement incremental compression
        const input = await this.concatenate(asyncIterator);
        yield this.compress(input);
    }
    /** Decompress batches */
    async *decompressBatches(asyncIterator) {
        // TODO - implement incremental compression
        const input = await this.concatenate(asyncIterator);
        yield this.decompress(input);
    }
    // HELPERS
    concatenate(asyncIterator) {
        return concatenateArrayBuffersAsync(asyncIterator);
    }
    improveError(error) {
        if (!error.message.includes(this.name)) {
            error.message = `${this.name} ${error.message}`;
        }
        return error;
    }
}

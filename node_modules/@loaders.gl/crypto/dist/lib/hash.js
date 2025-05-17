// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { concatenateArrayBuffersAsync } from '@loaders.gl/loader-utils';
/** Abstract hash base class */
export class Hash {
    constructor(options = {}) {
        this.hashBatches = this.hashBatches.bind(this);
    }
    async preload() {
        return;
    }
    async *hashBatches(asyncIterator, encoding = 'base64') {
        const arrayBuffers = [];
        for await (const arrayBuffer of asyncIterator) {
            arrayBuffers.push(arrayBuffer);
            yield arrayBuffer;
        }
        const output = await this.concatenate(arrayBuffers);
        const hash = await this.hash(output, encoding);
        this.options.crypto?.onEnd?.({ hash });
    }
    // HELPERS
    async concatenate(asyncIterator) {
        return await concatenateArrayBuffersAsync(asyncIterator);
    }
}

// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { makeStringIterator } from "./make-string-iterator.js";
import { makeArrayBufferIterator } from "./make-array-buffer-iterator.js";
import { makeBlobIterator } from "./make-blob-iterator.js";
import { makeStreamIterator } from "./make-stream-iterator.js";
import { isBlob, isReadableStream, isResponse } from "../../javascript-utils/is-type.js";
/**
 * Returns an iterator that breaks its input into chunks and yields them one-by-one.
 * @param data
 * @param options
 * @returns
 * This function can e.g. be used to enable data sources that can only be read atomically
 * (such as `Blob` and `File` via `FileReader`) to still be parsed in batches.
 */
export function makeIterator(data, options) {
    if (typeof data === 'string') {
        // Note: Converts string chunks to binary
        return makeStringIterator(data, options);
    }
    if (data instanceof ArrayBuffer) {
        return makeArrayBufferIterator(data, options);
    }
    if (isBlob(data)) {
        return makeBlobIterator(data, options);
    }
    if (isReadableStream(data)) {
        return makeStreamIterator(data, options);
    }
    if (isResponse(data)) {
        const response = data;
        return makeStreamIterator(response.body, options);
    }
    throw new Error('makeIterator');
}

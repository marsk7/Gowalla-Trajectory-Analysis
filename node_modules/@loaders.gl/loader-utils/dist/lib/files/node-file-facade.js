// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { isBrowser } from "../env-utils/globals.js";
const NOT_IMPLEMENTED = new Error('Not implemented');
/** This class is a facade that gets replaced with an actual NodeFile instance  */
export class NodeFileFacade {
    handle;
    size = 0;
    bigsize = 0n;
    url = '';
    constructor(url, flags, mode) {
        // Return the actual implementation instance
        if (globalThis.loaders?.NodeFile) {
            return new globalThis.loaders.NodeFile(url, flags, mode);
        }
        if (isBrowser) {
            throw new Error('Can\'t instantiate NodeFile in browser.');
        }
        throw new Error('Can\'t instantiate NodeFile. Make sure to import @loaders.gl/polyfills first.');
    }
    /** Read data */
    async read(start, length) {
        throw NOT_IMPLEMENTED;
    }
    /** Write to file. The number of bytes written will be returned */
    async write(arrayBuffer, offset, length) {
        throw NOT_IMPLEMENTED;
    }
    /** Get information about file */
    async stat() {
        throw NOT_IMPLEMENTED;
    }
    /** Truncates the file descriptor. Only available on NodeFile. */
    async truncate(length) {
        throw NOT_IMPLEMENTED;
    }
    /** Append data to a file. Only available on NodeFile. */
    async append(data) {
        throw NOT_IMPLEMENTED;
    }
    /** Close the file */
    async close() { }
}

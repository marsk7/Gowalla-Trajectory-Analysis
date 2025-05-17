// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { isBrowser } from "../env-utils/globals.js";
const NOT_IMPLEMENTED = new Error('Not implemented');
/**
 * FileSystem pass-through for Node.js
 * Compatible with BrowserFileSystem.
 * @note Dummy implementation, not used (constructor returns a real NodeFileSystem instance)
 * @param options
 */
export class NodeFileSystemFacade {
    // implements FileSystem
    constructor(options) {
        if (globalThis.loaders?.NodeFileSystem) {
            return new globalThis.loaders.NodeFileSystem(options);
        }
        if (isBrowser) {
            throw new Error('Can\'t instantiate NodeFileSystem in browser.');
        }
        throw new Error('Can\'t instantiate NodeFileSystem. Make sure to import @loaders.gl/polyfills first.');
    }
    // DUMMY IMPLEMENTATION, not used (constructor returns a real NodeFileSystem instance)
    // implements RandomAccessReadFileSystem
    readable = true;
    writable = true;
    async openReadableFile(path, flags) {
        throw NOT_IMPLEMENTED;
    }
    // implements RandomAccessWriteFileSystem
    async openWritableFile(path, flags, mode) {
        throw NOT_IMPLEMENTED;
    }
    // Implements file system
    async readdir(dirname = '.', options) {
        throw NOT_IMPLEMENTED;
    }
    async stat(path, options) {
        throw NOT_IMPLEMENTED;
    }
    async unlink(path) {
        throw NOT_IMPLEMENTED;
    }
    async fetch(path, options) {
        throw NOT_IMPLEMENTED;
    }
}

// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import Tar from "./lib/tar/tar.js";
const TAR_BUILDER_OPTIONS = {
    recordsPerBlock: 20
};
/**
 * Build a tar file by adding files
 */
export class TarBuilder {
    static get properties() {
        return {
            id: 'tar',
            name: 'TAR',
            extensions: ['tar'],
            mimeTypes: ['application/x-tar'],
            builder: TarBuilder,
            options: TAR_BUILDER_OPTIONS
        };
    }
    options;
    tape;
    count = 0;
    constructor(options) {
        this.options = { ...TAR_BUILDER_OPTIONS, ...options };
        this.tape = new Tar(this.options.recordsPerBlock);
    }
    /** Adds a file to the archive. */
    addFile(filename, buffer) {
        this.tape.append(filename, new Uint8Array(buffer));
        this.count++;
    }
    async build() {
        return new Response(this.tape.save()).arrayBuffer();
    }
}

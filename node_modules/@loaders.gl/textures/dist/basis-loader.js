// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
import { parseBasis } from "./lib/parsers/parse-basis.js";
/**
 * Worker loader for Basis super compressed textures
 */
export const BasisWorkerLoader = {
    dataType: null,
    batchType: null,
    name: 'Basis',
    id: 'basis',
    module: 'textures',
    version: VERSION,
    worker: true,
    extensions: ['basis', 'ktx2'],
    mimeTypes: ['application/octet-stream', 'image/ktx2'],
    tests: ['sB'],
    binary: true,
    options: {
        basis: {
            format: 'auto',
            libraryPath: 'libs/',
            containerFormat: 'auto',
            module: 'transcoder'
        }
    }
};
/**
 * Loader for Basis super compressed textures
 */
export const BasisLoader = {
    ...BasisWorkerLoader,
    parse: parseBasis
};

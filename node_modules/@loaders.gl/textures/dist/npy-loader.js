// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
import { parseNPY } from "./lib/parsers/parse-npy.js";
// \x93NUMPY
const NPY_MAGIC_NUMBER = new Uint8Array([147, 78, 85, 77, 80, 89]);
/**
 * Worker loader for numpy "tiles"
 */
export const NPYWorkerLoader = {
    dataType: null,
    batchType: null,
    name: 'NPY',
    id: 'npy',
    module: 'textures',
    version: VERSION,
    worker: true,
    extensions: ['npy'],
    mimeTypes: [],
    tests: [NPY_MAGIC_NUMBER.buffer],
    options: {
        npy: {}
    }
};
/**
 * Loader for numpy "tiles"
 */
export const NPYLoader = {
    ...NPYWorkerLoader,
    parseSync: parseNPY,
    parse: async (arrayBuffer, options) => parseNPY(arrayBuffer, options)
};

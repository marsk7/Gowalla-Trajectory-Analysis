// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
/**
 * Worker loader for Draco3D compressed geometries
 */
export const DracoLoader = {
    dataType: null,
    batchType: null,
    name: 'Draco',
    id: 'draco',
    module: 'draco',
    // shapes: ['mesh'],
    version: VERSION,
    worker: true,
    extensions: ['drc'],
    mimeTypes: ['application/octet-stream'],
    binary: true,
    tests: ['DRACO'],
    options: {
        draco: {
            decoderType: typeof WebAssembly === 'object' ? 'wasm' : 'js', // 'js' for IE11
            libraryPath: 'libs/',
            extraAttributes: {},
            attributeNameEntry: undefined
        }
    }
};

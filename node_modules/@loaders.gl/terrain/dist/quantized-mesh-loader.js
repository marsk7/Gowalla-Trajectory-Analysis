// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
/**
 * Worker loader for quantized meshes
 */
export const QuantizedMeshLoader = {
    dataType: null, // Mesh,
    batchType: null,
    name: 'Quantized Mesh',
    id: 'quantized-mesh',
    module: 'terrain',
    version: VERSION,
    worker: true,
    extensions: ['terrain'],
    mimeTypes: ['application/vnd.quantized-mesh'],
    options: {
        'quantized-mesh': {
            bounds: [0, 0, 1, 1],
            skirtHeight: null
        }
    }
};

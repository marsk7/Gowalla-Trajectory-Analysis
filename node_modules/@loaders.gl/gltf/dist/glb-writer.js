// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { encodeGLBSync } from "./lib/encoders/encode-glb.js";
import { VERSION } from "./lib/utils/version.js";
/**
 * GLB exporter
 * GLB is the binary container format for GLTF
 */
export const GLBWriter = {
    name: 'GLB',
    id: 'glb',
    module: 'gltf',
    version: VERSION,
    extensions: ['glb'],
    mimeTypes: ['model/gltf-binary'],
    binary: true,
    options: {
        glb: {}
    },
    encode: async (glb, options = {}) => encodeSync(glb, options),
    encodeSync
};
function encodeSync(glb, options) {
    const { byteOffset = 0 } = options ?? {};
    // Calculate length and allocate buffer
    const byteLength = encodeGLBSync(glb, null, byteOffset, options);
    const arrayBuffer = new ArrayBuffer(byteLength);
    // Encode into buffer
    const dataView = new DataView(arrayBuffer);
    encodeGLBSync(glb, dataView, byteOffset, options);
    return arrayBuffer;
}

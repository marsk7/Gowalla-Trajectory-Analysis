// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
import { parseCompressedTexture } from "./lib/parsers/parse-compressed-texture.js";
import { parseBasis } from "./lib/parsers/parse-basis.js";
/**
 * Worker Loader for KTX, DDS, and PVR texture container formats
 */
export const CompressedTextureWorkerLoader = {
    dataType: null,
    batchType: null,
    name: 'Texture Containers',
    id: 'compressed-texture',
    module: 'textures',
    version: VERSION,
    worker: true,
    extensions: [
        'ktx',
        'ktx2',
        'dds', // WEBGL_compressed_texture_s3tc, WEBGL_compressed_texture_atc
        'pvr' // WEBGL_compressed_texture_pvrtc
    ],
    mimeTypes: [
        'image/ktx2',
        'image/ktx',
        'image/vnd-ms.dds',
        'image/x-dds',
        'application/octet-stream'
    ],
    binary: true,
    options: {
        'compressed-texture': {
            libraryPath: 'libs/',
            useBasis: false
        }
    }
};
/**
 * Loader for KTX, DDS, and PVR texture container formats
 */
export const CompressedTextureLoader = {
    ...CompressedTextureWorkerLoader,
    parse: async (arrayBuffer, options) => {
        if (options?.['compressed-texture']?.useBasis) {
            // @ts-expect-error TODO not allowed to modify inputs
            options.basis = {
                format: {
                    alpha: 'BC3',
                    noAlpha: 'BC1'
                },
                // @ts-expect-error TODO not allowed to modify inputs
                ...options.basis,
                containerFormat: 'ktx2',
                module: 'encoder'
            };
            const result = await parseBasis(arrayBuffer, options);
            return result[0];
        }
        return parseCompressedTexture(arrayBuffer);
    }
};

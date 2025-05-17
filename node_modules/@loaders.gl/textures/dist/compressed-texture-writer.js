// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
import { encodeImageURLToCompressedTextureURL } from "./lib/encoders/encode-texture.js";
/**
 * DDS Texture Container Exporter
 */
export const CompressedTextureWriter = {
    name: 'DDS Texture Container',
    id: 'dds',
    module: 'textures',
    version: VERSION,
    extensions: ['dds'],
    options: {
        texture: {
            format: 'auto',
            compression: 'auto',
            quality: 'auto',
            mipmap: false,
            flipY: false,
            toolFlags: ''
        }
    },
    encodeURLtoURL: encodeImageURLToCompressedTextureURL,
    encode() {
        throw new Error('Not implemented');
    }
};

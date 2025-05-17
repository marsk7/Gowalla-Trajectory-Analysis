// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
import { encodeKTX2BasisTexture } from "./lib/encoders/encode-ktx2-basis-texture.js";
/**
 *  Basis Universal Supercompressed GPU Texture.
 *  Spec - https://github.com/Esri/i3s-spec/blob/master/docs/1.8/textureSetDefinitionFormat.cmn.md
 */
export const KTX2BasisWriter = {
    name: 'Basis Universal Supercompressed GPU Texture',
    id: 'ktx2-basis-writer',
    module: 'textures',
    version: VERSION,
    extensions: ['ktx2'],
    options: {
        ['ktx2-basis-writer']: {
            useSRGB: false,
            qualityLevel: 10,
            encodeUASTC: false,
            mipmaps: false
        }
    },
    encode: encodeKTX2BasisTexture
};

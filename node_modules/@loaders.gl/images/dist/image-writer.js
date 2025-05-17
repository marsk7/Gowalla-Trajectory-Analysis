// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
import { encodeImage } from "./lib/encoders/encode-image.js";
/** Writer for image data */
export const ImageWriter = {
    name: 'Images',
    id: 'image',
    module: 'images',
    version: VERSION,
    extensions: ['jpeg'],
    options: {
        image: {
            mimeType: 'image/png',
            jpegQuality: null
        }
    },
    encode: encodeImage
};

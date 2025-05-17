// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
export { BasisLoader, BasisWorkerLoader } from "./basis-loader.js";
export { CompressedTextureLoader, CompressedTextureWorkerLoader } from "./compressed-texture-loader.js";
export { CrunchLoader } from "./crunch-loader.js";
export { NPYLoader, NPYWorkerLoader } from "./npy-loader.js";
// Module constants
export { BASIS_EXTERNAL_LIBRARIES } from "./lib/parsers/basis-module-loader.js";
export { CRUNCH_EXTERNAL_LIBRARIES } from "./lib/parsers/crunch-module-loader.js";
// Writers
export { CompressedTextureWriter } from "./compressed-texture-writer.js";
export { KTX2BasisWriter } from "./ktx2-basis-writer.js";
export const KTX2BasisWriterWorker = {
    name: 'Basis Universal Supercompressed GPU Texture',
    id: 'ktx2-basis-writer',
    module: 'textures',
    version: VERSION,
    extensions: ['ktx2'],
    worker: true,
    options: {
        useSRGB: false,
        qualityLevel: 10,
        encodeUASTC: false,
        mipmaps: false
    }
};
// Texture Loading API
export { loadImageTexture } from "./lib/texture-api/load-image.js";
export { loadImageTextureArray } from "./lib/texture-api/load-image-array.js";
export { loadImageTextureCube } from "./lib/texture-api/load-image-cube.js";
// Utilities
export { GL_EXTENSIONS_CONSTANTS } from "./lib/gl-extensions.js";
export { selectSupportedBasisFormat } from "./lib/parsers/parse-basis.js";
export { getSupportedGPUTextureFormats } from "./lib/utils/texture-formats.js";
// DEPRECATED
// @deprecated
export { CrunchLoader as CrunchWorkerLoader } from "./crunch-loader.js";

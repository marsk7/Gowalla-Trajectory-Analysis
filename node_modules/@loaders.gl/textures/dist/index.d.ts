export type { GPUTextureFormat } from '@loaders.gl/schema';
export type { BasisLoaderOptions } from "./basis-loader.js";
export { BasisLoader, BasisWorkerLoader } from "./basis-loader.js";
export type { CompressedTextureLoaderOptions } from "./compressed-texture-loader.js";
export { CompressedTextureLoader, CompressedTextureWorkerLoader } from "./compressed-texture-loader.js";
export type { CrunchLoaderOptions } from "./crunch-loader.js";
export { CrunchLoader } from "./crunch-loader.js";
export type { NPYLoaderOptions } from "./npy-loader.js";
export { NPYLoader, NPYWorkerLoader } from "./npy-loader.js";
export { BASIS_EXTERNAL_LIBRARIES } from "./lib/parsers/basis-module-loader.js";
export { CRUNCH_EXTERNAL_LIBRARIES } from "./lib/parsers/crunch-module-loader.js";
export { CompressedTextureWriter } from "./compressed-texture-writer.js";
export { KTX2BasisWriter } from "./ktx2-basis-writer.js";
export declare const KTX2BasisWriterWorker: {
    name: string;
    id: string;
    module: string;
    version: any;
    extensions: string[];
    worker: boolean;
    options: {
        useSRGB: boolean;
        qualityLevel: number;
        encodeUASTC: boolean;
        mipmaps: boolean;
    };
};
export { loadImageTexture } from "./lib/texture-api/load-image.js";
export { loadImageTextureArray } from "./lib/texture-api/load-image-array.js";
export { loadImageTextureCube } from "./lib/texture-api/load-image-cube.js";
export { GL_EXTENSIONS_CONSTANTS } from "./lib/gl-extensions.js";
export { selectSupportedBasisFormat } from "./lib/parsers/parse-basis.js";
export { getSupportedGPUTextureFormats } from "./lib/utils/texture-formats.js";
export { CrunchLoader as CrunchWorkerLoader } from "./crunch-loader.js";
export type { CompressedTextureLoaderOptions as TextureLoaderOptions } from "./compressed-texture-loader.js";
//# sourceMappingURL=index.d.ts.map
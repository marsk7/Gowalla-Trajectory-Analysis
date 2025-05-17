import type { LoaderOptions } from '@loaders.gl/loader-utils';
import type { DracoLoaderOptions } from '@loaders.gl/draco';
import type { ImageLoaderOptions } from '@loaders.gl/images';
import type { TextureLoaderOptions } from '@loaders.gl/textures';
import type { ParseGLTFOptions } from "./lib/parsers/parse-gltf.js";
import type { GLTFWithBuffers } from "./lib/types/gltf-types.js";
import type { GLBLoaderOptions } from "./glb-loader.js";
/**
 * GLTF loader options
 */
export type GLTFLoaderOptions = LoaderOptions & ImageLoaderOptions & TextureLoaderOptions & GLBLoaderOptions & DracoLoaderOptions & {
    gltf?: ParseGLTFOptions;
};
/**
 * GLTF loader
 */
export declare const GLTFLoader: {
    readonly dataType: GLTFWithBuffers;
    readonly batchType: never;
    readonly name: "glTF";
    readonly id: "gltf";
    readonly module: "gltf";
    readonly version: any;
    readonly extensions: ["gltf", "glb"];
    readonly mimeTypes: ["model/gltf+json", "model/gltf-binary"];
    readonly text: true;
    readonly binary: true;
    readonly tests: ["glTF"];
    readonly parse: typeof parse;
    readonly options: {
        readonly gltf: {
            readonly normalize: true;
            readonly loadBuffers: true;
            readonly loadImages: true;
            readonly decompressMeshes: true;
        };
        readonly log: Console;
    };
};
export declare function parse(arrayBuffer: any, options: GLTFLoaderOptions | undefined, context: any): Promise<GLTFWithBuffers>;
//# sourceMappingURL=gltf-loader.d.ts.map
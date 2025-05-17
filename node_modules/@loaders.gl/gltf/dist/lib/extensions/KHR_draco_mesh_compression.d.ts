import type { LoaderContext } from '@loaders.gl/loader-utils';
import type { GLTF } from "../types/gltf-json-schema.js";
import type { GLTFLoaderOptions } from "../../gltf-loader.js";
/** Extension name */
export declare const name = "KHR_draco_mesh_compression";
export declare function preprocess(gltfData: {
    json: GLTF;
}, options: GLTFLoaderOptions, context: LoaderContext): void;
export declare function decode(gltfData: {
    json: GLTF;
}, options: GLTFLoaderOptions, context: LoaderContext): Promise<void>;
export declare function encode(gltfData: any, options?: GLTFLoaderOptions): void;
//# sourceMappingURL=KHR_draco_mesh_compression.d.ts.map
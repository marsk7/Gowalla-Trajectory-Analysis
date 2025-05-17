import type { LoaderContext } from '@loaders.gl/loader-utils';
import type { GLTFLoaderOptions } from "../../gltf-loader.js";
import type { GLTFWithBuffers } from "../types/gltf-types.js";
import type { ParseGLBOptions } from "./parse-glb.js";
/**  */
export type ParseGLTFOptions = ParseGLBOptions & {
    normalize?: boolean;
    loadImages?: boolean;
    loadBuffers?: boolean;
    decompressMeshes?: boolean;
    excludeExtensions?: string[];
    /** @deprecated not supported in v4. `postProcessGLTF()` must be called by the application */
    postProcess?: never;
};
/** Check if an array buffer appears to contain GLTF data */
export declare function isGLTF(arrayBuffer: ArrayBuffer, options?: ParseGLTFOptions): boolean;
export declare function parseGLTF(gltf: GLTFWithBuffers, arrayBufferOrString: any, byteOffset: number | undefined, options: GLTFLoaderOptions, context: LoaderContext): Promise<GLTFWithBuffers>;
//# sourceMappingURL=parse-gltf.d.ts.map
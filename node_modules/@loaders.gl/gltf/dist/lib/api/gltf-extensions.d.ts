import { GLTF } from "../types/gltf-json-schema.js";
import type { GLTFLoaderOptions } from "../../gltf-loader.js";
import { GLTFWriterOptions } from "../../gltf-writer.js";
type GLTFExtensionPlugin = {
    name: string;
    preprocess?: (gltfData: {
        json: GLTF;
    }, options: GLTFLoaderOptions, context: any) => void;
    decode?: (gltfData: {
        json: GLTF;
        buffers: {
            arrayBuffer: ArrayBuffer;
            byteOffset: number;
            byteLength: number;
        }[];
    }, options: GLTFLoaderOptions, context: any) => Promise<void>;
    encode?: (gltfData: {
        json: GLTF;
    }, options: GLTFWriterOptions) => void;
};
/**
 * List of extensions processed by the GLTFLoader
 * Note that may extensions can only be handled on the rendering stage and are left out here
 * These are just extensions that can be handled fully or partially during loading.
 */
export declare const EXTENSIONS: GLTFExtensionPlugin[];
/** Call before any resource loading starts */
export declare function preprocessExtensions(gltf: any, options?: GLTFLoaderOptions, context?: any): void;
/** Call after resource loading */
export declare function decodeExtensions(gltf: any, options?: GLTFLoaderOptions, context?: any): Promise<void>;
/** Call before resource writing */
export declare function encodeExtensions(gltf: any, options?: GLTFWriterOptions): any;
export {};
//# sourceMappingURL=gltf-extensions.d.ts.map
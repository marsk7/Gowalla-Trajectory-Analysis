import type { GLTF } from "../types/gltf-json-schema.js";
import type { GLTFLoaderOptions } from "../../gltf-loader.js";
/** Extension name */
export declare const name = "KHR_texture_basisu";
/**
 * Replaces a texture source reference with the extension texture
 * Done in preprocess() to prevent load of default image
 */
export declare function preprocess(gltfData: {
    json: GLTF;
}, options: GLTFLoaderOptions): void;
//# sourceMappingURL=KHR_texture_basisu.d.ts.map
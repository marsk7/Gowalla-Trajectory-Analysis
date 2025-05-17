// GLTF 1.0 extensions (decode only)
// import * as KHR_binary_gltf from './KHR_draco_mesh_compression';
// GLTF 2.0 Vendor extensions
import * as EXT_mesh_features from "../extensions/EXT_mesh_features.js";
import * as EXT_structural_metadata from "../extensions/EXT_structural_metadata.js";
// GLTF 2.0 Khronos extensions (decode/encode)
import * as EXT_meshopt_compression from "../extensions/EXT_meshopt_compression.js";
import * as EXT_texture_webp from "../extensions/EXT_texture_webp.js";
import * as KHR_texture_basisu from "../extensions/KHR_texture_basisu.js";
import * as KHR_draco_mesh_compression from "../extensions/KHR_draco_mesh_compression.js";
import * as KHR_texture_transform from "../extensions/KHR_texture_transform.js";
// Deprecated. These should be handled by rendering library (e.g. luma.gl), not the loader.
import * as KHR_lights_punctual from "../extensions/deprecated/KHR_lights_punctual.js";
import * as KHR_materials_unlit from "../extensions/deprecated/KHR_materials_unlit.js";
import * as KHR_techniques_webgl from "../extensions/deprecated/KHR_techniques_webgl.js";
import * as EXT_feature_metadata from "../extensions/deprecated/EXT_feature_metadata.js";
/**
 * List of extensions processed by the GLTFLoader
 * Note that may extensions can only be handled on the rendering stage and are left out here
 * These are just extensions that can be handled fully or partially during loading.
 */
export const EXTENSIONS = [
    // 1.0
    // KHR_binary_gltf is handled separately - must be processed before other parsing starts
    // KHR_binary_gltf,
    // 2.0
    EXT_structural_metadata,
    EXT_mesh_features,
    EXT_meshopt_compression,
    EXT_texture_webp,
    // Basisu should come after webp, we want basisu to be preferred if both are provided
    KHR_texture_basisu,
    KHR_draco_mesh_compression,
    KHR_lights_punctual,
    KHR_materials_unlit,
    KHR_techniques_webgl,
    KHR_texture_transform,
    EXT_feature_metadata
];
/**
 * List of extensions processed by the GLTFWriter
 */
const EXTENSIONS_ENCODING = [EXT_structural_metadata, EXT_mesh_features];
/** Call before any resource loading starts */
export function preprocessExtensions(gltf, options = {}, context) {
    const extensions = EXTENSIONS.filter((extension) => useExtension(extension.name, options));
    for (const extension of extensions) {
        extension.preprocess?.(gltf, options, context);
    }
}
/** Call after resource loading */
export async function decodeExtensions(gltf, options = {}, context) {
    const extensions = EXTENSIONS.filter((extension) => useExtension(extension.name, options));
    for (const extension of extensions) {
        // Note: We decode async extensions sequentially, this might not be necessary
        // Currently we only have Draco, but when we add Basis we may revisit
        await extension.decode?.(gltf, options, context);
    }
}
/** Call before resource writing */
export function encodeExtensions(gltf, options = {}) {
    for (const extension of EXTENSIONS_ENCODING) {
        gltf = extension.encode?.(gltf, options) ?? gltf;
    }
    return gltf;
}
function useExtension(extensionName, options) {
    const excludes = options?.gltf?.excludeExtensions || {};
    const exclude = extensionName in excludes && !excludes[extensionName];
    return !exclude;
}

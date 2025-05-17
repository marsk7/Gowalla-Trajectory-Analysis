// GLTF EXTENSION: KHR_texture_basisu
// https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_basisu
/* eslint-disable camelcase */
import { GLTFScenegraph } from "../api/gltf-scenegraph.js";
const KHR_TEXTURE_BASISU = 'KHR_texture_basisu';
/** Extension name */
export const name = KHR_TEXTURE_BASISU;
/**
 * Replaces a texture source reference with the extension texture
 * Done in preprocess() to prevent load of default image
 */
export function preprocess(gltfData, options) {
    const scene = new GLTFScenegraph(gltfData);
    const { json } = scene;
    for (const texture of json.textures || []) {
        const extension = scene.getObjectExtension(texture, KHR_TEXTURE_BASISU);
        if (extension) {
            // TODO - if multiple texture extensions are present which one wins?
            texture.source = extension.source;
            scene.removeObjectExtension(texture, KHR_TEXTURE_BASISU);
        }
    }
    // Remove the top-level extension
    scene.removeExtension(KHR_TEXTURE_BASISU);
}

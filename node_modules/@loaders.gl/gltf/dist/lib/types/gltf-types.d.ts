import { ImageType } from '@loaders.gl/images';
import type { GLTF } from "./gltf-json-schema.js";
/** GLTFLoader removes processed extensions from `extensionsUsed` and `extensionsUsed`
 * `processedExtensions` is used to track those extensions
 */
export type GLTFWithBuffers = {
    json: GLTF;
    binary?: ArrayBuffer;
    buffers: GLTFExternalBuffer[];
    images?: GLTFExternalImage[];
};
export type GLTFExternalBuffer = {
    arrayBuffer: ArrayBuffer;
    byteOffset: number;
    byteLength: number;
};
type GLTFExternalImage = ImageType | {
    compressed: true;
    mipmaps: false;
    width: number;
    height: number;
    data: Uint8Array;
};
export type FeatureTableJson = {
    [key: string]: any[];
};
export type { GLTF, GLTFAccessor, GLTFBuffer, GLTFBufferView, GLTFMeshPrimitive, GLTFMesh, GLTFNode, GLTFMaterial, GLTFSampler, GLTFScene, GLTFSkin, GLTFTexture, GLTFImage, GLTF_KHR_binary_glTF, GLTF_KHR_draco_mesh_compression, GLTF_KHR_texture_basisu, GLTF_EXT_meshopt_compression, GLTF_EXT_texture_webp } from "./gltf-json-schema.js";
export type { GLTFPostprocessed, GLTFAccessorPostprocessed, GLTFImagePostprocessed, GLTFNodePostprocessed, GLTFMeshPostprocessed, GLTFMeshPrimitivePostprocessed, GLTFMaterialPostprocessed, GLTFTexturePostprocessed } from "./gltf-postprocessed-schema.js";
//# sourceMappingURL=gltf-types.d.ts.map
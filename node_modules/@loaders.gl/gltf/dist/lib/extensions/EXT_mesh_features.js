import { GLTFScenegraph } from "../api/gltf-scenegraph.js";
import { getPrimitiveTextureData } from "./utils/3d-tiles-utils.js";
import { getComponentTypeFromArray } from "../gltf-utils/gltf-utils.js";
const EXT_MESH_FEATURES_NAME = 'EXT_mesh_features';
export const name = EXT_MESH_FEATURES_NAME;
export async function decode(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    decodeExtMeshFeatures(scenegraph, options);
}
export function encode(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    encodeExtMeshFeatures(scenegraph, options);
    scenegraph.createBinaryChunk();
    return scenegraph.gltf;
}
/**
 * Decodes feature metadata from extension.
 * @param {GLTFScenegraph} scenegraph - Instance of the class for structured access to GLTF data.
 * @param {GLTFLoaderOptions} options - GLTFLoader options.
 */
function decodeExtMeshFeatures(scenegraph, options) {
    const json = scenegraph.gltf.json;
    if (!json.meshes) {
        return;
    }
    // Iterate through all meshes/primitives.
    for (const mesh of json.meshes) {
        for (const primitive of mesh.primitives) {
            processMeshPrimitiveFeatures(scenegraph, primitive, options);
        }
    }
}
/**
 * Takes data from EXT_mesh_features and store it in 'data' property of featureIds.
 * If combined with EXT_structural_metadata, corresponding data are taken from the property tables of that extension.
 * @param {GLTFScenegraph} scenegraph - Instance of the class for structured access to GLTF data.
 * @param {GLTFMeshPrimitive} primitive - Primitive that contains extensions.
 * @param {GLTFLoaderOptions} options - GLTFLoader options.
 */
function processMeshPrimitiveFeatures(scenegraph, primitive, options) {
    // Processing of mesh primitive features requires buffers to be loaded.
    if (!options?.gltf?.loadBuffers) {
        return;
    }
    const extension = primitive.extensions?.[EXT_MESH_FEATURES_NAME];
    const featureIds = extension?.featureIds;
    if (!featureIds) {
        return;
    }
    for (const featureId of featureIds) {
        let featureIdData;
        // Process "Feature ID by Vertex"
        if (typeof featureId.attribute !== 'undefined') {
            const accessorKey = `_FEATURE_ID_${featureId.attribute}`;
            const accessorIndex = primitive.attributes[accessorKey];
            featureIdData = scenegraph.getTypedArrayForAccessor(accessorIndex);
        }
        // Process "Feature ID by Texture Coordinates"
        else if (typeof featureId.texture !== 'undefined' && options?.gltf?.loadImages) {
            featureIdData = getPrimitiveTextureData(scenegraph, featureId.texture, primitive);
        }
        // Process "Feature ID by Index"
        else {
            /*
            When both featureId.attribute and featureId.texture are undefined,
            then the feature ID value for each vertex is given implicitly, via the index of the vertex.
            In this case, the featureCount must match the number of vertices of the mesh primitive.
            */
            // TODO: At the moment of writing we don't have a tileset with the data of that kind. Implement it later.
            featureIdData = [];
        }
        featureId.data = featureIdData;
    }
}
/*
  Encoding data
*/
function encodeExtMeshFeatures(scenegraph, options) {
    const meshes = scenegraph.gltf.json.meshes;
    if (!meshes) {
        return;
    }
    // Iterate through all meshes/primitives.
    for (const mesh of meshes) {
        for (const primitive of mesh.primitives) {
            encodeExtMeshFeaturesForPrimitive(scenegraph, primitive);
        }
    }
}
/**
 * Creates ExtMeshFeatures, creates a featureId containing feature ids provided.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param primitive - target primitive instance that will contain the extension
 * @param featureIdArray - Array of feature id
 * @param propertyTableIndex - index of the property table created by the ExtStructuralMetadata (optional).
 */
export function createExtMeshFeatures(scenegraph, primitive, featureIdArray, propertyTableIndex) {
    if (!primitive.extensions) {
        primitive.extensions = {};
    }
    let extension = primitive.extensions[EXT_MESH_FEATURES_NAME];
    if (!extension) {
        extension = { featureIds: [] };
        primitive.extensions[EXT_MESH_FEATURES_NAME] = extension;
    }
    const { featureIds } = extension;
    const featureId = {
        featureCount: featureIdArray.length,
        propertyTable: propertyTableIndex,
        data: featureIdArray
    };
    featureIds.push(featureId);
    scenegraph.addObjectExtension(primitive, EXT_MESH_FEATURES_NAME, extension);
}
/**
 * Encodes a feature ID set to extension.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param primitive - Primitive that the data encoded belongs to.
 * @see https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_mesh_features
 */
function encodeExtMeshFeaturesForPrimitive(scenegraph, primitive) {
    const extension = primitive.extensions?.[EXT_MESH_FEATURES_NAME];
    if (!extension) {
        return;
    }
    const featureIds = extension.featureIds;
    featureIds.forEach((featureId, elementIndex) => {
        if (featureId.data) {
            const { accessorKey, index } = createAccessorKey(primitive.attributes);
            const typedArray = new Uint32Array(featureId.data);
            // Clean up featureId object.
            // Everything that could come from the original extension in case of round-trip decode/encode operations should be deleted.
            // We need make sure the featureId object is clean.
            featureIds[elementIndex] = {
                featureCount: typedArray.length,
                propertyTable: featureId.propertyTable,
                attribute: index
            };
            scenegraph.gltf.buffers.push({
                arrayBuffer: typedArray.buffer,
                byteOffset: typedArray.byteOffset,
                byteLength: typedArray.byteLength
            });
            const bufferViewIndex = scenegraph.addBufferView(typedArray);
            const accessorIndex = scenegraph.addAccessor(bufferViewIndex, {
                size: 1,
                componentType: getComponentTypeFromArray(typedArray),
                count: typedArray.length
            });
            primitive.attributes[accessorKey] = accessorIndex;
        }
    });
}
/**
 * Creates an accessor key for the attribute array provided.
 * The generated key has a suffix (number) that is the next consequtive in the list of existing accessors.
 * @param attributes - attribute array
 * @returns accessor key and the key suffix (number) used in the key.
 */
function createAccessorKey(attributes) {
    const prefix = '_FEATURE_ID_';
    // Search for all "_FEATURE_ID_n" attribures in the primitive provided if any.
    // If there are some, e.g. "_FEATURE_ID_0", "_FEATURE_ID_1",
    // we will add a new one with the name "_FEATURE_ID_2"
    const attrs = Object.keys(attributes).filter((item) => item.indexOf(prefix) === 0);
    let max = -1;
    for (const a of attrs) {
        const n = Number(a.substring(prefix.length));
        if (n > max) {
            max = n;
        }
    }
    max++;
    const accessorKey = `${prefix}${max}`;
    return { accessorKey, index: max };
}

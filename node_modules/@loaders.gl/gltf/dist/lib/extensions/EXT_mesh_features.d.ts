import type { NumericArray } from '@loaders.gl/loader-utils';
import type { GLTF, GLTFMeshPrimitive } from "../types/gltf-json-schema.js";
import { GLTFLoaderOptions } from "../../gltf-loader.js";
import { GLTFWriterOptions } from "../../gltf-writer.js";
import { GLTFScenegraph } from "../api/gltf-scenegraph.js";
export declare const name = "EXT_mesh_features";
export declare function decode(gltfData: {
    json: GLTF;
}, options: GLTFLoaderOptions): Promise<void>;
export declare function encode(gltfData: {
    json: GLTF;
}, options: GLTFWriterOptions): {
    json: GLTF;
};
/**
 * Creates ExtMeshFeatures, creates a featureId containing feature ids provided.
 * @param scenegraph - Instance of the class for structured access to GLTF data.
 * @param primitive - target primitive instance that will contain the extension
 * @param featureIdArray - Array of feature id
 * @param propertyTableIndex - index of the property table created by the ExtStructuralMetadata (optional).
 */
export declare function createExtMeshFeatures(scenegraph: GLTFScenegraph, primitive: GLTFMeshPrimitive, featureIdArray: NumericArray, propertyTableIndex?: number): void;
//# sourceMappingURL=EXT_mesh_features.d.ts.map
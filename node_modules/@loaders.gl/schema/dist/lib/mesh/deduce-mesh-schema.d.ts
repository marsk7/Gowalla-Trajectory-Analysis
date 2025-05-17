import { MeshAttribute, MeshAttributes } from "../../types/category-mesh.js";
import { Schema, Field } from "../../types/schema.js";
/**
 * Create a schema for mesh attributes data
 * @param attributes
 * @param metadata
 * @returns
 */
export declare function deduceMeshSchema(attributes: MeshAttributes, metadata?: Record<string, string>): Schema;
/**
 * Create arrow-like schema field for mesh attribute
 * @param attributeName
 * @param attribute
 * @param optionalMetadata
 * @returns
 */
export declare function deduceMeshField(name: string, attribute: MeshAttribute, optionalMetadata?: Record<string, string>): Field;
/**
 * Make metadata by mesh attribute properties
 * @param attribute
 * @returns
 */
export declare function makeMeshAttributeMetadata(attribute: MeshAttribute): Record<string, string>;
//# sourceMappingURL=deduce-mesh-schema.d.ts.map
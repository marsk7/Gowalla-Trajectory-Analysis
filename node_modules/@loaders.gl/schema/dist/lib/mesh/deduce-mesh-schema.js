// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { getDataTypeFromTypedArray } from "../table/simple-table/data-type.js";
/**
 * Create a schema for mesh attributes data
 * @param attributes
 * @param metadata
 * @returns
 */
export function deduceMeshSchema(attributes, metadata = {}) {
    const fields = deduceMeshFields(attributes);
    return { fields, metadata };
}
/**
 * Create arrow-like schema field for mesh attribute
 * @param attributeName
 * @param attribute
 * @param optionalMetadata
 * @returns
 */
export function deduceMeshField(name, attribute, optionalMetadata) {
    const type = getDataTypeFromTypedArray(attribute.value);
    const metadata = optionalMetadata ? optionalMetadata : makeMeshAttributeMetadata(attribute);
    return {
        name,
        type: { type: 'fixed-size-list', listSize: attribute.size, children: [{ name: 'value', type }] },
        nullable: false,
        metadata
    };
}
/**
 * Create fields array for mesh attributes
 * @param attributes
 * @returns
 */
function deduceMeshFields(attributes) {
    const fields = [];
    for (const attributeName in attributes) {
        const attribute = attributes[attributeName];
        fields.push(deduceMeshField(attributeName, attribute));
    }
    return fields;
}
/**
 * Make metadata by mesh attribute properties
 * @param attribute
 * @returns
 */
export function makeMeshAttributeMetadata(attribute) {
    const result = {};
    if ('byteOffset' in attribute) {
        result.byteOffset = attribute.byteOffset.toString(10);
    }
    if ('byteStride' in attribute) {
        result.byteStride = attribute.byteStride.toString(10);
    }
    if ('normalized' in attribute) {
        result.normalized = attribute.normalized.toString();
    }
    return result;
}

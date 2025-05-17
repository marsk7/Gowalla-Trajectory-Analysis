// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// LAYERS
export function getSchemaFromTileJSONLayer(layer) {
    const fields = [];
    if (layer.fields) {
        for (const field of layer.fields) {
            fields.push({
                name: field.name,
                type: getDataTypeFromTileJSONField(field),
                metadata: getMetadataFromTileJSONField(field)
            });
        }
    }
    return {
        metadata: getMetadataFromTileJSONLayer(layer),
        fields
    };
}
function getMetadataFromTileJSONLayer(layer) {
    const metadata = {};
    for (const [key, value] of Object.entries(layer)) {
        if (key !== 'fields' && value) {
            metadata[key] = JSON.stringify(value);
        }
    }
    return metadata;
}
// FIELDS
function getDataTypeFromTileJSONField(field) {
    switch (field.type.toLowerCase()) {
        case 'float32':
            return 'float32';
        case 'number':
        case 'float64':
            return 'float64';
        case 'string':
        case 'utf8':
            return 'utf8';
        case 'boolean':
            return 'bool';
        default:
            return 'null';
    }
}
function getMetadataFromTileJSONField(field) {
    const metadata = {};
    for (const [key, value] of Object.entries(field)) {
        if (key !== 'name' && value) {
            metadata[key] = JSON.stringify(value);
        }
    }
    return metadata;
}

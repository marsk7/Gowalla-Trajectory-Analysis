// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { getDataTypeFromArray, getDataTypeFromValue } from "./data-type.js";
/**
 * SCHEMA SUPPORT - AUTODEDUCTION
 * @param {*} table
 * @param {*} schema
 * @returns
 */
export function deduceTableSchema(table) {
    switch (table.shape) {
        case 'array-row-table':
        case 'object-row-table':
            return deduceSchemaFromRows(table.data);
        case 'geojson-table':
            return deduceSchemaFromGeoJSON(table.features);
        case 'columnar-table':
            return deduceSchemaFromColumns(table.data);
        case 'arrow-table':
        default:
            throw new Error('Deduce schema');
    }
}
export function deduceSchema(data) {
    return Array.isArray(data) ? deduceSchemaFromRows(data) : deduceSchemaFromColumns(data);
}
/** Given an object with columnar arrays, try to deduce a schema */
function deduceSchemaFromColumns(columnarTable) {
    const fields = [];
    for (const [columnName, column] of Object.entries(columnarTable)) {
        const field = deduceFieldFromColumn(column, columnName);
        fields.push(field);
    }
    return { fields, metadata: {} };
}
/** Given an array of rows, try to deduce a schema */
function deduceSchemaFromRows(rowTable) {
    if (!rowTable.length) {
        throw new Error('deduce from empty table');
    }
    const fields = [];
    const row0 = rowTable[0];
    // TODO - fields can be nullable, false detection...
    // Could look at additional rows if nulls in first row
    // TODO - if array, column names will be numbers
    for (const [columnName, value] of Object.entries(row0)) {
        fields.push(deduceFieldFromValue(value, columnName));
    }
    return { fields, metadata: {} };
}
/** Given a GeoJSON, try to deduce a schema */
function deduceSchemaFromGeoJSON(features) {
    if (!features.length) {
        throw new Error('deduce from empty table');
    }
    const fields = [];
    const row0 = features[0].properties || {};
    // TODO - fields can be nullable, false detection...
    // Could look at additional rows if nulls in first row
    // TODO - if array, column names will be numbers
    for (const [columnName, value] of Object.entries(row0)) {
        fields.push(deduceFieldFromValue(value, columnName));
    }
    return { fields, metadata: {} };
}
/** Given a column (i.e. array), attempt to deduce an appropriate `Field` */
function deduceFieldFromColumn(column, name) {
    if (ArrayBuffer.isView(column)) {
        const type = getDataTypeFromArray(column);
        return {
            name,
            type: type.type || 'null',
            nullable: type.nullable
            // metadata: {}
        };
    }
    if (Array.isArray(column) && column.length > 0) {
        const value = column[0];
        const type = getDataTypeFromValue(value);
        // TODO - support nested schemas?
        return {
            name,
            type,
            nullable: true
            // metadata: {},
        };
    }
    throw new Error('empty table');
}
/** Given a value, attempt to deduce an appropriate `Field` */
function deduceFieldFromValue(value, name) {
    const type = getDataTypeFromValue(value);
    return {
        name,
        type,
        nullable: true
        // metadata: {}
    };
}

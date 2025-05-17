// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { getTableCell, getTableLength, getTableRowAsArray, getTableRowAsObject } from "./table-accessors.js";
import { deduceTableSchema } from "./table-schema.js";
import { makeColumnFromField } from "./table-column.js";
/**
 * Convert a table to a different shape
 * @param table
 * @param shape
 * @returns
 */
export function convertTable(table, shape) {
    switch (shape) {
        case 'object-row-table':
            return makeObjectRowTable(table);
        case 'array-row-table':
            return makeArrayRowTable(table);
        case 'columnar-table':
            return makeColumnarTable(table);
        case 'arrow-table':
            return makeArrowTable(table);
        default:
            throw new Error(shape);
    }
}
/**
 * Convert a table to apache arrow format
 * @note this depends on the `@loaders.gl/arrow module being imported
 */
export function makeArrowTable(table) {
    const _makeArrowTable = globalThis.__loaders?._makeArrowTable;
    if (!_makeArrowTable) {
        throw new Error('');
    }
    return _makeArrowTable(table);
}
/** Convert any simple table into columnar format */
export function makeColumnarTable(table) {
    // TODO - should schema really be optional?
    const schema = table.schema || deduceTableSchema(table);
    const fields = table.schema?.fields || [];
    if (table.shape === 'columnar-table') {
        return { ...table, schema };
    }
    const length = getTableLength(table);
    const columns = {};
    for (const field of fields) {
        const column = makeColumnFromField(field, length);
        columns[field.name] = column;
        for (let rowIndex = 0; rowIndex < length; rowIndex++) {
            column[rowIndex] = getTableCell(table, rowIndex, field.name);
        }
    }
    return {
        shape: 'columnar-table',
        schema,
        data: columns
    };
}
/** Convert any table into array row format */
export function makeArrayRowTable(table) {
    if (table.shape === 'array-row-table') {
        return table;
    }
    const length = getTableLength(table);
    const data = new Array(length);
    for (let rowIndex = 0; rowIndex < length; rowIndex++) {
        data[rowIndex] = getTableRowAsArray(table, rowIndex);
    }
    return {
        shape: 'array-row-table',
        schema: table.schema,
        data
    };
}
/** Convert any table into object row format */
export function makeObjectRowTable(table) {
    if (table.shape === 'object-row-table') {
        return table;
    }
    const length = getTableLength(table);
    const data = new Array(length);
    for (let rowIndex = 0; rowIndex < length; rowIndex++) {
        data[rowIndex] = getTableRowAsObject(table, rowIndex);
    }
    return {
        shape: 'object-row-table',
        schema: table.schema,
        data
    };
}
/**
 *
 * @note - should be part of schema module
 *
export function convertColumnarToRowFormatTable(columnarTable: ColumnarTable): ObjectRowTable {
  const tableKeys = Object.keys(columnarTable);
  const tableRowsCount = columnarTable[tableKeys[0]].length;

  const rowFormatTable: {}[] = [];

  for (let index = 0; index < tableRowsCount; index++) {
    const tableItem = {};
    for (let keyIndex = 0; keyIndex < tableKeys.length; keyIndex++) {
      const fieldName = tableKeys[keyIndex];
      tableItem[fieldName] = columnarTable[fieldName][index];
    }
    rowFormatTable.push(tableItem);
  }

  return {
    shape: 'object-row-table',
    schema: columnarTable.schema,
    data: rowFormatTable
  };
}
*/

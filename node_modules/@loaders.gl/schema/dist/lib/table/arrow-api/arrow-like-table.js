// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { ArrowLikeSchema } from "./arrow-like-schema.js";
import { deduceTableSchema } from "../simple-table/table-schema.js";
import { getTableCell, getTableLength, getTableNumCols
// getTableCell,
// getTableRowShape,
// getTableColumnIndex,
// getTableColumnName,
// getTableRowAsObject,
// getTableRowAsArray
 } from "../simple-table/table-accessors.js";
class ArrowLikeVector {
    table;
    columnName;
    constructor(table, columnName) {
        this.table = table;
        this.columnName = columnName;
    }
    get(rowIndex) {
        return getTableCell(this.table, rowIndex, this.columnName);
    }
    toArray() {
        switch (this.table.shape) {
            case 'arrow-table':
                const arrowTable = this.table.data;
                return arrowTable.getChild(this.columnName)?.toArray();
            case 'columnar-table':
                return this.table.data[this.columnName];
            default:
                throw new Error(this.table.shape);
        }
    }
}
/**
 * Class that provides an API similar to Apache Arrow Table class
 * Forwards methods directly if the underlying table is Arrow, otherwise calls accessor functions
 */
export class ArrowLikeTable {
    schema;
    table;
    constructor(table) {
        const schema = table.schema || deduceTableSchema(table);
        this.schema = new ArrowLikeSchema(schema.fields, schema.metadata);
        this.table = { ...table, schema };
    }
    // get schema() {
    //   return this.table.schema;
    // }
    get data() {
        return this.table.shape === 'geojson-table' ? this.table.features : this.table.data;
    }
    get numCols() {
        return getTableNumCols(this.table);
    }
    get length() {
        return getTableLength(this.table);
    }
    getChild(columnName) {
        return new ArrowLikeVector(this.table, columnName);
    }
}

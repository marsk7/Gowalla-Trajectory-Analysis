// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const DEFAULT_ROW_COUNT = 100;
export class BaseTableBatchAggregator {
    schema;
    options;
    shape;
    length = 0;
    rows = null;
    cursor = 0;
    _headers = [];
    constructor(schema, options) {
        this.options = options;
        this.schema = schema;
        // schema is an array if there're no headers
        // object if there are headers
        if (!Array.isArray(schema)) {
            this._headers = [];
            for (const key in schema) {
                this._headers[schema[key].index] = schema[key].name;
            }
        }
    }
    rowCount() {
        return this.length;
    }
    addArrayRow(row, cursor) {
        if (Number.isFinite(cursor)) {
            this.cursor = cursor;
        }
        this.shape = 'array-row-table';
        this.rows = this.rows || new Array(DEFAULT_ROW_COUNT);
        this.rows[this.length] = row;
        this.length++;
    }
    addObjectRow(row, cursor) {
        if (Number.isFinite(cursor)) {
            this.cursor = cursor;
        }
        this.shape = 'object-row-table';
        this.rows = this.rows || new Array(DEFAULT_ROW_COUNT);
        this.rows[this.length] = row;
        this.length++;
    }
    getBatch() {
        let rows = this.rows;
        if (!rows) {
            return null;
        }
        rows = rows.slice(0, this.length);
        this.rows = null;
        const batch = {
            shape: this.shape || 'array-row-table',
            batchType: 'data',
            data: rows,
            length: this.length,
            schema: this.schema,
            cursor: this.cursor
        };
        return batch;
    }
}

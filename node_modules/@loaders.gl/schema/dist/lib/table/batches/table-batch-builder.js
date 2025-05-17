// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { BaseTableBatchAggregator } from "./base-table-batch-aggregator.js";
import { RowTableBatchAggregator } from "./row-table-batch-aggregator.js";
import { ColumnarTableBatchAggregator } from "./columnar-table-batch-aggregator.js";
const DEFAULT_OPTIONS = {
    shape: undefined,
    batchSize: 'auto',
    batchDebounceMs: 0,
    limit: 0,
    _limitMB: 0
};
const ERR_MESSAGE = 'TableBatchBuilder';
/** Incrementally builds batches from a stream of rows */
export class TableBatchBuilder {
    schema;
    options;
    aggregator = null;
    batchCount = 0;
    bytesUsed = 0;
    isChunkComplete = false;
    lastBatchEmittedMs = Date.now();
    totalLength = 0;
    totalBytes = 0;
    rowBytes = 0;
    static ArrowBatch;
    constructor(schema, options) {
        this.schema = schema;
        this.options = { ...DEFAULT_OPTIONS, ...options };
    }
    limitReached() {
        if (Boolean(this.options?.limit) && this.totalLength >= this.options.limit) {
            return true;
        }
        if (Boolean(this.options?._limitMB) && this.totalBytes / 1e6 >= this.options._limitMB) {
            return true;
        }
        return false;
    }
    /** @deprecated Use addArrayRow or addObjectRow */
    addRow(row) {
        if (this.limitReached()) {
            return;
        }
        this.totalLength++;
        this.rowBytes = this.rowBytes || this._estimateRowMB(row);
        this.totalBytes += this.rowBytes;
        if (Array.isArray(row)) {
            this.addArrayRow(row);
        }
        else {
            this.addObjectRow(row);
        }
    }
    /** Add one row to the batch */
    addArrayRow(row) {
        if (!this.aggregator) {
            const TableBatchType = this._getTableBatchType();
            this.aggregator = new TableBatchType(this.schema, this.options);
        }
        this.aggregator.addArrayRow(row);
    }
    /** Add one row to the batch */
    addObjectRow(row) {
        if (!this.aggregator) {
            const TableBatchType = this._getTableBatchType();
            this.aggregator = new TableBatchType(this.schema, this.options);
        }
        this.aggregator.addObjectRow(row);
    }
    /** Mark an incoming raw memory chunk has completed */
    chunkComplete(chunk) {
        if (chunk instanceof ArrayBuffer) {
            this.bytesUsed += chunk.byteLength;
        }
        if (typeof chunk === 'string') {
            this.bytesUsed += chunk.length;
        }
        this.isChunkComplete = true;
    }
    getFullBatch(options) {
        return this._isFull() ? this._getBatch(options) : null;
    }
    getFinalBatch(options) {
        return this._getBatch(options);
    }
    // INTERNAL
    _estimateRowMB(row) {
        return Array.isArray(row) ? row.length * 8 : Object.keys(row).length * 8;
    }
    _isFull() {
        // No batch, not ready
        if (!this.aggregator || this.aggregator.rowCount() === 0) {
            return false;
        }
        // if batchSize === 'auto' we wait for chunk to complete
        // if batchSize === number, ensure we have enough rows
        if (this.options.batchSize === 'auto') {
            if (!this.isChunkComplete) {
                return false;
            }
        }
        else if (this.options.batchSize > this.aggregator.rowCount()) {
            return false;
        }
        // Debounce batches
        if (this.options.batchDebounceMs > Date.now() - this.lastBatchEmittedMs) {
            return false;
        }
        // Emit batch
        this.isChunkComplete = false;
        this.lastBatchEmittedMs = Date.now();
        return true;
    }
    /**
     * bytesUsed can be set via chunkComplete or via getBatch*
     */
    _getBatch(options) {
        if (!this.aggregator) {
            return null;
        }
        // TODO - this can overly increment bytes used?
        if (options?.bytesUsed) {
            this.bytesUsed = options.bytesUsed;
        }
        const normalizedBatch = this.aggregator.getBatch();
        normalizedBatch.count = this.batchCount;
        normalizedBatch.bytesUsed = this.bytesUsed;
        Object.assign(normalizedBatch, options);
        this.batchCount++;
        this.aggregator = null;
        return normalizedBatch;
    }
    _getTableBatchType() {
        switch (this.options.shape) {
            case 'array-row-table':
            case 'object-row-table':
                return RowTableBatchAggregator;
            case 'columnar-table':
                return ColumnarTableBatchAggregator;
            case 'arrow-table':
                if (!TableBatchBuilder.ArrowBatch) {
                    throw new Error(ERR_MESSAGE);
                }
                return TableBatchBuilder.ArrowBatch;
            default:
                return BaseTableBatchAggregator;
        }
    }
}

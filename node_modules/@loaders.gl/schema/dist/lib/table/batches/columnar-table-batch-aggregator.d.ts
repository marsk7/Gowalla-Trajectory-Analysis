import type { Schema } from "../../../types/schema.js";
import type { ColumnarTableBatch, ArrowTableBatch } from "../../../types/category-table.js";
import { TableBatchAggregator } from "./table-batch-aggregator.js";
type ColumnarTableBatchOptions = {};
export declare class ColumnarTableBatchAggregator implements TableBatchAggregator {
    schema: Schema;
    length: number;
    allocated: number;
    columns: {
        [columnName: string]: any[];
    };
    constructor(schema: Schema, options: ColumnarTableBatchOptions);
    rowCount(): number;
    addArrayRow(row: any[]): void;
    addObjectRow(row: {
        [columnName: string]: any;
    }): void;
    getBatch(): ColumnarTableBatch | ArrowTableBatch | null;
    _reallocateColumns(): void;
    _pruneColumns(): void;
}
export {};
//# sourceMappingURL=columnar-table-batch-aggregator.d.ts.map
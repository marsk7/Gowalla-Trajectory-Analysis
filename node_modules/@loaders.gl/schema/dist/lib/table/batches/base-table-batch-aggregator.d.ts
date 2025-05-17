import type { Schema } from "../../../types/schema.js";
import type { TableBatch } from "../../../types/category-table.js";
import { TableBatchAggregator, TableBatchOptions } from "./table-batch-aggregator.js";
export declare class BaseTableBatchAggregator implements TableBatchAggregator {
    schema: Schema;
    options: TableBatchOptions;
    shape?: 'array-row-table' | 'object-row-table';
    length: number;
    rows: any[] | null;
    cursor: number;
    private _headers;
    constructor(schema: Schema, options: TableBatchOptions);
    rowCount(): number;
    addArrayRow(row: any[], cursor?: number): void;
    addObjectRow(row: {
        [columnName: string]: any;
    }, cursor?: number): void;
    getBatch(): TableBatch | null;
}
//# sourceMappingURL=base-table-batch-aggregator.d.ts.map
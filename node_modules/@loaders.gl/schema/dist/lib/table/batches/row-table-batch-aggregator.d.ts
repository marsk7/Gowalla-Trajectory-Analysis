import type { Schema } from "../../../types/schema.js";
import type { TableBatch } from "../../../types/category-table.js";
import { TableBatchAggregator, TableBatchOptions } from "./table-batch-aggregator.js";
export declare class RowTableBatchAggregator implements TableBatchAggregator {
    schema: Schema | null;
    options: TableBatchOptions;
    length: number;
    objectRows: {
        [columnName: string]: unknown;
    }[] | null;
    arrayRows: unknown[][] | null;
    cursor: number;
    private _headers;
    constructor(schema: Schema | null, options: TableBatchOptions);
    rowCount(): number;
    addArrayRow(row: any[], cursor?: number): void;
    addObjectRow(row: {
        [columnName: string]: any;
    }, cursor?: number): void;
    getBatch(): TableBatch | null;
}
//# sourceMappingURL=row-table-batch-aggregator.d.ts.map
import type { TableBatch, Table } from "../../../types/category-table.js";
/**
 * Returns an iterator that yields a single table as a sequence of batches.
 * @note Currently only a single batch is yielded.
 * @note All batches will have the same shape and schema as the original table.
 * @returns
 */
export declare function makeBatchesFromTable(table: Table): IterableIterator<TableBatch>;
/**
 * Returns a table packaged as a single table batch
 * @note The batch will have the same shape and schema as the original table.
 * @returns `null` if no batches are yielded by the async iterator
 */
export declare function makeBatchFromTable(table: Table): TableBatch;
/**
 * Assembles all batches from an async iterator into a single table.
 * @note All batches must have the same shape and schema
 * @param batchIterator
 * @returns `null` if no batches are yielded by the async iterator
 */
export declare function makeTableFromBatches(batchIterator: AsyncIterable<TableBatch> | Iterable<TableBatch>): Promise<Table | null>;
//# sourceMappingURL=make-table-from-batches.d.ts.map
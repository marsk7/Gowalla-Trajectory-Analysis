import { Table, ArrayRowTable, ObjectRowTable } from "../../../types/category-table.js";
export declare function isTable(table: any): table is Table;
/**
 * Returns the length of the table (i.e. the number of rows)
 */
export declare function getTableLength(table: Table): number;
/**
 * Returns the number of columns in the table
 * @throws Fails to deduce number of columns if the table has no schema and is empty
 */
export declare function getTableNumCols(table: Table): number;
/** Get a table cell value at row index and column name */
export declare function getTableCell(table: Table, rowIndex: number, columnName: string): unknown;
/** Get a table cell value at row index and column name */
export declare function getTableCellAt(table: Table, rowIndex: number, columnIndex: number): unknown;
/** Deduce the table row shape */
export declare function getTableRowShape(table: Table): 'array-row-table' | 'object-row-table';
/** Get the index of a named table column. Requires the table to have a schema */
export declare function getTableColumnIndex(table: Table, columnName: string): number;
/** Get the name of a table column by index. Requires the table to have a schema */
export declare function getTableColumnName(table: Table, columnIndex: number): string;
/**
 * Returns one row of the table in object format.
 * @param target Optional parameter will be used if needed to store the row. Can be reused between calls to improve performance
 * @returns an array representing the row. May be the original array in the row, a new object, or the target parameter
 */
export declare function getTableRowAsObject(table: Table, rowIndex: number, target?: {
    [columnName: string]: unknown;
}, copy?: 'copy'): {
    [columnName: string]: unknown;
};
/**
 * Returns one row of the table in array format.
 * @param target Optional parameter will be used if needed to store the row. Can be reused between calls to improve performance.
 * @returns an array representing the row. May be the original array in the row, a new object, or the target parameter
 */
export declare function getTableRowAsArray(table: Table, rowIndex: number, target?: unknown[], copy?: 'copy'): unknown[];
/** Convert any table into array row format */
export declare function makeArrayRowTable(table: Table): ArrayRowTable;
/** Convert any table into object row format */
export declare function makeObjectRowTable(table: Table): ObjectRowTable;
/** Convert any table into object row format */
export declare function makeColumnarTable(table: Table): ObjectRowTable;
/**
 * Iterate over table rows
 * @param table
 * @param shape
 */
export declare function makeRowIterator(table: Table, shape: 'object-row-table' | 'array-row-table'): Iterable<unknown[] | {
    [key: string]: unknown;
}>;
/**
 * Streaming processing: Iterate over table, yielding array rows
 * @param table
 * @param shape
 */
export declare function makeArrayRowIterator(table: Table, target?: unknown[]): Iterable<unknown[]>;
/**
 * Streaming processing: Iterate over table, yielding object rows
 * @param table
 * @param shape
 */
export declare function makeObjectRowIterator(table: Table, target?: {
    [key: string]: unknown;
}): Iterable<{
    [key: string]: unknown;
}>;
//# sourceMappingURL=table-accessors.d.ts.map
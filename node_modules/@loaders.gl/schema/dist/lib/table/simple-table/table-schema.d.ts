import { Schema } from "../../../types/schema.js";
import { Table } from "../../../types/category-table.js";
/**
 * SCHEMA SUPPORT - AUTODEDUCTION
 * @param {*} table
 * @param {*} schema
 * @returns
 */
export declare function deduceTableSchema(table: Table): Schema;
export declare function deduceSchema(data: unknown[][] | {
    [key: string]: unknown;
}[] | {
    [key: string]: unknown[];
}): Schema;
//# sourceMappingURL=table-schema.d.ts.map
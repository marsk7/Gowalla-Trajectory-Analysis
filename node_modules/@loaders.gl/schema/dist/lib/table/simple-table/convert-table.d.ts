import { Table, ArrayRowTable, ObjectRowTable, ColumnarTable, ArrowTable } from "../../../types/category-table.js";
export declare function convertTable(table: Table, shape: 'object-row-table'): ObjectRowTable;
export declare function convertTable(table: Table, shape: 'array-row-table'): ArrayRowTable;
export declare function convertTable(table: Table, shape: 'columnar-table'): ColumnarTable;
export declare function convertTable(table: Table, shape: 'arrow-table'): ArrowTable;
/**
 * Convert a table to apache arrow format
 * @note this depends on the `@loaders.gl/arrow module being imported
 */
export declare function makeArrowTable(table: Table): Table;
/** Convert any simple table into columnar format */
export declare function makeColumnarTable(table: Table): ColumnarTable;
/** Convert any table into array row format */
export declare function makeArrayRowTable(table: Table): ArrayRowTable;
/** Convert any table into object row format */
export declare function makeObjectRowTable(table: Table): ObjectRowTable;
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
//# sourceMappingURL=convert-table.d.ts.map
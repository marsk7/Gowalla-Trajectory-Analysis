import { ArrayRowTable, ObjectRowTable, ColumnarTable } from "../../../types/category-table.js";
/**
 * Makes a typed table from data.
 * @throws Row tables must contain at least one row. Columnar tables must contain empty arrays
 */
export declare function makeTableFromData(data: unknown[][]): ArrayRowTable;
export declare function makeTableFromData(data: {
    [column: string]: unknown;
}[]): ObjectRowTable;
export declare function makeTableFromData(data: {
    [column: string]: ArrayLike<unknown>;
}): ColumnarTable;
/** Convert any table into object row format *
export function makeColumnarTable(table: Table): ColumnarTable {
  if (table.shape === 'columnar-table') {
    return table;
  }
  const length = getTableLength(table);
  const data = new Array<{[key: string]: unknown}>(length);
  for (let rowIndex = 0; rowIndex < length; rowIndex++) {
    data[rowIndex] = getTableRowAsObject(table, rowIndex);
  }
  return {
    shape: 'columnar-table',
    schema: table.schema,
    data
  };
}


/** Convert any table into array row format *
export function makeArrayRowTable(table: TableLike): ArrayRowTable {
  if (table.shape === 'array-row-table') {
    return table;
  }
  const length = getTableLength(table);
  const data = new Array<unknown[]>(length);
  for (let rowIndex = 0; rowIndex < length; rowIndex++) {
    data[rowIndex] = getTableRowAsArray(table, rowIndex);
  }
  return {
    shape: 'array-row-table',
    schema: table.schema,
    data
  };
}

/** Convert any table into object row format *
export function makeObjectRowTable(table: Table): ObjectRowTable {
  if (table.shape === 'object-row-table') {
    return table;
  }
  const length = getTableLength(table);
  const data = new Array<{[key: string]: unknown}>(length);
  for (let rowIndex = 0; rowIndex < length; rowIndex++) {
    data[rowIndex] = getTableRowAsObject(table, rowIndex);
  }
  return {
    shape: 'object-row-table',
    schema: table.schema,
    data
  };
}
*/
//# sourceMappingURL=make-table.d.ts.map
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
        else if (typeof exports === 'object') exports['loaders'] = factory();
  else root['loaders'] = factory();})(globalThis, function () {
"use strict";
var __exports__ = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // external-global-plugin:@loaders.gl/core
  var require_core = __commonJS({
    "external-global-plugin:@loaders.gl/core"(exports, module) {
      module.exports = globalThis.loaders;
    }
  });

  // bundle.ts
  var bundle_exports = {};
  __export(bundle_exports, {
    ArrowLikeDataType: () => DataType,
    ArrowLikeField: () => ArrowLikeField,
    ArrowLikeSchema: () => ArrowLikeSchema,
    ArrowLikeTable: () => ArrowLikeTable,
    AsyncQueue: () => AsyncQueue,
    Binary: () => Binary,
    Bool: () => Bool,
    ColumnarTableBatchAggregator: () => ColumnarTableBatchAggregator,
    Date: () => Date2,
    DateDay: () => DateDay,
    DateMillisecond: () => DateMillisecond,
    FixedSizeList: () => FixedSizeList,
    Float: () => Float,
    Float16: () => Float16,
    Float32: () => Float32,
    Float64: () => Float64,
    Int: () => Int,
    Int16: () => Int16,
    Int32: () => Int32,
    Int64: () => Int64,
    Int8: () => Int8,
    Interval: () => Interval,
    IntervalDayTime: () => IntervalDayTime,
    IntervalYearMonth: () => IntervalYearMonth,
    Null: () => Null,
    RowTableBatchAggregator: () => RowTableBatchAggregator,
    Struct: () => Struct,
    TableBatchBuilder: () => TableBatchBuilder,
    Time: () => Time,
    TimeMillisecond: () => TimeMillisecond,
    TimeSecond: () => TimeSecond,
    Timestamp: () => Timestamp,
    TimestampMicrosecond: () => TimestampMicrosecond,
    TimestampMillisecond: () => TimestampMillisecond,
    TimestampNanosecond: () => TimestampNanosecond,
    TimestampSecond: () => TimestampSecond,
    Uint16: () => Uint16,
    Uint32: () => Uint32,
    Uint64: () => Uint64,
    Uint8: () => Uint8,
    Utf8: () => Utf8,
    convertTable: () => convertTable,
    convertToArrayRow: () => convertToArrayRow,
    convertToObjectRow: () => convertToObjectRow,
    deduceMeshField: () => deduceMeshField,
    deduceMeshSchema: () => deduceMeshSchema,
    deduceTableSchema: () => deduceTableSchema,
    getArrayTypeFromDataType: () => getArrayTypeFromDataType,
    getDataTypeFromArray: () => getDataTypeFromArray,
    getMeshBoundingBox: () => getMeshBoundingBox,
    getMeshSize: () => getMeshSize,
    getTableCell: () => getTableCell,
    getTableCellAt: () => getTableCellAt,
    getTableColumnIndex: () => getTableColumnIndex,
    getTableColumnName: () => getTableColumnName,
    getTableLength: () => getTableLength,
    getTableNumCols: () => getTableNumCols,
    getTableRowAsArray: () => getTableRowAsArray,
    getTableRowAsObject: () => getTableRowAsObject,
    getTableRowShape: () => getTableRowShape,
    getTypeInfo: () => getTypeInfo,
    isTable: () => isTable,
    makeArrayRowIterator: () => makeArrayRowIterator,
    makeBatchFromTable: () => makeBatchFromTable,
    makeMeshAttributeMetadata: () => makeMeshAttributeMetadata,
    makeObjectRowIterator: () => makeObjectRowIterator,
    makeRowIterator: () => makeRowIterator,
    makeTableFromBatches: () => makeTableFromBatches,
    makeTableFromData: () => makeTableFromData
  });
  __reExport(bundle_exports, __toESM(require_core(), 1));

  // src/lib/table/simple-table/data-type.ts
  function getDataTypeFromValue(value, defaultNumberType = "float32") {
    if (value instanceof Date) {
      return "date-millisecond";
    }
    if (value instanceof Number) {
      return defaultNumberType;
    }
    if (typeof value === "string") {
      return "utf8";
    }
    if (value === null || value === "undefined") {
      return "null";
    }
    return "null";
  }
  function getDataTypeFromArray(array) {
    let type = getDataTypeFromTypedArray(array);
    if (type !== "null") {
      return { type, nullable: false };
    }
    if (array.length > 0) {
      type = getDataTypeFromValue(array[0]);
      return { type, nullable: true };
    }
    return { type: "null", nullable: true };
  }
  function getDataTypeFromTypedArray(array) {
    switch (array.constructor) {
      case Int8Array:
        return "int8";
      case Uint8Array:
      case Uint8ClampedArray:
        return "uint8";
      case Int16Array:
        return "int16";
      case Uint16Array:
        return "uint16";
      case Int32Array:
        return "int32";
      case Uint32Array:
        return "uint32";
      case Float32Array:
        return "float32";
      case Float64Array:
        return "float64";
      default:
        return "null";
    }
  }
  function getArrayTypeFromDataType(type, nullable) {
    if (!nullable) {
      switch (type) {
        case "int8":
          return Int8Array;
        case "uint8":
          return Uint8Array;
        case "int16":
          return Int16Array;
        case "uint16":
          return Uint16Array;
        case "int32":
          return Int32Array;
        case "uint32":
          return Uint32Array;
        case "float32":
          return Float32Array;
        case "float64":
          return Float64Array;
        default:
          break;
      }
    }
    return Array;
  }

  // src/lib/table/batches/base-table-batch-aggregator.ts
  var DEFAULT_ROW_COUNT = 100;
  var BaseTableBatchAggregator = class {
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
      this.shape = "array-row-table";
      this.rows = this.rows || new Array(DEFAULT_ROW_COUNT);
      this.rows[this.length] = row;
      this.length++;
    }
    addObjectRow(row, cursor) {
      if (Number.isFinite(cursor)) {
        this.cursor = cursor;
      }
      this.shape = "object-row-table";
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
        shape: this.shape || "array-row-table",
        batchType: "data",
        data: rows,
        length: this.length,
        schema: this.schema,
        cursor: this.cursor
      };
      return batch;
    }
  };

  // src/lib/table/simple-table/row-utils.ts
  function convertToObjectRow(arrayRow, headers) {
    if (!arrayRow) {
      throw new Error("null row");
    }
    const objectRow = {};
    if (headers) {
      for (let i = 0; i < headers.length; i++) {
        objectRow[headers[i]] = arrayRow[i];
      }
    } else {
      for (let i = 0; i < arrayRow.length; i++) {
        const columnName = `column-${i}`;
        objectRow[columnName] = arrayRow[i];
      }
    }
    return objectRow;
  }
  function convertToArrayRow(objectRow, headers) {
    if (!objectRow) {
      throw new Error("null row");
    }
    if (headers) {
      const arrayRow = new Array(headers.length);
      for (let i = 0; i < headers.length; i++) {
        arrayRow[i] = objectRow[headers[i]];
      }
      return arrayRow;
    }
    return Object.values(objectRow);
  }
  function inferHeadersFromArrayRow(arrayRow) {
    const headers = [];
    for (let i = 0; i < arrayRow.length; i++) {
      const columnName = `column-${i}`;
      headers.push(columnName);
    }
    return headers;
  }
  function inferHeadersFromObjectRow(row) {
    return Object.keys(row);
  }

  // src/lib/table/batches/row-table-batch-aggregator.ts
  var DEFAULT_ROW_COUNT2 = 100;
  var RowTableBatchAggregator = class {
    schema;
    options;
    length = 0;
    objectRows = null;
    arrayRows = null;
    cursor = 0;
    _headers = null;
    constructor(schema, options) {
      this.options = options;
      this.schema = schema;
      if (schema) {
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
      this._headers ||= inferHeadersFromArrayRow(row);
      switch (this.options.shape) {
        case "object-row-table":
          const rowObject = convertToObjectRow(row, this._headers);
          this.addObjectRow(rowObject, cursor);
          break;
        case "array-row-table":
          this.arrayRows = this.arrayRows || new Array(DEFAULT_ROW_COUNT2);
          this.arrayRows[this.length] = row;
          this.length++;
          break;
      }
    }
    addObjectRow(row, cursor) {
      if (Number.isFinite(cursor)) {
        this.cursor = cursor;
      }
      this._headers ||= inferHeadersFromObjectRow(row);
      switch (this.options.shape) {
        case "array-row-table":
          const rowArray = convertToArrayRow(row, this._headers);
          this.addArrayRow(rowArray, cursor);
          break;
        case "object-row-table":
          this.objectRows = this.objectRows || new Array(DEFAULT_ROW_COUNT2);
          this.objectRows[this.length] = row;
          this.length++;
          break;
      }
    }
    getBatch() {
      let rows = this.arrayRows || this.objectRows;
      if (!rows) {
        return null;
      }
      rows = rows.slice(0, this.length);
      this.arrayRows = null;
      this.objectRows = null;
      return {
        shape: this.options.shape,
        batchType: "data",
        data: rows,
        length: this.length,
        // @ts-expect-error we should infer a schema
        schema: this.schema,
        cursor: this.cursor
      };
    }
  };

  // src/lib/table/batches/columnar-table-batch-aggregator.ts
  var DEFAULT_ROW_COUNT3 = 100;
  var ColumnarTableBatchAggregator = class {
    schema;
    length = 0;
    allocated = 0;
    columns = {};
    constructor(schema, options) {
      this.schema = schema;
      this._reallocateColumns();
    }
    rowCount() {
      return this.length;
    }
    addArrayRow(row) {
      this._reallocateColumns();
      let i = 0;
      for (const fieldName in this.columns) {
        this.columns[fieldName][this.length] = row[i++];
      }
      this.length++;
    }
    addObjectRow(row) {
      this._reallocateColumns();
      for (const fieldName in row) {
        this.columns[fieldName][this.length] = row[fieldName];
      }
      this.length++;
    }
    getBatch() {
      this._pruneColumns();
      const columns = Array.isArray(this.schema) ? this.columns : {};
      if (!Array.isArray(this.schema)) {
        for (const fieldName in this.schema) {
          const field = this.schema[fieldName];
          columns[field.name] = this.columns[field.index];
        }
      }
      this.columns = {};
      const batch = {
        shape: "columnar-table",
        batchType: "data",
        data: columns,
        schema: this.schema,
        length: this.length
      };
      return batch;
    }
    // HELPERS
    _reallocateColumns() {
      if (this.length < this.allocated) {
        return;
      }
      this.allocated = this.allocated > 0 ? this.allocated *= 2 : DEFAULT_ROW_COUNT3;
      this.columns = {};
      for (const fieldName in this.schema) {
        const field = this.schema[fieldName];
        const ArrayType = field.type || Float32Array;
        const oldColumn = this.columns[field.index];
        if (oldColumn && ArrayBuffer.isView(oldColumn)) {
          const typedArray = new ArrayType(this.allocated);
          typedArray.set(oldColumn);
          this.columns[field.index] = typedArray;
        } else if (oldColumn) {
          oldColumn.length = this.allocated;
          this.columns[field.index] = oldColumn;
        } else {
          this.columns[field.index] = new ArrayType(this.allocated);
        }
      }
    }
    _pruneColumns() {
      for (const [columnName, column] of Object.entries(this.columns)) {
        this.columns[columnName] = column.slice(0, this.length);
      }
    }
  };

  // src/lib/table/batches/table-batch-builder.ts
  var DEFAULT_OPTIONS = {
    shape: void 0,
    batchSize: "auto",
    batchDebounceMs: 0,
    limit: 0,
    _limitMB: 0
  };
  var ERR_MESSAGE = "TableBatchBuilder";
  var _TableBatchBuilder = class {
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
      } else {
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
      if (typeof chunk === "string") {
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
      if (!this.aggregator || this.aggregator.rowCount() === 0) {
        return false;
      }
      if (this.options.batchSize === "auto") {
        if (!this.isChunkComplete) {
          return false;
        }
      } else if (this.options.batchSize > this.aggregator.rowCount()) {
        return false;
      }
      if (this.options.batchDebounceMs > Date.now() - this.lastBatchEmittedMs) {
        return false;
      }
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
        case "array-row-table":
        case "object-row-table":
          return RowTableBatchAggregator;
        case "columnar-table":
          return ColumnarTableBatchAggregator;
        case "arrow-table":
          if (!_TableBatchBuilder.ArrowBatch) {
            throw new Error(ERR_MESSAGE);
          }
          return _TableBatchBuilder.ArrowBatch;
        default:
          return BaseTableBatchAggregator;
      }
    }
  };
  var TableBatchBuilder = _TableBatchBuilder;
  __publicField(TableBatchBuilder, "ArrowBatch");

  // src/lib/table/simple-table/table-accessors.ts
  function isTable(table) {
    const shape = typeof table === "object" && table?.shape;
    switch (shape) {
      case "array-row-table":
      case "object-row-table":
        return Array.isArray(table.data);
      case "geojson-table":
        return Array.isArray(table.features);
      case "columnar-table":
        return table.data && typeof table.data === "object";
      case "arrow-table":
        return Boolean(table?.data?.numRows !== void 0);
      default:
        return false;
    }
  }
  function getTableLength(table) {
    switch (table.shape) {
      case "array-row-table":
      case "object-row-table":
        return table.data.length;
      case "geojson-table":
        return table.features.length;
      case "arrow-table":
        const arrowTable = table.data;
        return arrowTable.numRows;
      case "columnar-table":
        for (const column of Object.values(table.data)) {
          return column.length || 0;
        }
        return 0;
      default:
        throw new Error("table");
    }
  }
  function getTableNumCols(table) {
    if (table.schema) {
      return table.schema.fields.length;
    }
    if (getTableLength(table) === 0) {
      throw new Error("empty table");
    }
    switch (table.shape) {
      case "array-row-table":
        return table.data[0].length;
      case "object-row-table":
        return Object.keys(table.data[0]).length;
      case "geojson-table":
        return Object.keys(table.features[0]).length;
      case "columnar-table":
        return Object.keys(table.data).length;
      case "arrow-table":
        const arrowTable = table.data;
        return arrowTable.numCols;
      default:
        throw new Error("table");
    }
  }
  function getTableCell(table, rowIndex, columnName) {
    switch (table.shape) {
      case "array-row-table":
        const columnIndex = getTableColumnIndex(table, columnName);
        return table.data[rowIndex][columnIndex];
      case "object-row-table":
        return table.data[rowIndex][columnName];
      case "geojson-table":
        return table.features[rowIndex][columnName];
      case "columnar-table":
        const column = table.data[columnName];
        return column[rowIndex];
      case "arrow-table":
        const arrowTable = table.data;
        const arrowColumnIndex = arrowTable.schema.fields.findIndex(
          (field) => field.name === columnName
        );
        return arrowTable.getChildAt(arrowColumnIndex)?.get(rowIndex);
      default:
        throw new Error("todo");
    }
  }
  function getTableCellAt(table, rowIndex, columnIndex) {
    switch (table.shape) {
      case "array-row-table":
        return table.data[rowIndex][columnIndex];
      case "object-row-table":
        const columnName1 = getTableColumnName(table, columnIndex);
        return table.data[rowIndex][columnName1];
      case "geojson-table":
        const columnName2 = getTableColumnName(table, columnIndex);
        return table.features[rowIndex][columnName2];
      case "columnar-table":
        const columnName3 = getTableColumnName(table, columnIndex);
        const column = table.data[columnName3];
        return column[rowIndex];
      case "arrow-table":
        const arrowTable = table.data;
        return arrowTable.getChildAt(columnIndex)?.get(rowIndex);
      default:
        throw new Error("todo");
    }
  }
  function getTableRowShape(table) {
    switch (table.shape) {
      case "array-row-table":
      case "object-row-table":
        return table.shape;
      case "geojson-table":
        return "object-row-table";
      case "columnar-table":
      default:
        throw new Error("Not a row table");
    }
  }
  function getTableColumnIndex(table, columnName) {
    const columnIndex = table.schema?.fields.findIndex((field) => field.name === columnName);
    if (columnIndex === void 0) {
      throw new Error(columnName);
    }
    return columnIndex;
  }
  function getTableColumnName(table, columnIndex) {
    const columnName = table.schema?.fields[columnIndex]?.name;
    if (!columnName) {
      throw new Error(`${columnIndex}`);
    }
    return columnName;
  }
  function getTableRowAsObject(table, rowIndex, target, copy) {
    switch (table.shape) {
      case "object-row-table":
        return copy ? Object.fromEntries(Object.entries(table.data[rowIndex])) : table.data[rowIndex];
      case "array-row-table":
        if (table.schema) {
          const objectRow2 = target || {};
          for (let i = 0; i < table.schema.fields.length; i++) {
            objectRow2[table.schema.fields[i].name] = table.data[rowIndex][i];
          }
          return objectRow2;
        }
        throw new Error("no schema");
      case "geojson-table":
        if (table.schema) {
          const objectRow2 = target || {};
          for (let i = 0; i < table.schema.fields.length; i++) {
            objectRow2[table.schema.fields[i].name] = table.features[rowIndex][i];
          }
          return objectRow2;
        }
        throw new Error("no schema");
      case "columnar-table":
        if (table.schema) {
          const objectRow2 = target || {};
          for (let i = 0; i < table.schema.fields.length; i++) {
            objectRow2[table.schema.fields[i].name] = table.data[table.schema.fields[i].name][rowIndex];
          }
          return objectRow2;
        } else {
          const objectRow2 = target || {};
          for (const [name, column] of Object.entries(table.data)) {
            objectRow2[name] = column[rowIndex];
          }
          return objectRow2;
        }
      case "arrow-table":
        const arrowTable = table.data;
        const objectRow = target || {};
        const row = arrowTable.get(rowIndex);
        const schema = arrowTable.schema;
        for (let i = 0; i < schema.fields.length; i++) {
          objectRow[schema.fields[i].name] = row?.[schema.fields[i].name];
        }
        return objectRow;
      default:
        throw new Error("shape");
    }
  }
  function getTableRowAsArray(table, rowIndex, target, copy) {
    switch (table.shape) {
      case "array-row-table":
        return copy ? Array.from(table.data[rowIndex]) : table.data[rowIndex];
      case "object-row-table":
        if (table.schema) {
          const arrayRow2 = target || [];
          for (let i = 0; i < table.schema.fields.length; i++) {
            arrayRow2[i] = table.data[rowIndex][table.schema.fields[i].name];
          }
          return arrayRow2;
        }
        return Object.values(table.data[rowIndex]);
      case "geojson-table":
        if (table.schema) {
          const arrayRow2 = target || [];
          for (let i = 0; i < table.schema.fields.length; i++) {
            arrayRow2[i] = table.features[rowIndex][table.schema.fields[i].name];
          }
          return arrayRow2;
        }
        return Object.values(table.features[rowIndex]);
      case "columnar-table":
        if (table.schema) {
          const arrayRow2 = target || [];
          for (let i = 0; i < table.schema.fields.length; i++) {
            arrayRow2[i] = table.data[table.schema.fields[i].name][rowIndex];
          }
          return arrayRow2;
        } else {
          const arrayRow2 = target || [];
          let i = 0;
          for (const column of Object.values(table.data)) {
            arrayRow2[i] = column[rowIndex];
            i++;
          }
          return arrayRow2;
        }
      case "arrow-table":
        const arrowTable = table.data;
        const arrayRow = target || [];
        const row = arrowTable.get(rowIndex);
        const schema = arrowTable.schema;
        for (let i = 0; i < schema.fields.length; i++) {
          arrayRow[i] = row?.[schema.fields[i].name];
        }
        return arrayRow;
      default:
        throw new Error("shape");
    }
  }
  function* makeRowIterator(table, shape) {
    switch (shape) {
      case "array-row-table":
        yield* makeArrayRowIterator(table);
        break;
      case "object-row-table":
        yield* makeObjectRowIterator(table);
        break;
      default:
        throw new Error(`Unknown row type ${shape}`);
    }
  }
  function* makeArrayRowIterator(table, target = []) {
    const length = getTableLength(table);
    for (let rowIndex = 0; rowIndex < length; rowIndex++) {
      yield getTableRowAsArray(table, rowIndex, target);
    }
  }
  function* makeObjectRowIterator(table, target = {}) {
    const length = getTableLength(table);
    for (let rowIndex = 0; rowIndex < length; rowIndex++) {
      yield getTableRowAsObject(table, rowIndex, target);
    }
  }

  // src/lib/table/arrow-api/arrow-like-field.ts
  var ArrowLikeField = class {
    name;
    type;
    nullable;
    metadata;
    constructor(name, type, nullable = false, metadata = /* @__PURE__ */ new Map()) {
      this.name = name;
      this.type = type;
      this.nullable = nullable;
      this.metadata = metadata;
    }
    get typeId() {
      return this.type && this.type.typeId;
    }
    clone() {
      return new ArrowLikeField(this.name, this.type, this.nullable, this.metadata);
    }
    compareTo(other) {
      return this.name === other.name && this.type === other.type && this.nullable === other.nullable && this.metadata === other.metadata;
    }
    toString() {
      return `${JSON.stringify(this.type)}${this.nullable ? ", nullable" : ""}${this.metadata ? `, metadata: ${JSON.stringify(this.metadata)}` : ""}`;
    }
  };

  // src/lib/table/arrow-api/arrow-like-schema.ts
  var ArrowLikeSchema = class {
    fields;
    metadata;
    constructor(fields, metadata = /* @__PURE__ */ new Map()) {
      this.fields = fields.map(
        (field) => new ArrowLikeField(field.name, field.type, field.nullable, field.metadata)
      );
      this.metadata = metadata instanceof Map ? metadata : new Map(Object.entries(metadata));
    }
    // TODO - arrow only seems to compare fields, not metadata
    compareTo(other) {
      if (this.metadata !== other.metadata) {
        return false;
      }
      if (this.fields.length !== other.fields.length) {
        return false;
      }
      for (let i = 0; i < this.fields.length; ++i) {
        if (!this.fields[i].compareTo(other.fields[i])) {
          return false;
        }
      }
      return true;
    }
    select(...columnNames) {
      const nameMap = /* @__PURE__ */ Object.create(null);
      for (const name of columnNames) {
        nameMap[name] = true;
      }
      const selectedFields = this.fields.filter((field) => nameMap[field.name]);
      return new ArrowLikeSchema(selectedFields, this.metadata);
    }
    selectAt(...columnIndices) {
      const selectedFields = columnIndices.map((index) => this.fields[index]).filter(Boolean);
      return new ArrowLikeSchema(selectedFields, this.metadata);
    }
    assign(schemaOrFields) {
      let fields;
      let metadata = this.metadata;
      if (schemaOrFields instanceof ArrowLikeSchema) {
        const otherArrowLikeSchema = schemaOrFields;
        fields = otherArrowLikeSchema.fields;
        metadata = mergeMaps(mergeMaps(/* @__PURE__ */ new Map(), this.metadata), otherArrowLikeSchema.metadata);
      } else {
        fields = schemaOrFields;
      }
      const fieldMap = /* @__PURE__ */ Object.create(null);
      for (const field of this.fields) {
        fieldMap[field.name] = field;
      }
      for (const field of fields) {
        fieldMap[field.name] = field;
      }
      const mergedFields = Object.values(fieldMap);
      return new ArrowLikeSchema(mergedFields, metadata);
    }
  };
  function mergeMaps(m1, m2) {
    return new Map([...m1 || /* @__PURE__ */ new Map(), ...m2 || /* @__PURE__ */ new Map()]);
  }

  // src/lib/table/simple-table/table-schema.ts
  function deduceTableSchema(table) {
    switch (table.shape) {
      case "array-row-table":
      case "object-row-table":
        return deduceSchemaFromRows(table.data);
      case "geojson-table":
        return deduceSchemaFromGeoJSON(table.features);
      case "columnar-table":
        return deduceSchemaFromColumns(table.data);
      case "arrow-table":
      default:
        throw new Error("Deduce schema");
    }
  }
  function deduceSchemaFromColumns(columnarTable) {
    const fields = [];
    for (const [columnName, column] of Object.entries(columnarTable)) {
      const field = deduceFieldFromColumn(column, columnName);
      fields.push(field);
    }
    return { fields, metadata: {} };
  }
  function deduceSchemaFromRows(rowTable) {
    if (!rowTable.length) {
      throw new Error("deduce from empty table");
    }
    const fields = [];
    const row0 = rowTable[0];
    for (const [columnName, value] of Object.entries(row0)) {
      fields.push(deduceFieldFromValue(value, columnName));
    }
    return { fields, metadata: {} };
  }
  function deduceSchemaFromGeoJSON(features) {
    if (!features.length) {
      throw new Error("deduce from empty table");
    }
    const fields = [];
    const row0 = features[0].properties || {};
    for (const [columnName, value] of Object.entries(row0)) {
      fields.push(deduceFieldFromValue(value, columnName));
    }
    return { fields, metadata: {} };
  }
  function deduceFieldFromColumn(column, name) {
    if (ArrayBuffer.isView(column)) {
      const type = getDataTypeFromArray(column);
      return {
        name,
        type: type.type || "null",
        nullable: type.nullable
        // metadata: {}
      };
    }
    if (Array.isArray(column) && column.length > 0) {
      const value = column[0];
      const type = getDataTypeFromValue(value);
      return {
        name,
        type,
        nullable: true
        // metadata: {},
      };
    }
    throw new Error("empty table");
  }
  function deduceFieldFromValue(value, name) {
    const type = getDataTypeFromValue(value);
    return {
      name,
      type,
      nullable: true
      // metadata: {}
    };
  }

  // src/lib/table/arrow-api/arrow-like-table.ts
  var ArrowLikeVector = class {
    table;
    columnName;
    constructor(table, columnName) {
      this.table = table;
      this.columnName = columnName;
    }
    get(rowIndex) {
      return getTableCell(this.table, rowIndex, this.columnName);
    }
    toArray() {
      switch (this.table.shape) {
        case "arrow-table":
          const arrowTable = this.table.data;
          return arrowTable.getChild(this.columnName)?.toArray();
        case "columnar-table":
          return this.table.data[this.columnName];
        default:
          throw new Error(this.table.shape);
      }
    }
  };
  var ArrowLikeTable = class {
    schema;
    table;
    constructor(table) {
      const schema = table.schema || deduceTableSchema(table);
      this.schema = new ArrowLikeSchema(schema.fields, schema.metadata);
      this.table = { ...table, schema };
    }
    // get schema() {
    //   return this.table.schema;
    // }
    get data() {
      return this.table.shape === "geojson-table" ? this.table.features : this.table.data;
    }
    get numCols() {
      return getTableNumCols(this.table);
    }
    get length() {
      return getTableLength(this.table);
    }
    getChild(columnName) {
      return new ArrowLikeVector(this.table, columnName);
    }
    // getChildAt(columnIndex: number): ArrowLikeVector {
    //   return
    // }
  };

  // src/lib/table/simple-table/make-table.ts
  function makeTableFromData(data) {
    let table;
    switch (getTableShapeFromData(data)) {
      case "array-row-table":
        table = { shape: "array-row-table", data };
        break;
      case "object-row-table":
        table = { shape: "object-row-table", data };
        break;
      case "columnar-table":
        table = { shape: "columnar-table", data };
        break;
      default:
        throw new Error("table");
    }
    const schema = deduceTableSchema(table);
    return { ...table, schema };
  }
  function getTableShapeFromData(data) {
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error("cannot deduce type of empty table");
      }
      const firstRow = data[0];
      if (Array.isArray(firstRow)) {
        return "array-row-table";
      }
      if (firstRow && typeof firstRow === "object") {
        return "object-row-table";
      }
    }
    if (data && typeof data === "object") {
      return "columnar-table";
    }
    throw new Error("invalid table");
  }

  // src/lib/table/simple-table/make-table-from-batches.ts
  function makeBatchFromTable(table) {
    return { ...table, length: getTableLength(table), batchType: "data" };
  }
  async function makeTableFromBatches(batchIterator) {
    let arrayRows;
    let objectRows;
    let features;
    let shape = null;
    let schema;
    for await (const batch of batchIterator) {
      shape = shape || batch.shape;
      schema = schema || batch.schema;
      switch (batch.shape) {
        case "array-row-table":
          arrayRows = arrayRows || [];
          for (let rowIndex = 0; rowIndex < getTableLength(batch); rowIndex++) {
            const row = batch.data[rowIndex];
            arrayRows.push(row);
          }
          break;
        case "object-row-table":
          objectRows = objectRows || [];
          for (let rowIndex = 0; rowIndex < getTableLength(batch); rowIndex++) {
            const row = batch.data[rowIndex];
            objectRows.push(row);
          }
          break;
        case "geojson-table":
          features = features || [];
          for (let rowIndex = 0; rowIndex < getTableLength(batch); rowIndex++) {
            const row = batch.features[rowIndex];
            features.push(row);
          }
          break;
        case "columnar-table":
        case "arrow-table":
        default:
          throw new Error("shape");
      }
    }
    if (!shape) {
      return null;
    }
    switch (shape) {
      case "array-row-table":
        return { shape: "array-row-table", data: arrayRows, schema };
      case "object-row-table":
        return { shape: "object-row-table", data: objectRows, schema };
      case "geojson-table":
        return { shape: "geojson-table", type: "FeatureCollection", features, schema };
      default:
        return null;
    }
  }

  // src/lib/table/simple-table/table-column.ts
  function makeColumnFromField(field, length) {
    const ArrayType = getArrayTypeFromDataType(field.type, field.nullable);
    return new ArrayType(length);
  }

  // src/lib/table/simple-table/convert-table.ts
  function convertTable(table, shape) {
    switch (shape) {
      case "object-row-table":
        return makeObjectRowTable(table);
      case "array-row-table":
        return makeArrayRowTable(table);
      case "columnar-table":
        return makeColumnarTable(table);
      case "arrow-table":
        return makeArrowTable(table);
      default:
        throw new Error(shape);
    }
  }
  function makeArrowTable(table) {
    const _makeArrowTable = globalThis.__loaders?._makeArrowTable;
    if (!_makeArrowTable) {
      throw new Error("");
    }
    return _makeArrowTable(table);
  }
  function makeColumnarTable(table) {
    const schema = table.schema || deduceTableSchema(table);
    const fields = table.schema?.fields || [];
    if (table.shape === "columnar-table") {
      return { ...table, schema };
    }
    const length = getTableLength(table);
    const columns = {};
    for (const field of fields) {
      const column = makeColumnFromField(field, length);
      columns[field.name] = column;
      for (let rowIndex = 0; rowIndex < length; rowIndex++) {
        column[rowIndex] = getTableCell(table, rowIndex, field.name);
      }
    }
    return {
      shape: "columnar-table",
      schema,
      data: columns
    };
  }
  function makeArrayRowTable(table) {
    if (table.shape === "array-row-table") {
      return table;
    }
    const length = getTableLength(table);
    const data = new Array(length);
    for (let rowIndex = 0; rowIndex < length; rowIndex++) {
      data[rowIndex] = getTableRowAsArray(table, rowIndex);
    }
    return {
      shape: "array-row-table",
      schema: table.schema,
      data
    };
  }
  function makeObjectRowTable(table) {
    if (table.shape === "object-row-table") {
      return table;
    }
    const length = getTableLength(table);
    const data = new Array(length);
    for (let rowIndex = 0; rowIndex < length; rowIndex++) {
      data[rowIndex] = getTableRowAsObject(table, rowIndex);
    }
    return {
      shape: "object-row-table",
      schema: table.schema,
      data
    };
  }

  // src/lib/mesh/mesh-utils.ts
  function getMeshSize(attributes) {
    let size = 0;
    for (const attributeName in attributes) {
      const attribute = attributes[attributeName];
      if (ArrayBuffer.isView(attribute)) {
        size += attribute.byteLength * attribute.BYTES_PER_ELEMENT;
      }
    }
    return size;
  }
  function getMeshBoundingBox(attributes) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    const positions = attributes.POSITION ? attributes.POSITION.value : [];
    const len = positions && positions.length;
    for (let i = 0; i < len; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      minX = x < minX ? x : minX;
      minY = y < minY ? y : minY;
      minZ = z < minZ ? z : minZ;
      maxX = x > maxX ? x : maxX;
      maxY = y > maxY ? y : maxY;
      maxZ = z > maxZ ? z : maxZ;
    }
    return [
      [minX, minY, minZ],
      [maxX, maxY, maxZ]
    ];
  }

  // src/lib/mesh/deduce-mesh-schema.ts
  function deduceMeshSchema(attributes, metadata = {}) {
    const fields = deduceMeshFields(attributes);
    return { fields, metadata };
  }
  function deduceMeshField(name, attribute, optionalMetadata) {
    const type = getDataTypeFromTypedArray(attribute.value);
    const metadata = optionalMetadata ? optionalMetadata : makeMeshAttributeMetadata(attribute);
    return {
      name,
      type: { type: "fixed-size-list", listSize: attribute.size, children: [{ name: "value", type }] },
      nullable: false,
      metadata
    };
  }
  function deduceMeshFields(attributes) {
    const fields = [];
    for (const attributeName in attributes) {
      const attribute = attributes[attributeName];
      fields.push(deduceMeshField(attributeName, attribute));
    }
    return fields;
  }
  function makeMeshAttributeMetadata(attribute) {
    const result = {};
    if ("byteOffset" in attribute) {
      result.byteOffset = attribute.byteOffset.toString(10);
    }
    if ("byteStride" in attribute) {
      result.byteStride = attribute.byteStride.toString(10);
    }
    if ("normalized" in attribute) {
      result.normalized = attribute.normalized.toString();
    }
    return result;
  }

  // src/lib/table/arrow-api/enum.ts
  var Type = /* @__PURE__ */ ((Type2) => {
    Type2[Type2["NONE"] = 0] = "NONE";
    Type2[Type2["Null"] = 1] = "Null";
    Type2[Type2["Int"] = 2] = "Int";
    Type2[Type2["Float"] = 3] = "Float";
    Type2[Type2["Binary"] = 4] = "Binary";
    Type2[Type2["Utf8"] = 5] = "Utf8";
    Type2[Type2["Bool"] = 6] = "Bool";
    Type2[Type2["Decimal"] = 7] = "Decimal";
    Type2[Type2["Date"] = 8] = "Date";
    Type2[Type2["Time"] = 9] = "Time";
    Type2[Type2["Timestamp"] = 10] = "Timestamp";
    Type2[Type2["Interval"] = 11] = "Interval";
    Type2[Type2["List"] = 12] = "List";
    Type2[Type2["Struct"] = 13] = "Struct";
    Type2[Type2["Union"] = 14] = "Union";
    Type2[Type2["FixedSizeBinary"] = 15] = "FixedSizeBinary";
    Type2[Type2["FixedSizeList"] = 16] = "FixedSizeList";
    Type2[Type2["Map"] = 17] = "Map";
    Type2[Type2["Dictionary"] = -1] = "Dictionary";
    Type2[Type2["Int8"] = -2] = "Int8";
    Type2[Type2["Int16"] = -3] = "Int16";
    Type2[Type2["Int32"] = -4] = "Int32";
    Type2[Type2["Int64"] = -5] = "Int64";
    Type2[Type2["Uint8"] = -6] = "Uint8";
    Type2[Type2["Uint16"] = -7] = "Uint16";
    Type2[Type2["Uint32"] = -8] = "Uint32";
    Type2[Type2["Uint64"] = -9] = "Uint64";
    Type2[Type2["Float16"] = -10] = "Float16";
    Type2[Type2["Float32"] = -11] = "Float32";
    Type2[Type2["Float64"] = -12] = "Float64";
    Type2[Type2["DateDay"] = -13] = "DateDay";
    Type2[Type2["DateMillisecond"] = -14] = "DateMillisecond";
    Type2[Type2["TimestampSecond"] = -15] = "TimestampSecond";
    Type2[Type2["TimestampMillisecond"] = -16] = "TimestampMillisecond";
    Type2[Type2["TimestampMicrosecond"] = -17] = "TimestampMicrosecond";
    Type2[Type2["TimestampNanosecond"] = -18] = "TimestampNanosecond";
    Type2[Type2["TimeSecond"] = -19] = "TimeSecond";
    Type2[Type2["TimeMillisecond"] = -20] = "TimeMillisecond";
    Type2[Type2["TimeMicrosecond"] = -21] = "TimeMicrosecond";
    Type2[Type2["TimeNanosecond"] = -22] = "TimeNanosecond";
    Type2[Type2["DenseUnion"] = -23] = "DenseUnion";
    Type2[Type2["SparseUnion"] = -24] = "SparseUnion";
    Type2[Type2["IntervalDayTime"] = -25] = "IntervalDayTime";
    Type2[Type2["IntervalYearMonth"] = -26] = "IntervalYearMonth";
    return Type2;
  })(Type || {});

  // src/lib/table/arrow-api/arrow-like-type.ts
  var DataType = class {
    static isNull(x) {
      return x && x.typeId === 1 /* Null */;
    }
    static isInt(x) {
      return x && x.typeId === 2 /* Int */;
    }
    static isFloat(x) {
      return x && x.typeId === 3 /* Float */;
    }
    static isBinary(x) {
      return x && x.typeId === 4 /* Binary */;
    }
    static isUtf8(x) {
      return x && x.typeId === 5 /* Utf8 */;
    }
    static isBool(x) {
      return x && x.typeId === 6 /* Bool */;
    }
    static isDecimal(x) {
      return x && x.typeId === 7 /* Decimal */;
    }
    static isDate(x) {
      return x && x.typeId === 8 /* Date */;
    }
    static isTime(x) {
      return x && x.typeId === 9 /* Time */;
    }
    static isTimestamp(x) {
      return x && x.typeId === 10 /* Timestamp */;
    }
    static isInterval(x) {
      return x && x.typeId === 11 /* Interval */;
    }
    static isList(x) {
      return x && x.typeId === 12 /* List */;
    }
    static isStruct(x) {
      return x && x.typeId === 13 /* Struct */;
    }
    static isUnion(x) {
      return x && x.typeId === 14 /* Union */;
    }
    static isFixedSizeBinary(x) {
      return x && x.typeId === 15 /* FixedSizeBinary */;
    }
    static isFixedSizeList(x) {
      return x && x.typeId === 16 /* FixedSizeList */;
    }
    static isMap(x) {
      return x && x.typeId === 17 /* Map */;
    }
    static isDictionary(x) {
      return x && x.typeId === -1 /* Dictionary */;
    }
    get typeId() {
      return 0 /* NONE */;
    }
    // get ArrayType(): AnyArrayType {
    //   return Int8Array;
    // }
    // get ArrayType() { return Array; }
    compareTo(other) {
      return this === other;
    }
  };
  var Null = class extends DataType {
    get typeId() {
      return 1 /* Null */;
    }
    get [Symbol.toStringTag]() {
      return "Null";
    }
    toString() {
      return "Null";
    }
  };
  var Bool = class extends DataType {
    get typeId() {
      return 6 /* Bool */;
    }
    // get ArrayType() {
    //   return Uint8Array;
    // }
    get [Symbol.toStringTag]() {
      return "Bool";
    }
    toString() {
      return "Bool";
    }
  };
  var Int = class extends DataType {
    isSigned;
    bitWidth;
    constructor(isSigned, bitWidth) {
      super();
      this.isSigned = isSigned;
      this.bitWidth = bitWidth;
    }
    get typeId() {
      return 2 /* Int */;
    }
    // get ArrayType() {
    //   switch (this.bitWidth) {
    //     case 8:
    //       return this.isSigned ? Int8Array : Uint8Array;
    //     case 16:
    //       return this.isSigned ? Int16Array : Uint16Array;
    //     case 32:
    //       return this.isSigned ? Int32Array : Uint32Array;
    //     case 64:
    //       return this.isSigned ? Int32Array : Uint32Array;
    //     default:
    //       throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
    //   }
    // }
    get [Symbol.toStringTag]() {
      return "Int";
    }
    toString() {
      return `${this.isSigned ? "I" : "Ui"}nt${this.bitWidth}`;
    }
  };
  var Int8 = class extends Int {
    constructor() {
      super(true, 8);
    }
  };
  var Int16 = class extends Int {
    constructor() {
      super(true, 16);
    }
  };
  var Int32 = class extends Int {
    constructor() {
      super(true, 32);
    }
  };
  var Int64 = class extends Int {
    constructor() {
      super(true, 64);
    }
  };
  var Uint8 = class extends Int {
    constructor() {
      super(false, 8);
    }
  };
  var Uint16 = class extends Int {
    constructor() {
      super(false, 16);
    }
  };
  var Uint32 = class extends Int {
    constructor() {
      super(false, 32);
    }
  };
  var Uint64 = class extends Int {
    constructor() {
      super(false, 64);
    }
  };
  var Precision = {
    HALF: 16,
    SINGLE: 32,
    DOUBLE: 64
  };
  var Float = class extends DataType {
    precision;
    constructor(precision) {
      super();
      this.precision = precision;
    }
    get typeId() {
      return 3 /* Float */;
    }
    // get ArrayType() {
    //   switch (this.precision) {
    //     case Precision.HALF:
    //       return Uint16Array;
    //     case Precision.SINGLE:
    //       return Float32Array;
    //     case Precision.DOUBLE:
    //       return Float64Array;
    //     default:
    //       throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
    //   }
    // }
    get [Symbol.toStringTag]() {
      return "Float";
    }
    toString() {
      return `Float${this.precision}`;
    }
  };
  var Float16 = class extends Float {
    constructor() {
      super(Precision.HALF);
    }
  };
  var Float32 = class extends Float {
    constructor() {
      super(Precision.SINGLE);
    }
  };
  var Float64 = class extends Float {
    constructor() {
      super(Precision.DOUBLE);
    }
  };
  var Binary = class extends DataType {
    constructor() {
      super();
    }
    get typeId() {
      return 4 /* Binary */;
    }
    toString() {
      return "Binary";
    }
    get [Symbol.toStringTag]() {
      return "Binary";
    }
  };
  var Utf8 = class extends DataType {
    get typeId() {
      return 5 /* Utf8 */;
    }
    // get ArrayType() {
    //   return Uint8Array;
    // }
    get [Symbol.toStringTag]() {
      return "Utf8";
    }
    toString() {
      return "Utf8";
    }
  };
  var DateUnit = {
    DAY: 0,
    MILLISECOND: 1
  };
  var Date2 = class extends DataType {
    unit;
    constructor(unit) {
      super();
      this.unit = unit;
    }
    get typeId() {
      return 8 /* Date */;
    }
    // get ArrayType() {
    //   return Int32Array;
    // }
    get [Symbol.toStringTag]() {
      return "Date";
    }
    toString() {
      return `Date${(this.unit + 1) * 32}<${DateUnit[this.unit]}>`;
    }
  };
  var DateDay = class extends Date2 {
    constructor() {
      super(DateUnit.DAY);
    }
  };
  var DateMillisecond = class extends Date2 {
    constructor() {
      super(DateUnit.MILLISECOND);
    }
  };
  var TimeUnit = {
    SECOND: 1,
    MILLISECOND: 1e3,
    MICROSECOND: 1e6,
    NANOSECOND: 1e9
  };
  var Time = class extends DataType {
    unit;
    bitWidth;
    constructor(unit, bitWidth) {
      super();
      this.unit = unit;
      this.bitWidth = bitWidth;
    }
    get typeId() {
      return 9 /* Time */;
    }
    toString() {
      return `Time${this.bitWidth}<${TimeUnit[this.unit]}>`;
    }
    get [Symbol.toStringTag]() {
      return "Time";
    }
    // get ArrayType() {
    //   return Int32Array;
    // }
  };
  var TimeSecond = class extends Time {
    constructor() {
      super(TimeUnit.SECOND, 32);
    }
  };
  var TimeMillisecond = class extends Time {
    constructor() {
      super(TimeUnit.MILLISECOND, 32);
    }
  };
  var Timestamp = class extends DataType {
    unit;
    timezone;
    constructor(unit, timezone = null) {
      super();
      this.unit = unit;
      this.timezone = timezone;
    }
    get typeId() {
      return 10 /* Timestamp */;
    }
    // get ArrayType() {
    //   return Int32Array;
    // }
    get [Symbol.toStringTag]() {
      return "Timestamp";
    }
    toString() {
      return `Timestamp<${TimeUnit[this.unit]}${this.timezone ? `, ${this.timezone}` : ""}>`;
    }
  };
  var TimestampSecond = class extends Timestamp {
    constructor(timezone = null) {
      super(TimeUnit.SECOND, timezone);
    }
  };
  var TimestampMillisecond = class extends Timestamp {
    constructor(timezone = null) {
      super(TimeUnit.MILLISECOND, timezone);
    }
  };
  var TimestampMicrosecond = class extends Timestamp {
    constructor(timezone = null) {
      super(TimeUnit.MICROSECOND, timezone);
    }
  };
  var TimestampNanosecond = class extends Timestamp {
    constructor(timezone = null) {
      super(TimeUnit.NANOSECOND, timezone);
    }
  };
  var IntervalUnit = {
    DAY_TIME: 0,
    YEAR_MONTH: 1
  };
  var Interval = class extends DataType {
    unit;
    constructor(unit) {
      super();
      this.unit = unit;
    }
    get typeId() {
      return 11 /* Interval */;
    }
    // get ArrayType() {
    //   return Int32Array;
    // }
    get [Symbol.toStringTag]() {
      return "Interval";
    }
    toString() {
      return `Interval<${IntervalUnit[this.unit]}>`;
    }
  };
  var IntervalDayTime = class extends Interval {
    constructor() {
      super(IntervalUnit.DAY_TIME);
    }
  };
  var IntervalYearMonth = class extends Interval {
    constructor() {
      super(IntervalUnit.YEAR_MONTH);
    }
  };
  var FixedSizeList = class extends DataType {
    listSize;
    children;
    constructor(listSize, child) {
      super();
      this.listSize = listSize;
      this.children = [child];
    }
    get typeId() {
      return 16 /* FixedSizeList */;
    }
    get valueType() {
      return this.children[0].type;
    }
    get valueField() {
      return this.children[0];
    }
    // get ArrayType() {
    //   return this.valueType.ArrayType;
    // }
    get [Symbol.toStringTag]() {
      return "FixedSizeList";
    }
    toString() {
      return `FixedSizeList[${this.listSize}]<${JSON.stringify(this.valueType)}>`;
    }
  };
  var Struct = class extends DataType {
    children;
    constructor(children) {
      super();
      this.children = children;
    }
    get typeId() {
      return 13 /* Struct */;
    }
    toString() {
      return `Struct<{${this.children.map((f) => `${f.name}:${JSON.stringify(f.type)}`).join(", ")}}>`;
    }
    get [Symbol.toStringTag]() {
      return "Struct";
    }
  };

  // src/lib/table/arrow-api/get-type-info.ts
  function getTypeInfo(arrowTypeLike) {
    return {
      typeId: arrowTypeLike.typeId,
      ArrayType: arrowTypeLike.ArrayType,
      typeName: arrowTypeLike.toString(),
      typeEnumName: getTypeKey(arrowTypeLike.typeId),
      precision: arrowTypeLike.precision
    };
  }
  var ReverseType = null;
  function getTypeKey(typeKey) {
    if (!ReverseType) {
      ReverseType = {};
      for (const key in Type) {
        ReverseType[Type[key]] = key;
      }
    }
    return ReverseType[typeKey];
  }

  // src/lib/utils/async-queue.ts
  var ArrayQueue = class extends Array {
    enqueue(value) {
      return this.push(value);
    }
    dequeue() {
      return this.shift();
    }
  };
  var AsyncQueue = class {
    _values;
    _settlers;
    _closed;
    constructor() {
      this._values = new ArrayQueue();
      this._settlers = new ArrayQueue();
      this._closed = false;
    }
    close() {
      while (this._settlers.length > 0) {
        this._settlers.dequeue().resolve({ done: true });
      }
      this._closed = true;
    }
    [Symbol.asyncIterator]() {
      return this;
    }
    enqueue(value) {
      if (this._closed) {
        throw new Error("Closed");
      }
      if (this._settlers.length > 0) {
        if (this._values.length > 0) {
          throw new Error("Illegal internal state");
        }
        const settler = this._settlers.dequeue();
        if (value instanceof Error) {
          settler.reject(value);
        } else {
          settler.resolve({ value });
        }
      } else {
        this._values.enqueue(value);
      }
    }
    /**
     * @returns a Promise for an IteratorResult
     */
    next() {
      if (this._values.length > 0) {
        const value = this._values.dequeue();
        if (value instanceof Error) {
          return Promise.reject(value);
        }
        return Promise.resolve({ value });
      }
      if (this._closed) {
        if (this._settlers.length > 0) {
          throw new Error("Illegal internal state");
        }
        return Promise.resolve({ done: true });
      }
      return new Promise((resolve, reject) => {
        this._settlers.enqueue({ resolve, reject });
      });
    }
  };
  return __toCommonJS(bundle_exports);
})();
      return __exports__;
      });

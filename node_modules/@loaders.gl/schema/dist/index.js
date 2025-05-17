// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
export { getArrayTypeFromDataType } from "./lib/table/simple-table/data-type.js";
// TABLE CATEGORY UTILS
export { TableBatchBuilder } from "./lib/table/batches/table-batch-builder.js";
export { RowTableBatchAggregator } from "./lib/table/batches/row-table-batch-aggregator.js";
export { ColumnarTableBatchAggregator } from "./lib/table/batches/columnar-table-batch-aggregator.js";
export { isTable, getTableLength, getTableNumCols, getTableCell, getTableCellAt, getTableRowShape, getTableColumnIndex, getTableColumnName, getTableRowAsObject, getTableRowAsArray, makeRowIterator, makeArrayRowIterator, makeObjectRowIterator } from "./lib/table/simple-table/table-accessors.js";
export { ArrowLikeTable } from "./lib/table/arrow-api/arrow-like-table.js";
export { makeTableFromData } from "./lib/table/simple-table/make-table.js";
export { makeTableFromBatches, makeBatchFromTable } from "./lib/table/simple-table/make-table-from-batches.js";
export { convertTable } from "./lib/table/simple-table/convert-table.js";
export { deduceTableSchema } from "./lib/table/simple-table/table-schema.js";
export { convertToObjectRow, convertToArrayRow } from "./lib/table/simple-table/row-utils.js";
export { getDataTypeFromArray } from "./lib/table/simple-table/data-type.js";
export { getMeshSize, getMeshBoundingBox } from "./lib/mesh/mesh-utils.js";
// Commented out due to https://github.com/visgl/deck.gl/issues/6906 and https://github.com/visgl/loaders.gl/issues/2177
// export {convertMesh} from './category/mesh/convert-mesh';
export { deduceMeshSchema, deduceMeshField, makeMeshAttributeMetadata } from "./lib/mesh/deduce-mesh-schema.js";
// SCHEMA
export { Schema as ArrowLikeSchema, Field as ArrowLikeField, DataType as ArrowLikeDataType, Null, Binary, Bool, Int, Int8, Int16, Int32, Int64, Uint8, Uint16, Uint32, Uint64, Float, Float16, Float32, Float64, Utf8, Date, DateDay, DateMillisecond, Time, TimeMillisecond, TimeSecond, Timestamp, TimestampSecond, TimestampMillisecond, TimestampMicrosecond, TimestampNanosecond, Interval, IntervalDayTime, IntervalYearMonth, FixedSizeList, Struct } from "./lib/table/arrow-api/index.js";
// EXPERIMENTAL APIs
// SCHEMA UTILS
export { getTypeInfo } from "./lib/table/arrow-api/get-type-info.js";
export { default as AsyncQueue } from "./lib/utils/async-queue.js";

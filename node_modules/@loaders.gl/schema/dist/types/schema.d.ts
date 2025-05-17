/** For dictionary type */
export type KeyType = 'int8' | 'int16' | 'int32' | 'uint8' | 'uint16' | 'uint32';
/** ArrowLike DataType class */
export type DataType = 'null' | 'bool' | 'int' | 'int8' | 'int16' | 'int32' | 'int64' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'float' | 'float16' | 'float32' | 'float64' | 'binary' | 'utf8' | 'date-day' | 'date-millisecond' | 'time-second' | 'time-millisecond' | 'time-microsecond' | 'time-nanosecond' | 'timestamp-second' | 'timestamp-millisecond' | 'timestamp-microsecond' | 'timestamp-nanosecond' | 'interval-daytime' | 'interval-yearmonth' | {
    type: 'decimal';
    bitWidth: number;
    precision: number;
    scale: number;
} | {
    type: 'list';
    children: Field[];
} | {
    type: 'struct';
    children: Field[];
} | {
    type: 'sparse-union';
    typeIds: Int32Array;
    children: Field[];
    typeIdToChildIndex: {
        [key: number]: number;
    };
} | {
    type: 'dense-union';
    typeIds: Int32Array;
    children: Field[];
    typeIdToChildIndex: {
        [key: number]: number;
    };
} | {
    type: 'fixed-size-binary';
    byteWidth: number;
} | {
    type: 'fixed-size-list';
    listSize: number;
    children: Field[];
} | {
    type: 'map';
    keysSorted: boolean;
    children: Field[];
} | {
    type: 'dictionary';
    id: number;
    indices: KeyType;
    dictionary: DataType;
    isOrdered: boolean;
};
/**
 * SchemaMetadata
 */
export type SchemaMetadata = Record<string, string>;
export type FieldMetadata = Record<string, string>;
export type Field = {
    name: string;
    type: DataType;
    nullable?: boolean;
    metadata?: FieldMetadata;
};
/**
 * `Schema` type that that can hold all data required by an Arrow Schema
 * but is fully serializable. Helper functions make it easy to convert to and from arrow schemas
 * https://loaders.gl/arrowjs/docs/api-reference/schema
 */
export type Schema = {
    fields: Field[];
    metadata: SchemaMetadata;
};
//# sourceMappingURL=schema.d.ts.map
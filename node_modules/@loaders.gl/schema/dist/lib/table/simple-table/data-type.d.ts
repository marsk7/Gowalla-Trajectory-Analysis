import { DataType } from "../../../types/schema.js";
import { TypedArray, TypedArrayConstructor, ArrayType } from "../../../types/types.js";
/** Deduce column types from values */
export declare function getDataTypeFromValue(value: unknown, defaultNumberType?: 'float32'): DataType;
/**
 * Deduces a simple data type "descriptor from a typed array instance
 */
export declare function getDataTypeFromArray(array: ArrayType): {
    type: DataType;
    nullable: boolean;
};
/**
 * Deduces a simple data type "descriptor from a typed array instance
 */
export declare function getDataTypeFromTypedArray(array: TypedArray): DataType;
export declare function getArrayTypeFromDataType(type: DataType, nullable: boolean | undefined): TypedArrayConstructor | ArrayConstructor;
//# sourceMappingURL=data-type.d.ts.map
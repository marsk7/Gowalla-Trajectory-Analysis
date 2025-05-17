import type { NumericArray, TypedArray } from "../types/types.js";
export declare function padArray({ source, target, size, getData, sourceStartIndices, targetStartIndices }: {
    /** original data */
    source: TypedArray;
    /** output data */
    target: TypedArray;
    /** length per datum */
    size: number;
    /** callback to get new data when source is short */
    getData: (index: number, context: NumericArray) => NumericArray;
    /** subdivision of the original data in [object0StartIndex, object1StartIndex, ...] */
    sourceStartIndices?: NumericArray | null;
    /** subdivision of the output data in [object0StartIndex, object1StartIndex, ...] */
    targetStartIndices?: NumericArray | null;
}): TypedArray;
//# sourceMappingURL=array-utils.d.ts.map
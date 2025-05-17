import type { Bin } from "./cpu-aggregator.js";
import type { AggregationOperation } from "../aggregator.js";
/** A reducer function that takes a list of data points and outputs one measurement */
export type AggregationFunc = (
/** Indices of the points */
pointIndices: number[], 
/** Accessor to the value for each point */
getValue: (index: number) => number) => number;
export declare const BUILT_IN_OPERATIONS: Record<AggregationOperation, AggregationFunc>;
/**
 * Performs the aggregation step. See interface Aggregator comments.
 * @returns Floa32Array of aggregated values, one for each bin, and the [min,max] of the values
 */
export declare function aggregate({ bins, getValue, operation, target }: {
    /** Data points sorted by bins */
    bins: Bin[];
    /** Given the index of a data point, returns its value */
    getValue: (index: number) => number;
    /** Method used to reduce a list of values to one number */
    operation: AggregationFunc;
    /** Array to write the output into */
    target?: Float32Array | null;
}): {
    value: Float32Array;
    domain: [min: number, max: number];
};
//# sourceMappingURL=aggregate.d.ts.map
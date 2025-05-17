import type { BinaryAttribute } from '@deck.gl/core';
import type { ScaleType } from "../types.js";
type ScaleProps = {
    scaleType: ScaleType;
    /** Trim the lower end of the domain by this percentile. Set to `0` to disable. */
    lowerPercentile: number;
    /** Trim the upper end of the domain by this percentile. Set to `100` to disable. */
    upperPercentile: number;
};
/** Applies a scale to BinaryAttribute */
export declare class AttributeWithScale {
    /** Input values accessor. Has either a `value` (CPU aggregation) or a `buffer` (GPU aggregation) */
    private readonly input;
    private readonly inputLength;
    private props;
    private _percentile?;
    private _ordinal?;
    /** Output values accessor */
    attribute: BinaryAttribute;
    /** [min, max] of attribute values, or null if unknown */
    domain: [number, number] | null;
    /** Valid domain if lower/upper percentile are defined */
    cutoff: [number, number] | null;
    constructor(input: BinaryAttribute, inputLength: number);
    private getScalePercentile;
    private getScaleOrdinal;
    /** Returns the [lowerCutoff, upperCutoff] of scaled values, or null if not applicable */
    private getCutoff;
    update(props: ScaleProps): this;
}
/**
 * Transform an array of values to ordinal indices
 */
export declare function applyScaleOrdinal(values: Float32Array): {
    attribute: BinaryAttribute;
    domain: number[];
};
/**
 * Transform an array of values to percentiles
 */
export declare function applyScaleQuantile(values: Float32Array, rangeLength?: number): {
    attribute: BinaryAttribute;
    domain: number[];
};
export {};
//# sourceMappingURL=scale-utils.d.ts.map
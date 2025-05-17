import type { Aggregator, AggregationProps, AggregatedBin } from "../aggregator.js";
import { BinaryAttribute } from '@deck.gl/core';
import { AggregationFunc } from "./aggregate.js";
import { VertexAccessor } from "./vertex-accessor.js";
/** Options used to construct a new CPUAggregator */
export type CPUAggregatorProps = {
    /** Size of bin IDs */
    dimensions: number;
    /** Accessor to map each data point to a bin ID.
     * Bin ID should be an array with [dimensions] elements; or null if the data point should be skipped
     */
    getBin: VertexAccessor<number[] | null, any>;
    /** Accessor to map each data point to a weight value, defined per channel */
    getValue: VertexAccessor<number>[];
} & Partial<CPUAggregationProps>;
/** Props used to run CPU aggregation, can be changed at any time */
type CPUAggregationProps = AggregationProps & {
    /** Custom callback to aggregate points, overrides the built-in operations */
    customOperations: (AggregationFunc | null | undefined)[];
};
export type Bin = {
    id: number[];
    index: number;
    /** list of data point indices */
    points: number[];
};
/** An Aggregator implementation that calculates aggregation on the CPU */
export declare class CPUAggregator implements Aggregator {
    readonly dimensions: number;
    readonly channelCount: number;
    props: CPUAggregatorProps & CPUAggregationProps;
    /** Dirty flag
     * If true, redo sorting
     * If array, redo aggregation on the specified channel
     */
    protected needsUpdate: boolean[] | boolean;
    protected bins: Bin[];
    protected binIds: (BinaryAttribute & {
        value: Float32Array;
    }) | null;
    protected results: (BinaryAttribute & {
        value: Float32Array;
        domain: [min: number, max: number];
    })[];
    constructor(props: CPUAggregatorProps);
    destroy(): void;
    get binCount(): number;
    /** Update aggregation props */
    setProps(props: Partial<CPUAggregationProps>): void;
    /** Flags a channel to need update
     * This is called internally by setProps() if certain props change
     * Users of this class still need to manually set the dirty flag sometimes, because even if no props changed
     * the underlying buffers could have been updated and require rerunning the aggregation
     * @param {number} channel - mark the given channel as dirty. If not provided, all channels will be updated.
     */
    setNeedsUpdate(channel?: number): void;
    /** Run aggregation */
    update(): void;
    preDraw(): void;
    /** Returns an accessor to the bins. */
    getBins(): BinaryAttribute | null;
    /** Returns an accessor to the output for a given channel. */
    getResult(channel: number): BinaryAttribute | null;
    /** Returns the [min, max] of aggregated values for a given channel. */
    getResultDomain(channel: number): [min: number, max: number];
    /** Returns the information for a given bin. */
    getBin(index: number): AggregatedBin | null;
}
export {};
//# sourceMappingURL=cpu-aggregator.d.ts.map
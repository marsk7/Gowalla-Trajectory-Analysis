import { WebGLBinSorter } from "./webgl-bin-sorter.js";
import { WebGLAggregationTransform } from "./webgl-aggregation-transform.js";
import { BinaryAttribute } from '@deck.gl/core';
import type { Aggregator, AggregationProps, AggregatedBin } from "../aggregator.js";
import type { Device, BufferLayout } from '@luma.gl/core';
import type { ShaderModule } from '@luma.gl/shadertools';
/** Options used to construct a new WebGLAggregator */
export type WebGLAggregatorProps = {
    /** Size of bin IDs */
    dimensions: 1 | 2;
    /** How many properties to perform aggregation on */
    channelCount: 1 | 2 | 3;
    /** Buffer layout for input attributes */
    bufferLayout?: BufferLayout[];
    /** Define a shader function with one of the signatures
     *  `void getBin(out int binId)`: if dimensions=1
     *  `void getBin(out ivec2 binId)`: if dimensions=2
     * And a shader function with one of the signatures
     *  `void getValue(out float value)`: if channelCount=1
     *  `void getValue(out vec2 value)`: if channelCount=2
     *  `void getValue(out vec3 value)`: if channelCount=3
     */
    vs: string;
    /** Shader modules
     * Required to support certain layer extensions (e.g. data filter)
     */
    modules?: ShaderModule[];
    /** Shadertool module defines */
    defines?: Record<string, string | number | boolean>;
} & Partial<WebGLAggregationProps>;
/** Props used to run GPU aggregation, can be changed at any time */
type WebGLAggregationProps = AggregationProps & {
    /** Limits of binId defined for each dimension. Ids outside of the [start, end) are ignored.
     */
    binIdRange: [start: number, end: number][];
    /** Context props passed to the shader modules */
    shaderModuleProps?: Record<string, any>;
};
/** An Aggregator implementation that calculates aggregation on the GPU */
export declare class WebGLAggregator implements Aggregator {
    /** Checks if the current device supports GPU aggregation */
    static isSupported(device: Device): boolean;
    readonly dimensions: 1 | 2;
    readonly channelCount: 1 | 2 | 3;
    binCount: number;
    readonly device: Device;
    props: WebGLAggregatorProps & WebGLAggregationProps;
    /** Dirty flag per channel */
    protected needsUpdate: boolean[];
    /** Step 1. sort data points into bins, blended using an aggregation opera†ion */
    protected binSorter: WebGLBinSorter;
    /** Step 2. (optional) calculate the min/max across all bins */
    protected aggregationTransform: WebGLAggregationTransform;
    /** Cached outputs */
    protected binIds: BinaryAttribute | null;
    protected results: BinaryAttribute[];
    constructor(device: Device, props: WebGLAggregatorProps);
    getBins(): BinaryAttribute | null;
    /** Returns an accessor to the output for a given channel. */
    getResult(channel: 0 | 1 | 2): BinaryAttribute | null;
    /** Returns the [min, max] of aggregated values for a given channel. */
    getResultDomain(channel: 0 | 1 | 2): [min: number, max: number];
    /** Returns the information for a given bin. */
    getBin(index: number): AggregatedBin | null;
    /** Release GPU resources */
    destroy(): void;
    /** Update aggregation props. Normalize prop values and set change flags. */
    setProps(props: Partial<WebGLAggregationProps>): void;
    /** Flags a channel to need update.
     * This is called internally by setProps() if certain props change
     * Users of this class still need to manually set the dirty flag sometimes, because even if no props changed
     * the underlying buffers could have been updated and require rerunning the aggregation
     * @param {number} channel - mark the given channel as dirty. If not provided, all channels will be updated.
     */
    setNeedsUpdate(channel?: number): void;
    update(): void;
    /** Run aggregation */
    preDraw(): void;
}
export {};
//# sourceMappingURL=webgl-aggregator.d.ts.map
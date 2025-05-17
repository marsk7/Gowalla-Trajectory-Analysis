import type { Device, Buffer, Texture } from '@luma.gl/core';
import type { WebGLAggregatorProps } from "./webgl-aggregator.js";
import type { AggregationOperation } from "../aggregator.js";
export declare class WebGLAggregationTransform {
    device: Device;
    channelCount: number;
    /** Packed from bin ids */
    binBuffer: Buffer | null;
    /** Packed values from each channel of each bin
     * Stride is number of channels * 4 bytes (float32)
     */
    valueBuffer: Buffer | null;
    private transform;
    /** Render target for calculating domain */
    private domainFBO;
    /** Aggregated [min, max] for each channel */
    private _domains;
    constructor(device: Device, props: WebGLAggregatorProps);
    destroy(): void;
    get domains(): [min: number, max: number][];
    setDimensions(binCount: number, binIdRange: [number, number][]): void;
    update(bins: Texture | null, operations: AggregationOperation[]): void;
}
//# sourceMappingURL=webgl-aggregation-transform.d.ts.map
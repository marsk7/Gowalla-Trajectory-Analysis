import { Model, ModelProps } from '@luma.gl/engine';
import type { Device, Texture } from '@luma.gl/core';
import type { WebGLAggregatorProps } from "./webgl-aggregator.js";
import type { AggregationOperation } from "../aggregator.js";
export declare const TEXTURE_WIDTH = 1024;
/**
 * This class manages the resources for performing the first step of aggregation
 * Sort a list of data points into a number of bins
 */
export declare class WebGLBinSorter {
    device: Device;
    model: Model;
    /**
     * A packed texture in which each pixel represents a bin.
     * The index of the pixel in the memory layout is the bin index.
     * Alpha value is the count of data points that fall into this bin
     * R,G,B values are the aggregated values of each channel:
     *   - Sum of all data points if operation is 'SUM', or 'MEAN'
     *   - Min of all data points if operation is 'MIN'
     *   - Max of all data points if operation is 'MAX'
     */
    private binsFBO;
    constructor(device: Device, props: WebGLAggregatorProps);
    get texture(): Texture | null;
    destroy(): void;
    getBinValues(index: number): Float32Array | null;
    setDimensions(binCount: number, binIdRange: [number, number][]): void;
    setModelProps(props: Pick<ModelProps, 'vertexCount' | 'uniforms' | 'attributes' | 'constantAttributes'> & {
        shaderModuleProps?: Record<string, any>;
    }): void;
    /** Update aggregation */
    update(
    /** The aggregation operation for each channel. Use null to skip update. */
    operations: (AggregationOperation | null)[]): void;
    /** Recalculate aggregation on the given channels using the given operation */
    private _updateBins;
}
//# sourceMappingURL=webgl-bin-sorter.d.ts.map
import { Accessor, Color, GetPickingInfoParams, CompositeLayerProps, Layer, LayersList, PickingInfo, Position, UpdateParameters, DefaultProps } from '@deck.gl/core';
import { WebGLAggregator, CPUAggregator, AggregationOperation } from "../common/aggregator/index.js";
import AggregationLayer from "../common/aggregation-layer.js";
/** All properties supported by ScreenGridLayer. */
export type ScreenGridLayerProps<DataT = unknown> = _ScreenGridLayerProps<DataT> & CompositeLayerProps;
/** Properties added by ScreenGridLayer. */
export type _ScreenGridLayerProps<DataT> = {
    /**
     * Unit width/height of the bins.
     * @default 100
     */
    cellSizePixels?: number;
    /**
     * Cell margin size in pixels.
     * @default 2
     */
    cellMarginPixels?: number;
    /**
     * Color scale input domain. The color scale maps continues numeric domain into discrete color range.
     * @default [1, max(weight)]
     */
    colorDomain?: [number, number] | null;
    /**
     * Specified as an array of colors [color1, color2, ...].
     *
     * @default `6-class YlOrRd` - [colorbrewer](http://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=6)
     */
    colorRange?: Color[];
    /**
     * Scaling function used to determine the color of the grid cell.
     * Supported Values are 'quantize', 'linear', 'quantile' and 'ordinal'.
     * @default 'quantize'
     */
    colorScaleType?: 'linear' | 'quantize';
    /**
     * Method called to retrieve the position of each object.
     *
     * @default d => d.position
     */
    getPosition?: Accessor<DataT, Position>;
    /**
     * The weight of each object.
     *
     * @default 1
     */
    getWeight?: Accessor<DataT, number>;
    /**
     * Perform aggregation is performed on GPU.
     *
     * @default true
     */
    gpuAggregation?: boolean;
    /**
     * Defines the type of aggregation operation
     * Valid values are 'SUM', 'MEAN', 'MIN', 'MAX', 'COUNT'.
     *
     * @default 'SUM'
     */
    aggregation?: AggregationOperation;
};
export type ScreenGridLayerPickingInfo<DataT> = PickingInfo<{
    /** Column index of the picked cell, starting from 0 at the left of the viewport */
    col: number;
    /** Row index of the picked cell, starting from 0 at the top of the viewport */
    row: number;
    /** Aggregated value */
    value: number;
    /** Number of data points in the picked cell */
    count: number;
    /** Indices of the data objects in the picked cell. Only available if using CPU aggregation. */
    pointIndices?: number[];
    /** The data objects in the picked cell. Only available if using CPU aggregation and layer data is an array. */
    points?: DataT[];
}>;
/** Aggregates data into histogram bins and renders them as a grid. */
export default class ScreenGridLayer<DataT = any, ExtraProps extends {} = {}> extends AggregationLayer<DataT, ExtraProps & Required<_ScreenGridLayerProps<DataT>>> {
    static layerName: string;
    static defaultProps: DefaultProps<ScreenGridLayerProps<unknown>>;
    getAggregatorType(): string;
    createAggregator(type: string): WebGLAggregator | CPUAggregator;
    initializeState(): void;
    shouldUpdateState({ changeFlags }: UpdateParameters<this>): boolean;
    updateState(params: UpdateParameters<this>): boolean;
    onAttributeChange(id: string): void;
    renderLayers(): LayersList | Layer | null;
    getPickingInfo(params: GetPickingInfoParams): ScreenGridLayerPickingInfo<DataT>;
}
//# sourceMappingURL=screen-grid-layer.d.ts.map
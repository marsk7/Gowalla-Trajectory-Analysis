import { Accessor, Color, GetPickingInfoParams, CompositeLayerProps, Layer, Material, LayersList, PickingInfo, Position, Viewport, UpdateParameters, DefaultProps } from '@deck.gl/core';
import { WebGLAggregator, CPUAggregator, AggregationOperation } from "../common/aggregator/index.js";
import AggregationLayer from "../common/aggregation-layer.js";
import { AggregateAccessor } from "../common/types.js";
import { AttributeWithScale } from "../common/utils/scale-utils.js";
import { BinOptions } from "./bin-options-uniforms.js";
/** All properties supported by GridLayer. */
export type GridLayerProps<DataT = unknown> = _GridLayerProps<DataT> & CompositeLayerProps;
/** Properties added by GridLayer. */
type _GridLayerProps<DataT> = {
    /**
     * Custom accessor to retrieve a grid bin index from each data object.
     * Not supported by GPU aggregation.
     */
    gridAggregator?: ((position: number[], cellSize: number) => [number, number]) | null;
    /**
     * Size of each cell in meters.
     * @default 1000
     */
    cellSize?: number;
    /**
     * Color scale domain, default is set to the extent of aggregated weights in each cell.
     * @default [min(colorWeight), max(colorWeight)]
     */
    colorDomain?: [number, number] | null;
    /**
     * Default: [colorbrewer](http://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=6) `6-class YlOrRd`
     */
    colorRange?: Color[];
    /**
     * Cell size multiplier, clamped between 0 - 1.
     * @default 1
     */
    coverage?: number;
    /**
     * Elevation scale input domain, default is set to between 0 and the max of aggregated weights in each cell.
     * @default [0, max(elevationWeight)]
     */
    elevationDomain?: [number, number] | null;
    /**
     * Elevation scale output range.
     * @default [0, 1000]
     */
    elevationRange?: [number, number];
    /**
     * Cell elevation multiplier.
     * @default 1
     */
    elevationScale?: number;
    /**
     * Whether to enable cell elevation. If set to false, all cell will be flat.
     * @default true
     */
    extruded?: boolean;
    /**
     * Filter cells and re-calculate color by `upperPercentile`.
     * Cells with value larger than the upperPercentile will be hidden.
     * @default 100
     */
    upperPercentile?: number;
    /**
     * Filter cells and re-calculate color by `lowerPercentile`.
     * Cells with value smaller than the lowerPercentile will be hidden.
     * @default 0
     */
    lowerPercentile?: number;
    /**
     * Filter cells and re-calculate elevation by `elevationUpperPercentile`.
     * Cells with elevation value larger than the `elevationUpperPercentile` will be hidden.
     * @default 100
     */
    elevationUpperPercentile?: number;
    /**
     * Filter cells and re-calculate elevation by `elevationLowerPercentile`.
     * Cells with elevation value larger than the `elevationLowerPercentile` will be hidden.
     * @default 0
     */
    elevationLowerPercentile?: number;
    /**
     * Scaling function used to determine the color of the grid cell.
     * Supported Values are 'quantize', 'linear', 'quantile' and 'ordinal'.
     * @default 'quantize'
     */
    colorScaleType?: 'quantize' | 'linear' | 'quantile' | 'ordinal';
    /**
     * Scaling function used to determine the elevation of the grid cell.
     * Supported Values are 'linear' and 'quantile'.
     * @default 'linear'
     */
    elevationScaleType?: 'linear' | 'quantile';
    /**
     * Material settings for lighting effect. Applies if `extruded: true`.
     *
     * @default true
     * @see https://deck.gl/docs/developer-guide/using-lighting
     */
    material?: Material;
    /**
     * Defines the operation used to aggregate all data object weights to calculate a cell's color value.
     * Valid values are 'SUM', 'MEAN', 'MIN', 'MAX', 'COUNT'.
     *
     * @default 'SUM'
     */
    colorAggregation?: AggregationOperation;
    /**
     * Defines the operation used to aggregate all data object weights to calculate a cell's elevation value.
     * Valid values are 'SUM', 'MEAN', 'MIN', 'MAX', 'COUNT'.
     *
     * @default 'SUM'
     */
    elevationAggregation?: AggregationOperation;
    /**
     * Method called to retrieve the position of each object.
     * @default object => object.position
     */
    getPosition?: Accessor<DataT, Position>;
    /**
     * The weight of a data object used to calculate the color value for a cell.
     * @default 1
     */
    getColorWeight?: Accessor<DataT, number>;
    /**
     * After data objects are aggregated into cells, this accessor is called on each cell to get the value that its color is based on.
     * Not supported by GPU aggregation.
     * @default null
     */
    getColorValue?: AggregateAccessor<DataT> | null;
    /**
     * The weight of a data object used to calculate the elevation value for a cell.
     * @default 1
     */
    getElevationWeight?: Accessor<DataT, number>;
    /**
     * After data objects are aggregated into cells, this accessor is called on each cell to get the value that its elevation is based on.
     * Not supported by GPU aggregation.
     * @default null
     */
    getElevationValue?: AggregateAccessor<DataT> | null;
    /**
     * This callback will be called when bin color domain has been calculated.
     * @default () => {}
     */
    onSetColorDomain?: (minMax: [number, number]) => void;
    /**
     * This callback will be called when bin elevation domain has been calculated.
     * @default () => {}
     */
    onSetElevationDomain?: (minMax: [number, number]) => void;
    /**
     * When set to true, aggregation is performed on GPU, provided other conditions are met.
     * @default true
     */
    gpuAggregation?: boolean;
};
export type GridLayerPickingInfo<DataT> = PickingInfo<{
    /** Column index of the picked cell */
    col: number;
    /** Row index of the picked cell */
    row: number;
    /** Aggregated color value, as determined by `getColorWeight` and `colorAggregation` */
    colorValue: number;
    /** Aggregated elevation value, as determined by `getElevationWeight` and `elevationAggregation` */
    elevationValue: number;
    /** Number of data points in the picked cell */
    count: number;
    /** Indices of the data objects in the picked cell. Only available if using CPU aggregation. */
    pointIndices?: number[];
    /** The data objects in the picked cell. Only available if using CPU aggregation and layer data is an array. */
    points?: DataT[];
}>;
/** Aggregate data into a grid-based heatmap. The color and height of a cell are determined based on the objects it contains. */
export default class GridLayer<DataT = any, ExtraPropsT extends {} = {}> extends AggregationLayer<DataT, ExtraPropsT & Required<_GridLayerProps<DataT>>> {
    static layerName: string;
    static defaultProps: DefaultProps<GridLayerProps<unknown>>;
    state: AggregationLayer<DataT>['state'] & BinOptions & {
        dataAsArray?: DataT[];
        colors?: AttributeWithScale;
        elevations?: AttributeWithScale;
        binIdRange: [number, number][];
        aggregatorViewport: Viewport;
    };
    getAggregatorType(): string;
    createAggregator(type: string): WebGLAggregator | CPUAggregator;
    initializeState(): void;
    updateState(params: UpdateParameters<this>): boolean;
    private _updateBinOptions;
    draw(opts: any): void;
    private _onAggregationUpdate;
    onAttributeChange(id: string): void;
    renderLayers(): LayersList | Layer | null;
    getPickingInfo(params: GetPickingInfoParams): GridLayerPickingInfo<DataT>;
}
export {};
//# sourceMappingURL=grid-layer.d.ts.map
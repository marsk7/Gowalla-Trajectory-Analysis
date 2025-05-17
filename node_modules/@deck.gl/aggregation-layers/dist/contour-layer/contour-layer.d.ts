import { Accessor, GetPickingInfoParams, LayersList, PickingInfo, Position, Viewport, UpdateParameters, DefaultProps } from '@deck.gl/core';
import { WebGLAggregator, CPUAggregator, AggregationOperation } from "../common/aggregator/index.js";
import AggregationLayer from "../common/aggregation-layer.js";
import { AggregationLayerProps } from "../common/aggregation-layer.js";
import { Contour, ContourLine, ContourPolygon } from "./contour-utils.js";
import { BinOptions } from "./bin-options-uniforms.js";
/** All properties supported by GridLayer. */
export type ContourLayerProps<DataT = unknown> = _ContourLayerProps<DataT> & AggregationLayerProps<DataT>;
/** Properties added by GridLayer. */
type _ContourLayerProps<DataT> = {
    /**
     * Size of each cell in meters.
     * @default 1000
     */
    cellSize?: number;
    /**
     * The grid origin
     * @default [0, 0]
     */
    gridOrigin?: [number, number];
    /**
     * When set to true, aggregation is performed on GPU, provided other conditions are met.
     * @default false
     */
    gpuAggregation?: boolean;
    /**
     * Defines the type of aggregation operation, valid values are 'SUM', 'MEAN', 'MIN' and 'MAX'.
     * @default 'SUM'
     */
    aggregation?: AggregationOperation;
    /**
     * Definition of contours to be drawn.
     * @default [{threshold: 1}]
     */
    contours?: Contour[];
    /**
     * A very small z offset that is added for each vertex of a contour (Isoline or Isoband).
     * @default 0.005
     */
    zOffset?: number;
    /**
     * Method called to retrieve the position of each object.
     * @default object => object.position
     */
    getPosition?: Accessor<DataT, Position>;
    /**
     * The weight of each object.
     * @default 1
     */
    getWeight?: Accessor<DataT, number>;
};
export type ContourLayerPickingInfo = PickingInfo<{
    contour: Contour;
}>;
/** Aggregate data into a grid-based heatmap. The color and height of a cell are determined based on the objects it contains. */
export default class GridLayer<DataT = any, ExtraPropsT extends {} = {}> extends AggregationLayer<DataT, ExtraPropsT & Required<_ContourLayerProps<DataT>>> {
    static layerName: string;
    static defaultProps: DefaultProps<ContourLayerProps<unknown>>;
    state: AggregationLayer<DataT>['state'] & BinOptions & {
        aggregatedValueReader?: (x: number, y: number) => number;
        contourData?: {
            lines: ContourLine[];
            polygons: ContourPolygon[];
        };
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
    private _getContours;
    onAttributeChange(id: string): void;
    renderLayers(): LayersList | null;
    getPickingInfo(params: GetPickingInfoParams): ContourLayerPickingInfo;
}
export {};
//# sourceMappingURL=contour-layer.d.ts.map
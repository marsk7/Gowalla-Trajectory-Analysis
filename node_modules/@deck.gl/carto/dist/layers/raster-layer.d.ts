import { Accessor, CompositeLayer, CompositeLayerProps, Layer, LayersList, DefaultProps, PickingInfo } from '@deck.gl/core';
import { ColumnLayerProps } from '@deck.gl/layers';
/** All properties supported by RasterLayer. */
export type RasterLayerProps<DataT = unknown> = _RasterLayerProps & ColumnLayerProps<DataT> & CompositeLayerProps;
/** Properties added by RasterLayer. */
type _RasterLayerProps = {
    /**
     * Quadbin index of tile
     */
    tileIndex: bigint;
};
export default class RasterLayer<DataT = any, ExtraProps = {}> extends CompositeLayer<Required<RasterLayerProps<DataT>> & ExtraProps> {
    static layerName: string;
    static defaultProps: DefaultProps<RasterLayerProps<unknown>>;
    state: {
        highlightedObjectIndex: number;
        highlightColor: number[];
    };
    renderLayers(): Layer | null | LayersList;
    protected getSubLayerAccessor<In, Out>(accessor: Accessor<In, Out>): Accessor<In, Out>;
    getPickingInfo(params: any): {
        color: Uint8Array | null;
        layer: Layer | null;
        sourceLayer?: Layer | null;
        viewport?: import("@deck.gl/core").Viewport;
        index: number;
        picked: boolean;
        object?: any;
        x: number;
        y: number;
        pixel?: [number, number];
        coordinate?: number[];
        devicePixel?: [number, number];
        pixelRatio: number;
    };
    _updateAutoHighlight(info: PickingInfo): void;
}
export {};
//# sourceMappingURL=raster-layer.d.ts.map
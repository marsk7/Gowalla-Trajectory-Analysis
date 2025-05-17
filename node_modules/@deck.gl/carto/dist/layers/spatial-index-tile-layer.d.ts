import { DefaultProps, LayerProps } from '@deck.gl/core';
import { PickingInfo } from '@deck.gl/core';
import { TileLayer, _Tile2DHeader as Tile2DHeader, TileLayerProps } from '@deck.gl/geo-layers';
/** All properties supported by SpatialIndexTileLayer. */
export type SpatialIndexTileLayerProps<DataT = unknown> = _SpatialIndexTileLayerProps & TileLayerProps<DataT>;
/** Properties added by SpatialIndexTileLayer. */
type _SpatialIndexTileLayerProps = {};
export default class SpatialIndexTileLayer<DataT = any, ExtraProps extends {} = {}> extends TileLayer<DataT, ExtraProps & Required<_SpatialIndexTileLayerProps>> {
    static layerName: string;
    static defaultProps: DefaultProps<SpatialIndexTileLayerProps<unknown>>;
    state: TileLayer<DataT>['state'] & {
        hoveredFeatureId: BigInt | number | null;
        highlightColor: number[];
    };
    protected _updateAutoHighlight(info: PickingInfo): void;
    getSubLayerPropsByTile(tile: Tile2DHeader): Partial<LayerProps> | null;
    getHighlightedObjectIndex(tile: Tile2DHeader): number;
    _featureInTile(tile: Tile2DHeader, featureId: BigInt | number): boolean;
}
export {};
//# sourceMappingURL=spatial-index-tile-layer.d.ts.map
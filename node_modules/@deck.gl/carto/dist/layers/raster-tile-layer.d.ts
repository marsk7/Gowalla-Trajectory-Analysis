import { CompositeLayer, CompositeLayerProps, DefaultProps, Layer, LayersList } from '@deck.gl/core';
import RasterLayer, { RasterLayerProps } from "./raster-layer.js";
import type { TilejsonResult } from '@carto/api-client';
import { TileLayerProps } from '@deck.gl/geo-layers';
export declare const renderSubLayers: (props: any) => RasterLayer<any, {
    tileIndex: any;
}> | null;
/** All properties supported by RasterTileLayer. */
export type RasterTileLayerProps<DataT = unknown> = _RasterTileLayerProps<DataT> & CompositeLayerProps;
/** Properties added by RasterTileLayer. */
type _RasterTileLayerProps<DataT> = Omit<RasterLayerProps<DataT>, 'data'> & Omit<TileLayerProps<DataT>, 'data'> & {
    data: null | TilejsonResult | Promise<TilejsonResult>;
};
export default class RasterTileLayer<DataT = any, ExtraProps extends {} = {}> extends CompositeLayer<ExtraProps & Required<_RasterTileLayerProps<DataT>>> {
    static layerName: string;
    static defaultProps: DefaultProps<RasterTileLayerProps<unknown>>;
    getLoadOptions(): any;
    renderLayers(): Layer | null | LayersList;
}
export {};
//# sourceMappingURL=raster-tile-layer.d.ts.map
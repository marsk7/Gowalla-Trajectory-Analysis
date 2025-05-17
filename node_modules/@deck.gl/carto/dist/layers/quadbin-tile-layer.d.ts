import { CompositeLayer, CompositeLayerProps, DefaultProps } from '@deck.gl/core';
import QuadbinLayer, { QuadbinLayerProps } from "./quadbin-layer.js";
import SpatialIndexTileLayer, { SpatialIndexTileLayerProps } from "./spatial-index-tile-layer.js";
import type { TilejsonResult } from '@carto/api-client';
export declare const renderSubLayers: (props: any) => QuadbinLayer<any, {
    getQuadbin: (d: any) => any;
}> | null;
/** All properties supported by QuadbinTileLayer. */
export type QuadbinTileLayerProps<DataT = unknown> = _QuadbinTileLayerProps<DataT> & CompositeLayerProps;
/** Properties added by QuadbinTileLayer. */
type _QuadbinTileLayerProps<DataT> = Omit<QuadbinLayerProps<DataT>, 'data'> & Omit<SpatialIndexTileLayerProps<DataT>, 'data'> & {
    data: null | TilejsonResult | Promise<TilejsonResult>;
};
export default class QuadbinTileLayer<DataT = any, ExtraProps extends {} = {}> extends CompositeLayer<ExtraProps & Required<_QuadbinTileLayerProps<DataT>>> {
    static layerName: string;
    static defaultProps: DefaultProps<QuadbinTileLayerProps<unknown>>;
    getLoadOptions(): any;
    renderLayers(): SpatialIndexTileLayer | null;
}
export {};
//# sourceMappingURL=quadbin-tile-layer.d.ts.map
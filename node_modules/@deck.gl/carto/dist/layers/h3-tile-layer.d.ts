import { CompositeLayer, CompositeLayerProps, DefaultProps } from '@deck.gl/core';
import { H3HexagonLayer, H3HexagonLayerProps } from '@deck.gl/geo-layers';
import SpatialIndexTileLayer, { SpatialIndexTileLayerProps } from "./spatial-index-tile-layer.js";
import type { TilejsonResult } from '@carto/api-client';
export declare const renderSubLayers: (props: any) => H3HexagonLayer<any, {
    getHexagon: (d: any) => any;
    centerHexagon: any;
    highPrecision: true;
}> | null;
/** All properties supported by H3TileLayer. */
export type H3TileLayerProps<DataT = unknown> = _H3TileLayerProps<DataT> & CompositeLayerProps;
/** Properties added by H3TileLayer. */
type _H3TileLayerProps<DataT> = Omit<H3HexagonLayerProps<DataT>, 'data'> & Omit<SpatialIndexTileLayerProps<DataT>, 'data'> & {
    data: null | TilejsonResult | Promise<TilejsonResult>;
};
export default class H3TileLayer<DataT = any, ExtraPropsT extends {} = {}> extends CompositeLayer<ExtraPropsT & Required<_H3TileLayerProps<DataT>>> {
    static layerName: string;
    static defaultProps: DefaultProps<H3TileLayerProps<unknown>>;
    initializeState(): void;
    getLoadOptions(): any;
    renderLayers(): SpatialIndexTileLayer | null;
}
export {};
//# sourceMappingURL=h3-tile-layer.d.ts.map
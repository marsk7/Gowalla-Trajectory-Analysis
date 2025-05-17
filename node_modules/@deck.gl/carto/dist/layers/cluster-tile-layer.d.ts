import { GeoJsonLayerProps } from '@deck.gl/layers';
import { TileLayerProps, TileLayerPickingInfo } from '@deck.gl/geo-layers';
import type { Feature, Geometry } from 'geojson';
import { Accessor, DefaultProps, CompositeLayer, Layer, LayersList, PickingInfo } from '@deck.gl/core';
import { ClusteredFeaturePropertiesT, ParsedQuadbinCell, ParsedQuadbinTile } from "./cluster-utils.js";
import type { TilejsonResult } from '@carto/api-client';
export type ClusterTileLayerPickingInfo<FeaturePropertiesT = {}> = TileLayerPickingInfo<ParsedQuadbinTile<FeaturePropertiesT>, PickingInfo<Feature<Geometry, FeaturePropertiesT>>>;
/** All properties supported by ClusterTileLayer. */
export type ClusterTileLayerProps<FeaturePropertiesT = unknown> = _ClusterTileLayerProps<FeaturePropertiesT> & Omit<TileLayerProps<ParsedQuadbinTile<FeaturePropertiesT>>, 'data'>;
/** Properties added by ClusterTileLayer. */
type _ClusterTileLayerProps<FeaturePropertiesT> = Omit<GeoJsonLayerProps<ClusteredFeaturePropertiesT<FeaturePropertiesT>>, 'data'> & {
    data: null | TilejsonResult | Promise<TilejsonResult>;
    /**
     * The number of aggregation levels to cluster cells by. Larger values increase
     * the clustering radius, with an increment of `clusterLevel` doubling the radius.
     *
     * @default 5
     */
    clusterLevel?: number;
    /**
     * The (average) position of points in a cell used for clustering.
     * If not supplied the center of the quadbin cell is used.
     *
     * @default cell center
     */
    getPosition?: Accessor<ParsedQuadbinCell<FeaturePropertiesT>, [number, number]>;
    /**
     * The weight of each cell used for clustering.
     *
     * @default 1
     */
    getWeight?: Accessor<ParsedQuadbinCell<FeaturePropertiesT>, number>;
};
export default class ClusterTileLayer<FeaturePropertiesT = any, ExtraProps extends {} = {}> extends CompositeLayer<ExtraProps & Required<_ClusterTileLayerProps<FeaturePropertiesT>>> {
    static layerName: string;
    static defaultProps: DefaultProps<ClusterTileLayerProps<unknown>>;
    getLoadOptions(): any;
    renderLayers(): Layer | null | LayersList;
}
export {};
//# sourceMappingURL=cluster-tile-layer.d.ts.map
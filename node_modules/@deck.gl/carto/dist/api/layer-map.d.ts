import { scaleLinear, scaleOrdinal, scaleLog, scalePoint, scaleQuantile, scaleQuantize, scaleSqrt, scaleThreshold } from 'd3-scale';
import { Accessor, Layer, _ConstructorOf as ConstructorOf } from '@deck.gl/core';
import { scaleIdentity } from "../utils.js";
import { CustomMarkersRange, MapDataset, MapTextSubLayerConfig, VisConfig, VisualChannelField, VisualChannels } from "./types.js";
declare const SCALE_FUNCS: {
    linear: typeof scaleLinear;
    ordinal: typeof scaleOrdinal;
    log: typeof scaleLog;
    point: typeof scalePoint;
    quantile: typeof scaleQuantile;
    quantize: typeof scaleQuantize;
    sqrt: typeof scaleSqrt;
    custom: typeof scaleThreshold;
    identity: typeof scaleIdentity;
};
export type SCALE_TYPE = keyof typeof SCALE_FUNCS;
type TileLayerType = 'clusterTile' | 'h3' | 'heatmapTile' | 'mvt' | 'quadbin' | 'raster' | 'tileset';
type DocumentLayerType = 'geojson' | 'grid' | 'heatmap' | 'hexagon' | 'hexagonId' | 'point';
type LayerType = TileLayerType | DocumentLayerType;
export declare const AGGREGATION: {
    average: string;
    maximum: string;
    minimum: string;
    sum: string;
};
export declare const OPACITY_MAP: {
    getFillColor: string;
    getLineColor: string;
    getTextColor: string;
};
export declare function getLayer(type: LayerType, config: MapTextSubLayerConfig, dataset: MapDataset): {
    Layer: ConstructorOf<Layer>;
    propMap: any;
    defaultProps: any;
};
declare function domainFromValues(values: any, scaleType: SCALE_TYPE): any;
export declare function opacityToAlpha(opacity?: number): number;
export declare function getColorValueAccessor({ name }: {
    name: any;
}, colorAggregation: any, data: any): any;
export declare function getColorAccessor({ name, colorColumn }: VisualChannelField, scaleType: SCALE_TYPE, { aggregation, range }: {
    aggregation: any;
    range: any;
}, opacity: number | undefined, data: any): any;
export declare function getIconUrlAccessor(field: VisualChannelField | null | undefined, range: CustomMarkersRange | null | undefined, { fallbackUrl, maxIconSize, useMaskedIcons }: {
    fallbackUrl: any;
    maxIconSize: any;
    useMaskedIcons: any;
}, data: any): any;
export declare function getMaxMarkerSize(visConfig: VisConfig, visualChannels: VisualChannels): number;
export declare function negateAccessor<T>(accessor: Accessor<T, number>): Accessor<T, number>;
export declare function getSizeAccessor({ name }: {
    name: any;
}, scaleType: SCALE_TYPE | undefined, aggregation: any, range: Iterable<Range> | undefined, data: any): any;
export declare function getTextAccessor({ name, type }: VisualChannelField, data: any): any;
export { domainFromValues as _domainFromValues };
//# sourceMappingURL=layer-map.d.ts.map
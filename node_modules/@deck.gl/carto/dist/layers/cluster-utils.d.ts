import { _Tile2DHeader as Tile2DHeader } from '@deck.gl/geo-layers';
import { Accessor } from '@deck.gl/core';
import { BinaryFeatureCollection } from '@loaders.gl/schema';
export type Aggregation = 'any' | 'average' | 'count' | 'min' | 'max' | 'sum';
export type AggregationProperties<FeaturePropertiesT> = {
    aggregation: Aggregation;
    name: keyof FeaturePropertiesT;
}[];
export type ClusteredFeaturePropertiesT<FeaturePropertiesT> = FeaturePropertiesT & {
    id: bigint;
    count: number;
    position: [number, number];
};
export type ParsedQuadbinCell<FeaturePropertiesT> = {
    id: bigint;
    properties: FeaturePropertiesT;
};
export type ParsedQuadbinTile<FeaturePropertiesT> = ParsedQuadbinCell<FeaturePropertiesT>[];
/**
 * Aggregates tile by specified properties, caching result in tile.userData
 *
 * @returns true if data was aggregated, false if cache used
 */
export declare function aggregateTile<FeaturePropertiesT>(tile: Tile2DHeader<ParsedQuadbinTile<FeaturePropertiesT>>, tileAggregationCache: Map<number, ClusteredFeaturePropertiesT<FeaturePropertiesT>[]>, aggregationLevels: number, properties: AggregationProperties<FeaturePropertiesT> | undefined, getPosition: Accessor<ParsedQuadbinCell<FeaturePropertiesT>, [number, number]>, getWeight: Accessor<ParsedQuadbinCell<FeaturePropertiesT>, number>): boolean;
export declare function extractAggregationProperties<FeaturePropertiesT extends {}>(tile: Tile2DHeader<ParsedQuadbinTile<FeaturePropertiesT>>): AggregationProperties<FeaturePropertiesT>;
export declare function computeAggregationStats<FeaturePropertiesT>(data: ClusteredFeaturePropertiesT<FeaturePropertiesT>[], properties: AggregationProperties<FeaturePropertiesT>): Record<keyof FeaturePropertiesT, {
    min: number;
    max: number;
}>;
type BinaryFeatureCollectionWithStats<FeaturePropertiesT> = Omit<BinaryFeatureCollection, 'points'> & {
    points: BinaryFeatureCollection['points'] & {
        attributes?: {
            stats: Record<keyof FeaturePropertiesT, {
                min: number;
                max: number;
            }>;
        };
    };
};
export declare function clustersToBinary<FeaturePropertiesT>(data: ClusteredFeaturePropertiesT<FeaturePropertiesT>[]): BinaryFeatureCollectionWithStats<FeaturePropertiesT>;
export {};
//# sourceMappingURL=cluster-utils.d.ts.map
import { BinaryAttribute } from '@deck.gl/core';
import { BinaryFeatureCollection, BinaryLineFeature, BinaryPointFeature, BinaryPolygonFeature, Feature } from '@loaders.gl/schema';
export type BinaryFeatureTypes = BinaryPointFeature | BinaryLineFeature | BinaryPolygonFeature;
export type ExtendedBinaryFeatureCollection = {
    [P in keyof Omit<BinaryFeatureCollection, 'shape'>]: BinaryFeatureCollection[P] & {
        attributes?: Record<string, BinaryAttribute>;
    };
};
type FeaureOnlyProperties = Pick<Feature, 'properties'>;
/**
 * Return the feature for an accesor
 */
export declare function binaryToFeatureForAccesor(data: BinaryFeatureTypes, index: number): FeaureOnlyProperties | null;
export declare function calculatePickingColors(geojsonBinary: Required<ExtendedBinaryFeatureCollection>, encodePickingColor: (id: number, result: number[]) => void): Record<string, Uint8ClampedArray | null>;
export {};
//# sourceMappingURL=geojson-binary.d.ts.map
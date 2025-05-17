import type { BinaryFeatureCollection, Feature } from '@loaders.gl/schema';
type TransformCoordinate = (coord: number[]) => number[];
/**
 * Apply transformation to every coordinate of binary features
 * @param  binaryFeatures binary features
 * @param  transformCoordinate Function to call on each coordinate
 * @return Transformed binary features
 */
export declare function transformBinaryCoords(binaryFeatures: BinaryFeatureCollection, transformCoordinate: TransformCoordinate): BinaryFeatureCollection;
/**
 * Apply transformation to every coordinate of GeoJSON features
 *
 * @param  features Array of GeoJSON features
 * @param  fn       Function to call on each coordinate
 * @return          Transformed GeoJSON features
 */
export declare function transformGeoJsonCoords(features: Feature[], fn: (coord: number[]) => number[]): Feature[];
export {};
//# sourceMappingURL=transform.d.ts.map
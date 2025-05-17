import type { Feature, GeoJSONTable, BinaryFeatureCollection } from '@loaders.gl/schema';
import type { MVTLoaderOptions } from "../mvt-loader.js";
/**
 * Parse MVT arrayBuffer and return GeoJSON.
 *
 * @param arrayBuffer A MVT arrayBuffer
 * @param options
 * @returns A GeoJSON geometry object or a binary representation
 */
export declare function parseMVT(arrayBuffer: ArrayBuffer, options?: MVTLoaderOptions): BinaryFeatureCollection | GeoJSONTable | Feature<import("geojson").Geometry, import("geojson").GeoJsonProperties>[] | {
    shape: string;
    data: BinaryFeatureCollection;
};
//# sourceMappingURL=parse-mvt.d.ts.map
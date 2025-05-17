import { Schema } from '@loaders.gl/schema';
/**
 * A geoarrow / geoparquet geo metadata object
 * (stored in stringified form in the top level metadata 'geo' key)
 * @see https://github.com/opengeospatial/geoparquet/blob/main/format-specs/geoparquet.md
 * @see https://github.com/geoarrow/geoarrow
 * */
export type GeoMetadata = {
    version?: string;
    primary_column?: string;
    columns: Record<string, GeoColumnMetadata>;
    [key: string]: unknown;
};
/** A geoarrow / geoparquet geo metadata for one geometry column  */
export type GeoColumnMetadata = {
    encoding: 'wkb' | 'wkt';
    geometry_types: GeoParquetGeometryType[];
    crs?: object | null;
    orientation?: 'counterclockwise';
    bbox?: [number, number, number, number] | [number, number, number, number, number, number];
    edges?: 'planar' | 'spherical';
    epoch?: number;
    [key: string]: unknown;
};
/** A GeoParquet metadata geometry type */
export type GeoParquetGeometryType = 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Point Z' | 'LineString Z' | 'Polygon Z' | 'MultiPoint Z' | 'MultiLineString Z' | 'MultiPolygon Z' | 'GeometryCollection Z';
/**
 * Reads the GeoMetadata object from the metadata
 * @note geoarrow / parquet schema is stringified into a single key-value pair in the parquet metadata
 */
export declare function getGeoMetadata(schema: Schema): GeoMetadata | null;
/**
 * Stores a geoarrow / geoparquet geo metadata object in the schema
 * @note geoarrow / geoparquet geo metadata is a single stringified JSON field
 */
export declare function setGeoMetadata(schema: Schema, geoMetadata: GeoMetadata): void;
/**
 * Unpacks geo metadata into separate metadata fields (parses the long JSON string)
 * @note geoarrow / parquet schema is stringified into a single key-value pair in the parquet metadata
 */
export declare function unpackGeoMetadata(schema: Schema): void;
/** Parse a key with stringified arrow metadata */
export declare function parseJSONStringMetadata(schema: Schema, metadataKey: string): Record<string, unknown> | null;
export declare function unpackJSONStringMetadata(schema: Schema, metadataKey: string): void;
//# sourceMappingURL=geoparquet-metadata.d.ts.map
import { Schema, Field } from '@loaders.gl/schema';
export type GeoArrowEncoding = 'geoarrow.multipolygon' | 'geoarrow.polygon' | 'geoarrow.multilinestring' | 'geoarrow.linestring' | 'geoarrow.multipoint' | 'geoarrow.point' | 'geoarrow.wkb' | 'geoarrow.wkt';
/**
 * Geospatial metadata for one column, extracted from Apache Arrow metadata
 * @see https://github.com/geoarrow/geoarrow/blob/main/extension-types.md
 */
export type GeoArrowMetadata = {
    /** Encoding of geometry in this column */
    encoding?: GeoArrowEncoding;
    /** CRS in [PROJJSON](https://proj.org/specifications/projjson.html). Omitted if producer has no information about CRS */
    crs?: Record<string, unknown>;
    /** Edges are either spherical or omitted */
    edges?: 'spherical';
    [key: string]: unknown;
};
/**
 * get geometry columns from arrow table
 */
export declare function getGeometryColumnsFromSchema(schema: Schema): Record<string, GeoArrowMetadata>;
/**
 * Extracts GeoArrow metadata from a field
 * @param field
 * @returns
 * @see https://github.com/geoarrow/geoarrow/blob/d2f56704414d9ae71e8a5170a8671343ed15eefe/extension-types.md
 */
export declare function getGeometryMetadataForField(field: Field): GeoArrowMetadata | null;
//# sourceMappingURL=geoarrow-metadata.d.ts.map
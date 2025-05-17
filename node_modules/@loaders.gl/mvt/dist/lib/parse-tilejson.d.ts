import { Schema } from '@loaders.gl/schema';
export type TileJSONOptions = {
    /** max number of values. If not provided, include all values in the source tilestats */
    maxValues?: number;
};
/** Parsed and typed TileJSON, merges Tilestats information if present */
export type TileJSON = {
    /** Name of the tileset (for presentation in UI) */
    name?: string;
    /** A description of the contents or purpose of the tileset */
    description?: string;
    /** The version of the tileset */
    version?: string;
    tileFormat?: string;
    tilesetType?: string;
    /** Generating application. Tippecanoe adds this. */
    generator?: string;
    /** Generating application options. Tippecanoe adds this. */
    generatorOptions?: string;
    /** Tile indexing scheme */
    scheme?: 'xyz' | 'tms';
    /** Sharded URLs */
    tiles?: string[];
    /** `[[w, s], [e, n]]`, indicates the limits of the bounding box using the axis units and order of the specified CRS. */
    boundingBox?: [min: [w: number, s: number], max: [e: number, n: number]];
    /** May be set to the maxZoom of the first layer */
    maxZoom?: number | null;
    /** May be set to the minZoom of the first layer */
    minZoom?: number | null;
    center?: number[] | null;
    htmlAttribution?: string;
    htmlLegend?: string;
    layers?: TileJSONLayer[];
    /** Any nested JSON metadata */
    metaJson?: any | null;
};
export type TileJSONLayer = {
    /** The name (id) of this layer (tilejson.vector_layers[].id / tilestats.layers[].layer) */
    name: string;
    /** The description of this layer (tilejson.layer.description) */
    description?: string;
    /** The number of features in this layer (tilestats.layer.count) */
    featureCount?: number;
    /** The dominant geometry type in this layer (tilestats.layer.geometry) */
    dominantGeometry?: string;
    /** An array of details about the first 100 attributes in this layer */
    /**  */
    minZoom?: number;
    maxZoom?: number;
    fields: TileJSONField[];
    schema?: Schema;
};
export type TileJSONField = {
    /** The name of this attribute */
    name: string;
    description?: string;
    type: string;
    /** min value (if there are *any* numbers in the values) */
    min?: number;
    /** max value (if there are *any* numbers in the values) */
    max?: number;
    /** Number of unique values across the tileset */
    uniqueValueCount?: number;
    /** An array of this attribute's first 100 unique values */
    values?: unknown[];
};
/**
 * Parse TileJSON from metadata
 * @param jsonMetadata - metadata object
 * @param options - options
 * @returns - parsed TileJSON
 */
export declare function parseTileJSON(jsonMetadata: any, options: TileJSONOptions): TileJSON | null;
//# sourceMappingURL=parse-tilejson.d.ts.map
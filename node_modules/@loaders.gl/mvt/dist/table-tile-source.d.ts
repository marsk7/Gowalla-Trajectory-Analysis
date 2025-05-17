import { VectorTileSource, TileSourceMetadata } from '@loaders.gl/loader-utils';
import type { VectorTileSourceProps, GetTileDataParameters, GetTileParameters, LoaderWithParser } from '@loaders.gl/loader-utils';
import { Schema, GeoJSONTable, Feature, BinaryFeatureCollection } from '@loaders.gl/schema';
import { Stats } from '@probe.gl/stats';
import type { ProtoFeature } from "./lib/vector-tiler/features/proto-feature.js";
import type { ProtoTile } from "./lib/vector-tiler/proto-tile.js";
/** Options to configure tiling */
export declare const TableTileSource: {
    readonly name: "TableTiler";
    readonly id: "table-tiler";
    readonly version: "0.0.0";
    readonly extensions: ["mvt"];
    readonly mimeTypes: ["application/octet-stream"];
    readonly options: {
        readonly table: {
            readonly coordinates: "local";
            readonly promoteId: never;
            readonly maxZoom: 14;
            readonly indexMaxZoom: 5;
            readonly maxPointsPerTile: 10000;
            readonly tolerance: 3;
            readonly extent: 4096;
            readonly buffer: 64;
            readonly generateId: undefined;
        };
    };
    readonly type: "table";
    readonly testURL: (url: string) => boolean;
    readonly createDataSource: (url: string | Blob | GeoJSONTable | Promise<GeoJSONTable>, options: DynamicVectorTileSourceProps) => DynamicVectorTileSource;
};
/** Options to configure tiling */
export type DynamicVectorTileSourceProps = VectorTileSourceProps & {
    table: {
        coordinates: 'local' | 'wgs84' | 'EPSG:4326';
        /** max zoom to preserve detail on */
        maxZoom?: number;
        /** max zoom in the tile index */
        indexMaxZoom?: number;
        /** max number of points per tile in the tile index */
        maxPointsPerTile?: number;
        /** simplification tolerance (higher means simpler) */
        tolerance?: number;
        /** tile extent */
        extent?: number;
        /** tile buffer on each side */
        buffer?: number;
        /** name of a feature property to be promoted to feature.id */
        promoteId?: string;
        /** whether to generate feature ids. Cannot be used with promoteId */
        generateId?: boolean;
        /** logging level (0, 1 or 2) */
        debug?: number;
        /** whether to calculate line metrics */
        lineMetrics?: boolean;
        /** table loders */
        loaders?: LoaderWithParser[];
    };
};
/**
 * Dynamically vector tiles a table (the table needs a geometry column)
 * - Tiles are generated when requested.
 * - Each tile contains a tables of clipped features.
 *
 * @note - Currently only accepts `GeoJSONTable` tables
 * @note - Currently only outputs `GeoJSONTable`
 * @note - (can be initialized with a promise that resolves to GeoJSONTable).
 *
 * @todo - metadata should scan all rows to determine schema
 * @todo - metadata scan all rows to determine tilestats (field values[] etc).
 * @todo - handle binary input tables
 * @todo - generate binary output tables
 * @todo - how does TileSourceLayer specify coordinates / decided which layer to render with
 */
export declare class DynamicVectorTileSource implements VectorTileSource<DynamicVectorTileSourceProps, TileSourceMetadata> {
    /** Global stats for all DynamicVectorTileSources */
    static stats: Stats;
    /** Stats for this DynamicVectorTileSource */
    stats: Stats;
    /** MIME type of the tiles emitted by this tile source */
    readonly mimeType = "application/vnd.mapbox-vector-tile";
    readonly localCoordinates = true;
    /** The props that this tile source was created with */
    props: Required<DynamicVectorTileSourceProps['table']>;
    schema: Schema | null;
    /** Map of generated tiles, indexed by stringified tile coordinates */
    tiles: Record<string, ProtoTile>;
    /** Array of tile coordinates */
    tileCoords: {
        x: number;
        y: number;
        z: number;
    }[];
    /** Input data has loaded, initial top-level tiling is done, sync methods can now be called */
    ready: Promise<void>;
    /** Metadata for the tile source (generated TileJSON/tilestats */
    metadata: Promise<unknown>;
    constructor(table: GeoJSONTable | Promise<GeoJSONTable>, props?: DynamicVectorTileSourceProps);
    initializeTilesAsync(tablePromise: GeoJSONTable | Promise<GeoJSONTable>): Promise<void>;
    getMetadata(): Promise<TileSourceMetadata & {
        schema: Schema | null;
    }>;
    getSchema(): Promise<Schema>;
    /**
     * Get a tile at the specified index
     * @param tileIndex z, x, y of tile
     * @returns
     */
    getVectorTile(tileIndex: GetTileParameters): Promise<GeoJSONTable | null>;
    getTile(tileIndex: {
        z: number;
        x: number;
        y: number;
    }): Promise<GeoJSONTable | null>;
    getTileData(tileParams: GetTileDataParameters): Promise<Feature[] | BinaryFeatureCollection>;
    /**
     * Synchronously request a tile
     * @note Application must await `source.ready` before calling sync methods.
     */
    getTileSync(tileIndex: {
        z: number;
        x: number;
        y: number;
    }): GeoJSONTable | null;
    /**
     * Create the initial tiles
     * @note the tiles stores all the features together with additional data
     */
    createRootTiles(table: GeoJSONTable): void;
    /**
     * Return geojsonvt-style "half formed" vector tile
     * @note Application must await `source.ready` before calling sync methods.
     */
    getProtoTile(tileIndex: {
        z: number;
        x: number;
        y: number;
    }): ProtoTile | null;
    /**
     * splits features from a parent tile to sub-tiles.
     * @param z, x, and y are the coordinates of the parent tile
     * @param cz, cx, and cy are the coordinates of the target tile
     *
     * If no target tile is specified, splitting stops when we reach the maximum
     * zoom or the number of points is low as specified in the props.
     */
    splitTile(features: ProtoFeature[], z: number, x: number, y: number, cz?: number, cx?: number, cy?: number): void;
}
//# sourceMappingURL=table-tile-source.d.ts.map
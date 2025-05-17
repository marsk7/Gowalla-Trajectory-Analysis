import type { ImageType, DataSourceProps, ImageTileSource, VectorTileSource, GetTileParameters, GetTileDataParameters } from '@loaders.gl/loader-utils';
import { DataSource } from '@loaders.gl/loader-utils';
import { ImageLoaderOptions } from '@loaders.gl/images';
import { MVTLoaderOptions, TileJSON, TileJSONLoaderOptions } from '@loaders.gl/mvt';
/** Creates an MVTTileSource */
export declare const MVTSource: {
    readonly name: "MVT";
    readonly id: "mvt";
    readonly module: "mvt";
    readonly version: "0.0.0";
    readonly extensions: ["mvt"];
    readonly mimeTypes: ["application/octet-stream"];
    readonly options: {
        readonly mvt: {};
    };
    readonly type: "mvt";
    readonly fromUrl: true;
    readonly fromBlob: false;
    readonly testURL: (url: string) => boolean;
    readonly createDataSource: (url: string, props: MVTTileSourceProps) => MVTTileSource;
};
/** Properties for a Mapbox Vector Tile Source */
export type MVTTileSourceProps = DataSourceProps & {
    mvt?: {
        /** if not supplied, loads tilejson.json, If null does not load metadata */
        metadataUrl?: string | null;
        /** Override extension (necessary if no metadata) */
        extension?: string;
        /** Additional attribution, adds to any attribution loaded from tileset metadata */
        attributions?: string[];
        /** Specify load options for all sub loaders */
        loadOptions?: TileJSONLoaderOptions & MVTLoaderOptions & ImageLoaderOptions;
    };
};
/**
 * MVT data source for Mapbox Vector Tiles v1.
 */
/**
 * A PMTiles data source
 * @note Can be either a raster or vector tile source depending on the contents of the PMTiles file.
 */
export declare class MVTTileSource extends DataSource implements ImageTileSource, VectorTileSource {
    readonly props: MVTTileSourceProps;
    readonly url: string;
    readonly metadataUrl: string | null;
    data: string;
    schema: 'tms' | 'xyz' | 'template';
    metadata: Promise<TileJSON | null>;
    extension: string;
    mimeType: string | null;
    constructor(url: string, props: MVTTileSourceProps);
    getMetadata(): Promise<TileJSON | null>;
    getTileMIMEType(): string | null;
    getTile(parameters: GetTileParameters): Promise<ArrayBuffer | null>;
    getTileData(parameters: GetTileDataParameters): Promise<any>;
    getImageTile(tileParams: GetTileParameters): Promise<ImageType | null>;
    protected _parseImageTile(arrayBuffer: ArrayBuffer): Promise<ImageType>;
    getVectorTile(tileParams: GetTileParameters): Promise<unknown | null>;
    protected _parseVectorTile(arrayBuffer: ArrayBuffer, tileParams: GetTileParameters): Promise<unknown | null>;
    getMetadataUrl(): string | null;
    getTileURL(x: number, y: number, z: number): string;
}
export declare function isURLTemplate(s: string): boolean;
export type URLTemplate = string | string[];
/**
 * Get a URL from a URL template
 * @note copied from deck.gl/modules/geo-layers/src/tileset-2d/utils.ts
 * @param template - URL template
 * @param x - tile x coordinate
 * @param y - tile y coordinate
 * @param z - tile z coordinate
 * @param id - tile id
 * @returns URL
 */
export declare function getURLFromTemplate(template: URLTemplate, x: number, y: number, z: number, id?: string): string;
//# sourceMappingURL=mvt-source.d.ts.map
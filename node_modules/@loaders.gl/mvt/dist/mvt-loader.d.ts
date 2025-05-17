import type { LoaderOptions } from '@loaders.gl/loader-utils';
import { parseMVT } from "./lib/parse-mvt.js";
export type MVTLoaderOptions = LoaderOptions & {
    mvt?: {
        /** Shape of returned data */
        shape?: 'geojson-table' | 'columnar-table' | 'geojson' | 'binary' | 'binary-geometry';
        /** `wgs84`: coordinates in long, lat (`tileIndex` must be provided. `local` coordinates are `0-1` from tile origin */
        coordinates?: 'wgs84' | 'local';
        /** An object containing tile index values (`x`, `y`, `z`) to reproject features' coordinates into WGS84. Mandatory with `wgs84` coordinates option. */
        tileIndex?: {
            x: number;
            y: number;
            z: number;
        };
        /** If provided, stored the layer name of each feature is added to `feature.properties[layerProperty]`. */
        layerProperty?: string | number;
        /** layer filter. If provided, only features belonging to the named layers will be included, otherwise features from all layers are returned. */
        layers?: string[];
        /** Override the URL to the worker bundle (by default loads from unpkg.com) */
        workerUrl?: string;
    };
    gis?: {
        /** @deprecated Use options.mvt.shape === 'binary-geometry' */
        binary?: boolean;
        /** @deprecated. Use options.mvt.shape */
        format?: 'geojson-table' | 'columnar-table' | 'geojson' | 'binary' | 'binary-geometry';
    };
};
/**
 * Worker loader for the Mapbox Vector Tile format
 */
export declare const MVTWorkerLoader: {
    readonly dataType: any;
    readonly batchType: never;
    readonly name: "Mapbox Vector Tile";
    readonly id: "mvt";
    readonly module: "mvt";
    readonly version: any;
    readonly extensions: ["mvt", "pbf"];
    readonly mimeTypes: ["application/vnd.mapbox-vector-tile", "application/x-protobuf"];
    readonly worker: true;
    readonly category: "geometry";
    readonly options: {
        readonly mvt: {
            readonly shape: "geojson";
            readonly coordinates: "local";
            readonly layerProperty: "layerName";
            readonly layers: never;
            readonly tileIndex: never;
        };
    };
};
/**
 * Loader for the Mapbox Vector Tile format
 */
export declare const MVTLoader: {
    readonly parse: (arrayBuffer: ArrayBuffer, options?: MVTLoaderOptions) => Promise<import("@loaders.gl/schema").BinaryFeatureCollection | import("@loaders.gl/schema").GeoJSONTable | import("geojson").Feature<import("geojson").Geometry, import("geojson").GeoJsonProperties>[] | {
        shape: string;
        data: import("@loaders.gl/schema").BinaryFeatureCollection;
    }>;
    readonly parseSync: typeof parseMVT;
    readonly binary: true;
    readonly dataType: any;
    readonly batchType: never;
    readonly name: "Mapbox Vector Tile";
    readonly id: "mvt";
    readonly module: "mvt";
    readonly version: any;
    readonly extensions: ["mvt", "pbf"];
    readonly mimeTypes: ["application/vnd.mapbox-vector-tile", "application/x-protobuf"];
    readonly worker: true;
    readonly category: "geometry";
    readonly options: {
        readonly mvt: {
            readonly shape: "geojson";
            readonly coordinates: "local";
            readonly layerProperty: "layerName";
            readonly layers: never;
            readonly tileIndex: never;
        };
    };
};
//# sourceMappingURL=mvt-loader.d.ts.map
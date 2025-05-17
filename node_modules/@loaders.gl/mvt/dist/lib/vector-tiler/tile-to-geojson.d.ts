import { ProtoTile } from "./proto-tile.js";
import { GeoJSONTable } from '@loaders.gl/schema';
export declare function convertTileToGeoJSON(protoTile: ProtoTile, props: {
    coordinates: 'EPSG:4326' | 'wgs84' | 'local';
    tileIndex: {
        x: number;
        y: number;
        z: number;
    };
    extent: number;
}): GeoJSONTable | null;
//# sourceMappingURL=tile-to-geojson.d.ts.map
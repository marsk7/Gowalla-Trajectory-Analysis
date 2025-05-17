import type { Feature, FlatFeature, FlatIndexedGeometry, GeojsonGeometryInfo } from '@loaders.gl/schema';
import Protobuf from 'pbf';
export declare class VectorTileFeature {
    properties: {
        [x: string]: string | number | boolean | null;
    };
    extent: any;
    type: number;
    id: number | null;
    _pbf: Protobuf;
    _geometry: number;
    _keys: string[];
    _values: (string | number | boolean | null)[];
    _geometryInfo: GeojsonGeometryInfo;
    static types: Readonly<string[]>;
    constructor(pbf: Protobuf, end: number, extent: any, keys: string[], values: (string | number | boolean | null)[], geometryInfo?: GeojsonGeometryInfo);
    toGeoJSONFeature(coordinates: 'wgs84' | 'local', tileIndex?: {
        x: number;
        y: number;
        z: number;
    }): Feature;
    /**
     *
     * @param options
     * @returns
     */
    toBinaryFeature(coordinates: 'wgs84' | 'local', tileIndex?: {
        x: number;
        y: number;
        z: number;
    }): FlatFeature;
    /** Read a bounding box from the feature */
    bbox(): number[];
    /**
     *
     * @param transform
     * @returns result
     */
    _toBinaryCoordinates(geom: FlatIndexedGeometry, transform: (data: number[], extent: number) => void): {
        type: "Feature";
        geometry: import("@loaders.gl/schema").FlatGeometry;
        id?: string | number | undefined;
        properties: import("geojson").GeoJsonProperties;
        bbox?: import("geojson").BBox | undefined;
    };
    loadGeometry(): number[][][];
    /**
     * Expands the protobuf data to an intermediate Flat GeoJSON
     * data format, which maps closely to the binary data buffers.
     * It is similar to GeoJSON, but rather than storing the coordinates
     * in multidimensional arrays, we have a 1D `data` with all the
     * coordinates, and then index into this using the `indices`
     * parameter, e.g.
     *
     * geometry: {
     *   type: 'Point', data: [1,2], indices: [0]
     * }
     * geometry: {
     *   type: 'LineString', data: [1,2,3,4,...], indices: [0]
     * }
     * geometry: {
     *   type: 'Polygon', data: [1,2,3,4,...], indices: [[0, 2]]
     * }
     * Thus the indices member lets us look up the relevant range
     * from the data array.
     * The Multi* versions of the above types share the same data
     * structure, just with multiple elements in the indices array
     */
    loadFlatGeometry(): FlatIndexedGeometry;
}
//# sourceMappingURL=vector-tile-feature.d.ts.map
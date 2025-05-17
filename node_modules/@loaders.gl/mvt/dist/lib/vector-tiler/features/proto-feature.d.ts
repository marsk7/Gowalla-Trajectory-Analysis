export type ProtoFeature = {
    type: 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon';
    simplifiedType: 1 | 2 | 3;
    geometry: any[];
    id?: string;
    tags?: Record<string, unknown>;
    /** spatial extents */
    minX: number;
    /** spatial extents */
    maxX: number;
    /** spatial extents */
    minY: number;
    /** spatial extents */
    maxY: number;
};
export type GeoJSONTileGeometry = GeoJSONTilePointGeometry | GeoJSONTileLineGeometry | GeoJSONTilePolygonGeometry;
export type GeoJSONTilePointGeometry = {
    simplifiedType: 1;
    geometry: number[];
};
export type GeoJSONTileLineGeometry = {
    simplifiedType: 1;
    geometry: number[][];
};
export type GeoJSONTilePolygonGeometry = {
    simplifiedType: 1;
    geometry: number[][][];
};
export declare function createProtoFeature(id: any, type: 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon', geometry: any[], tags: any): ProtoFeature;
//# sourceMappingURL=proto-feature.d.ts.map
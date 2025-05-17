import type { ProtoFeature } from "./features/proto-feature.js";
export type ProtoTile = {
    /** Processed features */
    protoFeatures: ProtoFeature[];
    /** if we slice further down, no need to keep source geometry */
    sourceFeatures: ProtoFeature[] | null;
    /** Properties */
    tags?: Record<string, string>;
    /** tile x coordinate */
    x: number;
    /** tile y coordinate */
    y: number;
    /** tile z coordinate */
    z: number;
    /** spatial extent */
    minX: number;
    /** spatial extent */
    maxX: number;
    /** spatial extent */
    minY: number;
    /** spatial extent */
    maxY: number;
    /** Whether this tile has been transformed */
    transformed: boolean;
    numPoints: number;
    numSimplified: number;
    /** Number of features in this tile */
    numFeatures: number;
};
export type CreateTileOptions = {
    maxZoom?: number;
    tolerance: number;
    extent: number;
    lineMetrics: boolean;
};
/**
 * Create a tile from features and tile index
 */
export declare function createProtoTile(features: ProtoFeature[], z: any, tx: any, ty: any, options: CreateTileOptions): ProtoTile;
//# sourceMappingURL=proto-tile.d.ts.map
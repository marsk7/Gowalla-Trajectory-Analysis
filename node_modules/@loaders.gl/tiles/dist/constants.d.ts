export type TileContentState = 'unloaded' | 'loading' | 'processing' | 'ready' | 'expired' | 'failed';
export declare const TILE_CONTENT_STATE: {
    UNLOADED: number;
    LOADING: number;
    PROCESSING: number;
    READY: number;
    EXPIRED: number;
    FAILED: number;
};
export type TileRefinement = 'add' | 'replace';
export declare enum TILE_REFINEMENT {
    ADD = 1,// Render tile and, if screen space error exceeded, also refine to its children.
    REPLACE = 2
}
export type TileType = 'empty' | 'scenegraph' | 'pointcloud' | 'mesh';
export declare enum TILE_TYPE {
    EMPTY = "empty",
    SCENEGRAPH = "scenegraph",
    POINTCLOUD = "pointcloud",
    MESH = "mesh"
}
export type TilesetType = 'I3S' | 'TILES3D';
export declare enum TILESET_TYPE {
    I3S = "I3S",
    TILES3D = "TILES3D"
}
export type LODMetricType = 'geometricError' | 'maxScreenThreshold';
export declare enum LOD_METRIC_TYPE {
    GEOMETRIC_ERROR = "geometricError",
    MAX_SCREEN_THRESHOLD = "maxScreenThreshold"
}
export type Tile3DOptimizationHint = 'NOT_COMPUTED' | 'USE_OPTIMIZATION' | 'SKIP_OPTIMIZATION';
export declare const TILE3D_OPTIMIZATION_HINT: {
    NOT_COMPUTED: number;
    USE_OPTIMIZATION: number;
    SKIP_OPTIMIZATION: number;
};
//# sourceMappingURL=constants.d.ts.map
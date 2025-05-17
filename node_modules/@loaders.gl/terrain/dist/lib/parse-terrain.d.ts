export type TerrainOptions = {
    meshMaxError: number;
    bounds: number[];
    elevationDecoder: ElevationDecoder;
    tesselator: 'martini' | 'delatin' | 'auto';
    skirtHeight?: number;
};
type TerrainImage = {
    data: Uint8Array;
    width: number;
    height: number;
};
type ElevationDecoder = {
    rScaler: any;
    bScaler: any;
    gScaler: any;
    offset: number;
};
/**
 * Returns generated mesh object from image data
 *
 * @param terrainImage terrain image data
 * @param terrainOptions terrain options
 * @returns mesh object
 */
export declare function makeTerrainMeshFromImage(terrainImage: TerrainImage, terrainOptions: TerrainOptions): {
    loaderData: {
        header: {};
    };
    header: {
        vertexCount: any;
        boundingBox: [[number, number, number], [number, number, number]];
    };
    mode: number;
    indices: {
        value: Uint32Array;
        size: number;
    };
    attributes: {
        POSITION: {
            value: Float32Array;
            size: number;
        };
        TEXCOORD_0: {
            value: Float32Array;
            size: number;
        };
    };
};
export {};
//# sourceMappingURL=parse-terrain.d.ts.map
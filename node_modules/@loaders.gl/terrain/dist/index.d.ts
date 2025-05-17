import type { LoaderContext } from '@loaders.gl/loader-utils';
import { TerrainLoader as TerrainWorkerLoader, TerrainLoaderOptions } from "./terrain-loader.js";
import { QuantizedMeshLoader as QuantizedMeshWorkerLoader, QuantizedMeshLoaderOptions } from "./quantized-mesh-loader.js";
export { TerrainWorkerLoader };
export declare const TerrainLoader: {
    readonly parse: typeof parseTerrain;
    readonly dataType: import("@loaders.gl/schema").Mesh;
    readonly batchType: never;
    readonly name: "Terrain";
    readonly id: "terrain";
    readonly module: "terrain";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["png", "pngraw", "jpg", "jpeg", "gif", "webp", "bmp"];
    readonly mimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp", "image/bmp"];
    readonly options: {
        readonly terrain: {
            readonly tesselator: "auto";
            readonly bounds: never;
            readonly meshMaxError: 10;
            readonly elevationDecoder: {
                readonly rScaler: 1;
                readonly gScaler: 0;
                readonly bScaler: 0;
                readonly offset: 0;
            };
            readonly skirtHeight: undefined;
        };
    };
};
export declare function parseTerrain(arrayBuffer: ArrayBuffer, options?: TerrainLoaderOptions, context?: LoaderContext): Promise<{
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
}>;
export { QuantizedMeshWorkerLoader };
/**
 * Loader for quantized meshes
 */
export declare const QuantizedMeshLoader: {
    readonly parseSync: (arrayBuffer: ArrayBuffer, options: QuantizedMeshLoaderOptions | undefined) => import("@loaders.gl/schema").Mesh;
    readonly parse: (arrayBuffer: ArrayBuffer, options: QuantizedMeshLoaderOptions | undefined) => Promise<import("@loaders.gl/schema").Mesh>;
    readonly dataType: any;
    readonly batchType: never;
    readonly name: "Quantized Mesh";
    readonly id: "quantized-mesh";
    readonly module: "terrain";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["terrain"];
    readonly mimeTypes: ["application/vnd.quantized-mesh"];
    readonly options: {
        readonly 'quantized-mesh': {
            readonly bounds: [0, 0, 1, 1];
            readonly skirtHeight: null;
        };
    };
};
//# sourceMappingURL=index.d.ts.map
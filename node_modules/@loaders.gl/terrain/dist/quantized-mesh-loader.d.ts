import type { LoaderOptions } from '@loaders.gl/loader-utils';
/** QuantizedMeshLoader options */
export type QuantizedMeshLoaderOptions = LoaderOptions & {
    /** QuantizedMeshLoader options */
    'quantized-mesh'?: {
        bounds?: [number, number, number, number];
        skirtHeight?: number | null;
        /** Override the URL to the worker bundle (by default loads from unpkg.com) */
        workerUrl?: string;
    };
};
/**
 * Worker loader for quantized meshes
 */
export declare const QuantizedMeshLoader: {
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
//# sourceMappingURL=quantized-mesh-loader.d.ts.map
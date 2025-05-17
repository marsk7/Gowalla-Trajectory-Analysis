/** Options for the CompressedTextureLoader */
export type CompressedTextureLoaderOptions = {
    'compressed-texture'?: {
        /** @deprecated Specify path to libraries */
        libraryPath?: string;
        /** Whether to use Basis decoding */
        useBasis?: boolean;
        /** Override the URL to the worker bundle (by default loads from unpkg.com) */
        workerUrl?: string;
    };
};
/**
 * Worker Loader for KTX, DDS, and PVR texture container formats
 */
export declare const CompressedTextureWorkerLoader: {
    readonly dataType: any;
    readonly batchType: never;
    readonly name: "Texture Containers";
    readonly id: "compressed-texture";
    readonly module: "textures";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["ktx", "ktx2", "dds", "pvr"];
    readonly mimeTypes: ["image/ktx2", "image/ktx", "image/vnd-ms.dds", "image/x-dds", "application/octet-stream"];
    readonly binary: true;
    readonly options: {
        readonly 'compressed-texture': {
            readonly libraryPath: "libs/";
            readonly useBasis: false;
        };
    };
};
/**
 * Loader for KTX, DDS, and PVR texture container formats
 */
export declare const CompressedTextureLoader: {
    readonly parse: (arrayBuffer: ArrayBuffer, options?: CompressedTextureLoaderOptions) => Promise<import("@loaders.gl/schema").TextureLevel[]>;
    readonly dataType: any;
    readonly batchType: never;
    readonly name: "Texture Containers";
    readonly id: "compressed-texture";
    readonly module: "textures";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["ktx", "ktx2", "dds", "pvr"];
    readonly mimeTypes: ["image/ktx2", "image/ktx", "image/vnd-ms.dds", "image/x-dds", "application/octet-stream"];
    readonly binary: true;
    readonly options: {
        readonly 'compressed-texture': {
            readonly libraryPath: "libs/";
            readonly useBasis: false;
        };
    };
};
//# sourceMappingURL=compressed-texture-loader.d.ts.map
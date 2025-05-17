import type { LoaderOptions } from '@loaders.gl/loader-utils';
declare function preload(url: any, options?: {}): Promise<any>;
/**
 * Loader for 3D tiles from Cesium ION
 */
export declare const CesiumIonLoader: {
    readonly id: "cesium-ion";
    readonly name: "Cesium Ion";
    readonly preload: typeof preload;
    readonly parse: (data: ArrayBuffer, options?: LoaderOptions | undefined, context?: import("@loaders.gl/loader-utils").LoaderContext | undefined) => Promise<import("./types").Tiles3DTilesetJSONPostprocessed | import("./types").Tiles3DTileContent>;
    readonly options: {
        readonly 'cesium-ion': {
            readonly accessToken: null;
            readonly loadGLTF: true;
            readonly decodeQuantizedPositions: false;
            readonly isTileset: "auto";
            readonly assetGltfUpAxis: null;
        };
    };
    readonly dataType: any;
    readonly batchType: never;
    readonly module: "3d-tiles";
    readonly version: any;
    readonly extensions: ["cmpt", "pnts", "b3dm", "i3dm"];
    readonly mimeTypes: ["application/octet-stream"];
    readonly tests: ["cmpt", "pnts", "b3dm", "i3dm"];
};
export {};
//# sourceMappingURL=cesium-ion-loader.d.ts.map
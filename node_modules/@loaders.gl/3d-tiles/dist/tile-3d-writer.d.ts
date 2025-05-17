import type { WriterOptions } from '@loaders.gl/loader-utils';
/**
 * Exporter for 3D Tiles
 */
export declare const Tile3DWriter: {
    readonly name: "3D Tile";
    readonly id: "3d-tiles";
    readonly module: "3d-tiles";
    readonly version: any;
    readonly extensions: ["cmpt", "pnts", "b3dm", "i3dm"];
    readonly mimeTypes: ["application/octet-stream"];
    readonly binary: true;
    readonly options: {
        readonly "3d-tiles": {};
    };
    readonly encode: (tile: unknown, options: WriterOptions | undefined) => Promise<ArrayBuffer>;
    readonly encodeSync: typeof encodeSync;
};
declare function encodeSync(tile: any, options: any): ArrayBuffer;
export {};
//# sourceMappingURL=tile-3d-writer.d.ts.map
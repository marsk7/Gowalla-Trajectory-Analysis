import type { WriterOptions } from '@loaders.gl/loader-utils';
import type { DracoMesh } from "./lib/draco-types.js";
import type { DracoBuildOptions } from "./lib/draco-builder.js";
/** Writer Options for draco */
export type DracoWriterOptions = WriterOptions & {
    draco?: DracoBuildOptions & {
        method?: 'MESH_EDGEBREAKER_ENCODING' | 'MESH_SEQUENTIAL_ENCODING';
        speed?: [number, number];
        quantization?: Record<string, number>;
        attributeNameEntry?: string;
    };
};
/**
 * Exporter for Draco3D compressed geometries
 */
export declare const DracoWriter: {
    readonly name: "DRACO";
    readonly id: "draco";
    readonly module: "draco";
    readonly version: any;
    readonly extensions: ["drc"];
    readonly options: {
        readonly draco: {
            pointcloud: boolean;
            attributeNameEntry: string;
        };
    };
    readonly encode: typeof encode;
};
declare function encode(data: DracoMesh, options?: DracoWriterOptions): Promise<ArrayBuffer>;
export {};
//# sourceMappingURL=draco-writer.d.ts.map
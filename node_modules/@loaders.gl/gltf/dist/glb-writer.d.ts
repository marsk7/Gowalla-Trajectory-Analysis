import type { WriterOptions } from '@loaders.gl/loader-utils';
import type { GLB } from "./lib/types/glb-types.js";
import type { GLBEncodeOptions } from "./lib/encoders/encode-glb.js";
export type GLBWriterOptions = WriterOptions & {
    glb?: GLBEncodeOptions;
};
/**
 * GLB exporter
 * GLB is the binary container format for GLTF
 */
export declare const GLBWriter: {
    readonly name: "GLB";
    readonly id: "glb";
    readonly module: "gltf";
    readonly version: any;
    readonly extensions: ["glb"];
    readonly mimeTypes: ["model/gltf-binary"];
    readonly binary: true;
    readonly options: {
        readonly glb: {};
    };
    readonly encode: (glb: GLB, options?: GLBWriterOptions) => Promise<ArrayBuffer>;
    readonly encodeSync: typeof encodeSync;
};
declare function encodeSync(glb: any, options: any): ArrayBuffer;
export {};
//# sourceMappingURL=glb-writer.d.ts.map
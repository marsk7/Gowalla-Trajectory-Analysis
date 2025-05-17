import type { LoaderOptions } from '@loaders.gl/loader-utils';
import type { GLB } from "./lib/types/glb-types.js";
import type { ParseGLBOptions } from "./lib/parsers/parse-glb.js";
/** GLB loader options */
export type GLBLoaderOptions = LoaderOptions & {
    /** GLB Parser Options */
    glb?: ParseGLBOptions;
    /** GLB specific: byteOffset to start parsing from */
    byteOffset?: number;
};
/**
 * GLB Loader -
 * GLB is the binary container format for GLTF
 */
export declare const GLBLoader: {
    readonly dataType: GLB;
    readonly batchType: never;
    readonly name: "GLB";
    readonly id: "glb";
    readonly module: "gltf";
    readonly version: any;
    readonly extensions: ["glb"];
    readonly mimeTypes: ["model/gltf-binary"];
    readonly binary: true;
    readonly parse: typeof parse;
    readonly parseSync: typeof parseSync;
    readonly options: {
        readonly glb: {
            readonly strict: false;
        };
    };
};
declare function parse(arrayBuffer: ArrayBuffer, options?: GLBLoaderOptions): Promise<GLB>;
declare function parseSync(arrayBuffer: ArrayBuffer, options?: GLBLoaderOptions): GLB;
export {};
//# sourceMappingURL=glb-loader.d.ts.map
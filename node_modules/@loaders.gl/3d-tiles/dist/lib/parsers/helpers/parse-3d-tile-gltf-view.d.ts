import { LoaderContext } from '@loaders.gl/loader-utils';
import { Tiles3DTileContent } from "../../../types.js";
import { Tiles3DLoaderOptions } from "../../../tiles-3d-loader.js";
export declare const GLTF_FORMAT: {
    URI: number;
    EMBEDDED: number;
};
export declare function parse3DTileGLTFViewSync(tile: Tiles3DTileContent, arrayBuffer: ArrayBuffer, byteOffset: number, options: Tiles3DLoaderOptions | undefined): number;
export declare function extractGLTF(tile: Tiles3DTileContent, gltfFormat: number, options?: Tiles3DLoaderOptions, context?: LoaderContext): Promise<void>;
//# sourceMappingURL=parse-3d-tile-gltf-view.d.ts.map
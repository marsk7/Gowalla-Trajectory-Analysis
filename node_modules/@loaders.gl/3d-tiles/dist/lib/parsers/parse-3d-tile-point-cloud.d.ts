import { LoaderContext } from '@loaders.gl/loader-utils';
import { Tiles3DLoaderOptions } from "../../tiles-3d-loader.js";
import { Tiles3DTileContent } from "../../types.js";
export declare function parsePointCloud3DTile(tile: Tiles3DTileContent, arrayBuffer: ArrayBuffer, byteOffset: number, options?: Tiles3DLoaderOptions, context?: LoaderContext): Promise<number>;
export declare function loadDraco(tile: Tiles3DTileContent, dracoData: any, options?: Tiles3DLoaderOptions, context?: LoaderContext): Promise<void>;
//# sourceMappingURL=parse-3d-tile-point-cloud.d.ts.map
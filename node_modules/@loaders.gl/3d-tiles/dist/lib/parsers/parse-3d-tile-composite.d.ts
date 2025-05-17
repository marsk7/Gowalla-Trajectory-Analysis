import type { LoaderContext } from '@loaders.gl/loader-utils';
import type { Tiles3DLoaderOptions } from "../../tiles-3d-loader.js";
import { Tiles3DTileContent } from "../../types.js";
/** Resolve circulate dependency by passing in parsing function as argument */
type Parse3DTile = (arrayBuffer: ArrayBuffer, byteOffset: number, options: Tiles3DLoaderOptions | undefined, context: LoaderContext | undefined, subtile: any) => Promise<number>;
export declare function parseComposite3DTile(tile: Tiles3DTileContent, arrayBuffer: ArrayBuffer, byteOffset: number, options: Tiles3DLoaderOptions | undefined, context: LoaderContext | undefined, parse3DTile: Parse3DTile): Promise<number>;
export {};
//# sourceMappingURL=parse-3d-tile-composite.d.ts.map
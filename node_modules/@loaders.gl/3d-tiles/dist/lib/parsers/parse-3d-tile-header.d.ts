import type { Tiles3DLoaderOptions } from "../../tiles-3d-loader.js";
import type { LoaderOptions } from '@loaders.gl/loader-utils';
import { LOD_METRIC_TYPE, TILE_REFINEMENT, TILE_TYPE } from '@loaders.gl/tiles';
import { ImplicitTilingExensionData, Subtree, Tile3DBoundingVolume, Tiles3DTileJSON, Tiles3DTileJSONPostprocessed, Tiles3DTilesetJSON } from "../../types.js";
/** Options for recursive loading implicit subtrees */
export type ImplicitOptions = {
    /** Template of the full url of the content template */
    contentUrlTemplate: string;
    /** Template of the full url of the subtree  */
    subtreesUriTemplate: string;
    /** Implicit subdivision scheme */
    subdivisionScheme: 'QUADTREE' | 'OCTREE' | string;
    /** Levels per subtree */
    subtreeLevels: number;
    /** Maximum implicit level through all subtrees */
    maximumLevel?: number;
    /** 3DTiles refine method (add/replace) */
    refine?: string;
    /** Tileset base path */
    basePath: string;
    /** 3DTiles LOD metric type */
    lodMetricType: LOD_METRIC_TYPE.GEOMETRIC_ERROR;
    /** Root metric value of the root tile of the implicit subtrees */
    rootLodMetricValue: number;
    /** Bounding volume of the root tile of the implicit subtrees */
    rootBoundingVolume: Tile3DBoundingVolume;
    /** Function that detects TILE_TYPE by tile metadata and content URL */
    getTileType: (tile: Tiles3DTileJSON, tileContentUrl?: string) => TILE_TYPE | string;
    /** Function that converts string refine method to enum value */
    getRefine: (refine?: string) => TILE_REFINEMENT | string | undefined;
};
export declare function normalizeTileData(tile: Tiles3DTileJSON | null, basePath: string): Tiles3DTileJSONPostprocessed | null;
export declare function normalizeTileHeaders(tileset: Tiles3DTilesetJSON, basePath: string, options: LoaderOptions): Promise<Tiles3DTileJSONPostprocessed | null>;
/**
 * Do normalisation of implicit tile headers
 * TODO Check if Tile3D class can be a return type here.
 * @param tileset
 */
export declare function normalizeImplicitTileHeaders(tile: Tiles3DTileJSON, tileset: Tiles3DTilesetJSON, basePath: string, implicitTilingExtension: ImplicitTilingExensionData, options: Tiles3DLoaderOptions): Promise<Tiles3DTileJSONPostprocessed | null>;
/**
 * Do implicit data normalisation to create hierarchical tile structure
 * @param tile
 * @param rootSubtree
 * @param options
 * @returns
 */
export declare function normalizeImplicitTileData(tile: Tiles3DTileJSON, basePath: string, rootSubtree: Subtree, implicitOptions: ImplicitOptions, loaderOptions: Tiles3DLoaderOptions): Promise<Tiles3DTileJSONPostprocessed | null>;
//# sourceMappingURL=parse-3d-tile-header.d.ts.map
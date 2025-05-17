import type { Tile3DBoundingVolume, Subtree } from "../../../types.js";
import type { S2VolumeInfo } from "../../utils/obb/s2-corners-to-obb.js";
import { Tiles3DLoaderOptions } from "../../../tiles-3d-loader.js";
import { ImplicitOptions } from "../parse-3d-tile-header.js";
/**
 *  S2VolumeBox is an extention of BoundingVolume of type "box"
 */
export type S2VolumeBox = {
    /** BoundingVolume of type "box" has the "box" field. S2VolumeBox contains it as well. */
    box: number[];
    /** s2VolumeInfo provides additional info about the box - specifically the token, min and max height */
    s2VolumeInfo: S2VolumeInfo;
};
/**
 * Recursively parse implicit tiles tree
 * Spec - https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_implicit_tiling
 * TODO Check out do we able to use Tile3D class as return type here.
 *
 * @param subtree - the current subtree. Subtrees contain availability data for <implicitOptions.subtreeLevels>.
 *     Once we go deeper than that many levels, we will need load a child subtree to get further availability data.
 * @param subtreeData - the coordinates of the current subtree, relative to the root of this implicit tiles tree.
 * @param parentData - the coordinates of the parent tile, relative to the current subtree.
 *     The overall coordinates of the current tile can be found by combining the coordinates of the current subtree, the parent tile,
 *     and tje single-bit coordinates that can be calculated from the childIndex.
 * @param childIndex - which child the current tile is of its parent. In the range 0-7 for OCTREE, 0-3 for QUADTREE.
 * @param implicitOptions - options specified at the root of this implicit tile tree - numbers of levels, URL templates.
 * @param loaderOptions - see Tiles3DLoaderOptions.
 */
export declare function parseImplicitTiles(params: {
    subtree: Subtree;
    subtreeData?: {
        level: number;
        x: number;
        y: number;
        z: number;
    };
    parentData?: {
        mortonIndex: number;
        localLevel: number;
        localX: number;
        localY: number;
        localZ: number;
    };
    childIndex?: number;
    implicitOptions: ImplicitOptions;
    loaderOptions: Tiles3DLoaderOptions;
    s2VolumeBox?: S2VolumeBox;
}): Promise<{
    children: never[];
    lodMetricValue: number;
    contentUrl: string;
} | {
    children: any;
    contentUrl: any;
    content: {
        uri: any;
    };
    id: any;
    refine: string | import("@loaders.gl/tiles").TILE_REFINEMENT | undefined;
    type: string;
    lodMetricType: import("@loaders.gl/tiles").LOD_METRIC_TYPE.GEOMETRIC_ERROR;
    lodMetricValue: number;
    geometricError: number;
    transform: any;
    boundingVolume: Tile3DBoundingVolume;
}>;
/**
 * Replace implicit tile content url with real coordinates.
 * @param templateUrl
 * @param level
 * @param x
 * @param y
 * @param z
 */
export declare function replaceContentUrlTemplate(templateUrl: string, level: number, x: number, y: number, z: number): string;
//# sourceMappingURL=parse-3d-implicit-tiles.d.ts.map
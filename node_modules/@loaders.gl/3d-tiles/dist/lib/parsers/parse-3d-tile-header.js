// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors
import { path } from '@loaders.gl/loader-utils';
import { Tile3DSubtreeLoader } from "../../tile-3d-subtree-loader.js";
import { load } from '@loaders.gl/core';
import { LOD_METRIC_TYPE, TILE_REFINEMENT, TILE_TYPE } from '@loaders.gl/tiles';
import { parseImplicitTiles, replaceContentUrlTemplate } from "./helpers/parse-3d-implicit-tiles.js";
import { convertS2BoundingVolumetoOBB } from "../utils/obb/s2-corners-to-obb.js";
function getTileType(tile, tileContentUrl = '') {
    if (!tileContentUrl) {
        return TILE_TYPE.EMPTY;
    }
    const contentUrl = tileContentUrl.split('?')[0]; // Discard query string
    const fileExtension = contentUrl.split('.').pop();
    switch (fileExtension) {
        case 'pnts':
            return TILE_TYPE.POINTCLOUD;
        case 'i3dm':
        case 'b3dm':
        case 'glb':
        case 'gltf':
            return TILE_TYPE.SCENEGRAPH;
        default:
            return fileExtension || TILE_TYPE.EMPTY;
    }
}
function getRefine(refine) {
    switch (refine) {
        case 'REPLACE':
        case 'replace':
            return TILE_REFINEMENT.REPLACE;
        case 'ADD':
        case 'add':
            return TILE_REFINEMENT.ADD;
        default:
            return refine;
    }
}
function resolveUri(uri, basePath) {
    // url scheme per RFC3986
    const urlSchemeRegex = /^[a-z][0-9a-z+.-]*:/i;
    if (urlSchemeRegex.test(basePath)) {
        const url = new URL(uri, `${basePath}/`);
        return decodeURI(url.toString());
    }
    else if (uri.startsWith('/')) {
        return uri;
    }
    return path.resolve(basePath, uri);
}
export function normalizeTileData(tile, basePath) {
    if (!tile) {
        return null;
    }
    let tileContentUrl;
    if (tile.content) {
        const contentUri = tile.content.uri || tile.content?.url;
        if (typeof contentUri !== 'undefined') {
            // sparse implicit tilesets may not define content for all nodes
            tileContentUrl = resolveUri(contentUri, basePath);
        }
    }
    const tilePostprocessed = {
        ...tile,
        id: tileContentUrl,
        contentUrl: tileContentUrl,
        lodMetricType: LOD_METRIC_TYPE.GEOMETRIC_ERROR,
        lodMetricValue: tile.geometricError,
        transformMatrix: tile.transform,
        type: getTileType(tile, tileContentUrl),
        refine: getRefine(tile.refine)
    };
    return tilePostprocessed;
}
// normalize tile headers
export async function normalizeTileHeaders(tileset, basePath, options) {
    let root = null;
    const rootImplicitTilingExtension = getImplicitTilingExtensionData(tileset.root);
    if (rootImplicitTilingExtension && tileset.root) {
        root = await normalizeImplicitTileHeaders(tileset.root, tileset, basePath, rootImplicitTilingExtension, options);
    }
    else {
        root = normalizeTileData(tileset.root, basePath);
    }
    const stack = [];
    stack.push(root);
    while (stack.length > 0) {
        const tile = stack.pop() || {};
        const children = tile.children || [];
        const childrenPostprocessed = [];
        for (const childHeader of children) {
            const childImplicitTilingExtension = getImplicitTilingExtensionData(childHeader);
            let childHeaderPostprocessed;
            if (childImplicitTilingExtension) {
                childHeaderPostprocessed = await normalizeImplicitTileHeaders(childHeader, tileset, basePath, childImplicitTilingExtension, options);
            }
            else {
                childHeaderPostprocessed = normalizeTileData(childHeader, basePath);
            }
            if (childHeaderPostprocessed) {
                childrenPostprocessed.push(childHeaderPostprocessed);
                stack.push(childHeaderPostprocessed);
            }
        }
        tile.children = childrenPostprocessed;
    }
    return root;
}
/**
 * Do normalisation of implicit tile headers
 * TODO Check if Tile3D class can be a return type here.
 * @param tileset
 */
export async function normalizeImplicitTileHeaders(tile, tileset, basePath, implicitTilingExtension, options) {
    const { subdivisionScheme, maximumLevel, availableLevels, subtreeLevels, subtrees: { uri: subtreesUriTemplate } } = implicitTilingExtension;
    const replacedUrlTemplate = replaceContentUrlTemplate(subtreesUriTemplate, 0, 0, 0, 0);
    const subtreeUrl = resolveUri(replacedUrlTemplate, basePath);
    const subtree = await load(subtreeUrl, Tile3DSubtreeLoader, options);
    const tileContentUri = tile.content?.uri;
    const contentUrlTemplate = tileContentUri ? resolveUri(tileContentUri, basePath) : '';
    const refine = tileset?.root?.refine;
    // @ts-ignore
    const rootLodMetricValue = tile.geometricError;
    // Replace tile.boundingVolume with the the bounding volume specified by the extensions['3DTILES_bounding_volume_S2']
    const s2VolumeInfo = tile.boundingVolume.extensions?.['3DTILES_bounding_volume_S2'];
    if (s2VolumeInfo) {
        const box = convertS2BoundingVolumetoOBB(s2VolumeInfo);
        const s2VolumeBox = { box, s2VolumeInfo };
        tile.boundingVolume = s2VolumeBox;
    }
    const rootBoundingVolume = tile.boundingVolume;
    const implicitOptions = {
        contentUrlTemplate,
        subtreesUriTemplate,
        subdivisionScheme,
        subtreeLevels,
        maximumLevel: Number.isFinite(availableLevels) ? availableLevels - 1 : maximumLevel,
        refine,
        basePath,
        lodMetricType: LOD_METRIC_TYPE.GEOMETRIC_ERROR,
        rootLodMetricValue,
        rootBoundingVolume,
        getTileType,
        getRefine
    };
    return await normalizeImplicitTileData(tile, basePath, subtree, implicitOptions, options);
}
/**
 * Do implicit data normalisation to create hierarchical tile structure
 * @param tile
 * @param rootSubtree
 * @param options
 * @returns
 */
export async function normalizeImplicitTileData(tile, basePath, rootSubtree, implicitOptions, loaderOptions) {
    if (!tile) {
        return null;
    }
    const { children, contentUrl } = await parseImplicitTiles({
        subtree: rootSubtree,
        implicitOptions,
        loaderOptions
    });
    let tileContentUrl;
    let tileContent = null;
    if (contentUrl) {
        tileContentUrl = contentUrl;
        tileContent = { uri: contentUrl.replace(`${basePath}/`, '') };
    }
    const tilePostprocessed = {
        ...tile,
        id: tileContentUrl,
        contentUrl: tileContentUrl,
        lodMetricType: LOD_METRIC_TYPE.GEOMETRIC_ERROR,
        lodMetricValue: tile.geometricError,
        transformMatrix: tile.transform,
        type: getTileType(tile, tileContentUrl),
        refine: getRefine(tile.refine),
        content: tileContent || tile.content,
        children
    };
    return tilePostprocessed;
}
/**
 * Implicit Tiling data can be in 3DTILES_implicit_tiling for 3DTiles v.Next or directly in implicitTiling object for 3DTiles v1.1.
 * Spec 3DTiles v.Next - https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_implicit_tiling
 * Spec 3DTiles v.1.1 - https://github.com/CesiumGS/3d-tiles/tree/draft-1.1/specification/ImplicitTiling
 * @param tile
 * @returns
 */
function getImplicitTilingExtensionData(tile) {
    return tile?.extensions?.['3DTILES_implicit_tiling'] || tile?.implicitTiling;
}

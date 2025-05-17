// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors
import { path } from '@loaders.gl/loader-utils';
import { TILESET_TYPE, LOD_METRIC_TYPE } from '@loaders.gl/tiles';
import { VERSION } from "./lib/utils/version.js";
import { parse3DTile } from "./lib/parsers/parse-3d-tile.js";
import { normalizeTileHeaders } from "./lib/parsers/parse-3d-tile-header.js";
/**
 * Loader for 3D Tiles
 */
export const Tiles3DLoader = {
    dataType: null,
    batchType: null,
    id: '3d-tiles',
    name: '3D Tiles',
    module: '3d-tiles',
    version: VERSION,
    extensions: ['cmpt', 'pnts', 'b3dm', 'i3dm'],
    mimeTypes: ['application/octet-stream'],
    tests: ['cmpt', 'pnts', 'b3dm', 'i3dm'],
    parse,
    options: {
        '3d-tiles': {
            loadGLTF: true,
            decodeQuantizedPositions: false,
            isTileset: 'auto',
            assetGltfUpAxis: null
        }
    }
};
/** Parses a tileset or tile */
async function parse(data, options = {}, context) {
    // auto detect file type
    const loaderOptions = options['3d-tiles'] || {};
    let isTileset;
    if (loaderOptions.isTileset === 'auto') {
        isTileset = context?.url && context.url.indexOf('.json') !== -1;
    }
    else {
        isTileset = loaderOptions.isTileset;
    }
    return isTileset ? parseTileset(data, options, context) : parseTile(data, options, context);
}
/** Parse a tileset */
async function parseTileset(data, options, context) {
    const tilesetJson = JSON.parse(new TextDecoder().decode(data));
    const tilesetUrl = context?.url || '';
    const basePath = getBaseUri(tilesetUrl);
    const normalizedRoot = await normalizeTileHeaders(tilesetJson, basePath, options || {});
    const tilesetJsonPostprocessed = {
        ...tilesetJson,
        shape: 'tileset3d',
        loader: Tiles3DLoader,
        url: tilesetUrl,
        queryString: context?.queryString || '',
        basePath,
        root: normalizedRoot || tilesetJson.root,
        type: TILESET_TYPE.TILES3D,
        lodMetricType: LOD_METRIC_TYPE.GEOMETRIC_ERROR,
        lodMetricValue: tilesetJson.root?.geometricError || 0
    };
    return tilesetJsonPostprocessed;
}
/** Parse a tile */
async function parseTile(arrayBuffer, options, context) {
    const tile = {
        content: {
            shape: 'tile3d',
            featureIds: null
        }
    };
    const byteOffset = 0;
    // @ts-expect-error
    await parse3DTile(arrayBuffer, byteOffset, options, context, tile.content);
    // @ts-expect-error
    return tile.content;
}
/** Get base name */
function getBaseUri(tilesetUrl) {
    return path.dirname(tilesetUrl);
}

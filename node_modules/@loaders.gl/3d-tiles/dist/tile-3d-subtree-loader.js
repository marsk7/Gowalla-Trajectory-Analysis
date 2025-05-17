// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors
import parse3DTilesSubtree from "./lib/parsers/helpers/parse-3d-tile-subtree.js";
import { VERSION } from "./lib/utils/version.js";
/**
 * Loader for 3D Tiles Subtree
 */
export const Tile3DSubtreeLoader = {
    dataType: null,
    batchType: null,
    id: '3d-tiles-subtree',
    name: '3D Tiles Subtree',
    module: '3d-tiles',
    version: VERSION,
    extensions: ['subtree'],
    mimeTypes: ['application/octet-stream'],
    tests: ['subtree'],
    parse: parse3DTilesSubtree,
    options: {}
};

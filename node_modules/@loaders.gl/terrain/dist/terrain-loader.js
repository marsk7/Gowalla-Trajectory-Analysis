// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
/**
 * Worker loader for image encoded terrain
 */
export const TerrainLoader = {
    dataType: null,
    batchType: null,
    name: 'Terrain',
    id: 'terrain',
    module: 'terrain',
    version: VERSION,
    worker: true,
    extensions: ['png', 'pngraw', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'],
    mimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/bmp'],
    options: {
        terrain: {
            tesselator: 'auto',
            bounds: undefined,
            meshMaxError: 10,
            elevationDecoder: {
                rScaler: 1,
                gScaler: 0,
                bScaler: 0,
                offset: 0
            },
            skirtHeight: undefined
        }
    }
};

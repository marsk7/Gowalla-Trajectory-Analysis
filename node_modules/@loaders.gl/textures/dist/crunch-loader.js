// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/utils/version.js";
/**
 * Worker loader for the Crunch compressed texture container format
 * @note We avoid bundling crunch - it is a rare format and large lib, so we only offer worker loader
 */
export const CrunchLoader = {
    dataType: null,
    batchType: null,
    id: 'crunch',
    name: 'Crunch',
    module: 'textures',
    version: VERSION,
    worker: true,
    extensions: ['crn'],
    mimeTypes: ['image/crn', 'image/x-crn', 'application/octet-stream'],
    binary: true,
    options: {
        crunch: {
            libraryPath: 'libs/'
        }
    }
};

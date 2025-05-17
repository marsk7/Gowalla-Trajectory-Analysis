// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { isLoaderObject } from "../loader-utils/normalize-loader.js";
import { getFetchFunction } from "../loader-utils/get-fetch-function.js";
import { parseInBatches } from "./parse-in-batches.js";
export function loadInBatches(files, loaders, options, context) {
    let loadersArray;
    // Signature: load(url, options)
    if (!Array.isArray(loaders) && !isLoaderObject(loaders)) {
        context = undefined; // context not supported in short signature
        options = loaders;
        loadersArray = undefined;
    }
    else {
        loadersArray = loaders;
    }
    // Select fetch function
    const fetch = getFetchFunction(options || {});
    // Single url/file
    if (!Array.isArray(files)) {
        return loadOneFileInBatches(files, loadersArray, options || {}, fetch);
    }
    // Multiple URLs / files
    const promises = files.map((file) => loadOneFileInBatches(file, loadersArray, options || {}, fetch));
    // No point in waiting here for all responses before starting to stream individual streams?
    return promises;
}
async function loadOneFileInBatches(file, loaders, options, fetch) {
    if (typeof file === 'string') {
        const url = file;
        const response = await fetch(url);
        // pick right overload
        return Array.isArray(loaders)
            ? await parseInBatches(response, loaders, options)
            : await parseInBatches(response, loaders, options);
    }
    // pick right overload
    return Array.isArray(loaders)
        ? await parseInBatches(file, loaders, options)
        : await parseInBatches(file, loaders, options);
}

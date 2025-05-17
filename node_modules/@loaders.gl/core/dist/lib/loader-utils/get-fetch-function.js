// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { isObject } from "../../javascript-utils/is-type.js";
import { fetchFile } from "../fetch/fetch-file.js";
import { getGlobalLoaderOptions } from "./option-utils.js";
/**
 * Gets the current fetch function from options and context
 * @param options
 * @param context
 */
export function getFetchFunction(options, context) {
    const globalOptions = getGlobalLoaderOptions();
    const loaderOptions = options || globalOptions;
    // options.fetch can be a function
    if (typeof loaderOptions.fetch === 'function') {
        return loaderOptions.fetch;
    }
    // options.fetch can be an options object
    if (isObject(loaderOptions.fetch)) {
        return (url) => fetchFile(url, loaderOptions.fetch);
    }
    // else refer to context (from parent loader) if available
    if (context?.fetch) {
        return context?.fetch;
    }
    // else return the default fetch function
    return fetchFile;
}

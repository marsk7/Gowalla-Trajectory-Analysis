// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { selectLoaderSync } from "./select-loader.js";
import { isLoaderObject } from "../loader-utils/normalize-loader.js";
import { normalizeOptions } from "../loader-utils/option-utils.js";
import { getArrayBufferOrStringFromDataSync } from "../loader-utils/get-data.js";
import { getLoaderContext, getLoadersFromContext } from "../loader-utils/loader-context.js";
import { getResourceUrl } from "../utils/resource-utils.js";
/**
 * Parses `data` synchronously using a specified loader
 */
export function parseSync(data, loaders, options, context) {
    // Signature: parseSync(data, options)
    // Uses registered loaders
    if (!Array.isArray(loaders) && !isLoaderObject(loaders)) {
        context = undefined; // context not supported in short signature
        options = loaders;
        loaders = undefined;
    }
    options = options || {};
    // Chooses a loader (and normalizes it)
    // Also use any loaders in the context, new loaders take priority
    const typedLoaders = loaders;
    const candidateLoaders = getLoadersFromContext(typedLoaders, context);
    const loader = selectLoaderSync(data, candidateLoaders, options);
    // Note: if nothrow option was set, it is possible that no loader was found, if so just return null
    if (!loader) {
        return null;
    }
    // Normalize options
    options = normalizeOptions(options, loader, candidateLoaders);
    // Extract a url for auto detection
    const url = getResourceUrl(data);
    const parse = () => {
        throw new Error('parseSync called parse (which is async');
    };
    context = getLoaderContext({ url, _parseSync: parse, _parse: parse, loaders: loaders }, options, context || null);
    return parseWithLoaderSync(loader, data, options, context);
}
// TODO - should accept loader.parseSync/parse and generate 1 chunk asyncIterator
function parseWithLoaderSync(loader, data, options, context) {
    data = getArrayBufferOrStringFromDataSync(data, loader, options);
    if (loader.parseTextSync && typeof data === 'string') {
        return loader.parseTextSync(data, options); // , context, loader);
    }
    if (loader.parseSync && data instanceof ArrayBuffer) {
        return loader.parseSync(data, options, context); // , loader);
    }
    // TBD - If synchronous parser not available, return null
    throw new Error(`${loader.name} loader: 'parseSync' not supported by this loader, use 'parse' instead. ${context.url || ''}`);
}

// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { getFetchFunction } from "./get-fetch-function.js";
import { extractQueryString, stripQueryString } from "../utils/url-utils.js";
import { path } from '@loaders.gl/loader-utils';
/**
 * "sub" loaders invoked by other loaders get a "context" injected on `this`
 * The context will inject core methods like `parse` and contain information
 * about loaders and options passed in to the top-level `parse` call.
 *
 * @param context
 * @param options
 * @param previousContext
 */
export function getLoaderContext(context, options, parentContext) {
    // For recursive calls, we already have a context
    // TODO - add any additional loaders to context?
    if (parentContext) {
        return parentContext;
    }
    const newContext = {
        fetch: getFetchFunction(options, context),
        ...context
    };
    // Parse URLs so that subloaders can easily generate correct strings
    if (newContext.url) {
        const baseUrl = stripQueryString(newContext.url);
        newContext.baseUrl = baseUrl;
        newContext.queryString = extractQueryString(newContext.url);
        newContext.filename = path.filename(baseUrl);
        newContext.baseUrl = path.dirname(baseUrl);
    }
    // Recursive loading does not use single loader
    if (!Array.isArray(newContext.loaders)) {
        newContext.loaders = null;
    }
    return newContext;
}
// eslint-disable-next-line complexity
export function getLoadersFromContext(loaders, context) {
    // A single loader (non-array) indicates no selection desired. Force select.
    if (loaders && !Array.isArray(loaders)) {
        return loaders;
    }
    // Create a merged list
    let candidateLoaders;
    if (loaders) {
        candidateLoaders = Array.isArray(loaders) ? loaders : [loaders];
    }
    if (context && context.loaders) {
        const contextLoaders = Array.isArray(context.loaders) ? context.loaders : [context.loaders];
        candidateLoaders = candidateLoaders ? [...candidateLoaders, ...contextLoaders] : contextLoaders;
    }
    // If no loaders, return null to look in globally registered loaders
    return candidateLoaders && candidateLoaders.length ? candidateLoaders : undefined;
}

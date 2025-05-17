// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { parseWithWorker, canParseWithWorker, mergeLoaderOptions } from '@loaders.gl/loader-utils';
import { assert, validateWorkerVersion } from '@loaders.gl/worker-utils';
import { isLoaderObject } from "../loader-utils/normalize-loader.js";
import { isResponse } from "../../javascript-utils/is-type.js";
import { normalizeOptions } from "../loader-utils/option-utils.js";
import { getArrayBufferOrStringFromData } from "../loader-utils/get-data.js";
import { getLoaderContext, getLoadersFromContext } from "../loader-utils/loader-context.js";
import { getResourceUrl } from "../utils/resource-utils.js";
import { selectLoader } from "./select-loader.js";
/**
 * Parses `data` using a specified loader
 * @param data
 * @param loaders
 * @param options
 * @param context
 */
// implementation signature
export async function parse(data, loaders, options, context) {
    // Signature: parse(data, options, context | url)
    // Uses registered loaders
    if (loaders && !Array.isArray(loaders) && !isLoaderObject(loaders)) {
        context = undefined; // context not supported in short signature
        options = loaders;
        loaders = undefined;
    }
    data = await data; // Resolve any promise
    options = options || {}; // Could be invalid...
    // Extract a url for auto detection
    const url = getResourceUrl(data);
    // Chooses a loader (and normalizes it)
    // Also use any loaders in the context, new loaders take priority
    const typedLoaders = loaders;
    const candidateLoaders = getLoadersFromContext(typedLoaders, context);
    // todo hacky type cast
    const loader = await selectLoader(data, candidateLoaders, options);
    // Note: if no loader was found, if so just return null
    if (!loader) {
        return null;
    }
    // Normalize options
    // @ts-expect-error
    options = normalizeOptions(options, loader, candidateLoaders, url); // Could be invalid...
    // Get a context (if already present, will be unchanged)
    context = getLoaderContext(
    // @ts-expect-error
    { url, _parse: parse, loaders: candidateLoaders }, options, context || null);
    return await parseWithLoader(loader, data, options, context);
}
// TODO: support progress and abort
// TODO - should accept loader.parseAsyncIterator and concatenate.
async function parseWithLoader(loader, data, options, context) {
    validateWorkerVersion(loader);
    options = mergeLoaderOptions(loader.options, options);
    if (isResponse(data)) {
        // Serialize to support passing the response to web worker
        const response = data;
        const { ok, redirected, status, statusText, type, url } = response;
        const headers = Object.fromEntries(response.headers.entries());
        // @ts-expect-error TODO - fix this
        context.response = { headers, ok, redirected, status, statusText, type, url };
    }
    data = await getArrayBufferOrStringFromData(data, loader, options);
    const loaderWithParser = loader;
    // First check for synchronous text parser, wrap results in promises
    if (loaderWithParser.parseTextSync && typeof data === 'string') {
        return loaderWithParser.parseTextSync(data, options, context);
    }
    // If we have a workerUrl and the loader can parse the given options efficiently in a worker
    if (canParseWithWorker(loader, options)) {
        return await parseWithWorker(loader, data, options, context, parse);
    }
    // Check for asynchronous parser
    if (loaderWithParser.parseText && typeof data === 'string') {
        return await loaderWithParser.parseText(data, options, context);
    }
    if (loaderWithParser.parse) {
        return await loaderWithParser.parse(data, options, context);
    }
    // This should not happen, all sync loaders should also offer `parse` function
    assert(!loaderWithParser.parseSync);
    // TBD - If asynchronous parser not available, return null
    throw new Error(`${loader.id} loader - no parser found and worker is disabled`);
}

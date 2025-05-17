// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { isTable, makeBatchFromTable } from '@loaders.gl/schema';
import { concatenateArrayBuffersAsync } from '@loaders.gl/loader-utils';
import { isLoaderObject } from "../loader-utils/normalize-loader.js";
import { normalizeOptions } from "../loader-utils/option-utils.js";
import { getLoaderContext } from "../loader-utils/loader-context.js";
import { getAsyncIterableFromData } from "../loader-utils/get-data.js";
import { getResourceUrl } from "../utils/resource-utils.js";
import { selectLoader } from "./select-loader.js";
// Ensure `parse` is available in context if loader falls back to `parse`
import { parse } from "./parse.js";
/**
 * Parses `data` using a specified loader
 * @param data
 * @param loaders
 * @param options
 * @param context
 */
export async function parseInBatches(data, loaders, options, context) {
    const loaderArray = Array.isArray(loaders) ? loaders : undefined;
    // Signature: parseInBatches(data, options, url) - Uses registered loaders
    if (!Array.isArray(loaders) && !isLoaderObject(loaders)) {
        context = undefined; // context not supported in short signature
        options = loaders;
        loaders = undefined;
    }
    data = await data; // Resolve any promise
    options = options || {};
    // Extract a url for auto detection
    const url = getResourceUrl(data);
    // Chooses a loader and normalizes it
    // Note - only uses URL and contentType for streams and iterator inputs
    const loader = await selectLoader(data, loaders, options);
    // Note: if options.nothrow was set, it is possible that no loader was found, if so just return null
    if (!loader) {
        return [];
    }
    // Normalize options
    options = normalizeOptions(options, loader, loaderArray, url);
    context = getLoaderContext({ url, _parseInBatches: parseInBatches, _parse: parse, loaders: loaderArray }, options, context || null);
    return await parseWithLoaderInBatches(loader, data, options, context);
}
/**
 * Loader has been selected and context has been prepared, see if we need to emit a metadata batch
 */
async function parseWithLoaderInBatches(loader, data, options, context) {
    const outputIterator = await parseToOutputIterator(loader, data, options, context);
    // Generate metadata batch if requested
    if (!options.metadata) {
        return outputIterator;
    }
    const metadataBatch = {
        shape: 'metadata',
        batchType: 'metadata',
        metadata: {
            _loader: loader,
            _context: context
        },
        // Populate with some default fields to avoid crashing
        data: [],
        bytesUsed: 0
    };
    async function* makeMetadataBatchIterator(iterator) {
        yield metadataBatch;
        yield* iterator;
    }
    return makeMetadataBatchIterator(outputIterator);
}
/**
 * Prep work is done, now it is time to start parsing into an output operator
 * The approach depends on which parse function the loader exposes
 * `parseInBatches` (preferred), `parse` (fallback)
 */
async function parseToOutputIterator(loader, data, options, context) {
    // Get an iterator from the input
    const inputIterator = await getAsyncIterableFromData(data, options);
    // Apply any iterator transforms (options.transforms)
    const transformedIterator = await applyInputTransforms(inputIterator, options?.transforms || []);
    // If loader supports parseInBatches, we are done
    if (loader.parseInBatches) {
        return loader.parseInBatches(transformedIterator, options, context);
    }
    return parseChunkInBatches(transformedIterator, loader, options, context);
}
// Fallback: load atomically using `parse` concatenating input iterator into single chunk
async function* parseChunkInBatches(transformedIterator, loader, options, context) {
    const arrayBuffer = await concatenateArrayBuffersAsync(transformedIterator);
    // Call `parse` instead of `loader.parse` to ensure we can call workers etc.
    const parsedData = await parse(arrayBuffer, loader, 
    // TODO - Hack: supply loaders MIME type to ensure we match it
    { ...options, mimeType: loader.mimeTypes[0] }, context);
    // yield a single batch, the output from loader.parse() repackaged as a batch
    const batch = convertDataToBatch(parsedData, loader);
    yield batch;
}
/**
 * Convert parsed data into a single batch
 * @todo run through batch builder to apply options etc...
 */
function convertDataToBatch(parsedData, loader) {
    // prettier-ignore
    const batch = isTable(parsedData)
        ? makeBatchFromTable(parsedData)
        : {
            shape: 'unknown',
            batchType: 'data',
            data: parsedData,
            length: Array.isArray(parsedData) ? parsedData.length : 1
        };
    batch.mimeType = loader.mimeTypes[0];
    return batch;
}
/**
 * Create an iterator chain with any transform iterators (crypto, decompression)
 * @param inputIterator
 * @param options
 */
async function applyInputTransforms(inputIterator, transforms = []) {
    let iteratorChain = inputIterator;
    for await (const transformBatches of transforms) {
        iteratorChain = transformBatches(iteratorChain);
    }
    return iteratorChain;
}

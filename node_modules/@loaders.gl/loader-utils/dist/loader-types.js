// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/**
 * Parses `data` using a specified loader
 * @param data
 * @param loaders
 * @param options
 * @param context
 */
// implementation signature
export async function parseFromContext(data, loaders, options, context) {
    return context._parse(data, loaders, options, context);
}
/**
 * Parses `data` synchronously using the specified loader, parse function provided via the loader context
 */
export function parseSyncFromContext(data, loader, options, context) {
    if (!context._parseSync) {
        throw new Error('parseSync');
    }
    return context._parseSync(data, loader, options, context);
}
/**
 * Parses `data` synchronously using a specified loader, parse function provided via the loader context
 */
export async function parseInBatchesFromContext(data, loader, options, context) {
    if (!context._parseInBatches) {
        throw new Error('parseInBatches');
    }
    return context._parseInBatches(data, loader, options, context);
}

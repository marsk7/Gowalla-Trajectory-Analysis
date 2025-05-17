// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/**
 *
 * @param baseOptions Can be undefined, in which case a fresh options object will be minted
 * @param newOptions
 * @returns
 */
export function mergeLoaderOptions(baseOptions, newOptions) {
    return mergeOptionsRecursively(baseOptions || {}, newOptions);
}
function mergeOptionsRecursively(baseOptions, newOptions, level = 0) {
    // Sanity check (jest test runner overwrites the console object which can lead to infinite recursion)
    if (level > 3) {
        return newOptions;
    }
    const options = { ...baseOptions };
    for (const [key, newValue] of Object.entries(newOptions)) {
        if (newValue && typeof newValue === 'object' && !Array.isArray(newValue)) {
            options[key] = mergeOptionsRecursively(options[key] || {}, newOptions[key], level + 1);
            // Object.assign(options[key] as object, newOptions[key]);
        }
        else {
            options[key] = newOptions[key];
        }
    }
    return options;
}

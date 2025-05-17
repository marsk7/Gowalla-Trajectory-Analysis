// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { normalizeLoader } from "../loader-utils/normalize-loader.js";
import { getGlobalLoaderState } from "../loader-utils/option-utils.js";
/**
 * Store global registered loaders on the global object to increase chances of cross loaders-version interoperability
 * This use case is not reliable but can help when testing new versions of loaders.gl with existing frameworks
 */
const getGlobalLoaderRegistry = () => {
    const state = getGlobalLoaderState();
    state.loaderRegistry = state.loaderRegistry || [];
    return state.loaderRegistry;
};
/**
 * Register a list of global loaders
 * @note Registration erases loader type information.
 * @deprecated It is recommended that applications manage loader registration. This function will likely be remove in loaders.gl v5
 */
export function registerLoaders(loaders) {
    const loaderRegistry = getGlobalLoaderRegistry();
    loaders = Array.isArray(loaders) ? loaders : [loaders];
    for (const loader of loaders) {
        const normalizedLoader = normalizeLoader(loader);
        if (!loaderRegistry.find((registeredLoader) => normalizedLoader === registeredLoader)) {
            // add to the beginning of the loaderRegistry, so the last registeredLoader get picked
            loaderRegistry.unshift(normalizedLoader);
        }
    }
}
/**
 * @deprecated It is recommended that applications manage loader registration. This function will likely be remove in loaders.gl v5
 */
export function getRegisteredLoaders() {
    return getGlobalLoaderRegistry();
}
/** @deprecated For testing only  */
export function _unregisterLoaders() {
    const state = getGlobalLoaderState();
    state.loaderRegistry = [];
}

// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/**
 * Gets the current fetch function from options
 * @todo - move to loader-utils module
 * @todo - use in core module counterpart
 * @param options
 * @param context
 */
export function getFetchFunction(options) {
    const fetchFunction = options?.fetch;
    // options.fetch can be a function
    if (fetchFunction && typeof fetchFunction === 'function') {
        return (url, fetchOptions) => fetchFunction(url, fetchOptions);
    }
    // options.fetch can be an options object, use global fetch with those options
    const fetchOptions = options?.fetch;
    if (fetchOptions && typeof fetchOptions !== 'function') {
        return (url) => fetch(url, fetchOptions);
    }
    // else return the global fetch function
    return (url) => fetch(url);
}
export function mergeImageSourceLoaderProps(props) {
    // @ts-expect-error
    return {
        // Default fetch
        ...props,
        loadOptions: {
            ...props.loadOptions,
            fetch: getFetchFunction(props.loadOptions)
        }
    };
}

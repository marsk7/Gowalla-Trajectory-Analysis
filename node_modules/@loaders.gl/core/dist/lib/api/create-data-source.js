// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/**
 * Creates a source from a service
 * If type is not supplied, will try to automatically detect the the
 * @param url URL to the data source
 * @param type type of source. if not known, set to 'auto'
 * @returns an DataSource instance
 */
export function createDataSource(data, sources, props) {
    const { type = 'auto' } = props;
    const source = type === 'auto' ? selectSource(data, sources) : getSourceOfType(type, sources);
    if (!source) {
        throw new Error('Not a valid image source type');
    }
    return source.createDataSource(data, props);
}
// TODO - use selectSource...
/** Guess service type from URL */
function selectSource(url, sources) {
    for (const service of sources) {
        // @ts-expect-error
        if (service.testURL && service.testURL(url)) {
            return service;
        }
    }
    return null;
}
/** Guess service type from URL */
function getSourceOfType(type, sources) {
    for (const service of sources) {
        if (service.type === type) {
            return service;
        }
    }
    return null;
}

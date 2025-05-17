// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/** Guess service type from URL */
export function selectSource(url, sources, options) {
    const type = options?.type || 'auto';
    let selectedSource = null;
    if (type === 'auto') {
        for (const source of sources) {
            if (typeof url === 'string' && source.testURL && source.testURL(url)) {
                return source;
            }
        }
    }
    else {
        selectedSource = getSourceOfType(type, sources);
    }
    if (!selectedSource && !options?.nothrow) {
        throw new Error('Not a valid image source type');
    }
    return selectedSource;
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

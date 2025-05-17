// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const QUERY_STRING_PATTERN = /\?.*/;
export function extractQueryString(url) {
    const matches = url.match(QUERY_STRING_PATTERN);
    return matches && matches[0];
}
export function stripQueryString(url) {
    return url.replace(QUERY_STRING_PATTERN, '');
}
export function shortenUrlForDisplay(url) {
    if (url.length < 50) {
        return url;
    }
    const urlEnd = url.slice(url.length - 15);
    const urlStart = url.substr(0, 32);
    return `${urlStart}...${urlEnd}`;
}

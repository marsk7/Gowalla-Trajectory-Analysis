// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { resolvePath } from '@loaders.gl/loader-utils';
// Generate a url by calling getUrl with mix of options, applying options.baseUrl
export function generateUrl(getUrl, options, urlOptions) {
    // Get url
    let url = typeof getUrl === 'function' ? getUrl({ ...options, ...urlOptions }) : getUrl;
    // Apply options.baseUrl
    const baseUrl = options.baseUrl;
    if (baseUrl) {
        url = baseUrl[baseUrl.length - 1] === '/' ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
    return resolvePath(url);
}

// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { isBlob } from "../../javascript-utils/is-type.js";
import { isLoaderObject } from "../loader-utils/normalize-loader.js";
import { getFetchFunction } from "../loader-utils/get-fetch-function.js";
import { parse } from "./parse.js";
// export async function load(url: string | DataType, loaders: LoaderOptions): Promise<any>;
// implementation signature
export async function load(url, loaders, options, context) {
    let resolvedLoaders;
    let resolvedOptions;
    // Signature: load(url, options)
    if (!Array.isArray(loaders) && !isLoaderObject(loaders)) {
        resolvedLoaders = [];
        resolvedOptions = loaders;
        context = undefined; // context not supported in short signature
    }
    else {
        resolvedLoaders = loaders;
        resolvedOptions = options;
    }
    // Select fetch function
    const fetch = getFetchFunction(resolvedOptions);
    // at this point, `url` could be already loaded binary data
    let data = url;
    // url is a string, fetch the url
    if (typeof url === 'string') {
        data = await fetch(url);
        // URL is Blob or File, fetchFile handles it (alt: we could generate ObjectURL here)
    }
    if (isBlob(url)) {
        // The fetch response object will contain blob.name
        // @ts-expect-error TODO - This may not work for overridden fetch functions
        data = await fetch(url);
    }
    // Data is loaded (at least we have a `Response` object) so time to hand over to `parse`
    // return await parse(data, loaders as Loader[], options);
    return Array.isArray(resolvedLoaders)
        ? await parse(data, resolvedLoaders, resolvedOptions) // loader array overload
        : await parse(data, resolvedLoaders, resolvedOptions); // single loader overload
}

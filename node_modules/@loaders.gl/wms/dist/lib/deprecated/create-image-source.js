// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { WMSSource } from "../../services/ogc/wms-service.js";
import { ArcGISImageServerSource } from "../../services/arcgis/arcgis-image-server.js";
const SOURCES = [WMSSource, ArcGISImageServerSource];
/**
 * Creates an image source
 * If type is not supplied, will try to automatically detect the the
 * @param url URL to the image source
 * @param type type of source. if not known, set to 'auto'
 * @returns an ImageSource instance
 *
 * @deprecated Use createDataSource from @loaders.gl/core
 */
export function createImageSource(props, sources = SOURCES) {
    const { type = 'auto' } = props;
    const source = type === 'auto' ? guessSourceType(props.url, sources) : getSourceOfType(type, sources);
    if (!source) {
        throw new Error('Not a valid image source type');
    }
    return source.createDataSource(props.url, props);
}
/** Guess service type from URL */
function getSourceOfType(type, sources) {
    // if (type === 'template') {
    //   return ImageSource;
    // }
    for (const source of sources) {
        if (source.type === type) {
            return source;
        }
    }
    return null;
}
/** Guess source type from URL */
function guessSourceType(url, sources) {
    for (const source of sources) {
        if (source.testURL && source.testURL(url)) {
            return source;
        }
    }
    return null;
}

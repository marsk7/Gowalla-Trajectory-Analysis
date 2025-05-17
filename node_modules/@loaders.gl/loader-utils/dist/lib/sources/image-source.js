// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { DataSource } from "./data-source.js";
/**
 * ImageSource - data sources that allow images to be queried by (geospatial) extents
 */
export class ImageSource extends DataSource {
    static type = 'template';
    static testURL = (url) => false;
}

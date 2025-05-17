// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { DataSource } from "./data-source.js";
/**
 * VectorSource - data sources that allow features to be queried by (geospatial) extents
 * @note
 * - If geospatial, bounding box is expected to be in web mercator coordinates
 */
export class VectorSource extends DataSource {
    static type = 'template';
    static testURL = (url) => false;
}

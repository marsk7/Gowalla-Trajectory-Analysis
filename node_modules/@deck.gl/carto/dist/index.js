// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// CARTO Layers
import { default as ClusterTileLayer } from "./layers/cluster-tile-layer.js";
import { default as H3TileLayer } from "./layers/h3-tile-layer.js";
import { default as HeatmapTileLayer } from "./layers/heatmap-tile-layer.js";
import { default as PointLabelLayer } from "./layers/point-label-layer.js";
import { default as QuadbinTileLayer } from "./layers/quadbin-tile-layer.js";
import { default as RasterTileLayer } from "./layers/raster-tile-layer.js";
import { default as VectorTileLayer } from "./layers/vector-tile-layer.js";
// Exports for playground/bindings
const CARTO_LAYERS = {
    ClusterTileLayer,
    H3TileLayer,
    HeatmapTileLayer,
    PointLabelLayer,
    QuadbinTileLayer,
    RasterTileLayer,
    VectorTileLayer
};
export { CARTO_LAYERS, ClusterTileLayer, H3TileLayer, HeatmapTileLayer, PointLabelLayer, QuadbinTileLayer, RasterTileLayer, VectorTileLayer };
// Internal Layers
export { default as _QuadbinLayer } from "./layers/quadbin-layer.js";
export { default as _RasterLayer } from "./layers/raster-layer.js";
export { default as _SpatialIndexTileLayer } from "./layers/spatial-index-tile-layer.js";
// Helpers
export { default as BASEMAP, GOOGLE_BASEMAPS as _GOOGLE_BASEMAPS, getStyleUrl as _getStyleUrl, fetchStyle as _fetchStyle, applyLayerGroupFilters as _applyLayerGroupFilters, STYLE_LAYER_GROUPS as _STYLE_LAYER_GROUPS } from "./basemap.js";
export { default as colorBins } from "./style/color-bins-style.js";
export { default as colorCategories } from "./style/color-categories-style.js";
export { default as colorContinuous } from "./style/color-continuous-style.js";
export { fetchMap } from "./api/index.js";
export { fetchBasemapProps } from "./api/basemap.js";
// TODO(v10): Consider removing re-exports from '@carto/api-client' below.
import { boundaryQuerySource, boundaryTableSource, h3QuerySource, h3TableSource, h3TilesetSource, rasterSource, quadbinQuerySource, quadbinTableSource, quadbinTilesetSource, vectorQuerySource, vectorTableSource, vectorTilesetSource } from '@carto/api-client';
export const CARTO_SOURCES = {
    boundaryQuerySource,
    boundaryTableSource,
    h3QuerySource,
    h3TableSource,
    h3TilesetSource,
    rasterSource,
    quadbinQuerySource,
    quadbinTableSource,
    quadbinTilesetSource,
    vectorQuerySource,
    vectorTableSource,
    vectorTilesetSource
};
export { boundaryQuerySource, boundaryTableSource, h3QuerySource, h3TableSource, h3TilesetSource, rasterSource, quadbinQuerySource, quadbinTableSource, quadbinTilesetSource, vectorQuerySource, vectorTableSource, vectorTilesetSource, query, CartoAPIError, SOURCE_DEFAULTS } from '@carto/api-client';
//# sourceMappingURL=index.js.map
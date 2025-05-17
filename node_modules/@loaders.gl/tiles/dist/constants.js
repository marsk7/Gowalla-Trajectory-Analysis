// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
export const TILE_CONTENT_STATE = {
    UNLOADED: 0, // Has never been requested
    LOADING: 1, // Is waiting on a pending request
    PROCESSING: 2, // Request received.  Contents are being processed for rendering.  Depending on the content, it might make its own requests for external data.
    READY: 3, // Ready to render.
    EXPIRED: 4, // Is expired and will be unloaded once new content is loaded.
    FAILED: 5 // Request failed.
};
export var TILE_REFINEMENT;
(function (TILE_REFINEMENT) {
    TILE_REFINEMENT[TILE_REFINEMENT["ADD"] = 1] = "ADD";
    TILE_REFINEMENT[TILE_REFINEMENT["REPLACE"] = 2] = "REPLACE"; // Render tile or, if screen space error exceeded, refine to its descendants instead.
})(TILE_REFINEMENT || (TILE_REFINEMENT = {}));
export var TILE_TYPE;
(function (TILE_TYPE) {
    TILE_TYPE["EMPTY"] = "empty";
    TILE_TYPE["SCENEGRAPH"] = "scenegraph";
    TILE_TYPE["POINTCLOUD"] = "pointcloud";
    TILE_TYPE["MESH"] = "mesh";
})(TILE_TYPE || (TILE_TYPE = {}));
export var TILESET_TYPE;
(function (TILESET_TYPE) {
    TILESET_TYPE["I3S"] = "I3S";
    TILESET_TYPE["TILES3D"] = "TILES3D";
})(TILESET_TYPE || (TILESET_TYPE = {}));
export var LOD_METRIC_TYPE;
(function (LOD_METRIC_TYPE) {
    LOD_METRIC_TYPE["GEOMETRIC_ERROR"] = "geometricError";
    LOD_METRIC_TYPE["MAX_SCREEN_THRESHOLD"] = "maxScreenThreshold";
})(LOD_METRIC_TYPE || (LOD_METRIC_TYPE = {}));
export const TILE3D_OPTIMIZATION_HINT = {
    NOT_COMPUTED: -1,
    USE_OPTIMIZATION: 1,
    SKIP_OPTIMIZATION: 0
};

// math.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
export { Polygon } from "./polygon.js";
export { getPolygonSignedArea, getPolygonWindingDirection, forEachSegmentInPolygon, modifyPolygonWindingDirection, WINDING } from "./polygon-utils.js";
export { earcut } from "./earcut.js";
export { clipPolygon, clipPolyline } from "./lineclip.js";
export { cutPolygonByGrid, cutPolylineByGrid } from "./cut-by-grid.js";
export { cutPolylineByMercatorBounds, cutPolygonByMercatorBounds } from "./cut-by-mercator-bounds.js";
/** @deprecated */
export { Polygon as _Polygon } from "./polygon.js";
//# sourceMappingURL=index.js.map
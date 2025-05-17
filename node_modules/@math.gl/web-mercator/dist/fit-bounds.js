import { assert } from "./assert.js";
import { log2, clamp } from "./math-utils.js";
import { MAX_LATITUDE, lngLatToWorld, worldToLngLat } from "./web-mercator-utils.js";
/**
 * Returns map settings {latitude, longitude, zoom}
 * that will contain the provided corners within the provided width.
 *
 * > _Note: Only supports non-perspective mode._
 *
 * @param options fit bounds parameters
 * @returns - latitude, longitude and zoom
 */
export function fitBounds(options) {
    const { width, height, bounds, minExtent = 0, // 0.01 would be about 1000 meters (degree is ~110KM)
    maxZoom = 24, // ~x4,000,000 => About 10 meter extents
    offset = [0, 0] } = options;
    const [[west, south], [east, north]] = bounds;
    const padding = getPaddingObject(options.padding);
    const nw = lngLatToWorld([west, clamp(north, -MAX_LATITUDE, MAX_LATITUDE)]);
    const se = lngLatToWorld([east, clamp(south, -MAX_LATITUDE, MAX_LATITUDE)]);
    // width/height on the Web Mercator plane
    const size = [
        Math.max(Math.abs(se[0] - nw[0]), minExtent),
        Math.max(Math.abs(se[1] - nw[1]), minExtent)
    ];
    const targetSize = [
        width - padding.left - padding.right - Math.abs(offset[0]) * 2,
        height - padding.top - padding.bottom - Math.abs(offset[1]) * 2
    ];
    assert(targetSize[0] > 0 && targetSize[1] > 0);
    // scale = screen pixels per unit on the Web Mercator plane
    const scaleX = targetSize[0] / size[0];
    const scaleY = targetSize[1] / size[1];
    // Find how much we need to shift the center
    const offsetX = (padding.right - padding.left) / 2 / scaleX;
    const offsetY = (padding.top - padding.bottom) / 2 / scaleY;
    const center = [(se[0] + nw[0]) / 2 + offsetX, (se[1] + nw[1]) / 2 + offsetY];
    const centerLngLat = worldToLngLat(center);
    const zoom = Math.min(maxZoom, log2(Math.abs(Math.min(scaleX, scaleY))));
    assert(Number.isFinite(zoom));
    return {
        longitude: centerLngLat[0],
        latitude: centerLngLat[1],
        zoom
    };
}
// Helpers
function getPaddingObject(padding = 0) {
    if (typeof padding === 'number') {
        return {
            top: padding,
            bottom: padding,
            left: padding,
            right: padding
        };
    }
    // Make sure all the required properties are set
    assert(Number.isFinite(padding.top) &&
        Number.isFinite(padding.bottom) &&
        Number.isFinite(padding.left) &&
        Number.isFinite(padding.right));
    return padding;
}
//# sourceMappingURL=fit-bounds.js.map
// Default tile display size in deck.gl, in viewport pixels. May differ
// from size or resolution assumed when generating the tile data,
const DEFAULT_TILE_SIZE = 512;

// Relative scale factor (0 = no biasing, 2 = a few hexagons cover view)
const BIAS = 2;

/**
 * Resolution conversion function. Takes a WebMercatorViewport and returns
 * a H3 resolution such that the screen space size of the hexagons is
 * "similar" to the given tileSize on screen. Intended for use with deck.gl.
 * @internal
 * @privateRemarks Source: https://github.com/visgl/deck.gl/blob/master/modules/carto/src/layers/h3-tileset-2d.ts
 */
export function _getHexagonResolution(
  viewport: {zoom: number; latitude: number},
  tileSize: number
): number {
  // Difference in given tile size compared to deck's internal 512px tile size,
  // expressed as an offset to the viewport zoom.
  const zoomOffset = Math.log2(tileSize / DEFAULT_TILE_SIZE);
  const hexagonScaleFactor = (2 / 3) * (viewport.zoom - zoomOffset);
  const latitudeScaleFactor = Math.log(
    1 / Math.cos((Math.PI * viewport.latitude) / 180)
  );

  // Clip and bias
  return Math.max(
    0,
    Math.floor(hexagonScaleFactor + latitudeScaleFactor - BIAS)
  );
}

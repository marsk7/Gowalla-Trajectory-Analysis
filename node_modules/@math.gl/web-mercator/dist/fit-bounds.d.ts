/**
 * Options for fitBounds
 */
export type FitBoundsOptions = {
    /**  viewport width  */
    width: number;
    /**  viewport height  */
    height: number;
    /**  [[lon, lat], [lon, lat]]  */
    bounds: [[number, number], [number, number]];
    /**  The width/height of the bounded area will never be smaller than this. 0.01 would be about 1000 meters (degree is ~110KM)  */
    minExtent?: number;
    /**  The maximum zoom level to fit the bounds within. */
    maxZoom?: number;
    /**
     * padding - The amount of padding in pixels to add to the given bounds.
     * Can also be an object with top, bottom, left and right properties defining the padding.
     */
    padding?: number | Padding;
    /** The center of the given bounds relative to the map's center,  */
    offset?: number[];
};
/**
 * An object describing the padding to add to the bounds.
 */
export type Padding = {
    /** Padding from top in pixels to add to the given bounds */
    top: number;
    /** Padding from bottom in pixels to add to the given bounds */
    bottom: number;
    /** Padding from left in pixels to add to the given bounds */
    left: number;
    /** Padding from right in pixels to add to the given bounds */
    right: number;
};
type ViewportProps = {
    longitude: number;
    latitude: number;
    zoom: number;
};
/**
 * Returns map settings {latitude, longitude, zoom}
 * that will contain the provided corners within the provided width.
 *
 * > _Note: Only supports non-perspective mode._
 *
 * @param options fit bounds parameters
 * @returns - latitude, longitude and zoom
 */
export declare function fitBounds(options: FitBoundsOptions): ViewportProps;
export {};
//# sourceMappingURL=fit-bounds.d.ts.map
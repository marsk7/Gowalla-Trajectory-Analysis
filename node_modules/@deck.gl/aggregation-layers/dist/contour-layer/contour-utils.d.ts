import type { Color } from '@deck.gl/core';
export type Contour = {
    /**
     * Isolines: `threshold` value must be a single `Number`, Isolines are generated based on this threshold value.
     *
     * Isobands: `threshold` value must be an Array of two `Number`s. Isobands are generated using `[threshold[0], threshold[1])` as threshold range, i.e area that has values `>= threshold[0]` and `< threshold[1]` are rendered with corresponding color. NOTE: `threshold[0]` is inclusive and `threshold[1]` is not inclusive.
     */
    threshold: number | number[];
    /**
     * RGBA color array to be used to render the contour.
     * @default [255, 255, 255, 255]
     */
    color?: Color;
    /**
     * Applicable for `Isoline`s only, width of the Isoline in pixels.
     * @default 1
     */
    strokeWidth?: number;
    /** Defines z order of the contour. */
    zIndex?: number;
};
export type ContourLine = {
    vertices: number[][];
    contour: Contour;
};
export type ContourPolygon = {
    vertices: number[][];
    contour: Contour;
};
export declare function generateContours({ contours, getValue, xRange, yRange }: {
    contours: Contour[];
    getValue: (x: number, y: number) => number;
    xRange: [number, number];
    yRange: [number, number];
}): {
    lines: ContourLine[];
    polygons: ContourPolygon[];
};
//# sourceMappingURL=contour-utils.d.ts.map
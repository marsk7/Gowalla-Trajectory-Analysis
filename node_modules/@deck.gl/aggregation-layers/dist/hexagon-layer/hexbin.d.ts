type HexBin = [i: number, j: number];
type Point = [x: number, y: number];
export declare const HexbinVertices: number[][];
/**
 * Adapted from d3-hexbin
 * Copyright Mike Bostock, 2012-2016
   All rights reserved.
 * https://github.com/d3/d3-hexbin/blob/master/src/hexbin.js
 *
 * Returns the hexbin that a point (x,y) falls into
 */
export declare function pointToHexbin([px, py]: Point, radius: number): HexBin;
export declare const pointToHexbinGLSL: string;
export declare function getHexbinCentroid([i, j]: HexBin, radius: number): Point;
export declare const getHexbinCentroidGLSL: string;
export {};
//# sourceMappingURL=hexbin.d.ts.map
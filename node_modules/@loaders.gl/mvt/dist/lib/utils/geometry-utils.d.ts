import { FlatIndexedGeometry, FlatPolygon } from '@loaders.gl/schema';
/**
 *
 * @param ring
 * @returns sum
 */
export declare function signedArea(ring: number[][]): number;
/**
 * This function projects local coordinates in a
 * [0 - bufferSize, this.extent + bufferSize] range to a
 * [0 - (bufferSize / this.extent), 1 + (bufferSize / this.extent)] range.
 * The resulting extent would be 1.
 * @param line
 * @param feature
 */
export declare function convertToLocalCoordinates(coordinates: number[] | number[][] | number[][][] | number[][][][], extent: number): void;
/**
 * For the binary code path, the feature data is just
 * one big flat array, so we just divide each value
 * @param data
 * @param feature
 */
export declare function convertToLocalCoordinatesFlat(data: number[], extent: number): void;
/**
 * Projects local tile coordinates to lngLat in place.
 * @param points
 * @param tileIndex
 */
export declare function projectToLngLat(line: number[] | number[][] | number[][][], tileIndex: {
    x: number;
    y: number;
    z: number;
}, extent: number): void;
/**
 * Projects local tile coordinates to lngLat in place.
 * @param points
 * @param tileIndex
export function projectTileCoordinatesToLngLat(
  points: number[][],
  tileIndex: {x: number; y: number; z: number},
  extent: number
): void {
  const {x, y, z} = tileIndex;
  const size = extent * Math.pow(2, z);
  const x0 = extent * x;
  const y0 = extent * y;

  for (const p of points) {
    p[0] = ((p[0] + x0) * 360) / size - 180;
    const y2 = 180 - ((p[1] + y0) * 360) / size;
    p[1] = (360 / Math.PI) * Math.atan(Math.exp((y2 * Math.PI) / 180)) - 90;
  }
}
 */
/**
 *
 * @param data
 * @param x0
 * @param y0
 * @param size
 */
export declare function projectToLngLatFlat(data: number[], tileIndex: {
    x: number;
    y: number;
    z: number;
}, extent: number): void;
/**
 * Classifies an array of rings into polygons with outer rings and holes
 * @param rings
 * @returns polygons
 */
export declare function classifyRings(rings: number[][][]): number[][][][];
/**
 * Classifies an array of rings into polygons with outer rings and holes
 * The function also detects holes which have zero area and
 * removes them. In doing so it modifies the input
 * `geom.data` array to remove the unneeded data
 *
 * @param geometry
 * @returns object
 */
export declare function classifyRingsFlat(geom: FlatIndexedGeometry): FlatPolygon;
//# sourceMappingURL=geometry-utils.d.ts.map
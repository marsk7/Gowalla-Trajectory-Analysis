// math.gl
// SPDX-License-Identifier: MIT and ISC
// Copyright (c) vis.gl contributors
/* eslint-disable max-statements, max-depth, complexity, no-unused-expressions */
import { equals } from '@math.gl/core';
export const WINDING = {
    CLOCKWISE: 1,
    COUNTER_CLOCKWISE: -1
};
/**
 * Checks winding direction of the polygon and reverses the polygon in case of opposite winding direction.
 * Note: points are modified in-place.
 * @param points An array that represents points of the polygon.
 * @param direction Requested winding direction. 1 is for clockwise, -1 for counterclockwise winding direction.
 * @param options Parameters of the polygon.
 * @return Returns true if the winding direction was changed.
 */
export function modifyPolygonWindingDirection(points, direction, options = {}) {
    const windingDirection = getPolygonWindingDirection(points, options);
    if (windingDirection !== direction) {
        reversePolygon(points, options);
        return true;
    }
    return false;
}
/**
 * Returns winding direction of the polygon.
 * @param points An array that represents points of the polygon.
 * @param options Parameters of the polygon.
 * @returns Winding direction of the polygon.
 */
export function getPolygonWindingDirection(points, options = {}) {
    return Math.sign(getPolygonSignedArea(points, options));
}
export const DimIndex = {
    x: 0,
    y: 1,
    z: 2
};
/**
 * Returns signed area of the polygon.
 * @param points An array that represents points of the polygon.
 * @param options Parameters of the polygon.
 * @returns Signed area of the polygon.
 * https://en.wikipedia.org/wiki/Shoelace_formula
 */
export function getPolygonSignedArea(points, options = {}) {
    const { start = 0, end = points.length, plane = 'xy' } = options;
    const dim = options.size || 2;
    let area = 0;
    const i0 = DimIndex[plane[0]];
    const i1 = DimIndex[plane[1]];
    for (let i = start, j = end - dim; i < end; i += dim) {
        area += (points[i + i0] - points[j + i0]) * (points[i + i1] + points[j + i1]);
        j = i;
    }
    return area / 2;
}
/**
 * Calls the visitor callback for each segment in the polygon.
 * @param points An array that represents points of the polygon
 * @param visitor A callback to call for each segment.
 * @param options Parameters of the polygon.
 */
export function forEachSegmentInPolygon(points, visitor, options = {}) {
    const { start = 0, end = points.length, size = 2, isClosed } = options;
    const numPoints = (end - start) / size;
    for (let i = 0; i < numPoints - 1; ++i) {
        visitor(points[start + i * size], points[start + i * size + 1], points[start + (i + 1) * size], points[start + (i + 1) * size + 1], i, i + 1);
    }
    const endPointIndex = start + (numPoints - 1) * size;
    const isClosedEx = isClosed ||
        (equals(points[start], points[endPointIndex]) &&
            equals(points[start + 1], points[endPointIndex + 1]));
    if (!isClosedEx) {
        visitor(points[endPointIndex], points[endPointIndex + 1], points[start], points[start + 1], numPoints - 1, 0);
    }
}
function reversePolygon(points, options) {
    const { start = 0, end = points.length, size = 2 } = options;
    const numPoints = (end - start) / size;
    const numSwaps = Math.floor(numPoints / 2);
    for (let i = 0; i < numSwaps; ++i) {
        const b1 = start + i * size;
        const b2 = start + (numPoints - 1 - i) * size;
        for (let j = 0; j < size; ++j) {
            const tmp = points[b1 + j];
            points[b1 + j] = points[b2 + j];
            points[b2 + j] = tmp;
        }
    }
}
/**
 * Checks winding direction of the polygon and reverses the polygon in case of opposite winding direction.
 * Note: points are modified in-place.
 * @param points Array of points that represent the polygon.
 * @param direction Requested winding direction. 1 is for clockwise, -1 for counterclockwise winding direction.
 * @param options Parameters of the polygon.
 * @return Returns true if the winding direction was changed.
 */
export function modifyPolygonWindingDirectionPoints(points, direction, options = {}) {
    const currentDirection = getPolygonWindingDirectionPoints(points, options);
    if (currentDirection !== direction) {
        points.reverse();
        return true;
    }
    return false;
}
/**
 * Returns winding direction of the polygon.
 * @param points Array of points that represent the polygon.
 * @param options Parameters of the polygon.
 * @returns Winding direction of the polygon.
 */
export function getPolygonWindingDirectionPoints(points, options = {}) {
    return Math.sign(getPolygonSignedAreaPoints(points, options));
}
/**
 * Returns signed area of the polygon.
 * @param points Array of points that represent the polygon.
 * @param options Parameters of the polygon.
 * @returns Signed area of the polygon.
 */
export function getPolygonSignedAreaPoints(points, options = {}) {
    // https://en.wikipedia.org/wiki/Shoelace_formula
    const { start = 0, end = points.length, plane = 'xy' } = options;
    let area = 0;
    const i0 = DimIndex[plane[0]];
    const i1 = DimIndex[plane[1]];
    for (let i = start, j = end - 1; i < end; ++i) {
        area += (points[i][i0] - points[j][i0]) * (points[i][i1] + points[j][i1]);
        j = i;
    }
    return area / 2;
}
/**
 * Calls visitor callback for each segment in the polygon.
 * @param points Array of points that represent the polygon.
 * @param visitor A callback to call for each segment.
 * @param options Parameters of the polygon.
 */
export function forEachSegmentInPolygonPoints(points, visitor, options = {}) {
    const { start = 0, end = points.length, isClosed } = options;
    for (let i = start; i < end - 1; ++i) {
        visitor(points[i], points[i + 1], i, i + 1);
    }
    const isClosedEx = isClosed || equals(points[end - 1], points[0]);
    if (!isClosedEx) {
        visitor(points[end - 1], points[0], end - 1, 0);
    }
}
//# sourceMappingURL=polygon-utils.js.map
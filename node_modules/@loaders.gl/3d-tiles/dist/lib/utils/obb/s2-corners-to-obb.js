// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors
import { Vector3 } from '@math.gl/core';
import { makeOrientedBoundingBoxFromPoints } from '@math.gl/culling';
import { getS2OrientedBoundingBoxCornerPoints, getS2LngLat } from "../../utils/s2/index.js";
import { Ellipsoid } from '@math.gl/geospatial';
/**
 * Converts S2VolumeInfo to OrientedBoundingBox
 * @param {S2VolumeInfo} s2VolumeInfo - s2 volume to convert
 * @returns Oriented Bounding Box of type Box
 */
export function convertS2BoundingVolumetoOBB(s2VolumeInfo) {
    const token = s2VolumeInfo.token;
    const heightInfo = {
        minimumHeight: s2VolumeInfo.minimumHeight,
        maximumHeight: s2VolumeInfo.maximumHeight
    };
    const corners = getS2OrientedBoundingBoxCornerPoints(token, heightInfo);
    // Add a point that doesn't allow the box dive under the Earth
    const center = getS2LngLat(token);
    const centerLng = center[0];
    const centerLat = center[1];
    const point = Ellipsoid.WGS84.cartographicToCartesian([
        centerLng,
        centerLat,
        heightInfo.maximumHeight
    ]);
    const centerPointAdditional = new Vector3(point[0], point[1], point[2]);
    corners.push(centerPointAdditional);
    // corners should be an array of Vector3 (XYZ)
    const obb = makeOrientedBoundingBoxFromPoints(corners);
    const box = [...obb.center, ...obb.halfAxes];
    return box;
}

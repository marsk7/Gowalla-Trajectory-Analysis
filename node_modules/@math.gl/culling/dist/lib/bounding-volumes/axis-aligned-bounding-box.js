// math.gl
// SPDX-License-Identifier: MIT and Apache-2.0
// Copyright (c) vis.gl contributors
import { Vector3 } from '@math.gl/core';
import { INTERSECTION } from "../../constants.js";
const scratchVector = new Vector3();
const scratchNormal = new Vector3();
/**
 * An axis aligned bounding box - aligned with coordinate axes
 * @see BoundingVolume
 * @see BoundingRectangle
 * @see OrientedBoundingBox
 */
export class AxisAlignedBoundingBox {
    /**
     * Creates an instance of an AxisAlignedBoundingBox from the minimum and maximum points along the x, y, and z axes.
     * @param minimum=[0, 0, 0] The minimum point along the x, y, and z axes.
     * @param maximum=[0, 0, 0] The maximum point along the x, y, and z axes.
     * @param center The center of the box; automatically computed if not supplied.
     */
    constructor(minimum = [0, 0, 0], maximum = [0, 0, 0], center) {
        // If center was not defined, compute it.
        center = center || scratchVector.copy(minimum).add(maximum).scale(0.5);
        this.center = new Vector3(center);
        this.halfDiagonal = new Vector3(maximum).subtract(this.center);
        /**
         * The minimum point defining the bounding box.
         * @type {Vector3}
         * @default {@link 0, 0, 0}
         */
        this.minimum = new Vector3(minimum);
        /**
         * The maximum point defining the bounding box.
         * @type {Vector3}
         * @default {@link 0, 0, 0}
         */
        this.maximum = new Vector3(maximum);
    }
    /**
     * Duplicates a AxisAlignedBoundingBox instance.
     *
     * @returns {AxisAlignedBoundingBox} A new AxisAlignedBoundingBox instance.
     */
    clone() {
        return new AxisAlignedBoundingBox(this.minimum, this.maximum, this.center);
    }
    /**
     * Compares the provided AxisAlignedBoundingBox componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     *
     * @param {AxisAlignedBoundingBox} [right] The second AxisAlignedBoundingBox to compare with.
     * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    equals(right) {
        return (this === right ||
            (Boolean(right) && this.minimum.equals(right.minimum) && this.maximum.equals(right.maximum)));
    }
    /**
     * Applies a 4x4 affine transformation matrix to a bounding sphere.
     * @param transform The transformation matrix to apply to the bounding sphere.
     * @returns itself, i.e. the modified BoundingVolume.
     */
    transform(transform) {
        this.center.transformAsPoint(transform);
        // TODO - this.halfDiagonal.transformAsVector(transform);
        this.halfDiagonal.transform(transform);
        this.minimum.transform(transform);
        this.maximum.transform(transform);
        return this;
    }
    /**
     * Determines which side of a plane a box is located.
     */
    intersectPlane(plane) {
        const { halfDiagonal } = this;
        const normal = scratchNormal.from(plane.normal);
        const e = halfDiagonal.x * Math.abs(normal.x) +
            halfDiagonal.y * Math.abs(normal.y) +
            halfDiagonal.z * Math.abs(normal.z);
        const s = this.center.dot(normal) + plane.distance; // signed distance from center
        if (s - e > 0) {
            return INTERSECTION.INSIDE;
        }
        if (s + e < 0) {
            // Not in front because normals point inward
            return INTERSECTION.OUTSIDE;
        }
        return INTERSECTION.INTERSECTING;
    }
    /** Computes the estimated distance from the closest point on a bounding box to a point. */
    distanceTo(point) {
        return Math.sqrt(this.distanceSquaredTo(point));
    }
    /** Computes the estimated distance squared from the closest point on a bounding box to a point. */
    distanceSquaredTo(point) {
        const offset = scratchVector.from(point).subtract(this.center);
        const { halfDiagonal } = this;
        let distanceSquared = 0.0;
        let d;
        d = Math.abs(offset.x) - halfDiagonal.x;
        if (d > 0) {
            distanceSquared += d * d;
        }
        d = Math.abs(offset.y) - halfDiagonal.y;
        if (d > 0) {
            distanceSquared += d * d;
        }
        d = Math.abs(offset.z) - halfDiagonal.z;
        if (d > 0) {
            distanceSquared += d * d;
        }
        return distanceSquared;
    }
}
//# sourceMappingURL=axis-aligned-bounding-box.js.map
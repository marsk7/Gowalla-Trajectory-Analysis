var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/index.js
var dist_exports = {};
__export(dist_exports, {
  AxisAlignedBoundingBox: () => AxisAlignedBoundingBox,
  BoundingSphere: () => BoundingSphere,
  CullingVolume: () => CullingVolume,
  INTERSECTION: () => INTERSECTION,
  OrientedBoundingBox: () => OrientedBoundingBox,
  Plane: () => Plane,
  _PerspectiveFrustum: () => PerspectiveFrustum,
  _PerspectiveOffCenterFrustum: () => PerspectiveOffCenterFrustum,
  computeEigenDecomposition: () => computeEigenDecomposition,
  makeAxisAlignedBoundingBoxFromPoints: () => makeAxisAlignedBoundingBoxFromPoints,
  makeBoundingSphereFromPoints: () => makeBoundingSphereFromPoints,
  makeOrientedBoundingBoxFromPoints: () => makeOrientedBoundingBoxFromPoints
});
module.exports = __toCommonJS(dist_exports);

// dist/constants.js
var INTERSECTION = {
  OUTSIDE: -1,
  // Represents that an object is not contained within the frustum.
  INTERSECTING: 0,
  // Represents that an object intersects one of the frustum's planes.
  INSIDE: 1
  // Represents that an object is fully within the frustum.
};

// dist/lib/bounding-volumes/axis-aligned-bounding-box.js
var import_core = require("@math.gl/core");
var scratchVector = new import_core.Vector3();
var scratchNormal = new import_core.Vector3();
var AxisAlignedBoundingBox = class {
  /**
   * Creates an instance of an AxisAlignedBoundingBox from the minimum and maximum points along the x, y, and z axes.
   * @param minimum=[0, 0, 0] The minimum point along the x, y, and z axes.
   * @param maximum=[0, 0, 0] The maximum point along the x, y, and z axes.
   * @param center The center of the box; automatically computed if not supplied.
   */
  constructor(minimum = [0, 0, 0], maximum = [0, 0, 0], center) {
    center = center || scratchVector.copy(minimum).add(maximum).scale(0.5);
    this.center = new import_core.Vector3(center);
    this.halfDiagonal = new import_core.Vector3(maximum).subtract(this.center);
    this.minimum = new import_core.Vector3(minimum);
    this.maximum = new import_core.Vector3(maximum);
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
    return this === right || Boolean(right) && this.minimum.equals(right.minimum) && this.maximum.equals(right.maximum);
  }
  /**
   * Applies a 4x4 affine transformation matrix to a bounding sphere.
   * @param transform The transformation matrix to apply to the bounding sphere.
   * @returns itself, i.e. the modified BoundingVolume.
   */
  transform(transform) {
    this.center.transformAsPoint(transform);
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
    const e = halfDiagonal.x * Math.abs(normal.x) + halfDiagonal.y * Math.abs(normal.y) + halfDiagonal.z * Math.abs(normal.z);
    const s = this.center.dot(normal) + plane.distance;
    if (s - e > 0) {
      return INTERSECTION.INSIDE;
    }
    if (s + e < 0) {
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
    let distanceSquared = 0;
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
};

// dist/lib/bounding-volumes/bounding-sphere.js
var import_core2 = require("@math.gl/core");
var scratchVector2 = new import_core2.Vector3();
var scratchVector22 = new import_core2.Vector3();
var BoundingSphere = class {
  /** Creates a bounding sphere */
  constructor(center = [0, 0, 0], radius = 0) {
    this.radius = -0;
    this.center = new import_core2.Vector3();
    this.fromCenterRadius(center, radius);
  }
  /** Sets the bounding sphere from `center` and `radius`. */
  fromCenterRadius(center, radius) {
    this.center.from(center);
    this.radius = radius;
    return this;
  }
  /**
   * Computes a bounding sphere from the corner points of an axis-aligned bounding box.  The sphere
   * tightly and fully encompasses the box.
   */
  fromCornerPoints(corner, oppositeCorner) {
    oppositeCorner = scratchVector2.from(oppositeCorner);
    this.center = new import_core2.Vector3().from(corner).add(oppositeCorner).scale(0.5);
    this.radius = this.center.distance(oppositeCorner);
    return this;
  }
  /** Compares the provided BoundingSphere component wise */
  equals(right) {
    return this === right || Boolean(right) && this.center.equals(right.center) && this.radius === right.radius;
  }
  /** Duplicates a BoundingSphere instance. */
  clone() {
    return new BoundingSphere(this.center, this.radius);
  }
  /** Computes a bounding sphere that contains both the left and right bounding spheres. */
  union(boundingSphere) {
    const leftCenter = this.center;
    const leftRadius = this.radius;
    const rightCenter = boundingSphere.center;
    const rightRadius = boundingSphere.radius;
    const toRightCenter = scratchVector2.copy(rightCenter).subtract(leftCenter);
    const centerSeparation = toRightCenter.magnitude();
    if (leftRadius >= centerSeparation + rightRadius) {
      return this.clone();
    }
    if (rightRadius >= centerSeparation + leftRadius) {
      return boundingSphere.clone();
    }
    const halfDistanceBetweenTangentPoints = (leftRadius + centerSeparation + rightRadius) * 0.5;
    scratchVector22.copy(toRightCenter).scale((-leftRadius + halfDistanceBetweenTangentPoints) / centerSeparation).add(leftCenter);
    this.center.copy(scratchVector22);
    this.radius = halfDistanceBetweenTangentPoints;
    return this;
  }
  /** Computes a bounding sphere by enlarging the provided sphere to contain the provided point. */
  expand(point) {
    const scratchPoint = scratchVector2.from(point);
    const radius = scratchPoint.subtract(this.center).magnitude();
    if (radius > this.radius) {
      this.radius = radius;
    }
    return this;
  }
  // BoundingVolume interface
  /**
   * Applies a 4x4 affine transformation matrix to a bounding sphere.
   * @param sphere The bounding sphere to apply the transformation to.
   * @param transform The transformation matrix to apply to the bounding sphere.
   * @returns self.
   */
  transform(transform) {
    this.center.transform(transform);
    const scale = import_core2.mat4.getScaling(scratchVector2, transform);
    this.radius = Math.max(scale[0], Math.max(scale[1], scale[2])) * this.radius;
    return this;
  }
  /** Computes the estimated distance squared from the closest point on a bounding sphere to a point. */
  distanceSquaredTo(point) {
    const d = this.distanceTo(point);
    return d * d;
  }
  /** Computes the estimated distance from the closest point on a bounding sphere to a point. */
  distanceTo(point) {
    const scratchPoint = scratchVector2.from(point);
    const delta = scratchPoint.subtract(this.center);
    return Math.max(0, delta.len() - this.radius);
  }
  /** Determines which side of a plane a sphere is located. */
  intersectPlane(plane) {
    const center = this.center;
    const radius = this.radius;
    const normal = plane.normal;
    const distanceToPlane = normal.dot(center) + plane.distance;
    if (distanceToPlane < -radius) {
      return INTERSECTION.OUTSIDE;
    }
    if (distanceToPlane < radius) {
      return INTERSECTION.INTERSECTING;
    }
    return INTERSECTION.INSIDE;
  }
};

// dist/lib/bounding-volumes/oriented-bounding-box.js
var import_core3 = require("@math.gl/core");
var scratchVector3 = new import_core3.Vector3();
var scratchOffset = new import_core3.Vector3();
var scratchVectorU = new import_core3.Vector3();
var scratchVectorV = new import_core3.Vector3();
var scratchVectorW = new import_core3.Vector3();
var scratchCorner = new import_core3.Vector3();
var scratchToCenter = new import_core3.Vector3();
var MATRIX3 = {
  COLUMN0ROW0: 0,
  COLUMN0ROW1: 1,
  COLUMN0ROW2: 2,
  COLUMN1ROW0: 3,
  COLUMN1ROW1: 4,
  COLUMN1ROW2: 5,
  COLUMN2ROW0: 6,
  COLUMN2ROW1: 7,
  COLUMN2ROW2: 8
};
var OrientedBoundingBox = class {
  constructor(center = [0, 0, 0], halfAxes = [0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    this.center = new import_core3.Vector3().from(center);
    this.halfAxes = new import_core3.Matrix3(halfAxes);
  }
  /** Returns an array with three halfSizes for the bounding box */
  get halfSize() {
    const xAxis = this.halfAxes.getColumn(0);
    const yAxis = this.halfAxes.getColumn(1);
    const zAxis = this.halfAxes.getColumn(2);
    return [new import_core3.Vector3(xAxis).len(), new import_core3.Vector3(yAxis).len(), new import_core3.Vector3(zAxis).len()];
  }
  /** Returns a quaternion describing the orientation of the bounding box */
  get quaternion() {
    const xAxis = this.halfAxes.getColumn(0);
    const yAxis = this.halfAxes.getColumn(1);
    const zAxis = this.halfAxes.getColumn(2);
    const normXAxis = new import_core3.Vector3(xAxis).normalize();
    const normYAxis = new import_core3.Vector3(yAxis).normalize();
    const normZAxis = new import_core3.Vector3(zAxis).normalize();
    return new import_core3.Quaternion().fromMatrix3(new import_core3.Matrix3([...normXAxis, ...normYAxis, ...normZAxis]));
  }
  /**
   * Create OrientedBoundingBox from quaternion based OBB,
   */
  fromCenterHalfSizeQuaternion(center, halfSize, quaternion) {
    const quaternionObject = new import_core3.Quaternion(quaternion);
    const directionsMatrix = new import_core3.Matrix3().fromQuaternion(quaternionObject);
    directionsMatrix[0] = directionsMatrix[0] * halfSize[0];
    directionsMatrix[1] = directionsMatrix[1] * halfSize[0];
    directionsMatrix[2] = directionsMatrix[2] * halfSize[0];
    directionsMatrix[3] = directionsMatrix[3] * halfSize[1];
    directionsMatrix[4] = directionsMatrix[4] * halfSize[1];
    directionsMatrix[5] = directionsMatrix[5] * halfSize[1];
    directionsMatrix[6] = directionsMatrix[6] * halfSize[2];
    directionsMatrix[7] = directionsMatrix[7] * halfSize[2];
    directionsMatrix[8] = directionsMatrix[8] * halfSize[2];
    this.center = new import_core3.Vector3().from(center);
    this.halfAxes = directionsMatrix;
    return this;
  }
  /** Duplicates a OrientedBoundingBox instance. */
  clone() {
    return new OrientedBoundingBox(this.center, this.halfAxes);
  }
  /** Compares the provided OrientedBoundingBox component wise and returns */
  equals(right) {
    return this === right || Boolean(right) && this.center.equals(right.center) && this.halfAxes.equals(right.halfAxes);
  }
  /** Computes a tight-fitting bounding sphere enclosing the provided oriented bounding box. */
  getBoundingSphere(result = new BoundingSphere()) {
    const halfAxes = this.halfAxes;
    const u = halfAxes.getColumn(0, scratchVectorU);
    const v = halfAxes.getColumn(1, scratchVectorV);
    const w = halfAxes.getColumn(2, scratchVectorW);
    const cornerVector = scratchVector3.copy(u).add(v).add(w);
    result.center.copy(this.center);
    result.radius = cornerVector.magnitude();
    return result;
  }
  /** Determines which side of a plane the oriented bounding box is located. */
  intersectPlane(plane) {
    const center = this.center;
    const normal = plane.normal;
    const halfAxes = this.halfAxes;
    const normalX = normal.x;
    const normalY = normal.y;
    const normalZ = normal.z;
    const radEffective = Math.abs(normalX * halfAxes[MATRIX3.COLUMN0ROW0] + normalY * halfAxes[MATRIX3.COLUMN0ROW1] + normalZ * halfAxes[MATRIX3.COLUMN0ROW2]) + Math.abs(normalX * halfAxes[MATRIX3.COLUMN1ROW0] + normalY * halfAxes[MATRIX3.COLUMN1ROW1] + normalZ * halfAxes[MATRIX3.COLUMN1ROW2]) + Math.abs(normalX * halfAxes[MATRIX3.COLUMN2ROW0] + normalY * halfAxes[MATRIX3.COLUMN2ROW1] + normalZ * halfAxes[MATRIX3.COLUMN2ROW2]);
    const distanceToPlane = normal.dot(center) + plane.distance;
    if (distanceToPlane <= -radEffective) {
      return INTERSECTION.OUTSIDE;
    } else if (distanceToPlane >= radEffective) {
      return INTERSECTION.INSIDE;
    }
    return INTERSECTION.INTERSECTING;
  }
  /** Computes the estimated distance from the closest point on a bounding box to a point. */
  distanceTo(point) {
    return Math.sqrt(this.distanceSquaredTo(point));
  }
  /**
   * Computes the estimated distance squared from the closest point
   * on a bounding box to a point.
   * See Geometric Tools for Computer Graphics 10.4.2
   */
  distanceSquaredTo(point) {
    const offset = scratchOffset.from(point).subtract(this.center);
    const halfAxes = this.halfAxes;
    const u = halfAxes.getColumn(0, scratchVectorU);
    const v = halfAxes.getColumn(1, scratchVectorV);
    const w = halfAxes.getColumn(2, scratchVectorW);
    const uHalf = u.magnitude();
    const vHalf = v.magnitude();
    const wHalf = w.magnitude();
    u.normalize();
    v.normalize();
    w.normalize();
    let distanceSquared = 0;
    let d;
    d = Math.abs(offset.dot(u)) - uHalf;
    if (d > 0) {
      distanceSquared += d * d;
    }
    d = Math.abs(offset.dot(v)) - vHalf;
    if (d > 0) {
      distanceSquared += d * d;
    }
    d = Math.abs(offset.dot(w)) - wHalf;
    if (d > 0) {
      distanceSquared += d * d;
    }
    return distanceSquared;
  }
  /**
   * The distances calculated by the vector from the center of the bounding box
   * to position projected onto direction.
   *
   * - If you imagine the infinite number of planes with normal direction,
   *   this computes the smallest distance to the closest and farthest planes
   *   from `position` that intersect the bounding box.
   *
   * @param position The position to calculate the distance from.
   * @param direction The direction from position.
   * @param result An Interval (array of length 2) to store the nearest and farthest distances.
   * @returns Interval (array of length 2) with nearest and farthest distances
   *   on the bounding box from position in direction.
   */
  // eslint-disable-next-line max-statements
  computePlaneDistances(position, direction, result = [-0, -0]) {
    let minDist = Number.POSITIVE_INFINITY;
    let maxDist = Number.NEGATIVE_INFINITY;
    const center = this.center;
    const halfAxes = this.halfAxes;
    const u = halfAxes.getColumn(0, scratchVectorU);
    const v = halfAxes.getColumn(1, scratchVectorV);
    const w = halfAxes.getColumn(2, scratchVectorW);
    const corner = scratchCorner.copy(u).add(v).add(w).add(center);
    const toCenter = scratchToCenter.copy(corner).subtract(position);
    let mag = direction.dot(toCenter);
    minDist = Math.min(mag, minDist);
    maxDist = Math.max(mag, maxDist);
    corner.copy(center).add(u).add(v).subtract(w);
    toCenter.copy(corner).subtract(position);
    mag = direction.dot(toCenter);
    minDist = Math.min(mag, minDist);
    maxDist = Math.max(mag, maxDist);
    corner.copy(center).add(u).subtract(v).add(w);
    toCenter.copy(corner).subtract(position);
    mag = direction.dot(toCenter);
    minDist = Math.min(mag, minDist);
    maxDist = Math.max(mag, maxDist);
    corner.copy(center).add(u).subtract(v).subtract(w);
    toCenter.copy(corner).subtract(position);
    mag = direction.dot(toCenter);
    minDist = Math.min(mag, minDist);
    maxDist = Math.max(mag, maxDist);
    center.copy(corner).subtract(u).add(v).add(w);
    toCenter.copy(corner).subtract(position);
    mag = direction.dot(toCenter);
    minDist = Math.min(mag, minDist);
    maxDist = Math.max(mag, maxDist);
    center.copy(corner).subtract(u).add(v).subtract(w);
    toCenter.copy(corner).subtract(position);
    mag = direction.dot(toCenter);
    minDist = Math.min(mag, minDist);
    maxDist = Math.max(mag, maxDist);
    center.copy(corner).subtract(u).subtract(v).add(w);
    toCenter.copy(corner).subtract(position);
    mag = direction.dot(toCenter);
    minDist = Math.min(mag, minDist);
    maxDist = Math.max(mag, maxDist);
    center.copy(corner).subtract(u).subtract(v).subtract(w);
    toCenter.copy(corner).subtract(position);
    mag = direction.dot(toCenter);
    minDist = Math.min(mag, minDist);
    maxDist = Math.max(mag, maxDist);
    result[0] = minDist;
    result[1] = maxDist;
    return result;
  }
  /**
   * Applies a 4x4 affine transformation matrix to a bounding sphere.
   * @param transform The transformation matrix to apply to the bounding sphere.
   * @returns itself, i.e. the modified BoundingVolume.
   */
  transform(transformation) {
    this.center.transformAsPoint(transformation);
    const xAxis = this.halfAxes.getColumn(0, scratchVectorU);
    xAxis.transformAsPoint(transformation);
    const yAxis = this.halfAxes.getColumn(1, scratchVectorV);
    yAxis.transformAsPoint(transformation);
    const zAxis = this.halfAxes.getColumn(2, scratchVectorW);
    zAxis.transformAsPoint(transformation);
    this.halfAxes = new import_core3.Matrix3([...xAxis, ...yAxis, ...zAxis]);
    return this;
  }
  getTransform() {
    throw new Error("not implemented");
  }
};

// dist/lib/culling-volume.js
var import_core5 = require("@math.gl/core");

// dist/lib/plane.js
var import_core4 = require("@math.gl/core");
var scratchPosition = new import_core4.Vector3();
var scratchNormal2 = new import_core4.Vector3();
var Plane = class {
  constructor(normal = [0, 0, 1], distance = 0) {
    this.normal = new import_core4.Vector3();
    this.distance = -0;
    this.fromNormalDistance(normal, distance);
  }
  /** Creates a plane from a normal and a distance from the origin. */
  fromNormalDistance(normal, distance) {
    (0, import_core4.assert)(Number.isFinite(distance));
    this.normal.from(normal).normalize();
    this.distance = distance;
    return this;
  }
  /** Creates a plane from a normal and a point on the plane. */
  fromPointNormal(point, normal) {
    point = scratchPosition.from(point);
    this.normal.from(normal).normalize();
    const distance = -this.normal.dot(point);
    this.distance = distance;
    return this;
  }
  /** Creates a plane from the general equation */
  fromCoefficients(a, b, c, d) {
    this.normal.set(a, b, c);
    (0, import_core4.assert)((0, import_core4.equals)(this.normal.len(), 1));
    this.distance = d;
    return this;
  }
  /** Duplicates a Plane instance. */
  clone() {
    return new Plane(this.normal, this.distance);
  }
  /** Compares the provided Planes by normal and distance */
  equals(right) {
    return (0, import_core4.equals)(this.distance, right.distance) && (0, import_core4.equals)(this.normal, right.normal);
  }
  /** Computes the signed shortest distance of a point to a plane.
   * The sign of the distance determines which side of the plane the point is on.
   */
  getPointDistance(point) {
    return this.normal.dot(point) + this.distance;
  }
  /** Transforms the plane by the given transformation matrix. */
  transform(matrix4) {
    const normal = scratchNormal2.copy(this.normal).transformAsVector(matrix4).normalize();
    const point = this.normal.scale(-this.distance).transform(matrix4);
    return this.fromPointNormal(point, normal);
  }
  projectPointOntoPlane(point, result = [0, 0, 0]) {
    const scratchPoint = scratchPosition.from(point);
    const pointDistance = this.getPointDistance(scratchPoint);
    const scaledNormal = scratchNormal2.copy(this.normal).scale(pointDistance);
    return scratchPoint.subtract(scaledNormal).to(result);
  }
};

// dist/lib/culling-volume.js
var faces = [new import_core5.Vector3([1, 0, 0]), new import_core5.Vector3([0, 1, 0]), new import_core5.Vector3([0, 0, 1])];
var scratchPlaneCenter = new import_core5.Vector3();
var scratchPlaneNormal = new import_core5.Vector3();
var CullingVolume = class {
  /**
   * Create a new `CullingVolume` bounded by an array of clipping planed
   * @param planes Array of clipping planes.
   * */
  constructor(planes = []) {
    this.planes = planes;
  }
  /**
   * Constructs a culling volume from a bounding sphere. Creates six planes that create a box containing the sphere.
   * The planes are aligned to the x, y, and z axes in world coordinates.
   */
  fromBoundingSphere(boundingSphere) {
    this.planes.length = 2 * faces.length;
    const center = boundingSphere.center;
    const radius = boundingSphere.radius;
    let planeIndex = 0;
    for (const faceNormal of faces) {
      let plane0 = this.planes[planeIndex];
      let plane1 = this.planes[planeIndex + 1];
      if (!plane0) {
        plane0 = this.planes[planeIndex] = new Plane();
      }
      if (!plane1) {
        plane1 = this.planes[planeIndex + 1] = new Plane();
      }
      const plane0Center = scratchPlaneCenter.copy(faceNormal).scale(-radius).add(center);
      plane0.fromPointNormal(plane0Center, faceNormal);
      const plane1Center = scratchPlaneCenter.copy(faceNormal).scale(radius).add(center);
      const negatedFaceNormal = scratchPlaneNormal.copy(faceNormal).negate();
      plane1.fromPointNormal(plane1Center, negatedFaceNormal);
      planeIndex += 2;
    }
    return this;
  }
  /** Determines whether a bounding volume intersects the culling volume. */
  computeVisibility(boundingVolume) {
    let intersect = INTERSECTION.INSIDE;
    for (const plane of this.planes) {
      const result = boundingVolume.intersectPlane(plane);
      switch (result) {
        case INTERSECTION.OUTSIDE:
          return INTERSECTION.OUTSIDE;
        case INTERSECTION.INTERSECTING:
          intersect = INTERSECTION.INTERSECTING;
          break;
        default:
      }
    }
    return intersect;
  }
  /**
   * Determines whether a bounding volume intersects the culling volume.
   *
   * @param parentPlaneMask A bit mask from the boundingVolume's parent's check against the same culling
   *   volume, such that if (planeMask & (1 << planeIndex) === 0), for k < 31, then
   *   the parent (and therefore this) volume is completely inside plane[planeIndex]
   *   and that plane check can be skipped.
   */
  computeVisibilityWithPlaneMask(boundingVolume, parentPlaneMask) {
    (0, import_core5.assert)(Number.isFinite(parentPlaneMask), "parentPlaneMask is required.");
    if (parentPlaneMask === CullingVolume.MASK_OUTSIDE || parentPlaneMask === CullingVolume.MASK_INSIDE) {
      return parentPlaneMask;
    }
    let mask = CullingVolume.MASK_INSIDE;
    const planes = this.planes;
    for (let k = 0; k < this.planes.length; ++k) {
      const flag = k < 31 ? 1 << k : 0;
      if (k < 31 && (parentPlaneMask & flag) === 0) {
        continue;
      }
      const plane = planes[k];
      const result = boundingVolume.intersectPlane(plane);
      if (result === INTERSECTION.OUTSIDE) {
        return CullingVolume.MASK_OUTSIDE;
      } else if (result === INTERSECTION.INTERSECTING) {
        mask |= flag;
      }
    }
    return mask;
  }
};
CullingVolume.MASK_OUTSIDE = 4294967295;
CullingVolume.MASK_INSIDE = 0;
CullingVolume.MASK_INDETERMINATE = 2147483647;

// dist/lib/perspective-off-center-frustum.js
var import_core6 = require("@math.gl/core");
var scratchPlaneUpVector = new import_core6.Vector3();
var scratchPlaneRightVector = new import_core6.Vector3();
var scratchPlaneNearCenter = new import_core6.Vector3();
var scratchPlaneFarCenter = new import_core6.Vector3();
var scratchPlaneNormal2 = new import_core6.Vector3();
var PerspectiveOffCenterFrustum = class {
  /**
   * The viewing frustum is defined by 6 planes.
   * Each plane is represented by a {@link Vector4} object, where the x, y, and z components
   * define the unit vector normal to the plane, and the w component is the distance of the
   * plane from the origin/camera position.
   *
   * @alias PerspectiveOffCenterFrustum
   *
   * @example
   * const frustum = new PerspectiveOffCenterFrustum({
   *     left : -1.0,
   *     right : 1.0,
   *     top : 1.0,
   *     bottom : -1.0,
   *     near : 1.0,
   *     far : 100.0
   * });
   *
   * @see PerspectiveFrustum
   */
  constructor(options = {}) {
    this._cullingVolume = new CullingVolume([
      new Plane(),
      new Plane(),
      new Plane(),
      new Plane(),
      new Plane(),
      new Plane()
    ]);
    this._perspectiveMatrix = new import_core6.Matrix4();
    this._infinitePerspective = new import_core6.Matrix4();
    const { near = 1, far = 5e8 } = options;
    this.left = options.left;
    this._left = void 0;
    this.right = options.right;
    this._right = void 0;
    this.top = options.top;
    this._top = void 0;
    this.bottom = options.bottom;
    this._bottom = void 0;
    this.near = near;
    this._near = near;
    this.far = far;
    this._far = far;
  }
  /**
   * Returns a duplicate of a PerspectiveOffCenterFrustum instance.
   * @returns {PerspectiveOffCenterFrustum} A new PerspectiveFrustum instance.
   * */
  clone() {
    return new PerspectiveOffCenterFrustum({
      right: this.right,
      left: this.left,
      top: this.top,
      bottom: this.bottom,
      near: this.near,
      far: this.far
    });
  }
  /**
   * Compares the provided PerspectiveOffCenterFrustum componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(other) {
    return other && other instanceof PerspectiveOffCenterFrustum && this.right === other.right && this.left === other.left && this.top === other.top && this.bottom === other.bottom && this.near === other.near && this.far === other.far;
  }
  /**
   * Gets the perspective projection matrix computed from the view frustum.
   * @memberof PerspectiveOffCenterFrustum.prototype
   * @type {Matrix4}
   *
   * @see PerspectiveOffCenterFrustum#infiniteProjectionMatrix
   */
  get projectionMatrix() {
    this._update();
    return this._perspectiveMatrix;
  }
  /**
   * Gets the perspective projection matrix computed from the view frustum with an infinite far plane.
   * @memberof PerspectiveOffCenterFrustum.prototype
   * @type {Matrix4}
   *
   * @see PerspectiveOffCenterFrustum#projectionMatrix
   */
  get infiniteProjectionMatrix() {
    this._update();
    return this._infinitePerspective;
  }
  /**
   * Creates a culling volume for this frustum.
   * @returns {CullingVolume} A culling volume at the given position and orientation.
   *
   * @example
   * // Check if a bounding volume intersects the frustum.
   * const cullingVolume = frustum.computeCullingVolume(cameraPosition, cameraDirection, cameraUp);
   * const intersect = cullingVolume.computeVisibility(boundingVolume);
   */
  // eslint-disable-next-line complexity, max-statements
  computeCullingVolume(position, direction, up) {
    (0, import_core6.assert)(position, "position is required.");
    (0, import_core6.assert)(direction, "direction is required.");
    (0, import_core6.assert)(up, "up is required.");
    const planes = this._cullingVolume.planes;
    up = scratchPlaneUpVector.copy(up).normalize();
    const right = scratchPlaneRightVector.copy(direction).cross(up).normalize();
    const nearCenter = scratchPlaneNearCenter.copy(direction).multiplyByScalar(this.near).add(position);
    const farCenter = scratchPlaneFarCenter.copy(direction).multiplyByScalar(this.far).add(position);
    let normal = scratchPlaneNormal2;
    normal.copy(right).multiplyByScalar(this.left).add(nearCenter).subtract(position).cross(up);
    planes[0].fromPointNormal(position, normal);
    normal.copy(right).multiplyByScalar(this.right).add(nearCenter).subtract(position).cross(up).negate();
    planes[1].fromPointNormal(position, normal);
    normal.copy(up).multiplyByScalar(this.bottom).add(nearCenter).subtract(position).cross(right).negate();
    planes[2].fromPointNormal(position, normal);
    normal.copy(up).multiplyByScalar(this.top).add(nearCenter).subtract(position).cross(right);
    planes[3].fromPointNormal(position, normal);
    normal = new import_core6.Vector3().copy(direction);
    planes[4].fromPointNormal(nearCenter, normal);
    normal.negate();
    planes[5].fromPointNormal(farCenter, normal);
    return this._cullingVolume;
  }
  /**
   * Returns the pixel's width and height in meters.
   *
   * @returns {Vector2} The modified result parameter or a new instance of {@link Vector2} with the pixel's width and height in the x and y properties, respectively.
   *
   * @exception {DeveloperError} drawingBufferWidth must be greater than zero.
   * @exception {DeveloperError} drawingBufferHeight must be greater than zero.
   *
   * @example
   * // Example 1
   * // Get the width and height of a pixel.
   * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 1.0, new Vector2());
   *
   * @example
   * // Example 2
   * // Get the width and height of a pixel if the near plane was set to 'distance'.
   * // For example, get the size of a pixel of an image on a billboard.
   * const position = camera.position;
   * const direction = camera.direction;
   * const toCenter = Vector3.subtract(primitive.boundingVolume.center, position, new Vector3());      // vector from camera to a primitive
   * const toCenterProj = Vector3.multiplyByScalar(direction, Vector3.dot(direction, toCenter), new Vector3()); // project vector onto camera direction vector
   * const distance = Vector3.magnitude(toCenterProj);
   * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, distance, new Vector2());
   */
  getPixelDimensions(drawingBufferWidth, drawingBufferHeight, distance, result) {
    this._update();
    (0, import_core6.assert)(Number.isFinite(drawingBufferWidth) && Number.isFinite(drawingBufferHeight));
    (0, import_core6.assert)(drawingBufferWidth > 0);
    (0, import_core6.assert)(drawingBufferHeight > 0);
    (0, import_core6.assert)(distance > 0);
    (0, import_core6.assert)(result);
    const inverseNear = 1 / this.near;
    let tanTheta = this.top * inverseNear;
    const pixelHeight = 2 * distance * tanTheta / drawingBufferHeight;
    tanTheta = this.right * inverseNear;
    const pixelWidth = 2 * distance * tanTheta / drawingBufferWidth;
    result.x = pixelWidth;
    result.y = pixelHeight;
    return result;
  }
  // eslint-disable-next-line complexity, max-statements
  _update() {
    (0, import_core6.assert)(Number.isFinite(this.right) && Number.isFinite(this.left) && Number.isFinite(this.top) && Number.isFinite(this.bottom) && Number.isFinite(this.near) && Number.isFinite(this.far));
    const { top, bottom, right, left, near, far } = this;
    if (top !== this._top || bottom !== this._bottom || left !== this._left || right !== this._right || near !== this._near || far !== this._far) {
      (0, import_core6.assert)(this.near > 0 && this.near < this.far, "near must be greater than zero and less than far.");
      this._left = left;
      this._right = right;
      this._top = top;
      this._bottom = bottom;
      this._near = near;
      this._far = far;
      this._perspectiveMatrix = new import_core6.Matrix4().frustum({
        left,
        right,
        bottom,
        top,
        near,
        far
      });
      this._infinitePerspective = new import_core6.Matrix4().frustum({
        left,
        right,
        bottom,
        top,
        near,
        far: Infinity
      });
    }
  }
};

// dist/lib/perspective-frustum.js
var import_core7 = require("@math.gl/core");
var defined = (val) => val !== null && typeof val !== "undefined";
var PerspectiveFrustum = class {
  constructor(options = {}) {
    this._offCenterFrustum = new PerspectiveOffCenterFrustum();
    const { fov, aspectRatio, near = 1, far = 5e8, xOffset = 0, yOffset = 0 } = options;
    this.fov = fov;
    this.aspectRatio = aspectRatio;
    this.near = near;
    this.far = far;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
  }
  /**
   * Returns a duplicate of a PerspectiveFrustum instance.
   */
  clone() {
    return new PerspectiveFrustum({
      aspectRatio: this.aspectRatio,
      fov: this.fov,
      near: this.near,
      far: this.far
    });
  }
  /**
   * Compares the provided PerspectiveFrustum componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(other) {
    if (!defined(other) || !(other instanceof PerspectiveFrustum)) {
      return false;
    }
    this._update();
    other._update();
    return this.fov === other.fov && this.aspectRatio === other.aspectRatio && this.near === other.near && this.far === other.far && this._offCenterFrustum.equals(other._offCenterFrustum);
  }
  /**
   * Gets the perspective projection matrix computed from the view this.
   */
  get projectionMatrix() {
    this._update();
    return this._offCenterFrustum.projectionMatrix;
  }
  /**
   * The perspective projection matrix computed from the view frustum with an infinite far plane.
   */
  get infiniteProjectionMatrix() {
    this._update();
    return this._offCenterFrustum.infiniteProjectionMatrix;
  }
  /**
   * Gets the angle of the vertical field of view, in radians.
   */
  get fovy() {
    this._update();
    return this._fovy;
  }
  /**
   * @private
   */
  get sseDenominator() {
    this._update();
    return this._sseDenominator;
  }
  /**
   * Creates a culling volume for this this.ion.
   * @returns {CullingVolume} A culling volume at the given position and orientation.
   *
   * @example
   * // Check if a bounding volume intersects the this.
   * var cullingVolume = this.computeCullingVolume(cameraPosition, cameraDirection, cameraUp);
   * var intersect = cullingVolume.computeVisibility(boundingVolume);
   */
  computeCullingVolume(position, direction, up) {
    this._update();
    return this._offCenterFrustum.computeCullingVolume(position, direction, up);
  }
  /**
   * Returns the pixel's width and height in meters.
   * @returns {Vector2} The modified result parameter or a new instance of {@link Vector2} with the pixel's width and height in the x and y properties, respectively.
   *
   * @exception {DeveloperError} drawingBufferWidth must be greater than zero.
   * @exception {DeveloperError} drawingBufferHeight must be greater than zero.
   *
   * @example
   * // Example 1
   * // Get the width and height of a pixel.
   * var pixelSize = camera.this.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 1.0, new Vector2());
   *
   * @example
   * // Example 2
   * // Get the width and height of a pixel if the near plane was set to 'distance'.
   * // For example, get the size of a pixel of an image on a billboard.
   * var position = camera.position;
   * var direction = camera.direction;
   * var toCenter = Vector3.subtract(primitive.boundingVolume.center, position, new Vector3());      // vector from camera to a primitive
   * var toCenterProj = Vector3.multiplyByScalar(direction, Vector3.dot(direction, toCenter), new Vector3()); // project vector onto camera direction vector
   * var distance = Vector3.magnitude(toCenterProj);
   * var pixelSize = camera.this.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, distance, new Vector2());
   */
  getPixelDimensions(drawingBufferWidth, drawingBufferHeight, distance, result) {
    this._update();
    return this._offCenterFrustum.getPixelDimensions(drawingBufferWidth, drawingBufferHeight, distance, result || new import_core7.Vector2());
  }
  // eslint-disable-next-line complexity, max-statements
  _update() {
    (0, import_core7.assert)(Number.isFinite(this.fov) && Number.isFinite(this.aspectRatio) && Number.isFinite(this.near) && Number.isFinite(this.far));
    const f = this._offCenterFrustum;
    if (this.fov !== this._fov || this.aspectRatio !== this._aspectRatio || this.near !== this._near || this.far !== this._far || this.xOffset !== this._xOffset || this.yOffset !== this._yOffset) {
      (0, import_core7.assert)(this.fov >= 0 && this.fov < Math.PI);
      (0, import_core7.assert)(this.aspectRatio > 0);
      (0, import_core7.assert)(this.near >= 0 && this.near < this.far);
      this._aspectRatio = this.aspectRatio;
      this._fov = this.fov;
      this._fovy = this.aspectRatio <= 1 ? this.fov : Math.atan(Math.tan(this.fov * 0.5) / this.aspectRatio) * 2;
      this._near = this.near;
      this._far = this.far;
      this._sseDenominator = 2 * Math.tan(0.5 * this._fovy);
      this._xOffset = this.xOffset;
      this._yOffset = this.yOffset;
      f.top = this.near * Math.tan(0.5 * this._fovy);
      f.bottom = -f.top;
      f.right = this.aspectRatio * f.top;
      f.left = -f.right;
      f.near = this.near;
      f.far = this.far;
      f.right += this.xOffset;
      f.left += this.xOffset;
      f.top += this.yOffset;
      f.bottom += this.yOffset;
    }
  }
};

// dist/lib/algorithms/bounding-sphere-from-points.js
var import_core8 = require("@math.gl/core");
var fromPointsXMin = new import_core8.Vector3();
var fromPointsYMin = new import_core8.Vector3();
var fromPointsZMin = new import_core8.Vector3();
var fromPointsXMax = new import_core8.Vector3();
var fromPointsYMax = new import_core8.Vector3();
var fromPointsZMax = new import_core8.Vector3();
var fromPointsCurrentPos = new import_core8.Vector3();
var fromPointsScratch = new import_core8.Vector3();
var fromPointsRitterCenter = new import_core8.Vector3();
var fromPointsMinBoxPt = new import_core8.Vector3();
var fromPointsMaxBoxPt = new import_core8.Vector3();
var fromPointsNaiveCenterScratch = new import_core8.Vector3();
function makeBoundingSphereFromPoints(positions, result = new BoundingSphere()) {
  if (!positions || positions.length === 0) {
    return result.fromCenterRadius([0, 0, 0], 0);
  }
  const currentPos = fromPointsCurrentPos.copy(positions[0]);
  const xMin = fromPointsXMin.copy(currentPos);
  const yMin = fromPointsYMin.copy(currentPos);
  const zMin = fromPointsZMin.copy(currentPos);
  const xMax = fromPointsXMax.copy(currentPos);
  const yMax = fromPointsYMax.copy(currentPos);
  const zMax = fromPointsZMax.copy(currentPos);
  for (const position of positions) {
    currentPos.copy(position);
    const x = currentPos.x;
    const y = currentPos.y;
    const z = currentPos.z;
    if (x < xMin.x) {
      xMin.copy(currentPos);
    }
    if (x > xMax.x) {
      xMax.copy(currentPos);
    }
    if (y < yMin.y) {
      yMin.copy(currentPos);
    }
    if (y > yMax.y) {
      yMax.copy(currentPos);
    }
    if (z < zMin.z) {
      zMin.copy(currentPos);
    }
    if (z > zMax.z) {
      zMax.copy(currentPos);
    }
  }
  const xSpan = fromPointsScratch.copy(xMax).subtract(xMin).magnitudeSquared();
  const ySpan = fromPointsScratch.copy(yMax).subtract(yMin).magnitudeSquared();
  const zSpan = fromPointsScratch.copy(zMax).subtract(zMin).magnitudeSquared();
  let diameter1 = xMin;
  let diameter2 = xMax;
  let maxSpan = xSpan;
  if (ySpan > maxSpan) {
    maxSpan = ySpan;
    diameter1 = yMin;
    diameter2 = yMax;
  }
  if (zSpan > maxSpan) {
    maxSpan = zSpan;
    diameter1 = zMin;
    diameter2 = zMax;
  }
  const ritterCenter = fromPointsRitterCenter;
  ritterCenter.x = (diameter1.x + diameter2.x) * 0.5;
  ritterCenter.y = (diameter1.y + diameter2.y) * 0.5;
  ritterCenter.z = (diameter1.z + diameter2.z) * 0.5;
  let radiusSquared = fromPointsScratch.copy(diameter2).subtract(ritterCenter).magnitudeSquared();
  let ritterRadius = Math.sqrt(radiusSquared);
  const minBoxPt = fromPointsMinBoxPt;
  minBoxPt.x = xMin.x;
  minBoxPt.y = yMin.y;
  minBoxPt.z = zMin.z;
  const maxBoxPt = fromPointsMaxBoxPt;
  maxBoxPt.x = xMax.x;
  maxBoxPt.y = yMax.y;
  maxBoxPt.z = zMax.z;
  const naiveCenter = fromPointsNaiveCenterScratch.copy(minBoxPt).add(maxBoxPt).multiplyByScalar(0.5);
  let naiveRadius = 0;
  for (const position of positions) {
    currentPos.copy(position);
    const r = fromPointsScratch.copy(currentPos).subtract(naiveCenter).magnitude();
    if (r > naiveRadius) {
      naiveRadius = r;
    }
    const oldCenterToPointSquared = fromPointsScratch.copy(currentPos).subtract(ritterCenter).magnitudeSquared();
    if (oldCenterToPointSquared > radiusSquared) {
      const oldCenterToPoint = Math.sqrt(oldCenterToPointSquared);
      ritterRadius = (ritterRadius + oldCenterToPoint) * 0.5;
      radiusSquared = ritterRadius * ritterRadius;
      const oldToNew = oldCenterToPoint - ritterRadius;
      ritterCenter.x = (ritterRadius * ritterCenter.x + oldToNew * currentPos.x) / oldCenterToPoint;
      ritterCenter.y = (ritterRadius * ritterCenter.y + oldToNew * currentPos.y) / oldCenterToPoint;
      ritterCenter.z = (ritterRadius * ritterCenter.z + oldToNew * currentPos.z) / oldCenterToPoint;
    }
  }
  if (ritterRadius < naiveRadius) {
    ritterCenter.to(result.center);
    result.radius = ritterRadius;
  } else {
    naiveCenter.to(result.center);
    result.radius = naiveRadius;
  }
  return result;
}

// dist/lib/algorithms/bounding-box-from-points.js
var import_core10 = require("@math.gl/core");

// dist/lib/algorithms/compute-eigen-decomposition.js
var import_core9 = require("@math.gl/core");
var scratchMatrix = new import_core9.Matrix3();
var scratchUnitary = new import_core9.Matrix3();
var scratchDiagonal = new import_core9.Matrix3();
var jMatrix = new import_core9.Matrix3();
var jMatrixTranspose = new import_core9.Matrix3();
function computeEigenDecomposition(matrix, result = {}) {
  const EIGEN_TOLERANCE = import_core9._MathUtils.EPSILON20;
  const EIGEN_MAX_SWEEPS = 10;
  let count = 0;
  let sweep = 0;
  const unitaryMatrix = scratchUnitary;
  const diagonalMatrix = scratchDiagonal;
  unitaryMatrix.identity();
  diagonalMatrix.copy(matrix);
  const epsilon = EIGEN_TOLERANCE * computeFrobeniusNorm(diagonalMatrix);
  while (sweep < EIGEN_MAX_SWEEPS && offDiagonalFrobeniusNorm(diagonalMatrix) > epsilon) {
    shurDecomposition(diagonalMatrix, jMatrix);
    jMatrixTranspose.copy(jMatrix).transpose();
    diagonalMatrix.multiplyRight(jMatrix);
    diagonalMatrix.multiplyLeft(jMatrixTranspose);
    unitaryMatrix.multiplyRight(jMatrix);
    if (++count > 2) {
      ++sweep;
      count = 0;
    }
  }
  result.unitary = unitaryMatrix.toTarget(result.unitary);
  result.diagonal = diagonalMatrix.toTarget(result.diagonal);
  return result;
}
function computeFrobeniusNorm(matrix) {
  let norm = 0;
  for (let i = 0; i < 9; ++i) {
    const temp = matrix[i];
    norm += temp * temp;
  }
  return Math.sqrt(norm);
}
var rowVal = [1, 0, 0];
var colVal = [2, 2, 1];
function offDiagonalFrobeniusNorm(matrix) {
  let norm = 0;
  for (let i = 0; i < 3; ++i) {
    const temp = matrix[scratchMatrix.getElementIndex(colVal[i], rowVal[i])];
    norm += 2 * temp * temp;
  }
  return Math.sqrt(norm);
}
function shurDecomposition(matrix, result) {
  const tolerance = import_core9._MathUtils.EPSILON15;
  let maxDiagonal = 0;
  let rotAxis = 1;
  for (let i = 0; i < 3; ++i) {
    const temp = Math.abs(matrix[scratchMatrix.getElementIndex(colVal[i], rowVal[i])]);
    if (temp > maxDiagonal) {
      rotAxis = i;
      maxDiagonal = temp;
    }
  }
  const p = rowVal[rotAxis];
  const q = colVal[rotAxis];
  let c = 1;
  let s = 0;
  if (Math.abs(matrix[scratchMatrix.getElementIndex(q, p)]) > tolerance) {
    const qq = matrix[scratchMatrix.getElementIndex(q, q)];
    const pp = matrix[scratchMatrix.getElementIndex(p, p)];
    const qp = matrix[scratchMatrix.getElementIndex(q, p)];
    const tau = (qq - pp) / 2 / qp;
    let t;
    if (tau < 0) {
      t = -1 / (-tau + Math.sqrt(1 + tau * tau));
    } else {
      t = 1 / (tau + Math.sqrt(1 + tau * tau));
    }
    c = 1 / Math.sqrt(1 + t * t);
    s = t * c;
  }
  import_core9.Matrix3.IDENTITY.to(result);
  result[scratchMatrix.getElementIndex(p, p)] = result[scratchMatrix.getElementIndex(q, q)] = c;
  result[scratchMatrix.getElementIndex(q, p)] = s;
  result[scratchMatrix.getElementIndex(p, q)] = -s;
  return result;
}

// dist/lib/algorithms/bounding-box-from-points.js
var scratchVector23 = new import_core10.Vector3();
var scratchVector32 = new import_core10.Vector3();
var scratchVector4 = new import_core10.Vector3();
var scratchVector5 = new import_core10.Vector3();
var scratchVector6 = new import_core10.Vector3();
var scratchCovarianceResult = new import_core10.Matrix3();
var scratchEigenResult = {
  diagonal: new import_core10.Matrix3(),
  unitary: new import_core10.Matrix3()
};
function makeOrientedBoundingBoxFromPoints(positions, result = new OrientedBoundingBox()) {
  if (!positions || positions.length === 0) {
    result.halfAxes = new import_core10.Matrix3([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    result.center = new import_core10.Vector3();
    return result;
  }
  const length = positions.length;
  const meanPoint = new import_core10.Vector3(0, 0, 0);
  for (const position of positions) {
    meanPoint.add(position);
  }
  const invLength = 1 / length;
  meanPoint.multiplyByScalar(invLength);
  let exx = 0;
  let exy = 0;
  let exz = 0;
  let eyy = 0;
  let eyz = 0;
  let ezz = 0;
  for (const position of positions) {
    const p = scratchVector23.copy(position).subtract(meanPoint);
    exx += p.x * p.x;
    exy += p.x * p.y;
    exz += p.x * p.z;
    eyy += p.y * p.y;
    eyz += p.y * p.z;
    ezz += p.z * p.z;
  }
  exx *= invLength;
  exy *= invLength;
  exz *= invLength;
  eyy *= invLength;
  eyz *= invLength;
  ezz *= invLength;
  const covarianceMatrix = scratchCovarianceResult;
  covarianceMatrix[0] = exx;
  covarianceMatrix[1] = exy;
  covarianceMatrix[2] = exz;
  covarianceMatrix[3] = exy;
  covarianceMatrix[4] = eyy;
  covarianceMatrix[5] = eyz;
  covarianceMatrix[6] = exz;
  covarianceMatrix[7] = eyz;
  covarianceMatrix[8] = ezz;
  const { unitary } = computeEigenDecomposition(covarianceMatrix, scratchEigenResult);
  const rotation = result.halfAxes.copy(unitary);
  let v1 = rotation.getColumn(0, scratchVector4);
  let v2 = rotation.getColumn(1, scratchVector5);
  let v3 = rotation.getColumn(2, scratchVector6);
  let u1 = -Number.MAX_VALUE;
  let u2 = -Number.MAX_VALUE;
  let u3 = -Number.MAX_VALUE;
  let l1 = Number.MAX_VALUE;
  let l2 = Number.MAX_VALUE;
  let l3 = Number.MAX_VALUE;
  for (const position of positions) {
    scratchVector23.copy(position);
    u1 = Math.max(scratchVector23.dot(v1), u1);
    u2 = Math.max(scratchVector23.dot(v2), u2);
    u3 = Math.max(scratchVector23.dot(v3), u3);
    l1 = Math.min(scratchVector23.dot(v1), l1);
    l2 = Math.min(scratchVector23.dot(v2), l2);
    l3 = Math.min(scratchVector23.dot(v3), l3);
  }
  v1 = v1.multiplyByScalar(0.5 * (l1 + u1));
  v2 = v2.multiplyByScalar(0.5 * (l2 + u2));
  v3 = v3.multiplyByScalar(0.5 * (l3 + u3));
  result.center.copy(v1).add(v2).add(v3);
  const scale = scratchVector32.set(u1 - l1, u2 - l2, u3 - l3).multiplyByScalar(0.5);
  const scaleMatrix = new import_core10.Matrix3([scale[0], 0, 0, 0, scale[1], 0, 0, 0, scale[2]]);
  result.halfAxes.multiplyRight(scaleMatrix);
  return result;
}
function makeAxisAlignedBoundingBoxFromPoints(positions, result = new AxisAlignedBoundingBox()) {
  if (!positions || positions.length === 0) {
    result.minimum.set(0, 0, 0);
    result.maximum.set(0, 0, 0);
    result.center.set(0, 0, 0);
    result.halfDiagonal.set(0, 0, 0);
    return result;
  }
  let minimumX = positions[0][0];
  let minimumY = positions[0][1];
  let minimumZ = positions[0][2];
  let maximumX = positions[0][0];
  let maximumY = positions[0][1];
  let maximumZ = positions[0][2];
  for (const p of positions) {
    const x = p[0];
    const y = p[1];
    const z = p[2];
    minimumX = Math.min(x, minimumX);
    maximumX = Math.max(x, maximumX);
    minimumY = Math.min(y, minimumY);
    maximumY = Math.max(y, maximumY);
    minimumZ = Math.min(z, minimumZ);
    maximumZ = Math.max(z, maximumZ);
  }
  result.minimum.set(minimumX, minimumY, minimumZ);
  result.maximum.set(maximumX, maximumY, maximumZ);
  result.center.copy(result.minimum).add(result.maximum).scale(0.5);
  result.halfDiagonal.copy(result.maximum).subtract(result.center);
  return result;
}
//# sourceMappingURL=index.cjs.map

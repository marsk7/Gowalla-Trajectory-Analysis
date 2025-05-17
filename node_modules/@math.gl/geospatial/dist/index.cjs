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
  Ellipsoid: () => Ellipsoid,
  isWGS84: () => isWGS84
});
module.exports = __toCommonJS(dist_exports);

// dist/ellipsoid/ellipsoid.js
var import_core4 = require("@math.gl/core");

// dist/constants.js
var WGS84_RADIUS_X = 6378137;
var WGS84_RADIUS_Y = 6378137;
var WGS84_RADIUS_Z = 6356752314245179e-9;
var WGS84_CONSTANTS = {
  radii: [WGS84_RADIUS_X, WGS84_RADIUS_Y, WGS84_RADIUS_Z],
  radiiSquared: [
    WGS84_RADIUS_X * WGS84_RADIUS_X,
    WGS84_RADIUS_Y * WGS84_RADIUS_Y,
    WGS84_RADIUS_Z * WGS84_RADIUS_Z
  ],
  oneOverRadii: [1 / WGS84_RADIUS_X, 1 / WGS84_RADIUS_Y, 1 / WGS84_RADIUS_Z],
  oneOverRadiiSquared: [
    1 / (WGS84_RADIUS_X * WGS84_RADIUS_X),
    1 / (WGS84_RADIUS_Y * WGS84_RADIUS_Y),
    1 / (WGS84_RADIUS_Z * WGS84_RADIUS_Z)
  ],
  maximumRadius: Math.max(WGS84_RADIUS_X, WGS84_RADIUS_Y, WGS84_RADIUS_Z),
  centerToleranceSquared: 0.1
  // EPSILON1;
};

// dist/type-utils.js
var import_core = require("@math.gl/core");
function identity(x) {
  return x;
}
var scratchVector = new import_core.Vector3();
function fromCartographic(cartographic, result = [], map = identity) {
  if ("longitude" in cartographic) {
    result[0] = map(cartographic.longitude);
    result[1] = map(cartographic.latitude);
    result[2] = cartographic.height;
  } else if ("x" in cartographic) {
    result[0] = map(cartographic.x);
    result[1] = map(cartographic.y);
    result[2] = cartographic.z;
  } else {
    result[0] = map(cartographic[0]);
    result[1] = map(cartographic[1]);
    result[2] = cartographic[2];
  }
  return result;
}
function fromCartographicToRadians(cartographic, vector = []) {
  return fromCartographic(cartographic, vector, import_core.config._cartographicRadians ? identity : import_core.toRadians);
}
function toCartographic(vector, cartographic, map = identity) {
  if ("longitude" in cartographic) {
    cartographic.longitude = map(vector[0]);
    cartographic.latitude = map(vector[1]);
    cartographic.height = vector[2];
  } else if ("x" in cartographic) {
    cartographic.x = map(vector[0]);
    cartographic.y = map(vector[1]);
    cartographic.z = vector[2];
  } else {
    cartographic[0] = map(vector[0]);
    cartographic[1] = map(vector[1]);
    cartographic[2] = vector[2];
  }
  return cartographic;
}
function toCartographicFromRadians(vector, cartographic) {
  return toCartographic(vector, cartographic, import_core.config._cartographicRadians ? identity : import_core.toDegrees);
}
function isWGS84(vector) {
  if (!vector) {
    return false;
  }
  scratchVector.from(vector);
  const { oneOverRadiiSquared, centerToleranceSquared } = WGS84_CONSTANTS;
  const x2 = vector[0] * vector[0] * oneOverRadiiSquared[0];
  const y2 = vector[1] * vector[1] * oneOverRadiiSquared[1];
  const z2 = vector[2] * vector[2] * oneOverRadiiSquared[2];
  return Math.abs(x2 + y2 + z2 - 1) < centerToleranceSquared;
}

// dist/ellipsoid/helpers/ellipsoid-transform.js
var import_core2 = require("@math.gl/core");
var EPSILON14 = 1e-14;
var scratchOrigin = new import_core2.Vector3();
var VECTOR_PRODUCT_LOCAL_FRAME = {
  up: {
    south: "east",
    north: "west",
    west: "south",
    east: "north"
  },
  down: {
    south: "west",
    north: "east",
    west: "north",
    east: "south"
  },
  south: {
    up: "west",
    down: "east",
    west: "down",
    east: "up"
  },
  north: {
    up: "east",
    down: "west",
    west: "up",
    east: "down"
  },
  west: {
    up: "north",
    down: "south",
    north: "down",
    south: "up"
  },
  east: {
    up: "south",
    down: "north",
    north: "up",
    south: "down"
  }
};
var degeneratePositionLocalFrame = {
  north: [-1, 0, 0],
  east: [0, 1, 0],
  up: [0, 0, 1],
  south: [1, 0, 0],
  west: [0, -1, 0],
  down: [0, 0, -1]
};
var scratchAxisVectors = {
  east: new import_core2.Vector3(),
  north: new import_core2.Vector3(),
  up: new import_core2.Vector3(),
  west: new import_core2.Vector3(),
  south: new import_core2.Vector3(),
  down: new import_core2.Vector3()
};
var scratchVector1 = new import_core2.Vector3();
var scratchVector2 = new import_core2.Vector3();
var scratchVector3 = new import_core2.Vector3();
function localFrameToFixedFrame(ellipsoid, firstAxis, secondAxis, thirdAxis, cartesianOrigin, result) {
  const thirdAxisInferred = VECTOR_PRODUCT_LOCAL_FRAME[firstAxis] && VECTOR_PRODUCT_LOCAL_FRAME[firstAxis][secondAxis];
  (0, import_core2.assert)(thirdAxisInferred && (!thirdAxis || thirdAxis === thirdAxisInferred));
  let firstAxisVector;
  let secondAxisVector;
  let thirdAxisVector;
  const origin = scratchOrigin.copy(cartesianOrigin);
  const atPole = (0, import_core2.equals)(origin.x, 0, EPSILON14) && (0, import_core2.equals)(origin.y, 0, EPSILON14);
  if (atPole) {
    const sign = Math.sign(origin.z);
    firstAxisVector = scratchVector1.fromArray(degeneratePositionLocalFrame[firstAxis]);
    if (firstAxis !== "east" && firstAxis !== "west") {
      firstAxisVector.scale(sign);
    }
    secondAxisVector = scratchVector2.fromArray(degeneratePositionLocalFrame[secondAxis]);
    if (secondAxis !== "east" && secondAxis !== "west") {
      secondAxisVector.scale(sign);
    }
    thirdAxisVector = scratchVector3.fromArray(degeneratePositionLocalFrame[thirdAxis]);
    if (thirdAxis !== "east" && thirdAxis !== "west") {
      thirdAxisVector.scale(sign);
    }
  } else {
    const { up, east, north } = scratchAxisVectors;
    east.set(-origin.y, origin.x, 0).normalize();
    ellipsoid.geodeticSurfaceNormal(origin, up);
    north.copy(up).cross(east);
    const { down, west, south } = scratchAxisVectors;
    down.copy(up).scale(-1);
    west.copy(east).scale(-1);
    south.copy(north).scale(-1);
    firstAxisVector = scratchAxisVectors[firstAxis];
    secondAxisVector = scratchAxisVectors[secondAxis];
    thirdAxisVector = scratchAxisVectors[thirdAxis];
  }
  result[0] = firstAxisVector.x;
  result[1] = firstAxisVector.y;
  result[2] = firstAxisVector.z;
  result[3] = 0;
  result[4] = secondAxisVector.x;
  result[5] = secondAxisVector.y;
  result[6] = secondAxisVector.z;
  result[7] = 0;
  result[8] = thirdAxisVector.x;
  result[9] = thirdAxisVector.y;
  result[10] = thirdAxisVector.z;
  result[11] = 0;
  result[12] = origin.x;
  result[13] = origin.y;
  result[14] = origin.z;
  result[15] = 1;
  return result;
}

// dist/ellipsoid/helpers/scale-to-geodetic-surface.js
var import_core3 = require("@math.gl/core");
var scratchVector4 = new import_core3.Vector3();
var scaleToGeodeticSurfaceIntersection = new import_core3.Vector3();
var scaleToGeodeticSurfaceGradient = new import_core3.Vector3();
function scaleToGeodeticSurface(cartesian, ellipsoid, result = []) {
  const { oneOverRadii, oneOverRadiiSquared, centerToleranceSquared } = ellipsoid;
  scratchVector4.from(cartesian);
  const positionX = scratchVector4.x;
  const positionY = scratchVector4.y;
  const positionZ = scratchVector4.z;
  const oneOverRadiiX = oneOverRadii.x;
  const oneOverRadiiY = oneOverRadii.y;
  const oneOverRadiiZ = oneOverRadii.z;
  const x2 = positionX * positionX * oneOverRadiiX * oneOverRadiiX;
  const y2 = positionY * positionY * oneOverRadiiY * oneOverRadiiY;
  const z2 = positionZ * positionZ * oneOverRadiiZ * oneOverRadiiZ;
  const squaredNorm = x2 + y2 + z2;
  const ratio = Math.sqrt(1 / squaredNorm);
  if (!Number.isFinite(ratio)) {
    return void 0;
  }
  const intersection = scaleToGeodeticSurfaceIntersection;
  intersection.copy(cartesian).scale(ratio);
  if (squaredNorm < centerToleranceSquared) {
    return intersection.to(result);
  }
  const oneOverRadiiSquaredX = oneOverRadiiSquared.x;
  const oneOverRadiiSquaredY = oneOverRadiiSquared.y;
  const oneOverRadiiSquaredZ = oneOverRadiiSquared.z;
  const gradient = scaleToGeodeticSurfaceGradient;
  gradient.set(intersection.x * oneOverRadiiSquaredX * 2, intersection.y * oneOverRadiiSquaredY * 2, intersection.z * oneOverRadiiSquaredZ * 2);
  let lambda = (1 - ratio) * scratchVector4.len() / (0.5 * gradient.len());
  let correction = 0;
  let xMultiplier;
  let yMultiplier;
  let zMultiplier;
  let func;
  do {
    lambda -= correction;
    xMultiplier = 1 / (1 + lambda * oneOverRadiiSquaredX);
    yMultiplier = 1 / (1 + lambda * oneOverRadiiSquaredY);
    zMultiplier = 1 / (1 + lambda * oneOverRadiiSquaredZ);
    const xMultiplier2 = xMultiplier * xMultiplier;
    const yMultiplier2 = yMultiplier * yMultiplier;
    const zMultiplier2 = zMultiplier * zMultiplier;
    const xMultiplier3 = xMultiplier2 * xMultiplier;
    const yMultiplier3 = yMultiplier2 * yMultiplier;
    const zMultiplier3 = zMultiplier2 * zMultiplier;
    func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1;
    const denominator = x2 * xMultiplier3 * oneOverRadiiSquaredX + y2 * yMultiplier3 * oneOverRadiiSquaredY + z2 * zMultiplier3 * oneOverRadiiSquaredZ;
    const derivative = -2 * denominator;
    correction = func / derivative;
  } while (Math.abs(func) > import_core3._MathUtils.EPSILON12);
  return scratchVector4.scale([xMultiplier, yMultiplier, zMultiplier]).to(result);
}

// dist/ellipsoid/ellipsoid.js
var scratchVector5 = new import_core4.Vector3();
var scratchNormal = new import_core4.Vector3();
var scratchK = new import_core4.Vector3();
var scratchPosition = new import_core4.Vector3();
var scratchHeight = new import_core4.Vector3();
var scratchCartesian = new import_core4.Vector3();
var Ellipsoid = class {
  constructor(x = 0, y = 0, z = 0) {
    this.centerToleranceSquared = import_core4._MathUtils.EPSILON1;
    (0, import_core4.assert)(x >= 0);
    (0, import_core4.assert)(y >= 0);
    (0, import_core4.assert)(z >= 0);
    this.radii = new import_core4.Vector3(x, y, z);
    this.radiiSquared = new import_core4.Vector3(x * x, y * y, z * z);
    this.radiiToTheFourth = new import_core4.Vector3(x * x * x * x, y * y * y * y, z * z * z * z);
    this.oneOverRadii = new import_core4.Vector3(x === 0 ? 0 : 1 / x, y === 0 ? 0 : 1 / y, z === 0 ? 0 : 1 / z);
    this.oneOverRadiiSquared = new import_core4.Vector3(x === 0 ? 0 : 1 / (x * x), y === 0 ? 0 : 1 / (y * y), z === 0 ? 0 : 1 / (z * z));
    this.minimumRadius = Math.min(x, y, z);
    this.maximumRadius = Math.max(x, y, z);
    if (this.radiiSquared.z !== 0) {
      this.squaredXOverSquaredZ = this.radiiSquared.x / this.radiiSquared.z;
    }
    Object.freeze(this);
  }
  /** Compares this Ellipsoid against the provided Ellipsoid componentwise */
  equals(right) {
    return this === right || Boolean(right && this.radii.equals(right.radii));
  }
  /** Creates a string representing this Ellipsoid in the format '(radii.x, radii.y, radii.z)'. */
  toString() {
    return this.radii.toString();
  }
  cartographicToCartesian(cartographic, result = [0, 0, 0]) {
    const normal = scratchNormal;
    const k = scratchK;
    const [, , height] = cartographic;
    this.geodeticSurfaceNormalCartographic(cartographic, normal);
    k.copy(this.radiiSquared).scale(normal);
    const gamma = Math.sqrt(normal.dot(k));
    k.scale(1 / gamma);
    normal.scale(height);
    k.add(normal);
    return k.to(result);
  }
  cartesianToCartographic(cartesian, result = [0, 0, 0]) {
    scratchCartesian.from(cartesian);
    const point = this.scaleToGeodeticSurface(scratchCartesian, scratchPosition);
    if (!point) {
      return void 0;
    }
    const normal = this.geodeticSurfaceNormal(point, scratchNormal);
    const h = scratchHeight;
    h.copy(scratchCartesian).subtract(point);
    const longitude = Math.atan2(normal.y, normal.x);
    const latitude = Math.asin(normal.z);
    const height = Math.sign(import_core4.vec3.dot(h, scratchCartesian)) * import_core4.vec3.length(h);
    return toCartographicFromRadians([longitude, latitude, height], result);
  }
  eastNorthUpToFixedFrame(origin, result = new import_core4.Matrix4()) {
    return localFrameToFixedFrame(this, "east", "north", "up", origin, result);
  }
  // Computes a 4x4 transformation matrix from a reference frame centered at
  // the provided origin to the ellipsoid's fixed reference frame.
  localFrameToFixedFrame(firstAxis, secondAxis, thirdAxis, origin, result = new import_core4.Matrix4()) {
    return localFrameToFixedFrame(this, firstAxis, secondAxis, thirdAxis, origin, result);
  }
  geocentricSurfaceNormal(cartesian, result = [0, 0, 0]) {
    return scratchVector5.from(cartesian).normalize().to(result);
  }
  geodeticSurfaceNormalCartographic(cartographic, result = [0, 0, 0]) {
    const cartographicVectorRadians = fromCartographicToRadians(cartographic);
    const longitude = cartographicVectorRadians[0];
    const latitude = cartographicVectorRadians[1];
    const cosLatitude = Math.cos(latitude);
    scratchVector5.set(cosLatitude * Math.cos(longitude), cosLatitude * Math.sin(longitude), Math.sin(latitude)).normalize();
    return scratchVector5.to(result);
  }
  geodeticSurfaceNormal(cartesian, result = [0, 0, 0]) {
    return scratchVector5.from(cartesian).scale(this.oneOverRadiiSquared).normalize().to(result);
  }
  /** Scales the provided Cartesian position along the geodetic surface normal
   * so that it is on the surface of this ellipsoid.  If the position is
   * at the center of the ellipsoid, this function returns undefined. */
  scaleToGeodeticSurface(cartesian, result) {
    return scaleToGeodeticSurface(cartesian, this, result);
  }
  /** Scales the provided Cartesian position along the geocentric surface normal
   * so that it is on the surface of this ellipsoid. */
  scaleToGeocentricSurface(cartesian, result = [0, 0, 0]) {
    scratchPosition.from(cartesian);
    const positionX = scratchPosition.x;
    const positionY = scratchPosition.y;
    const positionZ = scratchPosition.z;
    const oneOverRadiiSquared = this.oneOverRadiiSquared;
    const beta = 1 / Math.sqrt(positionX * positionX * oneOverRadiiSquared.x + positionY * positionY * oneOverRadiiSquared.y + positionZ * positionZ * oneOverRadiiSquared.z);
    return scratchPosition.multiplyScalar(beta).to(result);
  }
  /** Transforms a Cartesian X, Y, Z position to the ellipsoid-scaled space by multiplying
   * its components by the result of `Ellipsoid#oneOverRadii` */
  transformPositionToScaledSpace(position, result = [0, 0, 0]) {
    return scratchPosition.from(position).scale(this.oneOverRadii).to(result);
  }
  /** Transforms a Cartesian X, Y, Z position from the ellipsoid-scaled space by multiplying
   * its components by the result of `Ellipsoid#radii`. */
  transformPositionFromScaledSpace(position, result = [0, 0, 0]) {
    return scratchPosition.from(position).scale(this.radii).to(result);
  }
  /** Computes a point which is the intersection of the surface normal with the z-axis. */
  getSurfaceNormalIntersectionWithZAxis(position, buffer = 0, result = [0, 0, 0]) {
    (0, import_core4.assert)((0, import_core4.equals)(this.radii.x, this.radii.y, import_core4._MathUtils.EPSILON15));
    (0, import_core4.assert)(this.radii.z > 0);
    scratchPosition.from(position);
    const z = scratchPosition.z * (1 - this.squaredXOverSquaredZ);
    if (Math.abs(z) >= this.radii.z - buffer) {
      return void 0;
    }
    return scratchPosition.set(0, 0, z).to(result);
  }
};
Ellipsoid.WGS84 = new Ellipsoid(WGS84_RADIUS_X, WGS84_RADIUS_Y, WGS84_RADIUS_Z);
//# sourceMappingURL=index.cjs.map

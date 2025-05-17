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
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// dist/index.js
var dist_exports = {};
__export(dist_exports, {
  MAX_LATITUDE: () => MAX_LATITUDE,
  WebMercatorViewport: () => WebMercatorViewport,
  addMetersToLngLat: () => addMetersToLngLat,
  altitudeToFovy: () => altitudeToFovy,
  default: () => WebMercatorViewport,
  fitBounds: () => fitBounds,
  flyToViewport: () => flyToViewport,
  fovyToAltitude: () => fovyToAltitude,
  getBounds: () => getBounds,
  getDistanceScales: () => getDistanceScales,
  getFlyToDuration: () => getFlyToDuration,
  getMeterZoom: () => getMeterZoom,
  getProjectionMatrix: () => getProjectionMatrix,
  getProjectionParameters: () => getProjectionParameters,
  getViewMatrix: () => getViewMatrix,
  lngLatToWorld: () => lngLatToWorld,
  normalizeViewportProps: () => normalizeViewportProps,
  pixelsToWorld: () => pixelsToWorld,
  scaleToZoom: () => scaleToZoom,
  unitsPerMeter: () => unitsPerMeter,
  worldToLngLat: () => worldToLngLat,
  worldToPixels: () => worldToPixels,
  zoomToScale: () => zoomToScale
});
module.exports = __toCommonJS(dist_exports);

// dist/math-utils.js
var import_core = require("@math.gl/core");
function createMat4() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}
function transformVector(matrix, vector) {
  const result = import_core.vec4.transformMat4([], vector, matrix);
  import_core.vec4.scale(result, result, 1 / result[3]);
  return result;
}
function mod(value, divisor) {
  const modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
}
function lerp(start, end, step) {
  return step * end + (1 - step) * start;
}
function clamp(x, min, max) {
  return x < min ? min : x > max ? max : x;
}
function ieLog2(x) {
  return Math.log(x) * Math.LOG2E;
}
var log2 = Math.log2 || ieLog2;

// dist/web-mercator-utils.js
var import_core2 = require("@math.gl/core");

// dist/assert.js
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "@math.gl/web-mercator: assertion failed.");
  }
}

// dist/web-mercator-utils.js
var PI = Math.PI;
var PI_4 = PI / 4;
var DEGREES_TO_RADIANS = PI / 180;
var RADIANS_TO_DEGREES = 180 / PI;
var TILE_SIZE = 512;
var EARTH_CIRCUMFERENCE = 4003e4;
var MAX_LATITUDE = 85.051129;
var DEFAULT_ALTITUDE = 1.5;
function zoomToScale(zoom) {
  return Math.pow(2, zoom);
}
function scaleToZoom(scale) {
  return log2(scale);
}
function lngLatToWorld(lngLat) {
  const [lng, lat] = lngLat;
  assert(Number.isFinite(lng));
  assert(Number.isFinite(lat) && lat >= -90 && lat <= 90, "invalid latitude");
  const lambda2 = lng * DEGREES_TO_RADIANS;
  const phi2 = lat * DEGREES_TO_RADIANS;
  const x = TILE_SIZE * (lambda2 + PI) / (2 * PI);
  const y = TILE_SIZE * (PI + Math.log(Math.tan(PI_4 + phi2 * 0.5))) / (2 * PI);
  return [x, y];
}
function worldToLngLat(xy) {
  const [x, y] = xy;
  const lambda2 = x / TILE_SIZE * (2 * PI) - PI;
  const phi2 = 2 * (Math.atan(Math.exp(y / TILE_SIZE * (2 * PI) - PI)) - PI_4);
  return [lambda2 * RADIANS_TO_DEGREES, phi2 * RADIANS_TO_DEGREES];
}
function getMeterZoom(options) {
  const { latitude } = options;
  assert(Number.isFinite(latitude));
  const latCosine = Math.cos(latitude * DEGREES_TO_RADIANS);
  return scaleToZoom(EARTH_CIRCUMFERENCE * latCosine) - 9;
}
function unitsPerMeter(latitude) {
  const latCosine = Math.cos(latitude * DEGREES_TO_RADIANS);
  return TILE_SIZE / EARTH_CIRCUMFERENCE / latCosine;
}
function getDistanceScales(options) {
  const { latitude, longitude, highPrecision = false } = options;
  assert(Number.isFinite(latitude) && Number.isFinite(longitude));
  const worldSize = TILE_SIZE;
  const latCosine = Math.cos(latitude * DEGREES_TO_RADIANS);
  const unitsPerDegreeX = worldSize / 360;
  const unitsPerDegreeY = unitsPerDegreeX / latCosine;
  const altUnitsPerMeter = worldSize / EARTH_CIRCUMFERENCE / latCosine;
  const result = {
    unitsPerMeter: [altUnitsPerMeter, altUnitsPerMeter, altUnitsPerMeter],
    metersPerUnit: [1 / altUnitsPerMeter, 1 / altUnitsPerMeter, 1 / altUnitsPerMeter],
    unitsPerDegree: [unitsPerDegreeX, unitsPerDegreeY, altUnitsPerMeter],
    degreesPerUnit: [1 / unitsPerDegreeX, 1 / unitsPerDegreeY, 1 / altUnitsPerMeter]
  };
  if (highPrecision) {
    const latCosine2 = DEGREES_TO_RADIANS * Math.tan(latitude * DEGREES_TO_RADIANS) / latCosine;
    const unitsPerDegreeY2 = unitsPerDegreeX * latCosine2 / 2;
    const altUnitsPerDegree2 = worldSize / EARTH_CIRCUMFERENCE * latCosine2;
    const altUnitsPerMeter2 = altUnitsPerDegree2 / unitsPerDegreeY * altUnitsPerMeter;
    result.unitsPerDegree2 = [0, unitsPerDegreeY2, altUnitsPerDegree2];
    result.unitsPerMeter2 = [altUnitsPerMeter2, 0, altUnitsPerMeter2];
  }
  return result;
}
function addMetersToLngLat(lngLatZ, xyz) {
  const [longitude, latitude, z0] = lngLatZ;
  const [x, y, z] = xyz;
  const { unitsPerMeter: unitsPerMeter2, unitsPerMeter2: unitsPerMeter22 } = getDistanceScales({
    longitude,
    latitude,
    highPrecision: true
  });
  const worldspace = lngLatToWorld(lngLatZ);
  worldspace[0] += x * (unitsPerMeter2[0] + unitsPerMeter22[0] * y);
  worldspace[1] += y * (unitsPerMeter2[1] + unitsPerMeter22[1] * y);
  const newLngLat = worldToLngLat(worldspace);
  const newZ = (z0 || 0) + (z || 0);
  return Number.isFinite(z0) || Number.isFinite(z) ? [newLngLat[0], newLngLat[1], newZ] : newLngLat;
}
function getViewMatrix(options) {
  const {
    // Viewport props
    height,
    pitch,
    bearing,
    altitude,
    // Pre-calculated parameters
    scale,
    center
  } = options;
  const vm = createMat4();
  import_core2.mat4.translate(vm, vm, [0, 0, -altitude]);
  import_core2.mat4.rotateX(vm, vm, -pitch * DEGREES_TO_RADIANS);
  import_core2.mat4.rotateZ(vm, vm, bearing * DEGREES_TO_RADIANS);
  const relativeScale = scale / height;
  import_core2.mat4.scale(vm, vm, [relativeScale, relativeScale, relativeScale]);
  if (center) {
    import_core2.mat4.translate(vm, vm, import_core2.vec3.negate([], center));
  }
  return vm;
}
function getProjectionParameters(options) {
  const { width, height, altitude, pitch = 0, offset, center, scale, nearZMultiplier = 1, farZMultiplier = 1 } = options;
  let { fovy = altitudeToFovy(DEFAULT_ALTITUDE) } = options;
  if (altitude !== void 0) {
    fovy = altitudeToFovy(altitude);
  }
  const fovRadians = fovy * DEGREES_TO_RADIANS;
  const pitchRadians = pitch * DEGREES_TO_RADIANS;
  const focalDistance = fovyToAltitude(fovy);
  let cameraToSeaLevelDistance = focalDistance;
  if (center) {
    cameraToSeaLevelDistance += center[2] * scale / Math.cos(pitchRadians) / height;
  }
  const fovAboveCenter = fovRadians * (0.5 + (offset ? offset[1] : 0) / height);
  const topHalfSurfaceDistance = Math.sin(fovAboveCenter) * cameraToSeaLevelDistance / Math.sin(clamp(Math.PI / 2 - pitchRadians - fovAboveCenter, 0.01, Math.PI - 0.01));
  const furthestDistance = Math.sin(pitchRadians) * topHalfSurfaceDistance + cameraToSeaLevelDistance;
  const horizonDistance = cameraToSeaLevelDistance * 10;
  const farZ = Math.min(furthestDistance * farZMultiplier, horizonDistance);
  return {
    fov: fovRadians,
    aspect: width / height,
    focalDistance,
    near: nearZMultiplier,
    far: farZ
  };
}
function getProjectionMatrix(options) {
  const { fov, aspect, near, far } = getProjectionParameters(options);
  const projectionMatrix = import_core2.mat4.perspective(
    [],
    fov,
    // fov in radians
    aspect,
    // aspect ratio
    near,
    // near plane
    far
    // far plane
  );
  return projectionMatrix;
}
function altitudeToFovy(altitude) {
  return 2 * Math.atan(0.5 / altitude) * RADIANS_TO_DEGREES;
}
function fovyToAltitude(fovy) {
  return 0.5 / Math.tan(0.5 * fovy * DEGREES_TO_RADIANS);
}
function worldToPixels(xyz, pixelProjectionMatrix) {
  const [x, y, z = 0] = xyz;
  assert(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z));
  return transformVector(pixelProjectionMatrix, [x, y, z, 1]);
}
function pixelsToWorld(xyz, pixelUnprojectionMatrix, targetZ = 0) {
  const [x, y, z] = xyz;
  assert(Number.isFinite(x) && Number.isFinite(y), "invalid pixel coordinate");
  if (Number.isFinite(z)) {
    const coord = transformVector(pixelUnprojectionMatrix, [x, y, z, 1]);
    return coord;
  }
  const coord0 = transformVector(pixelUnprojectionMatrix, [x, y, 0, 1]);
  const coord1 = transformVector(pixelUnprojectionMatrix, [x, y, 1, 1]);
  const z0 = coord0[2];
  const z1 = coord1[2];
  const t = z0 === z1 ? 0 : ((targetZ || 0) - z0) / (z1 - z0);
  return import_core2.vec2.lerp([], coord0, coord1, t);
}

// dist/fit-bounds.js
function fitBounds(options) {
  const {
    width,
    height,
    bounds,
    minExtent = 0,
    // 0.01 would be about 1000 meters (degree is ~110KM)
    maxZoom = 24,
    // ~x4,000,000 => About 10 meter extents
    offset = [0, 0]
  } = options;
  const [[west, south], [east, north]] = bounds;
  const padding = getPaddingObject(options.padding);
  const nw = lngLatToWorld([west, clamp(north, -MAX_LATITUDE, MAX_LATITUDE)]);
  const se = lngLatToWorld([east, clamp(south, -MAX_LATITUDE, MAX_LATITUDE)]);
  const size = [
    Math.max(Math.abs(se[0] - nw[0]), minExtent),
    Math.max(Math.abs(se[1] - nw[1]), minExtent)
  ];
  const targetSize = [
    width - padding.left - padding.right - Math.abs(offset[0]) * 2,
    height - padding.top - padding.bottom - Math.abs(offset[1]) * 2
  ];
  assert(targetSize[0] > 0 && targetSize[1] > 0);
  const scaleX = targetSize[0] / size[0];
  const scaleY = targetSize[1] / size[1];
  const offsetX = (padding.right - padding.left) / 2 / scaleX;
  const offsetY = (padding.top - padding.bottom) / 2 / scaleY;
  const center = [(se[0] + nw[0]) / 2 + offsetX, (se[1] + nw[1]) / 2 + offsetY];
  const centerLngLat = worldToLngLat(center);
  const zoom = Math.min(maxZoom, log2(Math.abs(Math.min(scaleX, scaleY))));
  assert(Number.isFinite(zoom));
  return {
    longitude: centerLngLat[0],
    latitude: centerLngLat[1],
    zoom
  };
}
function getPaddingObject(padding = 0) {
  if (typeof padding === "number") {
    return {
      top: padding,
      bottom: padding,
      left: padding,
      right: padding
    };
  }
  assert(Number.isFinite(padding.top) && Number.isFinite(padding.bottom) && Number.isFinite(padding.left) && Number.isFinite(padding.right));
  return padding;
}

// dist/get-bounds.js
var import_core3 = require("@math.gl/core");
var DEGREES_TO_RADIANS2 = Math.PI / 180;
function getBounds(viewport, z = 0) {
  const { width, height, unproject } = viewport;
  const unprojectOps = { targetZ: z };
  const bottomLeft = unproject([0, height], unprojectOps);
  const bottomRight = unproject([width, height], unprojectOps);
  let topLeft;
  let topRight;
  const halfFov = viewport.fovy ? 0.5 * viewport.fovy * DEGREES_TO_RADIANS2 : Math.atan(0.5 / viewport.altitude);
  const angleToGround = (90 - viewport.pitch) * DEGREES_TO_RADIANS2;
  if (halfFov > angleToGround - 0.01) {
    topLeft = unprojectOnFarPlane(viewport, 0, z);
    topRight = unprojectOnFarPlane(viewport, width, z);
  } else {
    topLeft = unproject([0, 0], unprojectOps);
    topRight = unproject([width, 0], unprojectOps);
  }
  return [bottomLeft, bottomRight, topRight, topLeft];
}
function unprojectOnFarPlane(viewport, x, targetZ) {
  const { pixelUnprojectionMatrix } = viewport;
  const coord0 = transformVector(pixelUnprojectionMatrix, [x, 0, 1, 1]);
  const coord1 = transformVector(pixelUnprojectionMatrix, [x, viewport.height, 1, 1]);
  const z = targetZ * viewport.distanceScales.unitsPerMeter[2];
  const t = (z - coord0[2]) / (coord1[2] - coord0[2]);
  const coord = import_core3.vec2.lerp([], coord0, coord1, t);
  const result = worldToLngLat(coord);
  result.push(targetZ);
  return result;
}

// dist/web-mercator-viewport.js
var import_core4 = require("@math.gl/core");
var WebMercatorViewport = class {
  /**
   * @classdesc
   * Creates view/projection matrices from mercator params
   * Note: The Viewport is immutable in the sense that it only has accessors.
   * A new viewport instance should be created if any parameters have changed.
   */
  // eslint-disable-next-line max-statements
  constructor(props = { width: 1, height: 1 }) {
    this.equals = (viewport) => {
      if (!(viewport instanceof WebMercatorViewport)) {
        return false;
      }
      return viewport.width === this.width && viewport.height === this.height && import_core4.mat4.equals(viewport.projectionMatrix, this.projectionMatrix) && import_core4.mat4.equals(viewport.viewMatrix, this.viewMatrix);
    };
    this.project = (lngLatZ, options = {}) => {
      const { topLeft = true } = options;
      const worldPosition = this.projectPosition(lngLatZ);
      const coord = worldToPixels(worldPosition, this.pixelProjectionMatrix);
      const [x, y] = coord;
      const y2 = topLeft ? y : this.height - y;
      return lngLatZ.length === 2 ? [x, y2] : [x, y2, coord[2]];
    };
    this.unproject = (xyz, options = {}) => {
      const { topLeft = true, targetZ = void 0 } = options;
      const [x, y, z] = xyz;
      const y2 = topLeft ? y : this.height - y;
      const targetZWorld = targetZ && targetZ * this.distanceScales.unitsPerMeter[2];
      const coord = pixelsToWorld([x, y2, z], this.pixelUnprojectionMatrix, targetZWorld);
      const [X, Y, Z] = this.unprojectPosition(coord);
      if (Number.isFinite(z)) {
        return [X, Y, Z];
      }
      return Number.isFinite(targetZ) ? [X, Y, targetZ] : [X, Y];
    };
    this.projectPosition = (xyz) => {
      const [X, Y] = lngLatToWorld(xyz);
      const Z = (xyz[2] || 0) * this.distanceScales.unitsPerMeter[2];
      return [X, Y, Z];
    };
    this.unprojectPosition = (xyz) => {
      const [X, Y] = worldToLngLat(xyz);
      const Z = (xyz[2] || 0) * this.distanceScales.metersPerUnit[2];
      return [X, Y, Z];
    };
    let {
      // Map state
      width,
      height,
      altitude = null,
      fovy = null
    } = props;
    const { latitude = 0, longitude = 0, zoom = 0, pitch = 0, bearing = 0, position = null, nearZMultiplier = 0.02, farZMultiplier = 1.01 } = props;
    width = width || 1;
    height = height || 1;
    if (fovy === null && altitude === null) {
      altitude = DEFAULT_ALTITUDE;
      fovy = altitudeToFovy(altitude);
    } else if (fovy === null) {
      fovy = altitudeToFovy(altitude);
    } else if (altitude === null) {
      altitude = fovyToAltitude(fovy);
    }
    const scale = zoomToScale(zoom);
    altitude = Math.max(0.75, altitude);
    const distanceScales = getDistanceScales({ longitude, latitude });
    const center = lngLatToWorld([longitude, latitude]);
    center.push(0);
    if (position) {
      import_core4.vec3.add(center, center, import_core4.vec3.mul([], position, distanceScales.unitsPerMeter));
    }
    this.projectionMatrix = getProjectionMatrix({
      width,
      height,
      scale,
      center,
      pitch,
      fovy,
      nearZMultiplier,
      farZMultiplier
    });
    this.viewMatrix = getViewMatrix({
      height,
      scale,
      center,
      pitch,
      bearing,
      altitude
    });
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoom = zoom;
    this.pitch = pitch;
    this.bearing = bearing;
    this.altitude = altitude;
    this.fovy = fovy;
    this.center = center;
    this.meterOffset = position || [0, 0, 0];
    this.distanceScales = distanceScales;
    this._initMatrices();
    Object.freeze(this);
  }
  _initMatrices() {
    const { width, height, projectionMatrix, viewMatrix } = this;
    const vpm = createMat4();
    import_core4.mat4.multiply(vpm, vpm, projectionMatrix);
    import_core4.mat4.multiply(vpm, vpm, viewMatrix);
    this.viewProjectionMatrix = vpm;
    const m = createMat4();
    import_core4.mat4.scale(m, m, [width / 2, -height / 2, 1]);
    import_core4.mat4.translate(m, m, [1, -1, 0]);
    import_core4.mat4.multiply(m, m, vpm);
    const mInverse = import_core4.mat4.invert(createMat4(), m);
    if (!mInverse) {
      throw new Error("Pixel project matrix not invertible");
    }
    this.pixelProjectionMatrix = m;
    this.pixelUnprojectionMatrix = mInverse;
  }
  /**
   * Project [lng,lat] on sphere onto [x,y] on 512*512 Mercator Zoom 0 tile.
   * Performs the nonlinear part of the web mercator projection.
   * Remaining projection is done with 4x4 matrices which also handles
   * perspective.
   *
   * @param lngLat - [lng, lat] coordinates
   *   Specifies a point on the sphere to project onto the map.
   * @return [x,y] coordinates.
   */
  projectFlat(lngLat) {
    return lngLatToWorld(lngLat);
  }
  /**
   * Unproject world point [x,y] on map onto {lat, lon} on sphere
   *
   * @param xy - array with [x,y] members
   *  representing point on projected map plane
   * @return - array with [lat,lon] of point on sphere.
   *   Has toArray method if you need a GeoJSON Array.
   *   Per cartographic tradition, lat and lon are specified as degrees.
   */
  unprojectFlat(xy) {
    return worldToLngLat(xy);
  }
  /**
   * Get the map center that place a given [lng, lat] coordinate at screen point [x, y]
   * @param opt
   * @param opt.lngLat - [lng,lat] coordinates
   *   Specifies a point on the sphere.
   * @param opt.pos - [x,y] coordinates
   *   Specifies a point on the screen.
   * @return [lng,lat] new map center.
   */
  getMapCenterByLngLatPosition({ lngLat, pos }) {
    const fromLocation = pixelsToWorld(pos, this.pixelUnprojectionMatrix);
    const toLocation = lngLatToWorld(lngLat);
    const translate = import_core4.vec2.add([], toLocation, import_core4.vec2.negate([], fromLocation));
    const newCenter = import_core4.vec2.add([], this.center, translate);
    return worldToLngLat(newCenter);
  }
  /**
   * Returns a new viewport that fit around the given rectangle.
   * Only supports non-perspective mode.
   * @param bounds - [[lon, lat], [lon, lat]]
   * @param [options]
   * @param [options.padding] - The amount of padding in pixels to add to the given bounds.
   * @param [options.offset] - The center of the given bounds relative to the map's center,
   *    [x, y] measured in pixels.
   * @returns {WebMercatorViewport}
   */
  fitBounds(bounds, options = {}) {
    const { width, height } = this;
    const { longitude, latitude, zoom } = fitBounds(Object.assign({ width, height, bounds }, options));
    return new WebMercatorViewport({ width, height, longitude, latitude, zoom });
  }
  /**
   * Returns the bounding box of the viewport.
   * @param [options]
   * @param [options.z] - The altitude at which the bounds should be calculated.
   * @returns {Array} bounds - [[lon, lat], [lon, lat]]
   */
  getBounds(options) {
    const corners = this.getBoundingRegion(options);
    const west = Math.min(...corners.map((p) => p[0]));
    const east = Math.max(...corners.map((p) => p[0]));
    const south = Math.min(...corners.map((p) => p[1]));
    const north = Math.max(...corners.map((p) => p[1]));
    return [
      [west, south],
      [east, north]
    ];
  }
  /**
   * Returns the bounding box of the viewport.
   * @param [options]
   * @param [options.z] - The altitude at which the bounds should be calculated.
   * @returns {Array} an array of 4 points that define the visible region
   */
  getBoundingRegion(options = {}) {
    return getBounds(this, options.z || 0);
  }
  // DEPRECATED
  /** @deprecated Legacy method name */
  getLocationAtPoint({ lngLat, pos }) {
    return this.getMapCenterByLngLatPosition({ lngLat, pos });
  }
};

// dist/normalize-viewport-props.js
var TILE_SIZE2 = 512;
function normalizeViewportProps(props) {
  const { width, height, pitch = 0 } = props;
  let { longitude, latitude, zoom, bearing = 0 } = props;
  if (longitude < -180 || longitude > 180) {
    longitude = mod(longitude + 180, 360) - 180;
  }
  if (bearing < -180 || bearing > 180) {
    bearing = mod(bearing + 180, 360) - 180;
  }
  const minZoom = log2(height / TILE_SIZE2);
  if (zoom <= minZoom) {
    zoom = minZoom;
    latitude = 0;
  } else {
    const halfHeightPixels = height / 2 / Math.pow(2, zoom);
    const minLatitude = worldToLngLat([0, halfHeightPixels])[1];
    if (latitude < minLatitude) {
      latitude = minLatitude;
    } else {
      const maxLatitude = worldToLngLat([0, TILE_SIZE2 - halfHeightPixels])[1];
      if (latitude > maxLatitude) {
        latitude = maxLatitude;
      }
    }
  }
  return { width, height, longitude, latitude, zoom, pitch, bearing };
}

// dist/fly-to-viewport.js
var import_core5 = require("@math.gl/core");
var EPSILON = 0.01;
var VIEWPORT_TRANSITION_PROPS = ["longitude", "latitude", "zoom"];
var DEFAULT_OPTS = {
  curve: 1.414,
  speed: 1.2
  // screenSpeed and maxDuration are used only if specified
};
function flyToViewport(startProps, endProps, t, options) {
  const { startZoom, startCenterXY, uDelta, w0, u1, S, rho, rho2, r0 } = getFlyToTransitionParams(startProps, endProps, options);
  if (u1 < EPSILON) {
    const viewport = {};
    for (const key of VIEWPORT_TRANSITION_PROPS) {
      const startValue = startProps[key];
      const endValue = endProps[key];
      viewport[key] = lerp(startValue, endValue, t);
    }
    return viewport;
  }
  const s = t * S;
  const w = Math.cosh(r0) / Math.cosh(r0 + rho * s);
  const u = w0 * ((Math.cosh(r0) * Math.tanh(r0 + rho * s) - Math.sinh(r0)) / rho2) / u1;
  const scaleIncrement = 1 / w;
  const newZoom = startZoom + scaleToZoom(scaleIncrement);
  const newCenterWorld = import_core5.vec2.scale([], uDelta, u);
  import_core5.vec2.add(newCenterWorld, newCenterWorld, startCenterXY);
  const newCenter = worldToLngLat(newCenterWorld);
  return {
    longitude: newCenter[0],
    latitude: newCenter[1],
    zoom: newZoom
  };
}
function getFlyToDuration(startProps, endProps, options) {
  const opts = { ...DEFAULT_OPTS, ...options };
  const { screenSpeed, speed, maxDuration } = opts;
  const { S, rho } = getFlyToTransitionParams(startProps, endProps, opts);
  const length = 1e3 * S;
  let duration;
  if (Number.isFinite(screenSpeed)) {
    duration = length / (screenSpeed / rho);
  } else {
    duration = length / speed;
  }
  return Number.isFinite(maxDuration) && duration > maxDuration ? 0 : duration;
}
function getFlyToTransitionParams(startProps, endProps, opts) {
  opts = Object.assign({}, DEFAULT_OPTS, opts);
  const rho = opts.curve;
  const startZoom = startProps.zoom;
  const startCenter = [startProps.longitude, startProps.latitude];
  const startScale = zoomToScale(startZoom);
  const endZoom = endProps.zoom;
  const endCenter = [endProps.longitude, endProps.latitude];
  const scale = zoomToScale(endZoom - startZoom);
  const startCenterXY = lngLatToWorld(startCenter);
  const endCenterXY = lngLatToWorld(endCenter);
  const uDelta = import_core5.vec2.sub([], endCenterXY, startCenterXY);
  const w0 = Math.max(startProps.width, startProps.height);
  const w1 = w0 / scale;
  const u1 = import_core5.vec2.length(uDelta) * startScale;
  const _u1 = Math.max(u1, EPSILON);
  const rho2 = rho * rho;
  const b0 = (w1 * w1 - w0 * w0 + rho2 * rho2 * _u1 * _u1) / (2 * w0 * rho2 * _u1);
  const b1 = (w1 * w1 - w0 * w0 - rho2 * rho2 * _u1 * _u1) / (2 * w1 * rho2 * _u1);
  const r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
  const r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
  const S = (r1 - r0) / rho;
  return { startZoom, startCenterXY, uDelta, w0, u1, S, rho, rho2, r0, r1 };
}
//# sourceMappingURL=index.cjs.map

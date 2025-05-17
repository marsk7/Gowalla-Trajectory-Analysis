"use strict";
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
  LOD_METRIC_TYPE: () => LOD_METRIC_TYPE,
  TILESET_TYPE: () => TILESET_TYPE,
  TILE_CONTENT_STATE: () => TILE_CONTENT_STATE,
  TILE_REFINEMENT: () => TILE_REFINEMENT,
  TILE_TYPE: () => TILE_TYPE,
  Tile3D: () => Tile3D,
  Tileset3D: () => Tileset3D,
  TilesetCache: () => TilesetCache,
  TilesetTraverser: () => TilesetTraverser,
  calculateTransformProps: () => calculateTransformProps,
  createBoundingVolume: () => createBoundingVolume,
  getFrameState: () => getFrameState,
  getLodStatus: () => getLodStatus
});
module.exports = __toCommonJS(dist_exports);

// dist/tileset/tileset-3d.js
var import_core10 = require("@math.gl/core");
var import_geospatial6 = require("@math.gl/geospatial");
var import_stats = require("@probe.gl/stats");
var import_loader_utils4 = require("@loaders.gl/loader-utils");

// dist/utils/doubly-linked-list-node.js
var DoublyLinkedListNode = class {
  item;
  previous;
  next;
  constructor(item, previous, next) {
    this.item = item;
    this.previous = previous;
    this.next = next;
  }
};

// dist/utils/doubly-linked-list.js
var DoublyLinkedList = class {
  head = null;
  tail = null;
  _length = 0;
  get length() {
    return this._length;
  }
  /**
   * Adds the item to the end of the list
   * @param {*} [item]
   * @return {DoublyLinkedListNode}
   */
  add(item) {
    const node = new DoublyLinkedListNode(item, this.tail, null);
    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    ++this._length;
    return node;
  }
  /**
   * Removes the given node from the list
   * @param {DoublyLinkedListNode} node
   */
  remove(node) {
    if (!node) {
      return;
    }
    if (node.previous && node.next) {
      node.previous.next = node.next;
      node.next.previous = node.previous;
    } else if (node.previous) {
      node.previous.next = null;
      this.tail = node.previous;
    } else if (node.next) {
      node.next.previous = null;
      this.head = node.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    node.next = null;
    node.previous = null;
    --this._length;
  }
  /**
   * Moves nextNode after node
   * @param {DoublyLinkedListNode} node
   * @param {DoublyLinkedListNode} nextNode
   */
  splice(node, nextNode) {
    if (node === nextNode) {
      return;
    }
    this.remove(nextNode);
    this._insert(node, nextNode);
  }
  _insert(node, nextNode) {
    const oldNodeNext = node.next;
    node.next = nextNode;
    if (this.tail === node) {
      this.tail = nextNode;
    } else {
      oldNodeNext.previous = nextNode;
    }
    nextNode.next = oldNodeNext;
    nextNode.previous = node;
    ++this._length;
  }
};

// dist/tileset/tileset-cache.js
var TilesetCache = class {
  _list;
  _sentinel;
  _trimTiles;
  constructor() {
    this._list = new DoublyLinkedList();
    this._sentinel = this._list.add("sentinel");
    this._trimTiles = false;
  }
  reset() {
    this._list.splice(this._list.tail, this._sentinel);
  }
  touch(tile) {
    const node = tile._cacheNode;
    if (node) {
      this._list.splice(this._sentinel, node);
    }
  }
  add(tileset, tile, addCallback) {
    if (!tile._cacheNode) {
      tile._cacheNode = this._list.add(tile);
      if (addCallback) {
        addCallback(tileset, tile);
      }
    }
  }
  unloadTile(tileset, tile, unloadCallback) {
    const node = tile._cacheNode;
    if (!node) {
      return;
    }
    this._list.remove(node);
    tile._cacheNode = null;
    if (unloadCallback) {
      unloadCallback(tileset, tile);
    }
  }
  unloadTiles(tileset, unloadCallback) {
    const trimTiles = this._trimTiles;
    this._trimTiles = false;
    const list = this._list;
    const maximumMemoryUsageInBytes = tileset.maximumMemoryUsage * 1024 * 1024;
    const sentinel = this._sentinel;
    let node = list.head;
    while (node !== sentinel && (tileset.gpuMemoryUsageInBytes > maximumMemoryUsageInBytes || trimTiles)) {
      const tile = node.item;
      node = node.next;
      this.unloadTile(tileset, tile, unloadCallback);
    }
  }
  trim() {
    this._trimTiles = true;
  }
};

// dist/tileset/helpers/transform-utils.js
var import_geospatial = require("@math.gl/geospatial");
var import_core = require("@math.gl/core");
var import_loader_utils = require("@loaders.gl/loader-utils");
function calculateTransformProps(tileHeader, tile) {
  (0, import_loader_utils.assert)(tileHeader);
  (0, import_loader_utils.assert)(tile);
  const { rtcCenter, gltfUpAxis } = tile;
  const { computedTransform, boundingVolume: { center } } = tileHeader;
  let modelMatrix = new import_core.Matrix4(computedTransform);
  if (rtcCenter) {
    modelMatrix.translate(rtcCenter);
  }
  switch (gltfUpAxis) {
    case "Z":
      break;
    case "Y":
      const rotationY = new import_core.Matrix4().rotateX(Math.PI / 2);
      modelMatrix = modelMatrix.multiplyRight(rotationY);
      break;
    case "X":
      const rotationX = new import_core.Matrix4().rotateY(-Math.PI / 2);
      modelMatrix = modelMatrix.multiplyRight(rotationX);
      break;
    default:
      break;
  }
  if (tile.isQuantized) {
    modelMatrix.translate(tile.quantizedVolumeOffset).scale(tile.quantizedVolumeScale);
  }
  const cartesianOrigin = new import_core.Vector3(center);
  tile.cartesianModelMatrix = modelMatrix;
  tile.cartesianOrigin = cartesianOrigin;
  const cartographicOrigin = import_geospatial.Ellipsoid.WGS84.cartesianToCartographic(cartesianOrigin, new import_core.Vector3());
  const fromFixedFrameMatrix = import_geospatial.Ellipsoid.WGS84.eastNorthUpToFixedFrame(cartesianOrigin);
  const toFixedFrameMatrix = fromFixedFrameMatrix.invert();
  tile.cartographicModelMatrix = toFixedFrameMatrix.multiplyRight(modelMatrix);
  tile.cartographicOrigin = cartographicOrigin;
  if (!tile.coordinateSystem) {
    tile.modelMatrix = tile.cartographicModelMatrix;
  }
}

// dist/tileset/helpers/frame-state.js
var import_core2 = require("@math.gl/core");
var import_culling = require("@math.gl/culling");
var import_geospatial2 = require("@math.gl/geospatial");
var scratchVector = new import_core2.Vector3();
var scratchPosition = new import_core2.Vector3();
var cullingVolume = new import_culling.CullingVolume([
  new import_culling.Plane(),
  new import_culling.Plane(),
  new import_culling.Plane(),
  new import_culling.Plane(),
  new import_culling.Plane(),
  new import_culling.Plane()
]);
function getFrameState(viewport, frameNumber) {
  const { cameraDirection, cameraUp, height } = viewport;
  const { metersPerUnit } = viewport.distanceScales;
  const viewportCenterCartesian = worldToCartesian(viewport, viewport.center);
  const enuToFixedTransform = import_geospatial2.Ellipsoid.WGS84.eastNorthUpToFixedFrame(viewportCenterCartesian);
  const cameraPositionCartographic = viewport.unprojectPosition(viewport.cameraPosition);
  const cameraPositionCartesian2 = import_geospatial2.Ellipsoid.WGS84.cartographicToCartesian(cameraPositionCartographic, new import_core2.Vector3());
  const cameraDirectionCartesian = new import_core2.Vector3(
    // @ts-ignore
    enuToFixedTransform.transformAsVector(new import_core2.Vector3(cameraDirection).scale(metersPerUnit))
  ).normalize();
  const cameraUpCartesian = new import_core2.Vector3(
    // @ts-ignore
    enuToFixedTransform.transformAsVector(new import_core2.Vector3(cameraUp).scale(metersPerUnit))
  ).normalize();
  commonSpacePlanesToWGS84(viewport);
  const ViewportClass = viewport.constructor;
  const { longitude, latitude, width, bearing, zoom } = viewport;
  const topDownViewport = new ViewportClass({
    longitude,
    latitude,
    height,
    width,
    bearing,
    zoom,
    pitch: 0
  });
  return {
    camera: {
      position: cameraPositionCartesian2,
      direction: cameraDirectionCartesian,
      up: cameraUpCartesian
    },
    viewport,
    topDownViewport,
    height,
    cullingVolume,
    frameNumber,
    // TODO: This can be the same between updates, what number is unique for between updates?
    sseDenominator: 1.15
    // Assumes fovy = 60 degrees
  };
}
function limitSelectedTiles(tiles, frameState, maximumTilesSelected) {
  if (maximumTilesSelected === 0 || tiles.length <= maximumTilesSelected) {
    return [tiles, []];
  }
  const tuples = [];
  const { longitude: viewportLongitude, latitude: viewportLatitude } = frameState.viewport;
  for (const [index, tile] of tiles.entries()) {
    const [longitude, latitude] = tile.header.mbs;
    const deltaLon = Math.abs(viewportLongitude - longitude);
    const deltaLat = Math.abs(viewportLatitude - latitude);
    const distance = Math.sqrt(deltaLat * deltaLat + deltaLon * deltaLon);
    tuples.push([index, distance]);
  }
  const tuplesSorted = tuples.sort((a, b) => a[1] - b[1]);
  const selectedTiles = [];
  for (let i = 0; i < maximumTilesSelected; i++) {
    selectedTiles.push(tiles[tuplesSorted[i][0]]);
  }
  const unselectedTiles = [];
  for (let i = maximumTilesSelected; i < tuplesSorted.length; i++) {
    unselectedTiles.push(tiles[tuplesSorted[i][0]]);
  }
  return [selectedTiles, unselectedTiles];
}
function commonSpacePlanesToWGS84(viewport) {
  const frustumPlanes = viewport.getFrustumPlanes();
  const nearCenterCommon = closestPointOnPlane(frustumPlanes.near, viewport.cameraPosition);
  const nearCenterCartesian = worldToCartesian(viewport, nearCenterCommon);
  const cameraCartesian = worldToCartesian(viewport, viewport.cameraPosition, scratchPosition);
  let i = 0;
  cullingVolume.planes[i++].fromPointNormal(nearCenterCartesian, scratchVector.copy(nearCenterCartesian).subtract(cameraCartesian));
  for (const dir in frustumPlanes) {
    if (dir === "near") {
      continue;
    }
    const plane = frustumPlanes[dir];
    const posCommon = closestPointOnPlane(plane, nearCenterCommon, scratchPosition);
    const cartesianPos = worldToCartesian(viewport, posCommon, scratchPosition);
    cullingVolume.planes[i++].fromPointNormal(
      cartesianPos,
      // Want the normal to point into the frustum since that's what culling expects
      scratchVector.copy(nearCenterCartesian).subtract(cartesianPos)
    );
  }
}
function closestPointOnPlane(plane, refPoint, out = new import_core2.Vector3()) {
  const distanceToRef = plane.normal.dot(refPoint);
  out.copy(plane.normal).scale(plane.distance - distanceToRef).add(refPoint);
  return out;
}
function worldToCartesian(viewport, point, out = new import_core2.Vector3()) {
  const cartographicPos = viewport.unprojectPosition(point);
  return import_geospatial2.Ellipsoid.WGS84.cartographicToCartesian(cartographicPos, out);
}

// dist/tileset/helpers/zoom.js
var import_core3 = require("@math.gl/core");
var import_culling2 = require("@math.gl/culling");
var import_geospatial3 = require("@math.gl/geospatial");
var WGS84_RADIUS_X = 6378137;
var WGS84_RADIUS_Y = 6378137;
var WGS84_RADIUS_Z = 6356752314245179e-9;
var scratchVector2 = new import_core3.Vector3();
function getZoomFromBoundingVolume(boundingVolume, cartorgraphicCenter) {
  if (boundingVolume instanceof import_culling2.OrientedBoundingBox) {
    const { halfAxes } = boundingVolume;
    const obbSize = getObbSize(halfAxes);
    return Math.log2(WGS84_RADIUS_Z / (obbSize + cartorgraphicCenter[2]));
  } else if (boundingVolume instanceof import_culling2.BoundingSphere) {
    const { radius } = boundingVolume;
    return Math.log2(WGS84_RADIUS_Z / (radius + cartorgraphicCenter[2]));
  } else if (boundingVolume.width && boundingVolume.height) {
    const { width, height } = boundingVolume;
    const zoomX = Math.log2(WGS84_RADIUS_X / width);
    const zoomY = Math.log2(WGS84_RADIUS_Y / height);
    return (zoomX + zoomY) / 2;
  }
  return 1;
}
function getZoomFromFullExtent(fullExtent, cartorgraphicCenter, cartesianCenter) {
  import_geospatial3.Ellipsoid.WGS84.cartographicToCartesian([fullExtent.xmax, fullExtent.ymax, fullExtent.zmax], scratchVector2);
  const extentSize = Math.sqrt(Math.pow(scratchVector2[0] - cartesianCenter[0], 2) + Math.pow(scratchVector2[1] - cartesianCenter[1], 2) + Math.pow(scratchVector2[2] - cartesianCenter[2], 2));
  return Math.log2(WGS84_RADIUS_Z / (extentSize + cartorgraphicCenter[2]));
}
function getZoomFromExtent(extent, cartorgraphicCenter, cartesianCenter) {
  const [xmin, ymin, xmax, ymax] = extent;
  return getZoomFromFullExtent({ xmin, xmax, ymin, ymax, zmin: 0, zmax: 0 }, cartorgraphicCenter, cartesianCenter);
}
function getObbSize(halfAxes) {
  halfAxes.getColumn(0, scratchVector2);
  const axeY = halfAxes.getColumn(1);
  const axeZ = halfAxes.getColumn(2);
  const farthestVertex = scratchVector2.add(axeY).add(axeZ);
  const size = farthestVertex.len();
  return size;
}

// dist/tileset/tile-3d.js
var import_core7 = require("@math.gl/core");
var import_culling4 = require("@math.gl/culling");
var import_core8 = require("@loaders.gl/core");

// dist/constants.js
var TILE_CONTENT_STATE = {
  UNLOADED: 0,
  // Has never been requested
  LOADING: 1,
  // Is waiting on a pending request
  PROCESSING: 2,
  // Request received.  Contents are being processed for rendering.  Depending on the content, it might make its own requests for external data.
  READY: 3,
  // Ready to render.
  EXPIRED: 4,
  // Is expired and will be unloaded once new content is loaded.
  FAILED: 5
  // Request failed.
};
var TILE_REFINEMENT;
(function(TILE_REFINEMENT2) {
  TILE_REFINEMENT2[TILE_REFINEMENT2["ADD"] = 1] = "ADD";
  TILE_REFINEMENT2[TILE_REFINEMENT2["REPLACE"] = 2] = "REPLACE";
})(TILE_REFINEMENT || (TILE_REFINEMENT = {}));
var TILE_TYPE;
(function(TILE_TYPE2) {
  TILE_TYPE2["EMPTY"] = "empty";
  TILE_TYPE2["SCENEGRAPH"] = "scenegraph";
  TILE_TYPE2["POINTCLOUD"] = "pointcloud";
  TILE_TYPE2["MESH"] = "mesh";
})(TILE_TYPE || (TILE_TYPE = {}));
var TILESET_TYPE;
(function(TILESET_TYPE2) {
  TILESET_TYPE2["I3S"] = "I3S";
  TILESET_TYPE2["TILES3D"] = "TILES3D";
})(TILESET_TYPE || (TILESET_TYPE = {}));
var LOD_METRIC_TYPE;
(function(LOD_METRIC_TYPE2) {
  LOD_METRIC_TYPE2["GEOMETRIC_ERROR"] = "geometricError";
  LOD_METRIC_TYPE2["MAX_SCREEN_THRESHOLD"] = "maxScreenThreshold";
})(LOD_METRIC_TYPE || (LOD_METRIC_TYPE = {}));
var TILE3D_OPTIMIZATION_HINT = {
  NOT_COMPUTED: -1,
  USE_OPTIMIZATION: 1,
  SKIP_OPTIMIZATION: 0
};

// dist/tileset/helpers/bounding-volume.js
var import_core4 = require("@math.gl/core");
var import_culling3 = require("@math.gl/culling");
var import_geospatial4 = require("@math.gl/geospatial");
var import_loader_utils2 = require("@loaders.gl/loader-utils");
function defined(x) {
  return x !== void 0 && x !== null;
}
var scratchPoint = new import_core4.Vector3();
var scratchScale = new import_core4.Vector3();
var scratchNorthWest = new import_core4.Vector3();
var scratchSouthEast = new import_core4.Vector3();
var scratchCenter = new import_core4.Vector3();
var scratchXAxis = new import_core4.Vector3();
var scratchYAxis = new import_core4.Vector3();
var scratchZAxis = new import_core4.Vector3();
function createBoundingVolume(boundingVolumeHeader, transform, result) {
  (0, import_loader_utils2.assert)(boundingVolumeHeader, "3D Tile: boundingVolume must be defined");
  if (boundingVolumeHeader.box) {
    return createBox(boundingVolumeHeader.box, transform, result);
  }
  if (boundingVolumeHeader.region) {
    return createObbFromRegion(boundingVolumeHeader.region);
  }
  if (boundingVolumeHeader.sphere) {
    return createSphere(boundingVolumeHeader.sphere, transform, result);
  }
  throw new Error("3D Tile: boundingVolume must contain a sphere, region, or box");
}
function getCartographicBounds(boundingVolumeHeader, boundingVolume) {
  if (boundingVolumeHeader.box) {
    return orientedBoundingBoxToCartographicBounds(boundingVolume);
  }
  if (boundingVolumeHeader.region) {
    const [west, south, east, north, minHeight, maxHeight] = boundingVolumeHeader.region;
    return [
      [(0, import_core4.degrees)(west), (0, import_core4.degrees)(south), minHeight],
      [(0, import_core4.degrees)(east), (0, import_core4.degrees)(north), maxHeight]
    ];
  }
  if (boundingVolumeHeader.sphere) {
    return boundingSphereToCartographicBounds(boundingVolume);
  }
  throw new Error("Unkown boundingVolume type");
}
function createBox(box, transform, result) {
  const center = new import_core4.Vector3(box[0], box[1], box[2]);
  transform.transform(center, center);
  let origin = [];
  if (box.length === 10) {
    const halfSize = box.slice(3, 6);
    const quaternion = new import_core4.Quaternion();
    quaternion.fromArray(box, 6);
    const x = new import_core4.Vector3([1, 0, 0]);
    const y = new import_core4.Vector3([0, 1, 0]);
    const z = new import_core4.Vector3([0, 0, 1]);
    x.transformByQuaternion(quaternion);
    x.scale(halfSize[0]);
    y.transformByQuaternion(quaternion);
    y.scale(halfSize[1]);
    z.transformByQuaternion(quaternion);
    z.scale(halfSize[2]);
    origin = [...x.toArray(), ...y.toArray(), ...z.toArray()];
  } else {
    origin = [...box.slice(3, 6), ...box.slice(6, 9), ...box.slice(9, 12)];
  }
  const xAxis = transform.transformAsVector(origin.slice(0, 3));
  const yAxis = transform.transformAsVector(origin.slice(3, 6));
  const zAxis = transform.transformAsVector(origin.slice(6, 9));
  const halfAxes = new import_core4.Matrix3([
    xAxis[0],
    xAxis[1],
    xAxis[2],
    yAxis[0],
    yAxis[1],
    yAxis[2],
    zAxis[0],
    zAxis[1],
    zAxis[2]
  ]);
  if (defined(result)) {
    result.center = center;
    result.halfAxes = halfAxes;
    return result;
  }
  return new import_culling3.OrientedBoundingBox(center, halfAxes);
}
function createSphere(sphere, transform, result) {
  const center = new import_core4.Vector3(sphere[0], sphere[1], sphere[2]);
  transform.transform(center, center);
  const scale = transform.getScale(scratchScale);
  const uniformScale = Math.max(Math.max(scale[0], scale[1]), scale[2]);
  const radius = sphere[3] * uniformScale;
  if (defined(result)) {
    result.center = center;
    result.radius = radius;
    return result;
  }
  return new import_culling3.BoundingSphere(center, radius);
}
function createObbFromRegion(region) {
  const [west, south, east, north, minHeight, maxHeight] = region;
  const northWest = import_geospatial4.Ellipsoid.WGS84.cartographicToCartesian([(0, import_core4.degrees)(west), (0, import_core4.degrees)(north), minHeight], scratchNorthWest);
  const southEast = import_geospatial4.Ellipsoid.WGS84.cartographicToCartesian([(0, import_core4.degrees)(east), (0, import_core4.degrees)(south), maxHeight], scratchSouthEast);
  const centerInCartesian = new import_core4.Vector3().addVectors(northWest, southEast).multiplyByScalar(0.5);
  import_geospatial4.Ellipsoid.WGS84.cartesianToCartographic(centerInCartesian, scratchCenter);
  import_geospatial4.Ellipsoid.WGS84.cartographicToCartesian([(0, import_core4.degrees)(east), scratchCenter[1], scratchCenter[2]], scratchXAxis);
  import_geospatial4.Ellipsoid.WGS84.cartographicToCartesian([scratchCenter[0], (0, import_core4.degrees)(north), scratchCenter[2]], scratchYAxis);
  import_geospatial4.Ellipsoid.WGS84.cartographicToCartesian([scratchCenter[0], scratchCenter[1], maxHeight], scratchZAxis);
  return createBox([
    ...centerInCartesian,
    ...scratchXAxis.subtract(centerInCartesian),
    ...scratchYAxis.subtract(centerInCartesian),
    ...scratchZAxis.subtract(centerInCartesian)
  ], new import_core4.Matrix4());
}
function orientedBoundingBoxToCartographicBounds(boundingVolume) {
  const result = emptyCartographicBounds();
  const { halfAxes } = boundingVolume;
  const xAxis = new import_core4.Vector3(halfAxes.getColumn(0));
  const yAxis = new import_core4.Vector3(halfAxes.getColumn(1));
  const zAxis = new import_core4.Vector3(halfAxes.getColumn(2));
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
      for (let z = 0; z < 2; z++) {
        scratchPoint.copy(boundingVolume.center);
        scratchPoint.add(xAxis);
        scratchPoint.add(yAxis);
        scratchPoint.add(zAxis);
        addToCartographicBounds(result, scratchPoint);
        zAxis.negate();
      }
      yAxis.negate();
    }
    xAxis.negate();
  }
  return result;
}
function boundingSphereToCartographicBounds(boundingVolume) {
  const result = emptyCartographicBounds();
  const { center, radius } = boundingVolume;
  const point = import_geospatial4.Ellipsoid.WGS84.scaleToGeodeticSurface(center, scratchPoint);
  let zAxis;
  if (point) {
    zAxis = import_geospatial4.Ellipsoid.WGS84.geodeticSurfaceNormal(point);
  } else {
    zAxis = new import_core4.Vector3(0, 0, 1);
  }
  let xAxis = new import_core4.Vector3(zAxis[2], -zAxis[1], 0);
  if (xAxis.len() > 0) {
    xAxis.normalize();
  } else {
    xAxis = new import_core4.Vector3(0, 1, 0);
  }
  const yAxis = xAxis.clone().cross(zAxis);
  for (const axis of [xAxis, yAxis, zAxis]) {
    scratchScale.copy(axis).scale(radius);
    for (let dir = 0; dir < 2; dir++) {
      scratchPoint.copy(center);
      scratchPoint.add(scratchScale);
      addToCartographicBounds(result, scratchPoint);
      scratchScale.negate();
    }
  }
  return result;
}
function emptyCartographicBounds() {
  return [
    [Infinity, Infinity, Infinity],
    [-Infinity, -Infinity, -Infinity]
  ];
}
function addToCartographicBounds(target, cartesian) {
  import_geospatial4.Ellipsoid.WGS84.cartesianToCartographic(cartesian, scratchPoint);
  target[0][0] = Math.min(target[0][0], scratchPoint[0]);
  target[0][1] = Math.min(target[0][1], scratchPoint[1]);
  target[0][2] = Math.min(target[0][2], scratchPoint[2]);
  target[1][0] = Math.max(target[1][0], scratchPoint[0]);
  target[1][1] = Math.max(target[1][1], scratchPoint[1]);
  target[1][2] = Math.max(target[1][2], scratchPoint[2]);
}

// dist/tileset/helpers/tiles-3d-lod.js
var import_core5 = require("@math.gl/core");
var scratchPositionNormal = new import_core5.Vector3();
var scratchCartographic = new import_core5.Vector3();
var scratchMatrix = new import_core5.Matrix4();
var scratchCenter2 = new import_core5.Vector3();
var scratchPosition2 = new import_core5.Vector3();
var scratchDirection = new import_core5.Vector3();
function fog(distanceToCamera, density) {
  const scalar = distanceToCamera * density;
  return 1 - Math.exp(-(scalar * scalar));
}
function getDynamicScreenSpaceError(tileset, distanceToCamera) {
  if (tileset.dynamicScreenSpaceError && tileset.dynamicScreenSpaceErrorComputedDensity) {
    const density = tileset.dynamicScreenSpaceErrorComputedDensity;
    const factor = tileset.dynamicScreenSpaceErrorFactor;
    const dynamicError = fog(distanceToCamera, density) * factor;
    return dynamicError;
  }
  return 0;
}
function getTiles3DScreenSpaceError(tile, frameState, useParentLodMetric) {
  const tileset = tile.tileset;
  const parentLodMetricValue = tile.parent && tile.parent.lodMetricValue || tile.lodMetricValue;
  const lodMetricValue = useParentLodMetric ? parentLodMetricValue : tile.lodMetricValue;
  if (lodMetricValue === 0) {
    return 0;
  }
  const distance = Math.max(tile._distanceToCamera, 1e-7);
  const { height, sseDenominator } = frameState;
  const { viewDistanceScale } = tileset.options;
  let error = lodMetricValue * height * (viewDistanceScale || 1) / (distance * sseDenominator);
  error -= getDynamicScreenSpaceError(tileset, distance);
  return error;
}

// dist/tileset/helpers/i3s-lod.js
var import_core6 = require("@math.gl/core");
var import_geospatial5 = require("@math.gl/geospatial");
var cameraPositionCartesian = new import_core6.Vector3();
var toEye = new import_core6.Vector3();
var cameraPositionEnu = new import_core6.Vector3();
var extraVertexEnu = new import_core6.Vector3();
var projectedOriginVector = new import_core6.Vector3();
var enuToCartesianMatrix = new import_core6.Matrix4();
var cartesianToEnuMatrix = new import_core6.Matrix4();
function getLodStatus(tile, frameState) {
  if (tile.lodMetricValue === 0 || isNaN(tile.lodMetricValue)) {
    return "DIG";
  }
  const screenSize = 2 * getProjectedRadius(tile, frameState);
  if (screenSize < 2) {
    return "OUT";
  }
  if (!tile.header.children || screenSize <= tile.lodMetricValue) {
    return "DRAW";
  } else if (tile.header.children) {
    return "DIG";
  }
  return "OUT";
}
function getProjectedRadius(tile, frameState) {
  const { topDownViewport: viewport } = frameState;
  const mbsLat = tile.header.mbs[1];
  const mbsLon = tile.header.mbs[0];
  const mbsZ = tile.header.mbs[2];
  const mbsR = tile.header.mbs[3];
  const mbsCenterCartesian = [...tile.boundingVolume.center];
  const cameraPositionCartographic = viewport.unprojectPosition(viewport.cameraPosition);
  import_geospatial5.Ellipsoid.WGS84.cartographicToCartesian(cameraPositionCartographic, cameraPositionCartesian);
  toEye.copy(cameraPositionCartesian).subtract(mbsCenterCartesian).normalize();
  import_geospatial5.Ellipsoid.WGS84.eastNorthUpToFixedFrame(mbsCenterCartesian, enuToCartesianMatrix);
  cartesianToEnuMatrix.copy(enuToCartesianMatrix).invert();
  cameraPositionEnu.copy(cameraPositionCartesian).transform(cartesianToEnuMatrix);
  const projection = Math.sqrt(cameraPositionEnu[0] * cameraPositionEnu[0] + cameraPositionEnu[1] * cameraPositionEnu[1]);
  const extraZ = projection * projection / cameraPositionEnu[2];
  extraVertexEnu.copy([cameraPositionEnu[0], cameraPositionEnu[1], extraZ]);
  const extraVertexCartesian = extraVertexEnu.transform(enuToCartesianMatrix);
  const extraVectorCartesian = extraVertexCartesian.subtract(mbsCenterCartesian).normalize();
  const radiusVector = toEye.cross(extraVectorCartesian).normalize().scale(mbsR);
  const sphereMbsBorderVertexCartesian = radiusVector.add(mbsCenterCartesian);
  const sphereMbsBorderVertexCartographic = import_geospatial5.Ellipsoid.WGS84.cartesianToCartographic(sphereMbsBorderVertexCartesian);
  const projectedOrigin = viewport.project([mbsLon, mbsLat, mbsZ]);
  const projectedMbsBorderVertex = viewport.project(sphereMbsBorderVertexCartographic);
  const projectedRadius = projectedOriginVector.copy(projectedOrigin).subtract(projectedMbsBorderVertex).magnitude();
  return projectedRadius;
}

// dist/tileset/helpers/3d-tiles-options.js
function get3dTilesOptions(tileset) {
  return {
    assetGltfUpAxis: tileset.asset && tileset.asset.gltfUpAxis || "Y"
  };
}

// dist/utils/managed-array.js
var import_loader_utils3 = require("@loaders.gl/loader-utils");
var ManagedArray = class {
  _map = /* @__PURE__ */ new Map();
  _array;
  _length;
  constructor(length = 0) {
    this._array = new Array(length);
    this._length = length;
  }
  /**
   * Gets or sets the length of the array.
   * If the set length is greater than the length of the internal array, the internal array is resized.
   *
   * @memberof ManagedArray.prototype
   * @type Number
   */
  get length() {
    return this._length;
  }
  set length(length) {
    this._length = length;
    if (length > this._array.length) {
      this._array.length = length;
    }
  }
  /**
   * Gets the internal array.
   *
   * @memberof ManagedArray.prototype
   * @type Array
   * @readonly
   */
  get values() {
    return this._array;
  }
  /**
   * Gets the element at an index.
   *
   * @param {Number} index The index to get.
   */
  get(index) {
    (0, import_loader_utils3.assert)(index < this._array.length);
    return this._array[index];
  }
  /**
   * Sets the element at an index. Resizes the array if index is greater than the length of the array.
   *
   * @param {Number} index The index to set.
   * @param {*} element The element to set at index.
   */
  set(index, element) {
    (0, import_loader_utils3.assert)(index >= 0);
    if (index >= this.length) {
      this.length = index + 1;
    }
    if (this._map.has(this._array[index])) {
      this._map.delete(this._array[index]);
    }
    this._array[index] = element;
    this._map.set(element, index);
  }
  delete(element) {
    const index = this._map.get(element);
    if (index >= 0) {
      this._array.splice(index, 1);
      this._map.delete(element);
      this.length--;
    }
  }
  /**
   * Returns the last element in the array without modifying the array.
   *
   * @returns {*} The last element in the array.
   */
  peek() {
    return this._array[this._length - 1];
  }
  /**
   * Push an element into the array.
   *
   * @param {*} element The element to push.
   */
  push(element) {
    if (!this._map.has(element)) {
      const index = this.length++;
      this._array[index] = element;
      this._map.set(element, index);
    }
  }
  /**
   * Pop an element from the array.
   *
   * @returns {*} The last element in the array.
   */
  pop() {
    const element = this._array[--this.length];
    this._map.delete(element);
    return element;
  }
  /**
   * Resize the internal array if length > _array.length.
   *
   * @param {Number} length The length.
   */
  reserve(length) {
    (0, import_loader_utils3.assert)(length >= 0);
    if (length > this._array.length) {
      this._array.length = length;
    }
  }
  /**
   * Resize the array.
   *
   * @param {Number} length The length.
   */
  resize(length) {
    (0, import_loader_utils3.assert)(length >= 0);
    this.length = length;
  }
  /**
   * Trim the internal array to the specified length. Defaults to the current length.
   *
   * @param {Number} [length] The length.
   */
  trim(length) {
    if (length === null || length === void 0) {
      length = this.length;
    }
    this._array.length = length;
  }
  reset() {
    this._array = [];
    this._map = /* @__PURE__ */ new Map();
    this._length = 0;
  }
  find(target) {
    return this._map.has(target);
  }
};

// dist/tileset/tileset-traverser.js
var DEFAULT_PROPS = {
  loadSiblings: false,
  skipLevelOfDetail: false,
  updateTransforms: true,
  onTraversalEnd: () => {
  },
  viewportTraversersMap: {},
  basePath: ""
};
var TilesetTraverser = class {
  options;
  // fulfill in traverse call
  root = null;
  // tiles should be rendered
  selectedTiles = {};
  // tiles should be loaded from server
  requestedTiles = {};
  // tiles does not have render content
  emptyTiles = {};
  lastUpdate = new Date().getTime();
  updateDebounceTime = 1e3;
  /** temporary storage to hold the traversed tiles during a traversal */
  _traversalStack = new ManagedArray();
  _emptyTraversalStack = new ManagedArray();
  /** set in every traverse cycle */
  _frameNumber = null;
  // RESULT
  traversalFinished(frameState) {
    return true;
  }
  // TODO nested props
  constructor(options) {
    this.options = { ...DEFAULT_PROPS, ...options };
  }
  // tiles should be visible
  traverse(root, frameState, options) {
    this.root = root;
    this.options = { ...this.options, ...options };
    this.reset();
    this.updateTile(root, frameState);
    this._frameNumber = frameState.frameNumber;
    this.executeTraversal(root, frameState);
  }
  reset() {
    this.requestedTiles = {};
    this.selectedTiles = {};
    this.emptyTiles = {};
    this._traversalStack.reset();
    this._emptyTraversalStack.reset();
  }
  /**
   * Execute traverse
   * Depth-first traversal that traverses all visible tiles and marks tiles for selection.
   * If skipLevelOfDetail is off then a tile does not refine until all children are loaded.
   * This is the traditional replacement refinement approach and is called the base traversal.
   * Tiles that have a greater screen space error than the base screen space error are part of the base traversal,
   * all other tiles are part of the skip traversal. The skip traversal allows for skipping levels of the tree
   * and rendering children and parent tiles simultaneously.
   */
  /* eslint-disable-next-line complexity, max-statements */
  executeTraversal(root, frameState) {
    const stack = this._traversalStack;
    root._selectionDepth = 1;
    stack.push(root);
    while (stack.length > 0) {
      const tile = stack.pop();
      let shouldRefine = false;
      if (this.canTraverse(tile, frameState)) {
        this.updateChildTiles(tile, frameState);
        shouldRefine = this.updateAndPushChildren(tile, frameState, stack, tile.hasRenderContent ? tile._selectionDepth + 1 : tile._selectionDepth);
      }
      const parent = tile.parent;
      const parentRefines = Boolean(!parent || parent._shouldRefine);
      const stoppedRefining = !shouldRefine;
      if (!tile.hasRenderContent) {
        this.emptyTiles[tile.id] = tile;
        this.loadTile(tile, frameState);
        if (stoppedRefining) {
          this.selectTile(tile, frameState);
        }
      } else if (tile.refine === TILE_REFINEMENT.ADD) {
        this.loadTile(tile, frameState);
        this.selectTile(tile, frameState);
      } else if (tile.refine === TILE_REFINEMENT.REPLACE) {
        this.loadTile(tile, frameState);
        if (stoppedRefining) {
          this.selectTile(tile, frameState);
        }
      }
      this.touchTile(tile, frameState);
      tile._shouldRefine = shouldRefine && parentRefines;
    }
    const newTime = new Date().getTime();
    if (this.traversalFinished(frameState) || newTime - this.lastUpdate > this.updateDebounceTime) {
      this.lastUpdate = newTime;
      this.options.onTraversalEnd(frameState);
    }
  }
  updateChildTiles(tile, frameState) {
    const children = tile.children;
    for (const child of children) {
      this.updateTile(child, frameState);
    }
  }
  /* eslint-disable complexity, max-statements */
  updateAndPushChildren(tile, frameState, stack, depth) {
    const { loadSiblings, skipLevelOfDetail } = this.options;
    const children = tile.children;
    children.sort(this.compareDistanceToCamera.bind(this));
    const checkRefines = tile.refine === TILE_REFINEMENT.REPLACE && tile.hasRenderContent && !skipLevelOfDetail;
    let hasVisibleChild = false;
    let refines = true;
    for (const child of children) {
      child._selectionDepth = depth;
      if (child.isVisibleAndInRequestVolume) {
        if (stack.find(child)) {
          stack.delete(child);
        }
        stack.push(child);
        hasVisibleChild = true;
      } else if (checkRefines || loadSiblings) {
        this.loadTile(child, frameState);
        this.touchTile(child, frameState);
      }
      if (checkRefines) {
        let childRefines;
        if (!child._inRequestVolume) {
          childRefines = false;
        } else if (!child.hasRenderContent) {
          childRefines = this.executeEmptyTraversal(child, frameState);
        } else {
          childRefines = child.contentAvailable;
        }
        refines = refines && childRefines;
        if (!refines) {
          return false;
        }
      }
    }
    if (!hasVisibleChild) {
      refines = false;
    }
    return refines;
  }
  /* eslint-enable complexity, max-statements */
  updateTile(tile, frameState) {
    this.updateTileVisibility(tile, frameState);
  }
  // tile to render in the browser
  selectTile(tile, frameState) {
    if (this.shouldSelectTile(tile)) {
      tile._selectedFrame = frameState.frameNumber;
      this.selectedTiles[tile.id] = tile;
    }
  }
  // tile to load from server
  loadTile(tile, frameState) {
    if (this.shouldLoadTile(tile)) {
      tile._requestedFrame = frameState.frameNumber;
      tile._priority = tile._getPriority();
      this.requestedTiles[tile.id] = tile;
    }
  }
  // cache tile
  touchTile(tile, frameState) {
    tile.tileset._cache.touch(tile);
    tile._touchedFrame = frameState.frameNumber;
  }
  // tile should be visible
  // tile should have children
  // tile LoD (level of detail) is not sufficient under current viewport
  canTraverse(tile, frameState) {
    if (!tile.hasChildren) {
      return false;
    }
    if (tile.hasTilesetContent) {
      return !tile.contentExpired;
    }
    return this.shouldRefine(tile, frameState);
  }
  shouldLoadTile(tile) {
    return tile.hasUnloadedContent || tile.contentExpired;
  }
  shouldSelectTile(tile) {
    return tile.contentAvailable && !this.options.skipLevelOfDetail;
  }
  /** Decide if tile LoD (level of detail) is not sufficient under current viewport */
  shouldRefine(tile, frameState, useParentMetric = false) {
    let screenSpaceError = tile._screenSpaceError;
    if (useParentMetric) {
      screenSpaceError = tile.getScreenSpaceError(frameState, true);
    }
    return screenSpaceError > tile.tileset.memoryAdjustedScreenSpaceError;
  }
  updateTileVisibility(tile, frameState) {
    const viewportIds = [];
    if (this.options.viewportTraversersMap) {
      for (const key in this.options.viewportTraversersMap) {
        const value = this.options.viewportTraversersMap[key];
        if (value === frameState.viewport.id) {
          viewportIds.push(key);
        }
      }
    } else {
      viewportIds.push(frameState.viewport.id);
    }
    tile.updateVisibility(frameState, viewportIds);
  }
  // UTILITIES
  compareDistanceToCamera(b, a) {
    return b._distanceToCamera - a._distanceToCamera;
  }
  anyChildrenVisible(tile, frameState) {
    let anyVisible = false;
    for (const child of tile.children) {
      child.updateVisibility(frameState);
      anyVisible = anyVisible || child.isVisibleAndInRequestVolume;
    }
    return anyVisible;
  }
  // Depth-first traversal that checks if all nearest descendants with content are loaded.
  // Ignores visibility.
  executeEmptyTraversal(root, frameState) {
    let allDescendantsLoaded = true;
    const stack = this._emptyTraversalStack;
    stack.push(root);
    while (stack.length > 0) {
      const tile = stack.pop();
      const traverse = !tile.hasRenderContent && this.canTraverse(tile, frameState);
      const emptyLeaf = !tile.hasRenderContent && tile.children.length === 0;
      if (!traverse && !tile.contentAvailable && !emptyLeaf) {
        allDescendantsLoaded = false;
      }
      this.updateTile(tile, frameState);
      if (!tile.isVisibleAndInRequestVolume) {
        this.loadTile(tile, frameState);
        this.touchTile(tile, frameState);
      }
      if (traverse) {
        const children = tile.children;
        for (const child of children) {
          stack.push(child);
        }
      }
    }
    return allDescendantsLoaded;
  }
};

// dist/tileset/tile-3d.js
var scratchVector3 = new import_core7.Vector3();
function defined2(x) {
  return x !== void 0 && x !== null;
}
var Tile3D = class {
  tileset;
  header;
  id;
  url;
  parent;
  /* Specifies the type of refine that is used when traversing this tile for rendering. */
  refine;
  type;
  contentUrl;
  /** Different refinement algorithms used by I3S and 3D tiles */
  lodMetricType = "geometricError";
  /** The error, in meters, introduced if this tile is rendered and its children are not. */
  lodMetricValue = 0;
  /** @todo math.gl is not exporting BoundingVolume base type? */
  boundingVolume = null;
  /**
   * The tile's content.  This represents the actual tile's payload,
   * not the content's metadata in the tileset JSON file.
   */
  content = null;
  contentState = TILE_CONTENT_STATE.UNLOADED;
  gpuMemoryUsageInBytes = 0;
  /** The tile's children - an array of Tile3D objects. */
  children = [];
  depth = 0;
  viewportIds = [];
  transform = new import_core7.Matrix4();
  extensions = null;
  /** TODO Cesium 3d tiles specific */
  implicitTiling = null;
  /** Container to store application specific data */
  userData = {};
  computedTransform;
  hasEmptyContent = false;
  hasTilesetContent = false;
  traverser = new TilesetTraverser({});
  /** Used by TilesetCache */
  _cacheNode = null;
  _frameNumber = null;
  // TODO Cesium 3d tiles specific
  _expireDate = null;
  _expiredContent = null;
  _boundingBox = void 0;
  /** updated every frame for tree traversal and rendering optimizations: */
  _distanceToCamera = 0;
  _screenSpaceError = 0;
  _visibilityPlaneMask;
  _visible = void 0;
  _contentBoundingVolume;
  _viewerRequestVolume;
  _initialTransform = new import_core7.Matrix4();
  // Used by traverser, cannot be marked private
  _priority = 0;
  _selectedFrame = 0;
  _requestedFrame = 0;
  _selectionDepth = 0;
  _touchedFrame = 0;
  _centerZDepth = 0;
  _shouldRefine = false;
  _stackLength = 0;
  _visitedFrame = 0;
  _inRequestVolume = false;
  _lodJudge = null;
  // TODO i3s specific, needs to remove
  /**
   * @constructs
   * Create a Tile3D instance
   * @param tileset - Tileset3D instance
   * @param header - tile header - JSON loaded from a dataset
   * @param parentHeader - parent Tile3D instance
   * @param extendedId - optional ID to separate copies of a tile for different viewports.
   *    const extendedId = `${tile.id}-${frameState.viewport.id}`;
   */
  // eslint-disable-next-line max-statements
  constructor(tileset, header, parentHeader, extendedId = "") {
    this.header = header;
    this.tileset = tileset;
    this.id = extendedId || header.id;
    this.url = header.url;
    this.parent = parentHeader;
    this.refine = this._getRefine(header.refine);
    this.type = header.type;
    this.contentUrl = header.contentUrl;
    this._initializeLodMetric(header);
    this._initializeTransforms(header);
    this._initializeBoundingVolumes(header);
    this._initializeContent(header);
    this._initializeRenderingState(header);
    Object.seal(this);
  }
  destroy() {
    this.header = null;
  }
  isDestroyed() {
    return this.header === null;
  }
  get selected() {
    return this._selectedFrame === this.tileset._frameNumber;
  }
  get isVisible() {
    return this._visible;
  }
  get isVisibleAndInRequestVolume() {
    return this._visible && this._inRequestVolume;
  }
  /** Returns true if tile is not an empty tile and not an external tileset */
  get hasRenderContent() {
    return !this.hasEmptyContent && !this.hasTilesetContent;
  }
  /** Returns true if tile has children */
  get hasChildren() {
    return this.children.length > 0 || this.header.children && this.header.children.length > 0;
  }
  /**
   * Determines if the tile's content is ready. This is automatically `true` for
   * tiles with empty content.
   */
  get contentReady() {
    return this.contentState === TILE_CONTENT_STATE.READY || this.hasEmptyContent;
  }
  /**
   * Determines if the tile has available content to render.  `true` if the tile's
   * content is ready or if it has expired content this renders while new content loads; otherwise,
   */
  get contentAvailable() {
    return Boolean(this.contentReady && this.hasRenderContent || this._expiredContent && !this.contentFailed);
  }
  /** Returns true if tile has renderable content but it's unloaded */
  get hasUnloadedContent() {
    return this.hasRenderContent && this.contentUnloaded;
  }
  /**
   * Determines if the tile's content has not be requested. `true` if tile's
   * content has not be requested; otherwise, `false`.
   */
  get contentUnloaded() {
    return this.contentState === TILE_CONTENT_STATE.UNLOADED;
  }
  /**
   * Determines if the tile's content is expired. `true` if tile's
   * content is expired; otherwise, `false`.
   */
  get contentExpired() {
    return this.contentState === TILE_CONTENT_STATE.EXPIRED;
  }
  // Determines if the tile's content failed to load.  `true` if the tile's
  // content failed to load; otherwise, `false`.
  get contentFailed() {
    return this.contentState === TILE_CONTENT_STATE.FAILED;
  }
  /**
   * Distance from the tile's bounding volume center to the camera
   */
  get distanceToCamera() {
    return this._distanceToCamera;
  }
  /**
   * Screen space error for LOD selection
   */
  get screenSpaceError() {
    return this._screenSpaceError;
  }
  /**
   * Get bounding box in cartographic coordinates
   * @returns [min, max] each in [longitude, latitude, altitude]
   */
  get boundingBox() {
    if (!this._boundingBox) {
      this._boundingBox = getCartographicBounds(this.header.boundingVolume, this.boundingVolume);
    }
    return this._boundingBox;
  }
  /** Get the tile's screen space error. */
  getScreenSpaceError(frameState, useParentLodMetric) {
    switch (this.tileset.type) {
      case TILESET_TYPE.I3S:
        return getProjectedRadius(this, frameState);
      case TILESET_TYPE.TILES3D:
        return getTiles3DScreenSpaceError(this, frameState, useParentLodMetric);
      default:
        throw new Error("Unsupported tileset type");
    }
  }
  /**
   * Make tile unselected than means it won't be shown
   * but it can be still loaded in memory
   */
  unselect() {
    this._selectedFrame = 0;
  }
  /**
   * Memory usage of tile on GPU
   */
  _getGpuMemoryUsageInBytes() {
    return this.content.gpuMemoryUsageInBytes || this.content.byteLength || 0;
  }
  /*
   * If skipLevelOfDetail is off try to load child tiles as soon as possible so that their parent can refine sooner.
   * Tiles are prioritized by screen space error.
   */
  // eslint-disable-next-line complexity
  _getPriority() {
    const traverser = this.tileset._traverser;
    const { skipLevelOfDetail } = traverser.options;
    const maySkipTile = this.refine === TILE_REFINEMENT.ADD || skipLevelOfDetail;
    if (maySkipTile && !this.isVisible && this._visible !== void 0) {
      return -1;
    }
    if (this.tileset._frameNumber - this._touchedFrame >= 1) {
      return -1;
    }
    if (this.contentState === TILE_CONTENT_STATE.UNLOADED) {
      return -1;
    }
    const parent = this.parent;
    const useParentScreenSpaceError = parent && (!maySkipTile || this._screenSpaceError === 0 || parent.hasTilesetContent);
    const screenSpaceError = useParentScreenSpaceError ? parent._screenSpaceError : this._screenSpaceError;
    const rootScreenSpaceError = traverser.root ? traverser.root._screenSpaceError : 0;
    return Math.max(rootScreenSpaceError - screenSpaceError, 0);
  }
  /**
   *  Requests the tile's content.
   * The request may not be made if the Request Scheduler can't prioritize it.
   */
  // eslint-disable-next-line max-statements, complexity
  async loadContent() {
    if (this.hasEmptyContent) {
      return false;
    }
    if (this.content) {
      return true;
    }
    const expired = this.contentExpired;
    if (expired) {
      this._expireDate = null;
    }
    this.contentState = TILE_CONTENT_STATE.LOADING;
    const requestToken = await this.tileset._requestScheduler.scheduleRequest(this.id, this._getPriority.bind(this));
    if (!requestToken) {
      this.contentState = TILE_CONTENT_STATE.UNLOADED;
      return false;
    }
    try {
      const contentUrl = this.tileset.getTileUrl(this.contentUrl);
      const loader = this.tileset.loader;
      const options = {
        ...this.tileset.loadOptions,
        [loader.id]: {
          // @ts-expect-error
          ...this.tileset.loadOptions[loader.id],
          isTileset: this.type === "json",
          ...this._getLoaderSpecificOptions(loader.id)
        }
      };
      this.content = await (0, import_core8.load)(contentUrl, loader, options);
      if (this.tileset.options.contentLoader) {
        await this.tileset.options.contentLoader(this);
      }
      if (this._isTileset()) {
        this.tileset._initializeTileHeaders(this.content, this);
      }
      this.contentState = TILE_CONTENT_STATE.READY;
      this._onContentLoaded();
      return true;
    } catch (error) {
      this.contentState = TILE_CONTENT_STATE.FAILED;
      throw error;
    } finally {
      requestToken.done();
    }
  }
  // Unloads the tile's content.
  unloadContent() {
    if (this.content && this.content.destroy) {
      this.content.destroy();
    }
    this.content = null;
    if (this.header.content && this.header.content.destroy) {
      this.header.content.destroy();
    }
    this.header.content = null;
    this.contentState = TILE_CONTENT_STATE.UNLOADED;
    return true;
  }
  /**
   * Update the tile's visibility
   * @param {Object} frameState - frame state for tile culling
   * @param {string[]} viewportIds - a list of viewport ids that show this tile
   * @return {void}
   */
  updateVisibility(frameState, viewportIds) {
    if (this._frameNumber === frameState.frameNumber) {
      return;
    }
    const parent = this.parent;
    const parentVisibilityPlaneMask = parent ? parent._visibilityPlaneMask : import_culling4.CullingVolume.MASK_INDETERMINATE;
    if (this.tileset._traverser.options.updateTransforms) {
      const parentTransform = parent ? parent.computedTransform : this.tileset.modelMatrix;
      this._updateTransform(parentTransform);
    }
    this._distanceToCamera = this.distanceToTile(frameState);
    this._screenSpaceError = this.getScreenSpaceError(frameState, false);
    this._visibilityPlaneMask = this.visibility(frameState, parentVisibilityPlaneMask);
    this._visible = this._visibilityPlaneMask !== import_culling4.CullingVolume.MASK_OUTSIDE;
    this._inRequestVolume = this.insideViewerRequestVolume(frameState);
    this._frameNumber = frameState.frameNumber;
    this.viewportIds = viewportIds;
  }
  // Determines whether the tile's bounding volume intersects the culling volume.
  // @param {FrameState} frameState The frame state.
  // @param {Number} parentVisibilityPlaneMask The parent's plane mask to speed up the visibility check.
  // @returns {Number} A plane mask as described above in {@link CullingVolume#computeVisibilityWithPlaneMask}.
  visibility(frameState, parentVisibilityPlaneMask) {
    const { cullingVolume: cullingVolume2 } = frameState;
    const { boundingVolume } = this;
    return cullingVolume2.computeVisibilityWithPlaneMask(boundingVolume, parentVisibilityPlaneMask);
  }
  // Assuming the tile's bounding volume intersects the culling volume, determines
  // whether the tile's content's bounding volume intersects the culling volume.
  // @param {FrameState} frameState The frame state.
  // @returns {Intersect} The result of the intersection: the tile's content is completely outside, completely inside, or intersecting the culling volume.
  contentVisibility() {
    return true;
  }
  /**
   * Computes the (potentially approximate) distance from the closest point of the tile's bounding volume to the camera.
   * @param frameState The frame state.
   * @returns {Number} The distance, in meters, or zero if the camera is inside the bounding volume.
   */
  distanceToTile(frameState) {
    const boundingVolume = this.boundingVolume;
    return Math.sqrt(Math.max(boundingVolume.distanceSquaredTo(frameState.camera.position), 0));
  }
  /**
   * Computes the tile's camera-space z-depth.
   * @param frameState The frame state.
   * @returns The distance, in meters.
   */
  cameraSpaceZDepth({ camera }) {
    const boundingVolume = this.boundingVolume;
    scratchVector3.subVectors(boundingVolume.center, camera.position);
    return camera.direction.dot(scratchVector3);
  }
  /**
   * Checks if the camera is inside the viewer request volume.
   * @param {FrameState} frameState The frame state.
   * @returns {Boolean} Whether the camera is inside the volume.
   */
  insideViewerRequestVolume(frameState) {
    const viewerRequestVolume = this._viewerRequestVolume;
    return !viewerRequestVolume || viewerRequestVolume.distanceSquaredTo(frameState.camera.position) <= 0;
  }
  // TODO Cesium specific
  // Update whether the tile has expired.
  updateExpiration() {
    if (defined2(this._expireDate) && this.contentReady && !this.hasEmptyContent) {
      const now = Date.now();
      if (Date.lessThan(this._expireDate, now)) {
        this.contentState = TILE_CONTENT_STATE.EXPIRED;
        this._expiredContent = this.content;
      }
    }
  }
  get extras() {
    return this.header.extras;
  }
  // INTERNAL METHODS
  _initializeLodMetric(header) {
    if ("lodMetricType" in header) {
      this.lodMetricType = header.lodMetricType;
    } else {
      this.lodMetricType = this.parent && this.parent.lodMetricType || this.tileset.lodMetricType;
      console.warn(`3D Tile: Required prop lodMetricType is undefined. Using parent lodMetricType`);
    }
    if ("lodMetricValue" in header) {
      this.lodMetricValue = header.lodMetricValue;
    } else {
      this.lodMetricValue = this.parent && this.parent.lodMetricValue || this.tileset.lodMetricValue;
      console.warn("3D Tile: Required prop lodMetricValue is undefined. Using parent lodMetricValue");
    }
  }
  _initializeTransforms(tileHeader) {
    this.transform = tileHeader.transform ? new import_core7.Matrix4(tileHeader.transform) : new import_core7.Matrix4();
    const parent = this.parent;
    const tileset = this.tileset;
    const parentTransform = parent && parent.computedTransform ? parent.computedTransform.clone() : tileset.modelMatrix.clone();
    this.computedTransform = new import_core7.Matrix4(parentTransform).multiplyRight(this.transform);
    const parentInitialTransform = parent && parent._initialTransform ? parent._initialTransform.clone() : new import_core7.Matrix4();
    this._initialTransform = new import_core7.Matrix4(parentInitialTransform).multiplyRight(this.transform);
  }
  _initializeBoundingVolumes(tileHeader) {
    this._contentBoundingVolume = null;
    this._viewerRequestVolume = null;
    this._updateBoundingVolume(tileHeader);
  }
  _initializeContent(tileHeader) {
    this.content = { _tileset: this.tileset, _tile: this };
    this.hasEmptyContent = true;
    this.contentState = TILE_CONTENT_STATE.UNLOADED;
    this.hasTilesetContent = false;
    if (tileHeader.contentUrl) {
      this.content = null;
      this.hasEmptyContent = false;
    }
  }
  // TODO - remove anything not related to basic visibility detection
  _initializeRenderingState(header) {
    this.depth = header.level || (this.parent ? this.parent.depth + 1 : 0);
    this._shouldRefine = false;
    this._distanceToCamera = 0;
    this._centerZDepth = 0;
    this._screenSpaceError = 0;
    this._visibilityPlaneMask = import_culling4.CullingVolume.MASK_INDETERMINATE;
    this._visible = void 0;
    this._inRequestVolume = false;
    this._stackLength = 0;
    this._selectionDepth = 0;
    this._frameNumber = 0;
    this._touchedFrame = 0;
    this._visitedFrame = 0;
    this._selectedFrame = 0;
    this._requestedFrame = 0;
    this._priority = 0;
  }
  _getRefine(refine) {
    return refine || this.parent && this.parent.refine || TILE_REFINEMENT.REPLACE;
  }
  _isTileset() {
    return this.contentUrl.indexOf(".json") !== -1;
  }
  _onContentLoaded() {
    switch (this.content && this.content.type) {
      case "vctr":
      case "geom":
        this.tileset._traverser.disableSkipLevelOfDetail = true;
        break;
      default:
    }
    if (this._isTileset()) {
      this.hasTilesetContent = true;
    } else {
      this.gpuMemoryUsageInBytes = this._getGpuMemoryUsageInBytes();
    }
  }
  _updateBoundingVolume(header) {
    this.boundingVolume = createBoundingVolume(header.boundingVolume, this.computedTransform, this.boundingVolume);
    const content = header.content;
    if (!content) {
      return;
    }
    if (content.boundingVolume) {
      this._contentBoundingVolume = createBoundingVolume(content.boundingVolume, this.computedTransform, this._contentBoundingVolume);
    }
    if (header.viewerRequestVolume) {
      this._viewerRequestVolume = createBoundingVolume(header.viewerRequestVolume, this.computedTransform, this._viewerRequestVolume);
    }
  }
  // Update the tile's transform. The transform is applied to the tile's bounding volumes.
  _updateTransform(parentTransform = new import_core7.Matrix4()) {
    const computedTransform = parentTransform.clone().multiplyRight(this.transform);
    const didTransformChange = !computedTransform.equals(this.computedTransform);
    if (!didTransformChange) {
      return;
    }
    this.computedTransform = computedTransform;
    this._updateBoundingVolume(this.header);
  }
  // Get options which are applicable only for the particular loader
  _getLoaderSpecificOptions(loaderId) {
    switch (loaderId) {
      case "i3s":
        return {
          ...this.tileset.options.i3s,
          _tileOptions: {
            attributeUrls: this.header.attributeUrls,
            textureUrl: this.header.textureUrl,
            textureFormat: this.header.textureFormat,
            textureLoaderOptions: this.header.textureLoaderOptions,
            materialDefinition: this.header.materialDefinition,
            isDracoGeometry: this.header.isDracoGeometry,
            mbs: this.header.mbs
          },
          _tilesetOptions: {
            store: this.tileset.tileset.store,
            attributeStorageInfo: this.tileset.tileset.attributeStorageInfo,
            fields: this.tileset.tileset.fields
          },
          isTileHeader: false
        };
      case "3d-tiles":
      case "cesium-ion":
      default:
        return get3dTilesOptions(this.tileset.tileset);
    }
  }
};

// dist/tileset/format-3d-tiles/tileset-3d-traverser.js
var Tileset3DTraverser = class extends TilesetTraverser {
  compareDistanceToCamera(a, b) {
    return b._distanceToCamera === 0 && a._distanceToCamera === 0 ? b._centerZDepth - a._centerZDepth : b._distanceToCamera - a._distanceToCamera;
  }
  updateTileVisibility(tile, frameState) {
    super.updateTileVisibility(tile, frameState);
    if (!tile.isVisibleAndInRequestVolume) {
      return;
    }
    const hasChildren = tile.children.length > 0;
    if (tile.hasTilesetContent && hasChildren) {
      const firstChild = tile.children[0];
      this.updateTileVisibility(firstChild, frameState);
      tile._visible = firstChild._visible;
      return;
    }
    if (this.meetsScreenSpaceErrorEarly(tile, frameState)) {
      tile._visible = false;
      return;
    }
    const replace = tile.refine === TILE_REFINEMENT.REPLACE;
    const useOptimization = tile._optimChildrenWithinParent === TILE3D_OPTIMIZATION_HINT.USE_OPTIMIZATION;
    if (replace && useOptimization && hasChildren) {
      if (!this.anyChildrenVisible(tile, frameState)) {
        tile._visible = false;
        return;
      }
    }
  }
  meetsScreenSpaceErrorEarly(tile, frameState) {
    const { parent } = tile;
    if (!parent || parent.hasTilesetContent || parent.refine !== TILE_REFINEMENT.ADD) {
      return false;
    }
    return !this.shouldRefine(tile, frameState, true);
  }
};

// dist/tileset/format-i3s/i3s-tileset-traverser.js
var import_core9 = require("@loaders.gl/core");

// dist/tileset/format-i3s/i3s-pending-tiles-register.js
var I3SPendingTilesRegister = class {
  frameNumberMap = /* @__PURE__ */ new Map();
  /**
   * Register a new pending tile header for the particular frameNumber
   * @param viewportId
   * @param frameNumber
   */
  register(viewportId, frameNumber) {
    const viewportMap = this.frameNumberMap.get(viewportId) || /* @__PURE__ */ new Map();
    const oldCount = viewportMap.get(frameNumber) || 0;
    viewportMap.set(frameNumber, oldCount + 1);
    this.frameNumberMap.set(viewportId, viewportMap);
  }
  /**
   * Deregister a pending tile header for the particular frameNumber
   * @param viewportId
   * @param frameNumber
   */
  deregister(viewportId, frameNumber) {
    const viewportMap = this.frameNumberMap.get(viewportId);
    if (!viewportMap) {
      return;
    }
    const oldCount = viewportMap.get(frameNumber) || 1;
    viewportMap.set(frameNumber, oldCount - 1);
  }
  /**
   * Check is there are no pending tile headers registered for the particular frameNumber
   * @param viewportId
   * @param frameNumber
   * @returns
   */
  isZero(viewportId, frameNumber) {
    var _a;
    const count = ((_a = this.frameNumberMap.get(viewportId)) == null ? void 0 : _a.get(frameNumber)) || 0;
    return count === 0;
  }
};

// dist/tileset/format-i3s/i3s-tile-manager.js
var STATUS = {
  REQUESTED: "REQUESTED",
  COMPLETED: "COMPLETED",
  ERROR: "ERROR"
};
var I3STileManager = class {
  _statusMap;
  pendingTilesRegister = new I3SPendingTilesRegister();
  constructor() {
    this._statusMap = {};
  }
  /**
   * Add request to map
   * @param request - node metadata request
   * @param key - unique key
   * @param callback - callback after request completed
   * @param frameState - frameState data
   */
  add(request, key, callback, frameState) {
    if (!this._statusMap[key]) {
      const { frameNumber, viewport: { id } } = frameState;
      this._statusMap[key] = { request, callback, key, frameState, status: STATUS.REQUESTED };
      this.pendingTilesRegister.register(id, frameNumber);
      request().then((data) => {
        this._statusMap[key].status = STATUS.COMPLETED;
        const { frameNumber: actualFrameNumber, viewport: { id: id2 } } = this._statusMap[key].frameState;
        this.pendingTilesRegister.deregister(id2, actualFrameNumber);
        this._statusMap[key].callback(data, frameState);
      }).catch((error) => {
        this._statusMap[key].status = STATUS.ERROR;
        const { frameNumber: actualFrameNumber, viewport: { id: id2 } } = this._statusMap[key].frameState;
        this.pendingTilesRegister.deregister(id2, actualFrameNumber);
        callback(error);
      });
    }
  }
  /**
   * Update request if it is still actual for the new frameState
   * @param key - unique key
   * @param frameState - frameState data
   */
  update(key, frameState) {
    if (this._statusMap[key]) {
      const { frameNumber, viewport: { id } } = this._statusMap[key].frameState;
      this.pendingTilesRegister.deregister(id, frameNumber);
      const { frameNumber: newFrameNumber, viewport: { id: newViewportId } } = frameState;
      this.pendingTilesRegister.register(newViewportId, newFrameNumber);
      this._statusMap[key].frameState = frameState;
    }
  }
  /**
   * Find request in the map
   * @param key - unique key
   * @returns
   */
  find(key) {
    return this._statusMap[key];
  }
  /**
   * Check it there are pending tile headers for the particular frameNumber
   * @param viewportId
   * @param frameNumber
   * @returns
   */
  hasPendingTiles(viewportId, frameNumber) {
    return !this.pendingTilesRegister.isZero(viewportId, frameNumber);
  }
};

// dist/tileset/format-i3s/i3s-tileset-traverser.js
var I3STilesetTraverser = class extends TilesetTraverser {
  _tileManager;
  constructor(options) {
    super(options);
    this._tileManager = new I3STileManager();
  }
  /**
   * Check if there are no penging tile header requests,
   * that means the traversal is finished and we can call
   * following-up callbacks.
   */
  traversalFinished(frameState) {
    return !this._tileManager.hasPendingTiles(frameState.viewport.id, this._frameNumber || 0);
  }
  shouldRefine(tile, frameState) {
    tile._lodJudge = getLodStatus(tile, frameState);
    return tile._lodJudge === "DIG";
  }
  updateChildTiles(tile, frameState) {
    const children = tile.header.children || [];
    const childTiles = tile.children;
    const tileset = tile.tileset;
    for (const child of children) {
      const extendedId = `${child.id}-${frameState.viewport.id}`;
      const childTile = childTiles && childTiles.find((t) => t.id === extendedId);
      if (!childTile) {
        let request = () => this._loadTile(child.id, tileset);
        const cachedRequest = this._tileManager.find(extendedId);
        if (!cachedRequest) {
          if (tileset.tileset.nodePages) {
            request = () => tileset.tileset.nodePagesTile.formTileFromNodePages(child.id);
          }
          this._tileManager.add(request, extendedId, (header) => this._onTileLoad(header, tile, extendedId), frameState);
        } else {
          this._tileManager.update(extendedId, frameState);
        }
      } else if (childTile) {
        this.updateTile(childTile, frameState);
      }
    }
    return false;
  }
  async _loadTile(nodeId, tileset) {
    const { loader } = tileset;
    const nodeUrl = tileset.getTileUrl(`${tileset.url}/nodes/${nodeId}`);
    const options = {
      ...tileset.loadOptions,
      i3s: {
        ...tileset.loadOptions.i3s,
        isTileHeader: true
      }
    };
    return await (0, import_core9.load)(nodeUrl, loader, options);
  }
  /**
   * The callback to init Tile3D instance after loading the tile JSON
   * @param {Object} header - the tile JSON from a dataset
   * @param {Tile3D} tile - the parent Tile3D instance
   * @param {string} extendedId - optional ID to separate copies of a tile for different viewports.
   *                              const extendedId = `${tile.id}-${frameState.viewport.id}`;
   * @return {void}
   */
  _onTileLoad(header, tile, extendedId) {
    const childTile = new Tile3D(tile.tileset, header, tile, extendedId);
    tile.children.push(childTile);
    const frameState = this._tileManager.find(childTile.id).frameState;
    this.updateTile(childTile, frameState);
    if (this._frameNumber === frameState.frameNumber && (this.traversalFinished(frameState) || new Date().getTime() - this.lastUpdate > this.updateDebounceTime)) {
      this.executeTraversal(childTile, frameState);
    }
  }
};

// dist/tileset/tileset-3d.js
var DEFAULT_PROPS2 = {
  description: "",
  ellipsoid: import_geospatial6.Ellipsoid.WGS84,
  modelMatrix: new import_core10.Matrix4(),
  throttleRequests: true,
  maxRequests: 64,
  /** Default memory values optimized for viewing mesh-based 3D Tiles on both mobile and desktop devices */
  maximumMemoryUsage: 32,
  memoryCacheOverflow: 1,
  maximumTilesSelected: 0,
  debounceTime: 0,
  onTileLoad: () => {
  },
  onTileUnload: () => {
  },
  onTileError: () => {
  },
  onTraversalComplete: (selectedTiles) => selectedTiles,
  contentLoader: void 0,
  viewDistanceScale: 1,
  maximumScreenSpaceError: 8,
  memoryAdjustedScreenSpaceError: false,
  loadTiles: true,
  updateTransforms: true,
  viewportTraversersMap: null,
  loadOptions: { fetch: {} },
  attributions: [],
  basePath: "",
  i3s: {}
};
var TILES_TOTAL = "Tiles In Tileset(s)";
var TILES_IN_MEMORY = "Tiles In Memory";
var TILES_IN_VIEW = "Tiles In View";
var TILES_RENDERABLE = "Tiles To Render";
var TILES_LOADED = "Tiles Loaded";
var TILES_LOADING = "Tiles Loading";
var TILES_UNLOADED = "Tiles Unloaded";
var TILES_LOAD_FAILED = "Failed Tile Loads";
var POINTS_COUNT = "Points/Vertices";
var TILES_GPU_MEMORY = "Tile Memory Use";
var MAXIMUM_SSE = "Maximum Screen Space Error";
var Tileset3D = class {
  // props: Tileset3DProps;
  options;
  loadOptions;
  type;
  tileset;
  loader;
  url;
  basePath;
  modelMatrix;
  ellipsoid;
  lodMetricType;
  lodMetricValue;
  refine;
  root = null;
  roots = {};
  /** @todo any->unknown */
  asset = {};
  // Metadata for the entire tileset
  description = "";
  properties;
  extras = null;
  attributions = {};
  credits = {};
  stats;
  /** flags that contain information about data types in nested tiles */
  contentFormats = { draco: false, meshopt: false, dds: false, ktx2: false };
  // view props
  cartographicCenter = null;
  cartesianCenter = null;
  zoom = 1;
  boundingVolume = null;
  /** Updated based on the camera position and direction */
  dynamicScreenSpaceErrorComputedDensity = 0;
  // METRICS
  /**
   * The maximum amount of GPU memory (in MB) that may be used to cache tiles
   * Tiles not in view are unloaded to enforce private
   */
  maximumMemoryUsage = 32;
  /** The total amount of GPU memory in bytes used by the tileset. */
  gpuMemoryUsageInBytes = 0;
  /**
   * If loading the level of detail required by maximumScreenSpaceError
   * results in the memory usage exceeding maximumMemoryUsage (GPU), level of detail refinement
   * will instead use this (larger) adjusted screen space error to achieve the
   * best possible visual quality within the available memory.
   */
  memoryAdjustedScreenSpaceError = 0;
  _cacheBytes = 0;
  _cacheOverflowBytes = 0;
  /** Update tracker. increase in each update cycle. */
  _frameNumber = 0;
  _queryParams = {};
  _extensionsUsed = [];
  _tiles = {};
  /** counter for tracking tiles requests */
  _pendingCount = 0;
  /** Hold traversal results */
  selectedTiles = [];
  // TRAVERSAL
  traverseCounter = 0;
  geometricError = 0;
  lastUpdatedVieports = null;
  _requestedTiles = [];
  _emptyTiles = [];
  frameStateData = {};
  _traverser;
  _cache = new TilesetCache();
  _requestScheduler;
  // Promise tracking
  updatePromise = null;
  tilesetInitializationPromise;
  /**
   * Create a new Tileset3D
   * @param json
   * @param props
   */
  // eslint-disable-next-line max-statements
  constructor(tileset, options) {
    this.options = { ...DEFAULT_PROPS2, ...options };
    this.tileset = tileset;
    this.loader = tileset.loader;
    this.type = tileset.type;
    this.url = tileset.url;
    this.basePath = tileset.basePath || import_loader_utils4.path.dirname(this.url);
    this.modelMatrix = this.options.modelMatrix;
    this.ellipsoid = this.options.ellipsoid;
    this.lodMetricType = tileset.lodMetricType;
    this.lodMetricValue = tileset.lodMetricValue;
    this.refine = tileset.root.refine;
    this.loadOptions = this.options.loadOptions || {};
    this._traverser = this._initializeTraverser();
    this._requestScheduler = new import_loader_utils4.RequestScheduler({
      throttleRequests: this.options.throttleRequests,
      maxRequests: this.options.maxRequests
    });
    this.memoryAdjustedScreenSpaceError = this.options.maximumScreenSpaceError;
    this._cacheBytes = this.options.maximumMemoryUsage * 1024 * 1024;
    this._cacheOverflowBytes = this.options.memoryCacheOverflow * 1024 * 1024;
    this.stats = new import_stats.Stats({ id: this.url });
    this._initializeStats();
    this.tilesetInitializationPromise = this._initializeTileSet(tileset);
  }
  /** Release resources */
  destroy() {
    this._destroy();
  }
  /** Is the tileset loaded (update needs to have been called at least once) */
  isLoaded() {
    return this._pendingCount === 0 && this._frameNumber !== 0 && this._requestedTiles.length === 0;
  }
  get tiles() {
    return Object.values(this._tiles);
  }
  get frameNumber() {
    return this._frameNumber;
  }
  get queryParams() {
    return new URLSearchParams(this._queryParams).toString();
  }
  setProps(props) {
    this.options = { ...this.options, ...props };
  }
  /** @deprecated */
  // setOptions(options: Tileset3DProps): void {
  //   this.options = {...this.options, ...options};
  // }
  /**
   * Return a loadable tile url for a specific tile subpath
   * @param tilePath a tile subpath
   */
  getTileUrl(tilePath) {
    const isDataUrl = tilePath.startsWith("data:");
    if (isDataUrl) {
      return tilePath;
    }
    let tileUrl = tilePath;
    if (this.queryParams.length) {
      tileUrl = `${tilePath}${tilePath.includes("?") ? "&" : "?"}${this.queryParams}`;
    }
    return tileUrl;
  }
  // TODO CESIUM specific
  hasExtension(extensionName) {
    return Boolean(this._extensionsUsed.indexOf(extensionName) > -1);
  }
  /**
   * Update visible tiles relying on a list of viewports
   * @param viewports - list of viewports
   * @deprecated
   */
  update(viewports = null) {
    this.tilesetInitializationPromise.then(() => {
      if (!viewports && this.lastUpdatedVieports) {
        viewports = this.lastUpdatedVieports;
      } else {
        this.lastUpdatedVieports = viewports;
      }
      if (viewports) {
        this.doUpdate(viewports);
      }
    });
  }
  /**
   * Update visible tiles relying on a list of viewports.
   * Do it with debounce delay to prevent update spam
   * @param viewports viewports
   * @returns Promise of new frameNumber
   */
  async selectTiles(viewports = null) {
    await this.tilesetInitializationPromise;
    if (viewports) {
      this.lastUpdatedVieports = viewports;
    }
    if (!this.updatePromise) {
      this.updatePromise = new Promise((resolve) => {
        setTimeout(() => {
          if (this.lastUpdatedVieports) {
            this.doUpdate(this.lastUpdatedVieports);
          }
          resolve(this._frameNumber);
          this.updatePromise = null;
        }, this.options.debounceTime);
      });
    }
    return this.updatePromise;
  }
  adjustScreenSpaceError() {
    if (this.gpuMemoryUsageInBytes < this._cacheBytes) {
      this.memoryAdjustedScreenSpaceError = Math.max(this.memoryAdjustedScreenSpaceError / 1.02, this.options.maximumScreenSpaceError);
    } else if (this.gpuMemoryUsageInBytes > this._cacheBytes + this._cacheOverflowBytes) {
      this.memoryAdjustedScreenSpaceError *= 1.02;
    }
  }
  /**
   * Update visible tiles relying on a list of viewports
   * @param viewports viewports
   */
  // eslint-disable-next-line max-statements, complexity
  doUpdate(viewports) {
    if ("loadTiles" in this.options && !this.options.loadTiles) {
      return;
    }
    if (this.traverseCounter > 0) {
      return;
    }
    const preparedViewports = viewports instanceof Array ? viewports : [viewports];
    this._cache.reset();
    this._frameNumber++;
    this.traverseCounter = preparedViewports.length;
    const viewportsToTraverse = [];
    for (const viewport of preparedViewports) {
      const id = viewport.id;
      if (this._needTraverse(id)) {
        viewportsToTraverse.push(id);
      } else {
        this.traverseCounter--;
      }
    }
    for (const viewport of preparedViewports) {
      const id = viewport.id;
      if (!this.roots[id]) {
        this.roots[id] = this._initializeTileHeaders(this.tileset, null);
      }
      if (!viewportsToTraverse.includes(id)) {
        continue;
      }
      const frameState = getFrameState(viewport, this._frameNumber);
      this._traverser.traverse(this.roots[id], frameState, this.options);
    }
  }
  /**
   * Check if traversal is needed for particular viewport
   * @param {string} viewportId - id of a viewport
   * @return {boolean}
   */
  _needTraverse(viewportId) {
    let traverserId = viewportId;
    if (this.options.viewportTraversersMap) {
      traverserId = this.options.viewportTraversersMap[viewportId];
    }
    if (traverserId !== viewportId) {
      return false;
    }
    return true;
  }
  /**
   * The callback to post-process tiles after traversal procedure
   * @param frameState - frame state for tile culling
   */
  _onTraversalEnd(frameState) {
    const id = frameState.viewport.id;
    if (!this.frameStateData[id]) {
      this.frameStateData[id] = { selectedTiles: [], _requestedTiles: [], _emptyTiles: [] };
    }
    const currentFrameStateData = this.frameStateData[id];
    const selectedTiles = Object.values(this._traverser.selectedTiles);
    const [filteredSelectedTiles, unselectedTiles] = limitSelectedTiles(selectedTiles, frameState, this.options.maximumTilesSelected);
    currentFrameStateData.selectedTiles = filteredSelectedTiles;
    for (const tile of unselectedTiles) {
      tile.unselect();
    }
    currentFrameStateData._requestedTiles = Object.values(this._traverser.requestedTiles);
    currentFrameStateData._emptyTiles = Object.values(this._traverser.emptyTiles);
    this.traverseCounter--;
    if (this.traverseCounter > 0) {
      return;
    }
    this._updateTiles();
  }
  /**
   * Update tiles relying on data from all traversers
   */
  _updateTiles() {
    this.selectedTiles = [];
    this._requestedTiles = [];
    this._emptyTiles = [];
    for (const frameStateKey in this.frameStateData) {
      const frameStateDataValue = this.frameStateData[frameStateKey];
      this.selectedTiles = this.selectedTiles.concat(frameStateDataValue.selectedTiles);
      this._requestedTiles = this._requestedTiles.concat(frameStateDataValue._requestedTiles);
      this._emptyTiles = this._emptyTiles.concat(frameStateDataValue._emptyTiles);
    }
    this.selectedTiles = this.options.onTraversalComplete(this.selectedTiles);
    for (const tile of this.selectedTiles) {
      this._tiles[tile.id] = tile;
    }
    this._loadTiles();
    this._unloadTiles();
    this._updateStats();
  }
  _tilesChanged(oldSelectedTiles, selectedTiles) {
    if (oldSelectedTiles.length !== selectedTiles.length) {
      return true;
    }
    const set1 = new Set(oldSelectedTiles.map((t) => t.id));
    const set2 = new Set(selectedTiles.map((t) => t.id));
    let changed = oldSelectedTiles.filter((x) => !set2.has(x.id)).length > 0;
    changed = changed || selectedTiles.filter((x) => !set1.has(x.id)).length > 0;
    return changed;
  }
  _loadTiles() {
    for (const tile of this._requestedTiles) {
      if (tile.contentUnloaded) {
        this._loadTile(tile);
      }
    }
  }
  _unloadTiles() {
    this._cache.unloadTiles(this, (tileset, tile) => tileset._unloadTile(tile));
  }
  _updateStats() {
    let tilesRenderable = 0;
    let pointsRenderable = 0;
    for (const tile of this.selectedTiles) {
      if (tile.contentAvailable && tile.content) {
        tilesRenderable++;
        if (tile.content.pointCount) {
          pointsRenderable += tile.content.pointCount;
        } else {
          pointsRenderable += tile.content.vertexCount;
        }
      }
    }
    this.stats.get(TILES_IN_VIEW).count = this.selectedTiles.length;
    this.stats.get(TILES_RENDERABLE).count = tilesRenderable;
    this.stats.get(POINTS_COUNT).count = pointsRenderable;
    this.stats.get(MAXIMUM_SSE).count = this.memoryAdjustedScreenSpaceError;
  }
  async _initializeTileSet(tilesetJson) {
    if (this.type === TILESET_TYPE.I3S) {
      this.calculateViewPropsI3S();
      tilesetJson.root = await tilesetJson.root;
    }
    this.root = this._initializeTileHeaders(tilesetJson, null);
    if (this.type === TILESET_TYPE.TILES3D) {
      this._initializeTiles3DTileset(tilesetJson);
      this.calculateViewPropsTiles3D();
    }
    if (this.type === TILESET_TYPE.I3S) {
      this._initializeI3STileset();
    }
  }
  /**
   * Called during initialize Tileset to initialize the tileset's cartographic center (longitude, latitude) and zoom.
   * These metrics help apps center view on tileset
   * For I3S there is extent (<1.8 version) or fullExtent (>=1.8 version) to calculate view props
   * @returns
   */
  calculateViewPropsI3S() {
    var _a;
    const fullExtent = this.tileset.fullExtent;
    if (fullExtent) {
      const { xmin, xmax, ymin, ymax, zmin, zmax } = fullExtent;
      this.cartographicCenter = new import_core10.Vector3(xmin + (xmax - xmin) / 2, ymin + (ymax - ymin) / 2, zmin + (zmax - zmin) / 2);
      this.cartesianCenter = new import_core10.Vector3();
      import_geospatial6.Ellipsoid.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter);
      this.zoom = getZoomFromFullExtent(fullExtent, this.cartographicCenter, this.cartesianCenter);
      return;
    }
    const extent = (_a = this.tileset.store) == null ? void 0 : _a.extent;
    if (extent) {
      const [xmin, ymin, xmax, ymax] = extent;
      this.cartographicCenter = new import_core10.Vector3(xmin + (xmax - xmin) / 2, ymin + (ymax - ymin) / 2, 0);
      this.cartesianCenter = new import_core10.Vector3();
      import_geospatial6.Ellipsoid.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter);
      this.zoom = getZoomFromExtent(extent, this.cartographicCenter, this.cartesianCenter);
      return;
    }
    console.warn("Extent is not defined in the tileset header");
    this.cartographicCenter = new import_core10.Vector3();
    this.zoom = 1;
    return;
  }
  /**
   * Called during initialize Tileset to initialize the tileset's cartographic center (longitude, latitude) and zoom.
   * These metrics help apps center view on tileset.
   * For 3DTiles the root tile data is used to calculate view props.
   * @returns
   */
  calculateViewPropsTiles3D() {
    const root = this.root;
    const { center } = root.boundingVolume;
    if (!center) {
      console.warn("center was not pre-calculated for the root tile");
      this.cartographicCenter = new import_core10.Vector3();
      this.zoom = 1;
      return;
    }
    if (center[0] !== 0 || center[1] !== 0 || center[2] !== 0) {
      this.cartographicCenter = new import_core10.Vector3();
      import_geospatial6.Ellipsoid.WGS84.cartesianToCartographic(center, this.cartographicCenter);
    } else {
      this.cartographicCenter = new import_core10.Vector3(0, 0, -import_geospatial6.Ellipsoid.WGS84.radii[0]);
    }
    this.cartesianCenter = center;
    this.zoom = getZoomFromBoundingVolume(root.boundingVolume, this.cartographicCenter);
  }
  _initializeStats() {
    this.stats.get(TILES_TOTAL);
    this.stats.get(TILES_LOADING);
    this.stats.get(TILES_IN_MEMORY);
    this.stats.get(TILES_IN_VIEW);
    this.stats.get(TILES_RENDERABLE);
    this.stats.get(TILES_LOADED);
    this.stats.get(TILES_UNLOADED);
    this.stats.get(TILES_LOAD_FAILED);
    this.stats.get(POINTS_COUNT);
    this.stats.get(TILES_GPU_MEMORY, "memory");
    this.stats.get(MAXIMUM_SSE);
  }
  // Installs the main tileset JSON file or a tileset JSON file referenced from a tile.
  // eslint-disable-next-line max-statements
  _initializeTileHeaders(tilesetJson, parentTileHeader) {
    var _a;
    const rootTile = new Tile3D(this, tilesetJson.root, parentTileHeader);
    if (parentTileHeader) {
      parentTileHeader.children.push(rootTile);
      rootTile.depth = parentTileHeader.depth + 1;
    }
    if (this.type === TILESET_TYPE.TILES3D) {
      const stack = [];
      stack.push(rootTile);
      while (stack.length > 0) {
        const tile = stack.pop();
        this.stats.get(TILES_TOTAL).incrementCount();
        const children = tile.header.children || [];
        for (const childHeader of children) {
          const childTile = new Tile3D(this, childHeader, tile);
          if ((_a = childTile.contentUrl) == null ? void 0 : _a.includes("?session=")) {
            const url = new URL(childTile.contentUrl);
            const session = url.searchParams.get("session");
            if (session) {
              this._queryParams.session = session;
            }
          }
          tile.children.push(childTile);
          childTile.depth = tile.depth + 1;
          stack.push(childTile);
        }
      }
    }
    return rootTile;
  }
  _initializeTraverser() {
    let TraverserClass;
    const type = this.type;
    switch (type) {
      case TILESET_TYPE.TILES3D:
        TraverserClass = Tileset3DTraverser;
        break;
      case TILESET_TYPE.I3S:
        TraverserClass = I3STilesetTraverser;
        break;
      default:
        TraverserClass = TilesetTraverser;
    }
    return new TraverserClass({
      basePath: this.basePath,
      onTraversalEnd: this._onTraversalEnd.bind(this)
    });
  }
  _destroyTileHeaders(parentTile) {
    this._destroySubtree(parentTile);
  }
  async _loadTile(tile) {
    let loaded;
    try {
      this._onStartTileLoading();
      loaded = await tile.loadContent();
    } catch (error) {
      this._onTileLoadError(tile, error instanceof Error ? error : new Error("load failed"));
    } finally {
      this._onEndTileLoading();
      this._onTileLoad(tile, loaded);
    }
  }
  _onTileLoadError(tile, error) {
    this.stats.get(TILES_LOAD_FAILED).incrementCount();
    const message = error.message || error.toString();
    const url = tile.url;
    console.error(`A 3D tile failed to load: ${tile.url} ${message}`);
    this.options.onTileError(tile, message, url);
  }
  _onTileLoad(tile, loaded) {
    var _a, _b;
    if (!loaded) {
      return;
    }
    if (this.type === TILESET_TYPE.I3S) {
      const nodesInNodePages = ((_b = (_a = this.tileset) == null ? void 0 : _a.nodePagesTile) == null ? void 0 : _b.nodesInNodePages) || 0;
      this.stats.get(TILES_TOTAL).reset();
      this.stats.get(TILES_TOTAL).addCount(nodesInNodePages);
    }
    if (tile && tile.content) {
      calculateTransformProps(tile, tile.content);
    }
    this.updateContentTypes(tile);
    this._addTileToCache(tile);
    this.options.onTileLoad(tile);
  }
  /**
   * Update information about data types in nested tiles
   * @param tile instance of a nested Tile3D
   */
  updateContentTypes(tile) {
    var _a;
    if (this.type === TILESET_TYPE.I3S) {
      if (tile.header.isDracoGeometry) {
        this.contentFormats.draco = true;
      }
      switch (tile.header.textureFormat) {
        case "dds":
          this.contentFormats.dds = true;
          break;
        case "ktx2":
          this.contentFormats.ktx2 = true;
          break;
        default:
      }
    } else if (this.type === TILESET_TYPE.TILES3D) {
      const { extensionsRemoved = [] } = ((_a = tile.content) == null ? void 0 : _a.gltf) || {};
      if (extensionsRemoved.includes("KHR_draco_mesh_compression")) {
        this.contentFormats.draco = true;
      }
      if (extensionsRemoved.includes("EXT_meshopt_compression")) {
        this.contentFormats.meshopt = true;
      }
      if (extensionsRemoved.includes("KHR_texture_basisu")) {
        this.contentFormats.ktx2 = true;
      }
    }
  }
  _onStartTileLoading() {
    this._pendingCount++;
    this.stats.get(TILES_LOADING).incrementCount();
  }
  _onEndTileLoading() {
    this._pendingCount--;
    this.stats.get(TILES_LOADING).decrementCount();
  }
  _addTileToCache(tile) {
    this._cache.add(this, tile, (tileset) => tileset._updateCacheStats(tile));
  }
  _updateCacheStats(tile) {
    this.stats.get(TILES_LOADED).incrementCount();
    this.stats.get(TILES_IN_MEMORY).incrementCount();
    this.gpuMemoryUsageInBytes += tile.gpuMemoryUsageInBytes || 0;
    this.stats.get(TILES_GPU_MEMORY).count = this.gpuMemoryUsageInBytes;
    if (this.options.memoryAdjustedScreenSpaceError) {
      this.adjustScreenSpaceError();
    }
  }
  _unloadTile(tile) {
    this.gpuMemoryUsageInBytes -= tile.gpuMemoryUsageInBytes || 0;
    this.stats.get(TILES_IN_MEMORY).decrementCount();
    this.stats.get(TILES_UNLOADED).incrementCount();
    this.stats.get(TILES_GPU_MEMORY).count = this.gpuMemoryUsageInBytes;
    this.options.onTileUnload(tile);
    tile.unloadContent();
  }
  // Traverse the tree and destroy all tiles
  _destroy() {
    const stack = [];
    if (this.root) {
      stack.push(this.root);
    }
    while (stack.length > 0) {
      const tile = stack.pop();
      for (const child of tile.children) {
        stack.push(child);
      }
      this._destroyTile(tile);
    }
    this.root = null;
  }
  // Traverse the tree and destroy all sub tiles
  _destroySubtree(tile) {
    const root = tile;
    const stack = [];
    stack.push(root);
    while (stack.length > 0) {
      tile = stack.pop();
      for (const child of tile.children) {
        stack.push(child);
      }
      if (tile !== root) {
        this._destroyTile(tile);
      }
    }
    root.children = [];
  }
  _destroyTile(tile) {
    this._cache.unloadTile(this, tile);
    this._unloadTile(tile);
    tile.destroy();
  }
  _initializeTiles3DTileset(tilesetJson) {
    if (tilesetJson.queryString) {
      const searchParams = new URLSearchParams(tilesetJson.queryString);
      const queryParams = Object.fromEntries(searchParams.entries());
      this._queryParams = { ...this._queryParams, ...queryParams };
    }
    this.asset = tilesetJson.asset;
    if (!this.asset) {
      throw new Error("Tileset must have an asset property.");
    }
    if (this.asset.version !== "0.0" && this.asset.version !== "1.0" && this.asset.version !== "1.1") {
      throw new Error("The tileset must be 3D Tiles version either 0.0 or 1.0 or 1.1.");
    }
    if ("tilesetVersion" in this.asset) {
      this._queryParams.v = this.asset.tilesetVersion;
    }
    this.credits = {
      attributions: this.options.attributions || []
    };
    this.description = this.options.description || "";
    this.properties = tilesetJson.properties;
    this.geometricError = tilesetJson.geometricError;
    this._extensionsUsed = tilesetJson.extensionsUsed || [];
    this.extras = tilesetJson.extras;
  }
  _initializeI3STileset() {
    if (this.loadOptions.i3s && "token" in this.loadOptions.i3s) {
      this._queryParams.token = this.loadOptions.i3s.token;
    }
  }
};
//# sourceMappingURL=index.cjs.map

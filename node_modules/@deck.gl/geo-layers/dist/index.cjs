"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/index.js
var dist_exports = {};
__export(dist_exports, {
  GeohashLayer: () => geohash_layer_default,
  GreatCircleLayer: () => great_circle_layer_default,
  H3ClusterLayer: () => h3_cluster_layer_default,
  H3HexagonLayer: () => h3_hexagon_layer_default,
  MVTLayer: () => mvt_layer_default,
  QuadkeyLayer: () => quadkey_layer_default,
  S2Layer: () => s2_layer_default,
  TerrainLayer: () => terrain_layer_default,
  Tile3DLayer: () => tile_3d_layer_default,
  TileLayer: () => tile_layer_default,
  TripsLayer: () => trips_layer_default,
  _GeoCellLayer: () => GeoCellLayer_default,
  _Tile2DHeader: () => Tile2DHeader,
  _Tileset2D: () => Tileset2D,
  _WMSLayer: () => WMSLayer,
  _getURLFromTemplate: () => getURLFromTemplate
});
module.exports = __toCommonJS(dist_exports);

// dist/wms-layer/wms-layer.js
var import_core = require("@deck.gl/core");
var import_layers = require("@deck.gl/layers");
var import_wms = require("@loaders.gl/wms");

// dist/wms-layer/utils.js
var import_web_mercator = require("@math.gl/web-mercator");
var HALF_EARTH_CIRCUMFERENCE = 6378137 * Math.PI;
function WGS84ToPseudoMercator(coord) {
  const mercator = (0, import_web_mercator.lngLatToWorld)(coord);
  mercator[0] = (mercator[0] / 256 - 1) * HALF_EARTH_CIRCUMFERENCE;
  mercator[1] = (mercator[1] / 256 - 1) * HALF_EARTH_CIRCUMFERENCE;
  return mercator;
}

// dist/wms-layer/wms-layer.js
var defaultProps = {
  id: "imagery-layer",
  data: "",
  serviceType: "auto",
  srs: "auto",
  layers: { type: "array", compare: true, value: [] },
  onMetadataLoad: { type: "function", value: () => {
  } },
  // eslint-disable-next-line
  onMetadataLoadError: { type: "function", value: console.error },
  onImageLoadStart: { type: "function", value: () => {
  } },
  onImageLoad: { type: "function", value: () => {
  } },
  onImageLoadError: {
    type: "function",
    compare: false,
    // eslint-disable-next-line
    value: (requestId, error) => console.error(error, requestId)
  }
};
var WMSLayer = class extends import_core.CompositeLayer {
  /** Returns true if all async resources are loaded */
  get isLoaded() {
    var _a;
    return ((_a = this.state) == null ? void 0 : _a.loadCounter) === 0 && super.isLoaded;
  }
  /** Lets deck.gl know that we want viewport change events */
  shouldUpdateState() {
    return true;
  }
  initializeState() {
    this.state._nextRequestId = 0;
    this.state.lastRequestId = -1;
    this.state.loadCounter = 0;
  }
  updateState({ changeFlags, props, oldProps }) {
    const { viewport } = this.context;
    if (changeFlags.dataChanged || props.serviceType !== oldProps.serviceType) {
      this.state.imageSource = this._createImageSource(props);
      this._loadMetadata();
      this.debounce(() => this.loadImage(viewport, "image source changed"), 0);
    } else if (!(0, import_core._deepEqual)(props.layers, oldProps.layers, 1)) {
      this.debounce(() => this.loadImage(viewport, "layers changed"), 0);
    } else if (changeFlags.viewportChanged) {
      this.debounce(() => this.loadImage(viewport, "viewport changed"));
    }
  }
  finalizeState() {
  }
  renderLayers() {
    const { bounds, image, lastRequestParameters } = this.state;
    return image && new import_layers.BitmapLayer({
      ...this.getSubLayerProps({ id: "bitmap" }),
      _imageCoordinateSystem: lastRequestParameters.srs === "EPSG:4326" ? import_core.COORDINATE_SYSTEM.LNGLAT : import_core.COORDINATE_SYSTEM.CARTESIAN,
      bounds,
      image
    });
  }
  async getFeatureInfoText(x, y) {
    var _a, _b;
    const { lastRequestParameters } = this.state;
    if (lastRequestParameters) {
      const featureInfo = await ((_b = (_a = this.state.imageSource).getFeatureInfoText) == null ? void 0 : _b.call(_a, {
        ...lastRequestParameters,
        query_layers: lastRequestParameters.layers,
        x,
        y,
        info_format: "application/vnd.ogc.gml"
      }));
      return featureInfo;
    }
    return "";
  }
  _createImageSource(props) {
    if (props.data instanceof import_wms.ImageSource) {
      return props.data;
    }
    if (typeof props.data === "string") {
      return (0, import_wms.createImageSource)({
        url: props.data,
        loadOptions: props.loadOptions,
        type: props.serviceType
      });
    }
    throw new Error("invalid image source in props.data");
  }
  /** Run a getMetadata on the image service */
  async _loadMetadata() {
    var _a, _b;
    const { imageSource } = this.state;
    try {
      this.state.loadCounter++;
      const metadata = await imageSource.getMetadata();
      if (this.state.imageSource === imageSource) {
        (_a = this.getCurrentLayer()) == null ? void 0 : _a.props.onMetadataLoad(metadata);
      }
    } catch (error) {
      (_b = this.getCurrentLayer()) == null ? void 0 : _b.props.onMetadataLoadError(error);
    } finally {
      this.state.loadCounter--;
    }
  }
  /** Load an image */
  async loadImage(viewport, reason) {
    var _a, _b;
    const { layers, serviceType } = this.props;
    if (serviceType === "wms" && layers.length === 0) {
      return;
    }
    const bounds = viewport.getBounds();
    const { width, height } = viewport;
    const requestId = this.getRequestId();
    let { srs } = this.props;
    if (srs === "auto") {
      srs = viewport.resolution ? "EPSG:4326" : "EPSG:3857";
    }
    const requestParams = {
      width,
      height,
      boundingBox: [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]]
      ],
      layers,
      crs: srs
    };
    if (srs === "EPSG:3857") {
      const min = WGS84ToPseudoMercator([bounds[0], bounds[1]]);
      const max = WGS84ToPseudoMercator([bounds[2], bounds[3]]);
      requestParams.boundingBox = [min, max];
    }
    try {
      this.state.loadCounter++;
      this.props.onImageLoadStart(requestId);
      const image = await this.state.imageSource.getImage(requestParams);
      if (this.state.lastRequestId < requestId) {
        (_a = this.getCurrentLayer()) == null ? void 0 : _a.props.onImageLoad(requestId);
        this.setState({
          image,
          bounds,
          lastRequestParameters: requestParams,
          lastRequestId: requestId
        });
      }
    } catch (error) {
      this.raiseError(error, "Load image");
      (_b = this.getCurrentLayer()) == null ? void 0 : _b.props.onImageLoadError(requestId, error);
    } finally {
      this.state.loadCounter--;
    }
  }
  // HELPERS
  /** Global counter for issuing unique request ids */
  getRequestId() {
    return this.state._nextRequestId++;
  }
  /** Runs an action in the future, cancels it if the new action is issued before it executes */
  debounce(fn, ms = 500) {
    clearTimeout(this.state._timeoutId);
    this.state._timeoutId = setTimeout(() => fn(), ms);
  }
};
WMSLayer.layerName = "WMSLayer";
WMSLayer.defaultProps = defaultProps;

// dist/great-circle-layer/great-circle-layer.js
var import_layers2 = require("@deck.gl/layers");
var defaultProps2 = {
  getHeight: { type: "accessor", value: 0 },
  greatCircle: true
};
var GreatCircleLayer = class extends import_layers2.ArcLayer {
};
GreatCircleLayer.layerName = "GreatCircleLayer";
GreatCircleLayer.defaultProps = defaultProps2;
var great_circle_layer_default = GreatCircleLayer;

// dist/geo-cell-layer/GeoCellLayer.js
var import_core2 = require("@deck.gl/core");
var import_layers3 = require("@deck.gl/layers");
var defaultProps3 = {
  ...import_layers3.PolygonLayer.defaultProps
};
var GeoCellLayer = class extends import_core2.CompositeLayer {
  /** Implement to generate props to create geometry. */
  indexToBounds() {
    return null;
  }
  renderLayers() {
    const { elevationScale, extruded, wireframe, filled, stroked, lineWidthUnits, lineWidthScale, lineWidthMinPixels, lineWidthMaxPixels, lineJointRounded, lineMiterLimit, lineDashJustified, getElevation, getFillColor, getLineColor, getLineWidth } = this.props;
    const { updateTriggers, material, transitions } = this.props;
    const CellLayer = this.getSubLayerClass("cell", import_layers3.PolygonLayer);
    const { updateTriggers: boundsUpdateTriggers, ...boundsProps } = this.indexToBounds() || {};
    return new CellLayer({
      filled,
      wireframe,
      extruded,
      elevationScale,
      stroked,
      lineWidthUnits,
      lineWidthScale,
      lineWidthMinPixels,
      lineWidthMaxPixels,
      lineJointRounded,
      lineMiterLimit,
      lineDashJustified,
      material,
      transitions,
      getElevation,
      getFillColor,
      getLineColor,
      getLineWidth
    }, this.getSubLayerProps({
      id: "cell",
      updateTriggers: updateTriggers && {
        ...boundsUpdateTriggers,
        getElevation: updateTriggers.getElevation,
        getFillColor: updateTriggers.getFillColor,
        getLineColor: updateTriggers.getLineColor,
        getLineWidth: updateTriggers.getLineWidth
      }
    }), boundsProps);
  }
};
GeoCellLayer.layerName = "GeoCellLayer";
GeoCellLayer.defaultProps = defaultProps3;
var GeoCellLayer_default = GeoCellLayer;

// dist/s2-layer/s2-geometry.js
var import_long = __toESM(require("long"), 1);
var FACE_BITS = 3;
var MAX_LEVEL = 30;
var POS_BITS = 2 * MAX_LEVEL + 1;
var RADIAN_TO_DEGREE = 180 / Math.PI;
function IJToST(ij, order, offsets) {
  const maxSize = 1 << order;
  return [(ij[0] + offsets[0]) / maxSize, (ij[1] + offsets[1]) / maxSize];
}
function singleSTtoUV(st) {
  if (st >= 0.5) {
    return 1 / 3 * (4 * st * st - 1);
  }
  return 1 / 3 * (1 - 4 * (1 - st) * (1 - st));
}
function STToUV(st) {
  return [singleSTtoUV(st[0]), singleSTtoUV(st[1])];
}
function FaceUVToXYZ(face, [u, v]) {
  switch (face) {
    case 0:
      return [1, u, v];
    case 1:
      return [-u, 1, v];
    case 2:
      return [-u, -v, 1];
    case 3:
      return [-1, -v, -u];
    case 4:
      return [v, -1, -u];
    case 5:
      return [v, u, -1];
    default:
      throw new Error("Invalid face");
  }
}
function XYZToLngLat([x, y, z]) {
  const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
  const lng = Math.atan2(y, x);
  return [lng * RADIAN_TO_DEGREE, lat * RADIAN_TO_DEGREE];
}
function toHilbertQuadkey(idS) {
  let bin = import_long.default.fromString(idS, true, 10).toString(2);
  while (bin.length < FACE_BITS + POS_BITS) {
    bin = "0" + bin;
  }
  const lsbIndex = bin.lastIndexOf("1");
  const faceB = bin.substring(0, 3);
  const posB = bin.substring(3, lsbIndex);
  const levelN = posB.length / 2;
  const faceS = import_long.default.fromString(faceB, true, 2).toString(10);
  let posS = import_long.default.fromString(posB, true, 2).toString(4);
  while (posS.length < levelN) {
    posS = "0" + posS;
  }
  return `${faceS}/${posS}`;
}
function rotateAndFlipQuadrant(n, point, rx, ry) {
  if (ry === 0) {
    if (rx === 1) {
      point[0] = n - 1 - point[0];
      point[1] = n - 1 - point[1];
    }
    const x = point[0];
    point[0] = point[1];
    point[1] = x;
  }
}
function FromHilbertQuadKey(hilbertQuadkey) {
  const parts = hilbertQuadkey.split("/");
  const face = parseInt(parts[0], 10);
  const position = parts[1];
  const maxLevel = position.length;
  const point = [0, 0];
  let level;
  for (let i = maxLevel - 1; i >= 0; i--) {
    level = maxLevel - i;
    const bit = position[i];
    let rx = 0;
    let ry = 0;
    if (bit === "1") {
      ry = 1;
    } else if (bit === "2") {
      rx = 1;
      ry = 1;
    } else if (bit === "3") {
      rx = 1;
    }
    const val = Math.pow(2, level - 1);
    rotateAndFlipQuadrant(val, point, rx, ry);
    point[0] += val * rx;
    point[1] += val * ry;
  }
  if (face % 2 === 1) {
    const t = point[0];
    point[0] = point[1];
    point[1] = t;
  }
  return { face, ij: point, level };
}

// dist/s2-layer/s2-utils.js
var import_long2 = __toESM(require("long"), 1);
function getIdFromToken(token) {
  const paddedToken = token.padEnd(16, "0");
  return import_long2.default.fromString(paddedToken, 16);
}
var MAX_RESOLUTION = 100;
function getGeoBounds({ face, ij, level }) {
  const offsets = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [0, 0]
  ];
  const resolution = Math.max(1, Math.ceil(MAX_RESOLUTION * Math.pow(2, -level)));
  const result = new Float64Array(4 * resolution * 2 + 2);
  let ptIndex = 0;
  let prevLng = 0;
  for (let i = 0; i < 4; i++) {
    const offset = offsets[i].slice(0);
    const nextOffset = offsets[i + 1];
    const stepI = (nextOffset[0] - offset[0]) / resolution;
    const stepJ = (nextOffset[1] - offset[1]) / resolution;
    for (let j = 0; j < resolution; j++) {
      offset[0] += stepI;
      offset[1] += stepJ;
      const st = IJToST(ij, level, offset);
      const uv = STToUV(st);
      const xyz = FaceUVToXYZ(face, uv);
      const lngLat = XYZToLngLat(xyz);
      if (Math.abs(lngLat[1]) > 89.999) {
        lngLat[0] = prevLng;
      }
      const deltaLng = lngLat[0] - prevLng;
      lngLat[0] += deltaLng > 180 ? -360 : deltaLng < -180 ? 360 : 0;
      result[ptIndex++] = lngLat[0];
      result[ptIndex++] = lngLat[1];
      prevLng = lngLat[0];
    }
  }
  result[ptIndex++] = result[0];
  result[ptIndex++] = result[1];
  return result;
}
function getS2QuadKey(token) {
  if (typeof token === "string") {
    if (token.indexOf("/") > 0) {
      return token;
    }
    token = getIdFromToken(token);
  }
  return toHilbertQuadkey(token.toString());
}
function getS2Polygon(token) {
  const key = getS2QuadKey(token);
  const s2cell = FromHilbertQuadKey(key);
  return getGeoBounds(s2cell);
}

// dist/s2-layer/s2-layer.js
var defaultProps4 = {
  getS2Token: { type: "accessor", value: (d) => d.token }
};
var S2Layer = class extends GeoCellLayer_default {
  indexToBounds() {
    const { data, getS2Token } = this.props;
    return {
      data,
      _normalize: false,
      positionFormat: "XY",
      getPolygon: (x, objectInfo) => getS2Polygon(getS2Token(x, objectInfo))
    };
  }
};
S2Layer.layerName = "S2Layer";
S2Layer.defaultProps = defaultProps4;
var s2_layer_default = S2Layer;

// dist/quadkey-layer/quadkey-utils.js
var import_web_mercator2 = require("@math.gl/web-mercator");
var TILE_SIZE = 512;
function quadkeyToWorldBounds(quadkey, coverage) {
  let x = 0;
  let y = 0;
  let mask = 1 << quadkey.length;
  const scale = mask / TILE_SIZE;
  for (let i = 0; i < quadkey.length; i++) {
    mask >>= 1;
    const q = parseInt(quadkey[i]);
    if (q % 2)
      x |= mask;
    if (q > 1)
      y |= mask;
  }
  return [
    [x / scale, TILE_SIZE - y / scale],
    [(x + coverage) / scale, TILE_SIZE - (y + coverage) / scale]
  ];
}
function getQuadkeyPolygon(quadkey, coverage = 1) {
  const [topLeft, bottomRight] = quadkeyToWorldBounds(quadkey, coverage);
  const [w, n] = (0, import_web_mercator2.worldToLngLat)(topLeft);
  const [e, s] = (0, import_web_mercator2.worldToLngLat)(bottomRight);
  return [e, n, e, s, w, s, w, n, e, n];
}

// dist/quadkey-layer/quadkey-layer.js
var defaultProps5 = {
  getQuadkey: { type: "accessor", value: (d) => d.quadkey }
};
var QuadkeyLayer = class extends GeoCellLayer_default {
  indexToBounds() {
    const { data, extruded, getQuadkey } = this.props;
    const coverage = extruded ? 0.99 : 1;
    return {
      data,
      _normalize: false,
      positionFormat: "XY",
      getPolygon: (x, objectInfo) => getQuadkeyPolygon(getQuadkey(x, objectInfo), coverage),
      updateTriggers: { getPolygon: coverage }
    };
  }
};
QuadkeyLayer.layerName = "QuadkeyLayer";
QuadkeyLayer.defaultProps = defaultProps5;
var quadkey_layer_default = QuadkeyLayer;

// dist/tile-layer/tile-layer.js
var import_core5 = require("@deck.gl/core");
var import_layers4 = require("@deck.gl/layers");

// dist/tileset-2d/tileset-2d.js
var import_loader_utils = require("@loaders.gl/loader-utils");
var import_core4 = require("@math.gl/core");

// dist/tileset-2d/tile-2d-header.js
var Tile2DHeader = class {
  constructor(index) {
    this.index = index;
    this.isVisible = false;
    this.isSelected = false;
    this.parent = null;
    this.children = [];
    this.content = null;
    this._loader = void 0;
    this._abortController = null;
    this._loaderId = 0;
    this._isLoaded = false;
    this._isCancelled = false;
    this._needsReload = false;
  }
  /** @deprecated use `boundingBox` instead */
  get bbox() {
    return this._bbox;
  }
  // TODO - remove in v9
  set bbox(value) {
    if (this._bbox)
      return;
    this._bbox = value;
    if ("west" in value) {
      this.boundingBox = [
        [value.west, value.south],
        [value.east, value.north]
      ];
    } else {
      this.boundingBox = [
        [value.left, value.top],
        [value.right, value.bottom]
      ];
    }
  }
  get data() {
    return this.isLoading && this._loader ? this._loader.then(() => this.data) : this.content;
  }
  get isLoaded() {
    return this._isLoaded && !this._needsReload;
  }
  get isLoading() {
    return Boolean(this._loader) && !this._isCancelled;
  }
  get needsReload() {
    return this._needsReload || this._isCancelled;
  }
  get byteLength() {
    const result = this.content ? this.content.byteLength : 0;
    if (!Number.isFinite(result)) {
      console.error("byteLength not defined in tile data");
    }
    return result;
  }
  /* eslint-disable max-statements */
  async _loadData({ getData, requestScheduler, onLoad, onError }) {
    const { index, id, bbox, userData, zoom } = this;
    const loaderId = this._loaderId;
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const requestToken = await requestScheduler.scheduleRequest(this, (tile) => {
      return tile.isSelected ? 1 : -1;
    });
    if (!requestToken) {
      this._isCancelled = true;
      return;
    }
    if (this._isCancelled) {
      requestToken.done();
      return;
    }
    let tileData = null;
    let error;
    try {
      tileData = await getData({ index, id, bbox, userData, zoom, signal });
    } catch (err) {
      error = err || true;
    } finally {
      requestToken.done();
    }
    if (loaderId !== this._loaderId) {
      return;
    }
    this._loader = void 0;
    this.content = tileData;
    if (this._isCancelled && !tileData) {
      this._isLoaded = false;
      return;
    }
    this._isLoaded = true;
    this._isCancelled = false;
    if (error) {
      onError(error, this);
    } else {
      onLoad(this);
    }
  }
  loadData(opts) {
    this._isLoaded = false;
    this._isCancelled = false;
    this._needsReload = false;
    this._loaderId++;
    this._loader = this._loadData(opts);
    return this._loader;
  }
  setNeedsReload() {
    if (this.isLoading) {
      this.abort();
      this._loader = void 0;
    }
    this._needsReload = true;
  }
  abort() {
    var _a;
    if (this.isLoaded) {
      return;
    }
    this._isCancelled = true;
    (_a = this._abortController) == null ? void 0 : _a.abort();
  }
};

// dist/tileset-2d/tile-2d-traversal.js
var import_core3 = require("@deck.gl/core");
var import_culling = require("@math.gl/culling");
var import_web_mercator3 = require("@math.gl/web-mercator");
var TILE_SIZE2 = 512;
var MAX_MAPS = 3;
var REF_POINTS_5 = [
  [0.5, 0.5],
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
];
var REF_POINTS_9 = REF_POINTS_5.concat([
  [0, 0.5],
  [0.5, 0],
  [1, 0.5],
  [0.5, 1]
]);
var REF_POINTS_11 = REF_POINTS_9.concat([
  [0.25, 0.5],
  [0.75, 0.5]
]);
var OSMNode = class {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  get children() {
    if (!this._children) {
      const x = this.x * 2;
      const y = this.y * 2;
      const z = this.z + 1;
      this._children = [
        new OSMNode(x, y, z),
        new OSMNode(x, y + 1, z),
        new OSMNode(x + 1, y, z),
        new OSMNode(x + 1, y + 1, z)
      ];
    }
    return this._children;
  }
  // eslint-disable-next-line complexity
  update(params) {
    const { viewport, cullingVolume, elevationBounds, minZ, maxZ, bounds, offset, project } = params;
    const boundingVolume = this.getBoundingVolume(elevationBounds, offset, project);
    if (bounds && !this.insideBounds(bounds)) {
      return false;
    }
    const isInside = cullingVolume.computeVisibility(boundingVolume);
    if (isInside < 0) {
      return false;
    }
    if (!this.childVisible) {
      let { z } = this;
      if (z < maxZ && z >= minZ) {
        const distance = boundingVolume.distanceTo(viewport.cameraPosition) * viewport.scale / viewport.height;
        z += Math.floor(Math.log2(distance));
      }
      if (z >= maxZ) {
        this.selected = true;
        return true;
      }
    }
    this.selected = false;
    this.childVisible = true;
    for (const child of this.children) {
      child.update(params);
    }
    return true;
  }
  getSelected(result = []) {
    if (this.selected) {
      result.push(this);
    }
    if (this._children) {
      for (const node of this._children) {
        node.getSelected(result);
      }
    }
    return result;
  }
  insideBounds([minX, minY, maxX, maxY]) {
    const scale = Math.pow(2, this.z);
    const extent = TILE_SIZE2 / scale;
    return this.x * extent < maxX && this.y * extent < maxY && (this.x + 1) * extent > minX && (this.y + 1) * extent > minY;
  }
  getBoundingVolume(zRange, worldOffset, project) {
    if (project) {
      const refPoints = this.z < 1 ? REF_POINTS_11 : this.z < 2 ? REF_POINTS_9 : REF_POINTS_5;
      const refPointPositions = [];
      for (const p of refPoints) {
        const lngLat = osmTile2lngLat(this.x + p[0], this.y + p[1], this.z);
        lngLat[2] = zRange[0];
        refPointPositions.push(project(lngLat));
        if (zRange[0] !== zRange[1]) {
          lngLat[2] = zRange[1];
          refPointPositions.push(project(lngLat));
        }
      }
      return (0, import_culling.makeOrientedBoundingBoxFromPoints)(refPointPositions);
    }
    const scale = Math.pow(2, this.z);
    const extent = TILE_SIZE2 / scale;
    const originX = this.x * extent + worldOffset * TILE_SIZE2;
    const originY = TILE_SIZE2 - (this.y + 1) * extent;
    return new import_culling.AxisAlignedBoundingBox([originX, originY, zRange[0]], [originX + extent, originY + extent, zRange[1]]);
  }
};
function getOSMTileIndices(viewport, maxZ, zRange, bounds) {
  const project = viewport instanceof import_core3._GlobeViewport && viewport.resolution ? (
    // eslint-disable-next-line @typescript-eslint/unbound-method
    viewport.projectPosition
  ) : null;
  const planes = Object.values(viewport.getFrustumPlanes()).map(({ normal, distance }) => new import_culling.Plane(normal.clone().negate(), distance));
  const cullingVolume = new import_culling.CullingVolume(planes);
  const unitsPerMeter = viewport.distanceScales.unitsPerMeter[2];
  const elevationMin = zRange && zRange[0] * unitsPerMeter || 0;
  const elevationMax = zRange && zRange[1] * unitsPerMeter || 0;
  const minZ = viewport instanceof import_core3.WebMercatorViewport && viewport.pitch <= 60 ? maxZ : 0;
  if (bounds) {
    const [minLng, minLat, maxLng, maxLat] = bounds;
    const topLeft = (0, import_web_mercator3.lngLatToWorld)([minLng, maxLat]);
    const bottomRight = (0, import_web_mercator3.lngLatToWorld)([maxLng, minLat]);
    bounds = [topLeft[0], TILE_SIZE2 - topLeft[1], bottomRight[0], TILE_SIZE2 - bottomRight[1]];
  }
  const root = new OSMNode(0, 0, 0);
  const traversalParams = {
    viewport,
    project,
    cullingVolume,
    elevationBounds: [elevationMin, elevationMax],
    minZ,
    maxZ,
    bounds,
    // num. of worlds from the center. For repeated maps
    offset: 0
  };
  root.update(traversalParams);
  if (viewport instanceof import_core3.WebMercatorViewport && viewport.subViewports && viewport.subViewports.length > 1) {
    traversalParams.offset = -1;
    while (root.update(traversalParams)) {
      if (--traversalParams.offset < -MAX_MAPS) {
        break;
      }
    }
    traversalParams.offset = 1;
    while (root.update(traversalParams)) {
      if (++traversalParams.offset > MAX_MAPS) {
        break;
      }
    }
  }
  return root.getSelected();
}

// dist/tileset-2d/utils.js
var TILE_SIZE3 = 512;
var DEFAULT_EXTENT = [-Infinity, -Infinity, Infinity, Infinity];
var urlType = {
  type: "object",
  value: null,
  validate: (value, propType) => propType.optional && value === null || typeof value === "string" || Array.isArray(value) && value.every((url) => typeof url === "string"),
  equal: (value1, value2) => {
    if (value1 === value2) {
      return true;
    }
    if (!Array.isArray(value1) || !Array.isArray(value2)) {
      return false;
    }
    const len = value1.length;
    if (len !== value2.length) {
      return false;
    }
    for (let i = 0; i < len; i++) {
      if (value1[i] !== value2[i]) {
        return false;
      }
    }
    return true;
  }
};
function transformBox(bbox, modelMatrix) {
  const transformedCoords = [
    // top-left
    modelMatrix.transformAsPoint([bbox[0], bbox[1]]),
    // top-right
    modelMatrix.transformAsPoint([bbox[2], bbox[1]]),
    // bottom-left
    modelMatrix.transformAsPoint([bbox[0], bbox[3]]),
    // bottom-right
    modelMatrix.transformAsPoint([bbox[2], bbox[3]])
  ];
  const transformedBox = [
    // Minimum x coord
    Math.min(...transformedCoords.map((i) => i[0])),
    // Minimum y coord
    Math.min(...transformedCoords.map((i) => i[1])),
    // Max x coord
    Math.max(...transformedCoords.map((i) => i[0])),
    // Max y coord
    Math.max(...transformedCoords.map((i) => i[1]))
  ];
  return transformedBox;
}
function stringHash(s) {
  return Math.abs(s.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0) | 0, 0));
}
function getURLFromTemplate(template, tile) {
  if (!template || !template.length) {
    return null;
  }
  const { index, id } = tile;
  if (Array.isArray(template)) {
    const i = stringHash(id) % template.length;
    template = template[i];
  }
  let url = template;
  for (const key of Object.keys(index)) {
    const regex = new RegExp(`{${key}}`, "g");
    url = url.replace(regex, String(index[key]));
  }
  if (Number.isInteger(index.y) && Number.isInteger(index.z)) {
    url = url.replace(/\{-y\}/g, String(Math.pow(2, index.z) - index.y - 1));
  }
  return url;
}
function getBoundingBox(viewport, zRange, extent) {
  let bounds;
  if (zRange && zRange.length === 2) {
    const [minZ, maxZ] = zRange;
    const bounds0 = viewport.getBounds({ z: minZ });
    const bounds1 = viewport.getBounds({ z: maxZ });
    bounds = [
      Math.min(bounds0[0], bounds1[0]),
      Math.min(bounds0[1], bounds1[1]),
      Math.max(bounds0[2], bounds1[2]),
      Math.max(bounds0[3], bounds1[3])
    ];
  } else {
    bounds = viewport.getBounds();
  }
  if (!viewport.isGeospatial) {
    return [
      // Top corner should not be more then bottom corner in either direction
      Math.max(Math.min(bounds[0], extent[2]), extent[0]),
      Math.max(Math.min(bounds[1], extent[3]), extent[1]),
      // Bottom corner should not be less then top corner in either direction
      Math.min(Math.max(bounds[2], extent[0]), extent[2]),
      Math.min(Math.max(bounds[3], extent[1]), extent[3])
    ];
  }
  return [
    Math.max(bounds[0], extent[0]),
    Math.max(bounds[1], extent[1]),
    Math.min(bounds[2], extent[2]),
    Math.min(bounds[3], extent[3])
  ];
}
function getCullBounds({ viewport, z, cullRect }) {
  const subViewports = viewport.subViewports || [viewport];
  return subViewports.map((v) => getCullBoundsInViewport(v, z || 0, cullRect));
}
function getCullBoundsInViewport(viewport, z, cullRect) {
  if (!Array.isArray(z)) {
    const x = cullRect.x - viewport.x;
    const y = cullRect.y - viewport.y;
    const { width, height } = cullRect;
    const unprojectOption = { targetZ: z };
    const topLeft = viewport.unproject([x, y], unprojectOption);
    const topRight = viewport.unproject([x + width, y], unprojectOption);
    const bottomLeft = viewport.unproject([x, y + height], unprojectOption);
    const bottomRight = viewport.unproject([x + width, y + height], unprojectOption);
    return [
      Math.min(topLeft[0], topRight[0], bottomLeft[0], bottomRight[0]),
      Math.min(topLeft[1], topRight[1], bottomLeft[1], bottomRight[1]),
      Math.max(topLeft[0], topRight[0], bottomLeft[0], bottomRight[0]),
      Math.max(topLeft[1], topRight[1], bottomLeft[1], bottomRight[1])
    ];
  }
  const bounds0 = getCullBoundsInViewport(viewport, z[0], cullRect);
  const bounds1 = getCullBoundsInViewport(viewport, z[1], cullRect);
  return [
    Math.min(bounds0[0], bounds1[0]),
    Math.min(bounds0[1], bounds1[1]),
    Math.max(bounds0[2], bounds1[2]),
    Math.max(bounds0[3], bounds1[3])
  ];
}
function getIndexingCoords(bbox, scale, modelMatrixInverse) {
  if (modelMatrixInverse) {
    const transformedTileIndex = transformBox(bbox, modelMatrixInverse).map((i) => i * scale / TILE_SIZE3);
    return transformedTileIndex;
  }
  return bbox.map((i) => i * scale / TILE_SIZE3);
}
function getScale(z, tileSize) {
  return Math.pow(2, z) * TILE_SIZE3 / tileSize;
}
function osmTile2lngLat(x, y, z) {
  const scale = getScale(z, TILE_SIZE3);
  const lng = x / scale * 360 - 180;
  const n = Math.PI - 2 * Math.PI * y / scale;
  const lat = 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return [lng, lat];
}
function tile2XY(x, y, z, tileSize) {
  const scale = getScale(z, tileSize);
  return [x / scale * TILE_SIZE3, y / scale * TILE_SIZE3];
}
function tileToBoundingBox(viewport, x, y, z, tileSize = TILE_SIZE3) {
  if (viewport.isGeospatial) {
    const [west, north] = osmTile2lngLat(x, y, z);
    const [east, south] = osmTile2lngLat(x + 1, y + 1, z);
    return { west, north, east, south };
  }
  const [left, top] = tile2XY(x, y, z, tileSize);
  const [right, bottom] = tile2XY(x + 1, y + 1, z, tileSize);
  return { left, top, right, bottom };
}
function getIdentityTileIndices(viewport, z, tileSize, extent, modelMatrixInverse) {
  const bbox = getBoundingBox(viewport, null, extent);
  const scale = getScale(z, tileSize);
  const [minX, minY, maxX, maxY] = getIndexingCoords(bbox, scale, modelMatrixInverse);
  const indices = [];
  for (let x = Math.floor(minX); x < maxX; x++) {
    for (let y = Math.floor(minY); y < maxY; y++) {
      indices.push({ x, y, z });
    }
  }
  return indices;
}
function getTileIndices({ viewport, maxZoom, minZoom, zRange, extent, tileSize = TILE_SIZE3, modelMatrix, modelMatrixInverse, zoomOffset = 0 }) {
  let z = viewport.isGeospatial ? Math.round(viewport.zoom + Math.log2(TILE_SIZE3 / tileSize)) + zoomOffset : Math.ceil(viewport.zoom) + zoomOffset;
  if (typeof minZoom === "number" && Number.isFinite(minZoom) && z < minZoom) {
    if (!extent) {
      return [];
    }
    z = minZoom;
  }
  if (typeof maxZoom === "number" && Number.isFinite(maxZoom) && z > maxZoom) {
    z = maxZoom;
  }
  let transformedExtent = extent;
  if (modelMatrix && modelMatrixInverse && extent && !viewport.isGeospatial) {
    transformedExtent = transformBox(extent, modelMatrix);
  }
  return viewport.isGeospatial ? getOSMTileIndices(viewport, z, zRange, extent) : getIdentityTileIndices(viewport, z, tileSize, transformedExtent || DEFAULT_EXTENT, modelMatrixInverse);
}
function isURLTemplate(s) {
  return /(?=.*{z})(?=.*{x})(?=.*({y}|{-y}))/.test(s);
}
function isGeoBoundingBox(v) {
  return Number.isFinite(v.west) && Number.isFinite(v.north) && Number.isFinite(v.east) && Number.isFinite(v.south);
}

// dist/tileset-2d/memoize.js
function memoize(compute) {
  let cachedArgs = {};
  let cachedResult;
  return (args) => {
    for (const key in args) {
      if (!isEqual(args[key], cachedArgs[key])) {
        cachedResult = compute(args);
        cachedArgs = args;
        break;
      }
    }
    return cachedResult;
  };
}
function isEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (Array.isArray(a)) {
    const len = a.length;
    if (!b || b.length !== len) {
      return false;
    }
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

// dist/tileset-2d/tileset-2d.js
var TILE_STATE_VISITED = 1;
var TILE_STATE_VISIBLE = 2;
var STRATEGY_NEVER = "never";
var STRATEGY_REPLACE = "no-overlap";
var STRATEGY_DEFAULT = "best-available";
var DEFAULT_CACHE_SCALE = 5;
var STRATEGIES = {
  [STRATEGY_DEFAULT]: updateTileStateDefault,
  [STRATEGY_REPLACE]: updateTileStateReplace,
  [STRATEGY_NEVER]: () => {
  }
};
var DEFAULT_TILESET2D_PROPS = {
  extent: null,
  tileSize: 512,
  maxZoom: null,
  minZoom: null,
  maxCacheSize: null,
  maxCacheByteSize: null,
  refinementStrategy: "best-available",
  zRange: null,
  maxRequests: 6,
  debounceTime: 0,
  zoomOffset: 0,
  // onTileLoad: (tile: Tile2DHeader) => void,  // onTileUnload: (tile: Tile2DHeader) => void,  // onTileError: (error: any, tile: Tile2DHeader) => void,  /** Called when all tiles in the current viewport are loaded. */
  // onViewportLoad: ((tiles: Tile2DHeader<DataT>[]) => void) | null,
  onTileLoad: () => {
  },
  onTileUnload: () => {
  },
  onTileError: () => {
  }
};
var Tileset2D = class {
  /**
   * Takes in a function that returns tile data, a cache size, and a max and a min zoom level.
   * Cache size defaults to 5 * number of tiles in the current viewport
   */
  constructor(opts) {
    this._getCullBounds = memoize(getCullBounds);
    this.opts = { ...DEFAULT_TILESET2D_PROPS, ...opts };
    this.setOptions(this.opts);
    this.onTileLoad = (tile) => {
      var _a, _b;
      (_b = (_a = this.opts).onTileLoad) == null ? void 0 : _b.call(_a, tile);
      if (this.opts.maxCacheByteSize !== null) {
        this._cacheByteSize += tile.byteLength;
        this._resizeCache();
      }
    };
    this._requestScheduler = new import_loader_utils.RequestScheduler({
      throttleRequests: this.opts.maxRequests > 0 || this.opts.debounceTime > 0,
      maxRequests: this.opts.maxRequests,
      debounceTime: this.opts.debounceTime
    });
    this._cache = /* @__PURE__ */ new Map();
    this._tiles = [];
    this._dirty = false;
    this._cacheByteSize = 0;
    this._viewport = null;
    this._zRange = null;
    this._selectedTiles = null;
    this._frameNumber = 0;
    this._modelMatrix = new import_core4.Matrix4();
    this._modelMatrixInverse = new import_core4.Matrix4();
  }
  /* Public API */
  get tiles() {
    return this._tiles;
  }
  get selectedTiles() {
    return this._selectedTiles;
  }
  get isLoaded() {
    return this._selectedTiles !== null && this._selectedTiles.every((tile) => tile.isLoaded);
  }
  get needsReload() {
    return this._selectedTiles !== null && this._selectedTiles.some((tile) => tile.needsReload);
  }
  setOptions(opts) {
    Object.assign(this.opts, opts);
    if (Number.isFinite(opts.maxZoom)) {
      this._maxZoom = Math.floor(opts.maxZoom);
    }
    if (Number.isFinite(opts.minZoom)) {
      this._minZoom = Math.ceil(opts.minZoom);
    }
  }
  // Clean up any outstanding tile requests.
  finalize() {
    for (const tile of this._cache.values()) {
      if (tile.isLoading) {
        tile.abort();
      }
    }
    this._cache.clear();
    this._tiles = [];
    this._selectedTiles = null;
  }
  reloadAll() {
    for (const id of this._cache.keys()) {
      const tile = this._cache.get(id);
      if (!this._selectedTiles || !this._selectedTiles.includes(tile)) {
        this._cache.delete(id);
      } else {
        tile.setNeedsReload();
      }
    }
  }
  /**
   * Update the cache with the given viewport and model matrix and triggers callback onUpdate.
   */
  update(viewport, { zRange, modelMatrix } = {
    zRange: null,
    modelMatrix: null
  }) {
    const modelMatrixAsMatrix4 = modelMatrix ? new import_core4.Matrix4(modelMatrix) : new import_core4.Matrix4();
    const isModelMatrixNew = !modelMatrixAsMatrix4.equals(this._modelMatrix);
    if (!this._viewport || !viewport.equals(this._viewport) || !(0, import_core4.equals)(this._zRange, zRange) || isModelMatrixNew) {
      if (isModelMatrixNew) {
        this._modelMatrixInverse = modelMatrixAsMatrix4.clone().invert();
        this._modelMatrix = modelMatrixAsMatrix4;
      }
      this._viewport = viewport;
      this._zRange = zRange;
      const tileIndices = this.getTileIndices({
        viewport,
        maxZoom: this._maxZoom,
        minZoom: this._minZoom,
        zRange,
        modelMatrix: this._modelMatrix,
        modelMatrixInverse: this._modelMatrixInverse
      });
      this._selectedTiles = tileIndices.map((index) => this._getTile(index, true));
      if (this._dirty) {
        this._rebuildTree();
      }
    } else if (this.needsReload) {
      this._selectedTiles = this._selectedTiles.map((tile) => this._getTile(tile.index, true));
    }
    const changed = this.updateTileStates();
    this._pruneRequests();
    if (this._dirty) {
      this._resizeCache();
    }
    if (changed) {
      this._frameNumber++;
    }
    return this._frameNumber;
  }
  // eslint-disable-next-line complexity
  isTileVisible(tile, cullRect) {
    if (!tile.isVisible) {
      return false;
    }
    if (cullRect && this._viewport) {
      const boundsArr = this._getCullBounds({
        viewport: this._viewport,
        z: this._zRange,
        cullRect
      });
      const { bbox } = tile;
      for (const [minX, minY, maxX, maxY] of boundsArr) {
        let overlaps;
        if ("west" in bbox) {
          overlaps = bbox.west < maxX && bbox.east > minX && bbox.south < maxY && bbox.north > minY;
        } else {
          const y0 = Math.min(bbox.top, bbox.bottom);
          const y1 = Math.max(bbox.top, bbox.bottom);
          overlaps = bbox.left < maxX && bbox.right > minX && y0 < maxY && y1 > minY;
        }
        if (overlaps) {
          return true;
        }
      }
      return false;
    }
    return true;
  }
  /* Public interface for subclassing */
  /** Returns array of tile indices in the current viewport */
  getTileIndices({ viewport, maxZoom, minZoom, zRange, modelMatrix, modelMatrixInverse }) {
    const { tileSize, extent, zoomOffset } = this.opts;
    return getTileIndices({
      viewport,
      maxZoom,
      minZoom,
      zRange,
      tileSize,
      extent,
      modelMatrix,
      modelMatrixInverse,
      zoomOffset
    });
  }
  /** Returns unique string key for a tile index */
  getTileId(index) {
    return `${index.x}-${index.y}-${index.z}`;
  }
  /** Returns a zoom level for a tile index */
  getTileZoom(index) {
    return index.z;
  }
  /** Returns additional metadata to add to tile, bbox by default */
  getTileMetadata(index) {
    const { tileSize } = this.opts;
    return { bbox: tileToBoundingBox(this._viewport, index.x, index.y, index.z, tileSize) };
  }
  /** Returns index of the parent tile */
  getParentIndex(index) {
    const x = Math.floor(index.x / 2);
    const y = Math.floor(index.y / 2);
    const z = index.z - 1;
    return { x, y, z };
  }
  // Returns true if any tile's visibility changed
  updateTileStates() {
    const refinementStrategy = this.opts.refinementStrategy || STRATEGY_DEFAULT;
    const visibilities = new Array(this._cache.size);
    let i = 0;
    for (const tile of this._cache.values()) {
      visibilities[i++] = tile.isVisible;
      tile.isSelected = false;
      tile.isVisible = false;
    }
    for (const tile of this._selectedTiles) {
      tile.isSelected = true;
      tile.isVisible = true;
    }
    (typeof refinementStrategy === "function" ? refinementStrategy : STRATEGIES[refinementStrategy])(Array.from(this._cache.values()));
    i = 0;
    for (const tile of this._cache.values()) {
      if (visibilities[i++] !== tile.isVisible) {
        return true;
      }
    }
    return false;
  }
  _pruneRequests() {
    const { maxRequests = 0 } = this.opts;
    const abortCandidates = [];
    let ongoingRequestCount = 0;
    for (const tile of this._cache.values()) {
      if (tile.isLoading) {
        ongoingRequestCount++;
        if (!tile.isSelected && !tile.isVisible) {
          abortCandidates.push(tile);
        }
      }
    }
    while (maxRequests > 0 && ongoingRequestCount > maxRequests && abortCandidates.length > 0) {
      const tile = abortCandidates.shift();
      tile.abort();
      ongoingRequestCount--;
    }
  }
  // This needs to be called every time some tiles have been added/removed from cache
  _rebuildTree() {
    const { _cache } = this;
    for (const tile of _cache.values()) {
      tile.parent = null;
      if (tile.children) {
        tile.children.length = 0;
      }
    }
    for (const tile of _cache.values()) {
      const parent = this._getNearestAncestor(tile);
      tile.parent = parent;
      if (parent == null ? void 0 : parent.children) {
        parent.children.push(tile);
      }
    }
  }
  /**
   * Clear tiles that are not visible when the cache is full
   */
  /* eslint-disable complexity */
  _resizeCache() {
    var _a, _b;
    const { _cache, opts } = this;
    const maxCacheSize = opts.maxCacheSize ?? // @ts-expect-error called only when selectedTiles is initialized
    (opts.maxCacheByteSize !== null ? Infinity : DEFAULT_CACHE_SCALE * this.selectedTiles.length);
    const maxCacheByteSize = opts.maxCacheByteSize ?? Infinity;
    const overflown = _cache.size > maxCacheSize || this._cacheByteSize > maxCacheByteSize;
    if (overflown) {
      for (const [id, tile] of _cache) {
        if (!tile.isVisible && !tile.isSelected) {
          this._cacheByteSize -= opts.maxCacheByteSize !== null ? tile.byteLength : 0;
          _cache.delete(id);
          (_b = (_a = this.opts).onTileUnload) == null ? void 0 : _b.call(_a, tile);
        }
        if (_cache.size <= maxCacheSize && this._cacheByteSize <= maxCacheByteSize) {
          break;
        }
      }
      this._rebuildTree();
      this._dirty = true;
    }
    if (this._dirty) {
      this._tiles = Array.from(this._cache.values()).sort((t1, t2) => t1.zoom - t2.zoom);
      this._dirty = false;
    }
  }
  _getTile(index, create) {
    const id = this.getTileId(index);
    let tile = this._cache.get(id);
    let needsReload = false;
    if (!tile && create) {
      tile = new Tile2DHeader(index);
      Object.assign(tile, this.getTileMetadata(tile.index));
      Object.assign(tile, { id, zoom: this.getTileZoom(tile.index) });
      needsReload = true;
      this._cache.set(id, tile);
      this._dirty = true;
    } else if (tile && tile.needsReload) {
      needsReload = true;
    }
    if (tile && needsReload) {
      tile.loadData({
        getData: this.opts.getTileData,
        requestScheduler: this._requestScheduler,
        onLoad: this.onTileLoad,
        onError: this.opts.onTileError
      });
    }
    return tile;
  }
  _getNearestAncestor(tile) {
    const { _minZoom = 0 } = this;
    let index = tile.index;
    while (this.getTileZoom(index) > _minZoom) {
      index = this.getParentIndex(index);
      const parent = this._getTile(index);
      if (parent) {
        return parent;
      }
    }
    return null;
  }
};
function updateTileStateDefault(allTiles) {
  for (const tile of allTiles) {
    tile.state = 0;
  }
  for (const tile of allTiles) {
    if (tile.isSelected && !getPlaceholderInAncestors(tile)) {
      getPlaceholderInChildren(tile);
    }
  }
  for (const tile of allTiles) {
    tile.isVisible = Boolean(tile.state & TILE_STATE_VISIBLE);
  }
}
function updateTileStateReplace(allTiles) {
  for (const tile of allTiles) {
    tile.state = 0;
  }
  for (const tile of allTiles) {
    if (tile.isSelected) {
      getPlaceholderInAncestors(tile);
    }
  }
  const sortedTiles = Array.from(allTiles).sort((t1, t2) => t1.zoom - t2.zoom);
  for (const tile of sortedTiles) {
    tile.isVisible = Boolean(tile.state & TILE_STATE_VISIBLE);
    if (tile.children && (tile.isVisible || tile.state & TILE_STATE_VISITED)) {
      for (const child of tile.children) {
        child.state = TILE_STATE_VISITED;
      }
    } else if (tile.isSelected) {
      getPlaceholderInChildren(tile);
    }
  }
}
function getPlaceholderInAncestors(startTile) {
  let tile = startTile;
  while (tile) {
    if (tile.isLoaded || tile.content) {
      tile.state |= TILE_STATE_VISIBLE;
      return true;
    }
    tile = tile.parent;
  }
  return false;
}
function getPlaceholderInChildren(tile) {
  for (const child of tile.children) {
    if (child.isLoaded || child.content) {
      child.state |= TILE_STATE_VISIBLE;
    } else {
      getPlaceholderInChildren(child);
    }
  }
}

// dist/tile-layer/tile-layer.js
var defaultProps6 = {
  TilesetClass: Tileset2D,
  data: { type: "data", value: [] },
  dataComparator: urlType.equal,
  renderSubLayers: { type: "function", value: (props) => new import_layers4.GeoJsonLayer(props) },
  getTileData: { type: "function", optional: true, value: null },
  // TODO - change to onViewportLoad to align with Tile3DLayer
  onViewportLoad: { type: "function", optional: true, value: null },
  onTileLoad: { type: "function", value: (tile) => {
  } },
  onTileUnload: { type: "function", value: (tile) => {
  } },
  // eslint-disable-next-line
  onTileError: { type: "function", value: (err) => console.error(err) },
  extent: { type: "array", optional: true, value: null, compare: true },
  tileSize: 512,
  maxZoom: null,
  minZoom: 0,
  maxCacheSize: null,
  maxCacheByteSize: null,
  refinementStrategy: STRATEGY_DEFAULT,
  zRange: null,
  maxRequests: 6,
  debounceTime: 0,
  zoomOffset: 0
};
var TileLayer = class extends import_core5.CompositeLayer {
  initializeState() {
    this.state = {
      tileset: null,
      isLoaded: false
    };
  }
  finalizeState() {
    var _a, _b;
    (_b = (_a = this.state) == null ? void 0 : _a.tileset) == null ? void 0 : _b.finalize();
  }
  get isLoaded() {
    var _a, _b, _c;
    return Boolean((_c = (_b = (_a = this.state) == null ? void 0 : _a.tileset) == null ? void 0 : _b.selectedTiles) == null ? void 0 : _c.every((tile) => tile.isLoaded && tile.layers && tile.layers.every((layer) => layer.isLoaded)));
  }
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }
  updateState({ changeFlags }) {
    let { tileset } = this.state;
    const propsChanged = changeFlags.propsOrDataChanged || changeFlags.updateTriggersChanged;
    const dataChanged = changeFlags.dataChanged || changeFlags.updateTriggersChanged && (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getTileData);
    if (!tileset) {
      tileset = new this.props.TilesetClass(this._getTilesetOptions());
      this.setState({ tileset });
    } else if (propsChanged) {
      tileset.setOptions(this._getTilesetOptions());
      if (dataChanged) {
        tileset.reloadAll();
      } else {
        tileset.tiles.forEach((tile) => {
          tile.layers = null;
        });
      }
    }
    this._updateTileset();
  }
  _getTilesetOptions() {
    const { tileSize, maxCacheSize, maxCacheByteSize, refinementStrategy, extent, maxZoom, minZoom, maxRequests, debounceTime, zoomOffset } = this.props;
    return {
      maxCacheSize,
      maxCacheByteSize,
      maxZoom,
      minZoom,
      tileSize,
      refinementStrategy,
      extent,
      maxRequests,
      debounceTime,
      zoomOffset,
      getTileData: this.getTileData.bind(this),
      onTileLoad: this._onTileLoad.bind(this),
      onTileError: this._onTileError.bind(this),
      onTileUnload: this._onTileUnload.bind(this)
    };
  }
  _updateTileset() {
    const tileset = this.state.tileset;
    const { zRange, modelMatrix } = this.props;
    const frameNumber = tileset.update(this.context.viewport, { zRange, modelMatrix });
    const { isLoaded } = tileset;
    const loadingStateChanged = this.state.isLoaded !== isLoaded;
    const tilesetChanged = this.state.frameNumber !== frameNumber;
    if (isLoaded && (loadingStateChanged || tilesetChanged)) {
      this._onViewportLoad();
    }
    if (tilesetChanged) {
      this.setState({ frameNumber });
    }
    this.state.isLoaded = isLoaded;
  }
  _onViewportLoad() {
    const { tileset } = this.state;
    const { onViewportLoad } = this.props;
    if (onViewportLoad) {
      onViewportLoad(tileset.selectedTiles);
    }
  }
  _onTileLoad(tile) {
    this.props.onTileLoad(tile);
    tile.layers = null;
    this.setNeedsUpdate();
  }
  _onTileError(error, tile) {
    this.props.onTileError(error);
    tile.layers = null;
    this.setNeedsUpdate();
  }
  _onTileUnload(tile) {
    this.props.onTileUnload(tile);
  }
  // Methods for subclass to override
  getTileData(tile) {
    const { data, getTileData, fetch } = this.props;
    const { signal } = tile;
    tile.url = typeof data === "string" || Array.isArray(data) ? getURLFromTemplate(data, tile) : null;
    if (getTileData) {
      return getTileData(tile);
    }
    if (fetch && tile.url) {
      return fetch(tile.url, { propName: "data", layer: this, signal });
    }
    return null;
  }
  renderSubLayers(props) {
    return this.props.renderSubLayers(props);
  }
  getSubLayerPropsByTile(tile) {
    return null;
  }
  getPickingInfo(params) {
    const sourceLayer = params.sourceLayer;
    const sourceTile = sourceLayer.props.tile;
    const info = params.info;
    if (info.picked) {
      info.tile = sourceTile;
    }
    info.sourceTile = sourceTile;
    info.sourceTileSubLayer = sourceLayer;
    return info;
  }
  _updateAutoHighlight(info) {
    info.sourceTileSubLayer.updateAutoHighlight(info);
  }
  renderLayers() {
    return this.state.tileset.tiles.map((tile) => {
      const subLayerProps = this.getSubLayerPropsByTile(tile);
      if (!tile.isLoaded && !tile.content) {
      } else if (!tile.layers) {
        const layers = this.renderSubLayers({
          ...this.props,
          ...this.getSubLayerProps({
            id: tile.id,
            updateTriggers: this.props.updateTriggers
          }),
          data: tile.content,
          _offset: 0,
          tile
        });
        tile.layers = (0, import_core5._flatten)(layers, Boolean).map((layer) => layer.clone({
          tile,
          ...subLayerProps
        }));
      } else if (subLayerProps && tile.layers[0] && Object.keys(subLayerProps).some((propName) => tile.layers[0].props[propName] !== subLayerProps[propName])) {
        tile.layers = tile.layers.map((layer) => layer.clone(subLayerProps));
      }
      return tile.layers;
    });
  }
  filterSubLayer({ layer, cullRect }) {
    const { tile } = layer.props;
    return this.state.tileset.isTileVisible(tile, cullRect);
  }
};
TileLayer.defaultProps = defaultProps6;
TileLayer.layerName = "TileLayer";
var tile_layer_default = TileLayer;

// dist/trips-layer/trips-layer.js
var import_layers5 = require("@deck.gl/layers");

// dist/trips-layer/trips-layer-uniforms.js
var uniformBlock = `uniform tripsUniforms {
  bool fadeTrail;
  float trailLength;
  float currentTime;
} trips;
`;
var tripsUniforms = {
  name: "trips",
  vs: uniformBlock,
  fs: uniformBlock,
  uniformTypes: {
    fadeTrail: "f32",
    trailLength: "f32",
    currentTime: "f32"
  }
};

// dist/trips-layer/trips-layer.js
var defaultProps7 = {
  fadeTrail: true,
  trailLength: { type: "number", value: 120, min: 0 },
  currentTime: { type: "number", value: 0, min: 0 },
  getTimestamps: { type: "accessor", value: (d) => d.timestamps }
};
var TripsLayer = class extends import_layers5.PathLayer {
  getShaders() {
    const shaders = super.getShaders();
    shaders.inject = {
      "vs:#decl": `in float instanceTimestamps;
in float instanceNextTimestamps;
out float vTime;
`,
      // Timestamp of the vertex
      "vs:#main-end": `vTime = instanceTimestamps + (instanceNextTimestamps - instanceTimestamps) * vPathPosition.y / vPathLength;
`,
      "fs:#decl": `in float vTime;
`,
      // Drop the segments outside of the time window
      "fs:#main-start": `if(vTime > trips.currentTime || (trips.fadeTrail && (vTime < trips.currentTime - trips.trailLength))) {
  discard;
}
`,
      // Fade the color (currentTime - 100%, end of trail - 0%)
      "fs:DECKGL_FILTER_COLOR": `if(trips.fadeTrail) {
  color.a *= 1.0 - (trips.currentTime - vTime) / trips.trailLength;
}
`
    };
    shaders.modules = [...shaders.modules, tripsUniforms];
    return shaders;
  }
  initializeState() {
    super.initializeState();
    const attributeManager = this.getAttributeManager();
    attributeManager.addInstanced({
      timestamps: {
        size: 1,
        accessor: "getTimestamps",
        shaderAttributes: {
          instanceTimestamps: {
            vertexOffset: 0
          },
          instanceNextTimestamps: {
            vertexOffset: 1
          }
        }
      }
    });
  }
  draw(params) {
    const { fadeTrail, trailLength, currentTime } = this.props;
    const tripsProps = { fadeTrail, trailLength, currentTime };
    const model = this.state.model;
    model.shaderInputs.setProps({ trips: tripsProps });
    super.draw(params);
  }
};
TripsLayer.layerName = "TripsLayer";
TripsLayer.defaultProps = defaultProps7;
var trips_layer_default = TripsLayer;

// dist/h3-layers/h3-cluster-layer.js
var import_h3_js3 = require("h3-js");
var import_core8 = require("@deck.gl/core");

// dist/h3-layers/h3-hexagon-layer.js
var import_h3_js2 = require("h3-js");
var import_core7 = require("@deck.gl/core");
var import_layers6 = require("@deck.gl/layers");

// dist/h3-layers/h3-utils.js
var import_h3_js = require("h3-js");
var import_core6 = require("@math.gl/core");
function normalizeLongitudes(vertices, refLng) {
  refLng = refLng === void 0 ? vertices[0][0] : refLng;
  for (const pt of vertices) {
    const deltaLng = pt[0] - refLng;
    if (deltaLng > 180) {
      pt[0] -= 360;
    } else if (deltaLng < -180) {
      pt[0] += 360;
    }
  }
}
function scalePolygon(hexId, vertices, factor) {
  const [lat, lng] = (0, import_h3_js.cellToLatLng)(hexId);
  const actualCount = vertices.length;
  normalizeLongitudes(vertices, lng);
  const vertexCount = vertices[0] === vertices[actualCount - 1] ? actualCount - 1 : actualCount;
  for (let i = 0; i < vertexCount; i++) {
    vertices[i][0] = (0, import_core6.lerp)(lng, vertices[i][0], factor);
    vertices[i][1] = (0, import_core6.lerp)(lat, vertices[i][1], factor);
  }
}
function getHexagonCentroid(getHexagon, object, objectInfo) {
  const hexagonId = getHexagon(object, objectInfo);
  const [lat, lng] = (0, import_h3_js.cellToLatLng)(hexagonId);
  return [lng, lat];
}
function h3ToPolygon(hexId, coverage = 1) {
  const vertices = (0, import_h3_js.cellToBoundary)(hexId, true);
  if (coverage !== 1) {
    scalePolygon(hexId, vertices, coverage);
  } else {
    normalizeLongitudes(vertices);
  }
  return vertices;
}
function flattenPolygon(vertices) {
  const positions = new Float64Array(vertices.length * 2);
  let i = 0;
  for (const pt of vertices) {
    positions[i++] = pt[0];
    positions[i++] = pt[1];
  }
  return positions;
}

// dist/h3-layers/h3-hexagon-layer.js
var UPDATE_THRESHOLD_KM = 10;
function mergeTriggers(getHexagon, coverage) {
  let trigger;
  if (getHexagon === void 0 || getHexagon === null) {
    trigger = coverage;
  } else if (typeof getHexagon === "object") {
    trigger = { ...getHexagon, coverage };
  } else {
    trigger = { getHexagon, coverage };
  }
  return trigger;
}
var defaultProps8 = {
  ...import_layers6.PolygonLayer.defaultProps,
  highPrecision: "auto",
  coverage: { type: "number", min: 0, max: 1, value: 1 },
  centerHexagon: null,
  getHexagon: { type: "accessor", value: (x) => x.hexagon },
  extruded: true
};
var H3HexagonLayer = class extends import_core7.CompositeLayer {
  initializeState() {
    H3HexagonLayer._checkH3Lib();
    this.state = {
      edgeLengthKM: 0,
      resolution: -1
    };
  }
  shouldUpdateState({ changeFlags }) {
    return this._shouldUseHighPrecision() ? changeFlags.propsOrDataChanged : changeFlags.somethingChanged;
  }
  updateState({ props, changeFlags }) {
    if (props.highPrecision !== true && (changeFlags.dataChanged || changeFlags.updateTriggersChanged && changeFlags.updateTriggersChanged.getHexagon)) {
      const dataProps = this._calculateH3DataProps();
      this.setState(dataProps);
    }
    this._updateVertices(this.context.viewport);
  }
  _calculateH3DataProps() {
    let resolution = -1;
    let hasPentagon = false;
    let hasMultipleRes = false;
    const { iterable, objectInfo } = (0, import_core7.createIterable)(this.props.data);
    for (const object of iterable) {
      objectInfo.index++;
      const hexId = this.props.getHexagon(object, objectInfo);
      const hexResolution = (0, import_h3_js2.getResolution)(hexId);
      if (resolution < 0) {
        resolution = hexResolution;
        if (!this.props.highPrecision)
          break;
      } else if (resolution !== hexResolution) {
        hasMultipleRes = true;
        break;
      }
      if ((0, import_h3_js2.isPentagon)(hexId)) {
        hasPentagon = true;
        break;
      }
    }
    return {
      resolution,
      edgeLengthKM: resolution >= 0 ? (0, import_h3_js2.getHexagonEdgeLengthAvg)(resolution, "km") : 0,
      hasMultipleRes,
      hasPentagon
    };
  }
  _shouldUseHighPrecision() {
    if (this.props.highPrecision === "auto") {
      const { resolution, hasPentagon, hasMultipleRes } = this.state;
      const { viewport } = this.context;
      return Boolean(viewport == null ? void 0 : viewport.resolution) || hasMultipleRes || hasPentagon || resolution >= 0 && resolution <= 5;
    }
    return this.props.highPrecision;
  }
  _updateVertices(viewport) {
    if (this._shouldUseHighPrecision()) {
      return;
    }
    const { resolution, edgeLengthKM, centerHex } = this.state;
    if (resolution < 0) {
      return;
    }
    const hex = this.props.centerHexagon || (0, import_h3_js2.latLngToCell)(viewport.latitude, viewport.longitude, resolution);
    if (centerHex === hex) {
      return;
    }
    if (centerHex) {
      try {
        const distance = (0, import_h3_js2.gridDistance)(centerHex, hex);
        if (distance * edgeLengthKM < UPDATE_THRESHOLD_KM) {
          return;
        }
      } catch {
      }
    }
    const { unitsPerMeter } = viewport.distanceScales;
    let vertices = h3ToPolygon(hex);
    const [centerLat, centerLng] = (0, import_h3_js2.cellToLatLng)(hex);
    const [centerX, centerY] = viewport.projectFlat([centerLng, centerLat]);
    vertices = vertices.map((p) => {
      const worldPosition = viewport.projectFlat(p);
      return [
        (worldPosition[0] - centerX) / unitsPerMeter[0],
        (worldPosition[1] - centerY) / unitsPerMeter[1]
      ];
    });
    this.setState({ centerHex: hex, vertices });
  }
  renderLayers() {
    return this._shouldUseHighPrecision() ? this._renderPolygonLayer() : this._renderColumnLayer();
  }
  _getForwardProps() {
    const { elevationScale, material, coverage, extruded, wireframe, stroked, filled, lineWidthUnits, lineWidthScale, lineWidthMinPixels, lineWidthMaxPixels, getFillColor, getElevation, getLineColor, getLineWidth, transitions, updateTriggers } = this.props;
    return {
      elevationScale,
      extruded,
      coverage,
      wireframe,
      stroked,
      filled,
      lineWidthUnits,
      lineWidthScale,
      lineWidthMinPixels,
      lineWidthMaxPixels,
      material,
      getElevation,
      getFillColor,
      getLineColor,
      getLineWidth,
      transitions,
      updateTriggers: {
        getFillColor: updateTriggers.getFillColor,
        getElevation: updateTriggers.getElevation,
        getLineColor: updateTriggers.getLineColor,
        getLineWidth: updateTriggers.getLineWidth
      }
    };
  }
  _renderPolygonLayer() {
    const { data, getHexagon, updateTriggers, coverage } = this.props;
    const SubLayerClass = this.getSubLayerClass("hexagon-cell-hifi", import_layers6.PolygonLayer);
    const forwardProps = this._getForwardProps();
    forwardProps.updateTriggers.getPolygon = mergeTriggers(updateTriggers.getHexagon, coverage);
    return new SubLayerClass(forwardProps, this.getSubLayerProps({
      id: "hexagon-cell-hifi",
      updateTriggers: forwardProps.updateTriggers
    }), {
      data,
      _normalize: false,
      _windingOrder: "CCW",
      positionFormat: "XY",
      getPolygon: (object, objectInfo) => {
        const hexagonId = getHexagon(object, objectInfo);
        return flattenPolygon(h3ToPolygon(hexagonId, coverage));
      }
    });
  }
  _renderColumnLayer() {
    const { data, getHexagon, updateTriggers } = this.props;
    const SubLayerClass = this.getSubLayerClass("hexagon-cell", import_layers6.ColumnLayer);
    const forwardProps = this._getForwardProps();
    forwardProps.updateTriggers.getPosition = updateTriggers.getHexagon;
    return new SubLayerClass(forwardProps, this.getSubLayerProps({
      id: "hexagon-cell",
      flatShading: true,
      updateTriggers: forwardProps.updateTriggers
    }), {
      data,
      diskResolution: 6,
      // generate an extruded hexagon as the base geometry
      radius: 1,
      vertices: this.state.vertices,
      getPosition: getHexagonCentroid.bind(null, getHexagon)
    });
  }
};
H3HexagonLayer.defaultProps = defaultProps8;
H3HexagonLayer.layerName = "H3HexagonLayer";
H3HexagonLayer._checkH3Lib = () => {
};
var h3_hexagon_layer_default = H3HexagonLayer;

// dist/h3-layers/h3-cluster-layer.js
var defaultProps9 = {
  getHexagons: { type: "accessor", value: (d) => d.hexagons }
};
var H3ClusterLayer = class extends GeoCellLayer_default {
  initializeState() {
    h3_hexagon_layer_default._checkH3Lib();
  }
  updateState({ props, changeFlags }) {
    if (changeFlags.dataChanged || changeFlags.updateTriggersChanged && changeFlags.updateTriggersChanged.getHexagons) {
      const { data, getHexagons } = props;
      const polygons = [];
      const { iterable, objectInfo } = (0, import_core8.createIterable)(data);
      for (const object of iterable) {
        objectInfo.index++;
        const hexagons = getHexagons(object, objectInfo);
        const multiPolygon = (0, import_h3_js3.cellsToMultiPolygon)(hexagons, true);
        for (const polygon of multiPolygon) {
          for (const ring of polygon) {
            normalizeLongitudes(ring);
          }
          polygons.push(this.getSubLayerRow({ polygon }, object, objectInfo.index));
        }
      }
      this.setState({ polygons });
    }
  }
  indexToBounds() {
    const { getElevation, getFillColor, getLineColor, getLineWidth } = this.props;
    return {
      data: this.state.polygons,
      getPolygon: (d) => d.polygon,
      getElevation: this.getSubLayerAccessor(getElevation),
      getFillColor: this.getSubLayerAccessor(getFillColor),
      getLineColor: this.getSubLayerAccessor(getLineColor),
      getLineWidth: this.getSubLayerAccessor(getLineWidth)
    };
  }
};
H3ClusterLayer.layerName = "H3ClusterLayer";
H3ClusterLayer.defaultProps = defaultProps9;
var h3_cluster_layer_default = H3ClusterLayer;

// dist/tile-3d-layer/tile-3d-layer.js
var import_engine2 = require("@luma.gl/engine");
var import_core9 = require("@deck.gl/core");
var import_layers7 = require("@deck.gl/layers");
var import_mesh_layers2 = require("@deck.gl/mesh-layers");

// dist/mesh-layer/mesh-layer.js
var import_gltf = require("@luma.gl/gltf");
var import_shadertools = require("@luma.gl/shadertools");
var import_engine = require("@luma.gl/engine");
var import_mesh_layers = require("@deck.gl/mesh-layers");

// dist/mesh-layer/mesh-layer-uniforms.js
var uniformBlock2 = `uniform meshUniforms {
  bool pickFeatureIds;
} mesh;
`;
var meshUniforms = {
  name: "mesh",
  vs: uniformBlock2,
  fs: uniformBlock2,
  uniformTypes: {
    pickFeatureIds: "f32"
  }
};

// dist/mesh-layer/mesh-layer-vertex.glsl.js
var mesh_layer_vertex_glsl_default = `#version 300 es
#define SHADER_NAME simple-mesh-layer-vs
in vec3 positions;
in vec3 normals;
in vec3 colors;
in vec2 texCoords;
in vec4 uvRegions;
in vec3 featureIdsPickingColors;
in vec4 instanceColors;
in vec3 instancePickingColors;
in vec3 instanceModelMatrixCol0;
in vec3 instanceModelMatrixCol1;
in vec3 instanceModelMatrixCol2;
out vec2 vTexCoord;
out vec3 cameraPosition;
out vec3 normals_commonspace;
out vec4 position_commonspace;
out vec4 vColor;
vec2 applyUVRegion(vec2 uv) {
#ifdef HAS_UV_REGIONS
return fract(uv) * (uvRegions.zw - uvRegions.xy) + uvRegions.xy;
#else
return uv;
#endif
}
void main(void) {
vec2 uv = applyUVRegion(texCoords);
geometry.uv = uv;
if (mesh.pickFeatureIds) {
geometry.pickingColor = featureIdsPickingColors;
} else {
geometry.pickingColor = instancePickingColors;
}
mat3 instanceModelMatrix = mat3(instanceModelMatrixCol0, instanceModelMatrixCol1, instanceModelMatrixCol2);
vTexCoord = uv;
cameraPosition = project.cameraPosition;
vColor = vec4(colors * instanceColors.rgb, instanceColors.a);
vec3 pos = (instanceModelMatrix * positions) * simpleMesh.sizeScale;
vec3 projectedPosition = project_position(positions);
position_commonspace = vec4(projectedPosition, 1.0);
gl_Position = project_common_position_to_clipspace(position_commonspace);
geometry.position = position_commonspace;
normals_commonspace = project_normal(instanceModelMatrix * normals);
geometry.normal = normals_commonspace;
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
#ifdef MODULE_PBRMATERIAL
pbr_vPosition = geometry.position.xyz;
#ifdef HAS_NORMALS
pbr_vNormal = geometry.normal;
#endif
#ifdef HAS_UV
pbr_vUV = uv;
#else
pbr_vUV = vec2(0., 0.);
#endif
geometry.uv = pbr_vUV;
#endif
DECKGL_FILTER_COLOR(vColor, geometry);
}
`;

// dist/mesh-layer/mesh-layer-fragment.glsl.js
var mesh_layer_fragment_glsl_default = `#version 300 es
#define SHADER_NAME simple-mesh-layer-fs
precision highp float;
uniform sampler2D sampler;
in vec2 vTexCoord;
in vec3 cameraPosition;
in vec3 normals_commonspace;
in vec4 position_commonspace;
in vec4 vColor;
out vec4 fragColor;
void main(void) {
#ifdef MODULE_PBRMATERIAL
fragColor = vColor * pbr_filterColor(vec4(0));
geometry.uv = pbr_vUV;
fragColor.a *= layer.opacity;
#else
geometry.uv = vTexCoord;
vec3 normal;
if (simpleMesh.flatShading) {
normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));
} else {
normal = normals_commonspace;
}
vec4 color = simpleMesh.hasTexture ? texture(sampler, vTexCoord) : vColor;
vec3 lightColor = lighting_getLightColor(color.rgb, cameraPosition, position_commonspace.xyz, normal);
fragColor = vec4(lightColor, color.a * layer.opacity);
#endif
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;

// dist/mesh-layer/mesh-layer.js
function validateGeometryAttributes(attributes) {
  const positionAttribute = attributes.positions || attributes.POSITION;
  const vertexCount = positionAttribute.value.length / positionAttribute.size;
  const hasColorAttribute = attributes.COLOR_0 || attributes.colors;
  if (!hasColorAttribute) {
    attributes.colors = {
      size: 4,
      value: new Uint8Array(vertexCount * 4).fill(255),
      normalized: true
    };
  }
}
var defaultProps10 = {
  pbrMaterial: { type: "object", value: null },
  featureIds: { type: "array", value: null, optional: true }
};
var MeshLayer = class extends import_mesh_layers.SimpleMeshLayer {
  getShaders() {
    const shaders = super.getShaders();
    const modules = shaders.modules;
    modules.push(import_shadertools.pbrMaterial, meshUniforms);
    return { ...shaders, vs: mesh_layer_vertex_glsl_default, fs: mesh_layer_fragment_glsl_default };
  }
  initializeState() {
    const { featureIds } = this.props;
    super.initializeState();
    const attributeManager = this.getAttributeManager();
    if (featureIds) {
      attributeManager.add({
        featureIdsPickingColors: {
          type: "uint8",
          size: 3,
          noAlloc: true,
          // eslint-disable-next-line @typescript-eslint/unbound-method
          update: this.calculateFeatureIdsPickingColors
        }
      });
    }
  }
  updateState(params) {
    super.updateState(params);
    const { props, oldProps } = params;
    if (props.pbrMaterial !== oldProps.pbrMaterial) {
      this.updatePbrMaterialUniforms(props.pbrMaterial);
    }
  }
  draw(opts) {
    const { featureIds } = this.props;
    const { model } = this.state;
    if (!model) {
      return;
    }
    const meshProps = {
      pickFeatureIds: Boolean(featureIds)
    };
    const pbrProjectionProps = {
      // Needed for PBR (TODO: find better way to get it)
      camera: model.uniforms.cameraPosition
    };
    model.shaderInputs.setProps({
      pbrProjection: pbrProjectionProps,
      mesh: meshProps
    });
    super.draw(opts);
  }
  getModel(mesh) {
    const { id } = this.props;
    const parsedPBRMaterial = this.parseMaterial(this.props.pbrMaterial, mesh);
    this.setState({ parsedPBRMaterial });
    const shaders = this.getShaders();
    validateGeometryAttributes(mesh.attributes);
    const model = new import_engine.Model(this.context.device, {
      ...this.getShaders(),
      id,
      geometry: mesh,
      bufferLayout: this.getAttributeManager().getBufferLayouts(),
      defines: {
        ...shaders.defines,
        ...parsedPBRMaterial == null ? void 0 : parsedPBRMaterial.defines,
        HAS_UV_REGIONS: mesh.attributes.uvRegions ? 1 : 0
      },
      parameters: parsedPBRMaterial == null ? void 0 : parsedPBRMaterial.parameters,
      isInstanced: true
    });
    return model;
  }
  updatePbrMaterialUniforms(material) {
    const { model } = this.state;
    if (model) {
      const { mesh } = this.props;
      const parsedPBRMaterial = this.parseMaterial(material, mesh);
      this.setState({ parsedPBRMaterial });
      const { pbr_baseColorSampler } = parsedPBRMaterial.bindings;
      const { emptyTexture } = this.state;
      const simpleMeshProps = {
        sampler: pbr_baseColorSampler || emptyTexture,
        hasTexture: Boolean(pbr_baseColorSampler)
      };
      const { camera, ...pbrMaterialProps } = {
        ...parsedPBRMaterial.bindings,
        ...parsedPBRMaterial.uniforms
      };
      model.shaderInputs.setProps({ simpleMesh: simpleMeshProps, pbrMaterial: pbrMaterialProps });
    }
  }
  parseMaterial(material, mesh) {
    const unlit = Boolean(material.pbrMetallicRoughness && material.pbrMetallicRoughness.baseColorTexture);
    return (0, import_gltf.parsePBRMaterial)(this.context.device, { unlit, ...material }, { NORMAL: mesh.attributes.normals, TEXCOORD_0: mesh.attributes.texCoords }, {
      pbrDebug: false,
      lights: true,
      useTangents: false
    });
  }
  calculateFeatureIdsPickingColors(attribute) {
    const featureIds = this.props.featureIds;
    const value = new Uint8ClampedArray(featureIds.length * attribute.size);
    const pickingColor = [];
    for (let index = 0; index < featureIds.length; index++) {
      this.encodePickingColor(featureIds[index], pickingColor);
      value[index * 3] = pickingColor[0];
      value[index * 3 + 1] = pickingColor[1];
      value[index * 3 + 2] = pickingColor[2];
    }
    attribute.value = value;
  }
  finalizeState(context) {
    var _a;
    super.finalizeState(context);
    (_a = this.state.parsedPBRMaterial) == null ? void 0 : _a.generatedTextures.forEach((texture) => texture.destroy());
    this.setState({ parsedPBRMaterial: null });
  }
};
MeshLayer.layerName = "MeshLayer";
MeshLayer.defaultProps = defaultProps10;
var mesh_layer_default = MeshLayer;

// dist/tile-3d-layer/tile-3d-layer.js
var import_core10 = require("@loaders.gl/core");
var import_tiles = require("@loaders.gl/tiles");
var import_d_tiles = require("@loaders.gl/3d-tiles");
var SINGLE_DATA = [0];
var defaultProps11 = {
  getPointColor: { type: "accessor", value: [0, 0, 0, 255] },
  pointSize: 1,
  // Disable async data loading (handling it in _loadTileSet)
  data: "",
  loader: import_d_tiles.Tiles3DLoader,
  onTilesetLoad: { type: "function", value: (tileset3d) => {
  } },
  onTileLoad: { type: "function", value: (tileHeader) => {
  } },
  onTileUnload: { type: "function", value: (tileHeader) => {
  } },
  onTileError: { type: "function", value: (tile, message, url) => {
  } },
  _getMeshColor: { type: "function", value: (tileHeader) => [255, 255, 255] }
};
var Tile3DLayer = class extends import_core9.CompositeLayer {
  initializeState() {
    if ("onTileLoadFail" in this.props) {
      import_core9.log.removed("onTileLoadFail", "onTileError")();
    }
    this.state = {
      layerMap: {},
      tileset3d: null,
      activeViewports: {},
      lastUpdatedViewports: null
    };
  }
  get isLoaded() {
    var _a, _b;
    return Boolean(((_b = (_a = this.state) == null ? void 0 : _a.tileset3d) == null ? void 0 : _b.isLoaded()) && super.isLoaded);
  }
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }
  updateState({ props, oldProps, changeFlags }) {
    if (props.data && props.data !== oldProps.data) {
      this._loadTileset(props.data);
    }
    if (changeFlags.viewportChanged) {
      const { activeViewports } = this.state;
      const viewportsNumber = Object.keys(activeViewports).length;
      if (viewportsNumber) {
        this._updateTileset(activeViewports);
        this.state.lastUpdatedViewports = activeViewports;
        this.state.activeViewports = {};
      }
    }
    if (changeFlags.propsChanged) {
      const { layerMap } = this.state;
      for (const key in layerMap) {
        layerMap[key].needsUpdate = true;
      }
    }
  }
  activateViewport(viewport) {
    const { activeViewports, lastUpdatedViewports } = this.state;
    this.internalState.viewport = viewport;
    activeViewports[viewport.id] = viewport;
    const lastViewport = lastUpdatedViewports == null ? void 0 : lastUpdatedViewports[viewport.id];
    if (!lastViewport || !viewport.equals(lastViewport)) {
      this.setChangeFlags({ viewportChanged: true });
      this.setNeedsUpdate();
    }
  }
  getPickingInfo({ info, sourceLayer }) {
    const sourceTile = sourceLayer && sourceLayer.props.tile;
    if (info.picked) {
      info.object = sourceTile;
    }
    info.sourceTile = sourceTile;
    return info;
  }
  filterSubLayer({ layer, viewport }) {
    const { tile } = layer.props;
    const { id: viewportId } = viewport;
    return tile.selected && tile.viewportIds.includes(viewportId);
  }
  _updateAutoHighlight(info) {
    const sourceTile = info.sourceTile;
    const layerCache = this.state.layerMap[sourceTile == null ? void 0 : sourceTile.id];
    if (layerCache && layerCache.layer) {
      layerCache.layer.updateAutoHighlight(info);
    }
  }
  async _loadTileset(tilesetUrl) {
    const { loadOptions = {} } = this.props;
    const loaders = this.props.loader || this.props.loaders;
    const loader = Array.isArray(loaders) ? loaders[0] : loaders;
    const options = { loadOptions: { ...loadOptions } };
    let actualTilesetUrl = tilesetUrl;
    if (loader.preload) {
      const preloadOptions = await loader.preload(tilesetUrl, loadOptions);
      if (preloadOptions.url) {
        actualTilesetUrl = preloadOptions.url;
      }
      if (preloadOptions.headers) {
        options.loadOptions.fetch = {
          ...options.loadOptions.fetch,
          headers: preloadOptions.headers
        };
      }
      Object.assign(options, preloadOptions);
    }
    const tilesetJson = await (0, import_core10.load)(actualTilesetUrl, loader, options.loadOptions);
    const tileset3d = new import_tiles.Tileset3D(tilesetJson, {
      onTileLoad: this._onTileLoad.bind(this),
      onTileUnload: this._onTileUnload.bind(this),
      onTileError: this.props.onTileError,
      ...options
    });
    this.setState({
      tileset3d,
      layerMap: {}
    });
    this._updateTileset(this.state.activeViewports);
    this.props.onTilesetLoad(tileset3d);
  }
  _onTileLoad(tileHeader) {
    const { lastUpdatedViewports } = this.state;
    this.props.onTileLoad(tileHeader);
    this._updateTileset(lastUpdatedViewports);
    this.setNeedsUpdate();
  }
  _onTileUnload(tileHeader) {
    delete this.state.layerMap[tileHeader.id];
    this.props.onTileUnload(tileHeader);
  }
  _updateTileset(viewports) {
    if (!viewports) {
      return;
    }
    const { tileset3d } = this.state;
    const { timeline } = this.context;
    const viewportsNumber = Object.keys(viewports).length;
    if (!timeline || !viewportsNumber || !tileset3d) {
      return;
    }
    tileset3d.selectTiles(Object.values(viewports)).then((frameNumber) => {
      const tilesetChanged = this.state.frameNumber !== frameNumber;
      if (tilesetChanged) {
        this.setState({ frameNumber });
      }
    });
  }
  _getSubLayer(tileHeader, oldLayer) {
    if (!tileHeader.content) {
      return null;
    }
    switch (tileHeader.type) {
      case import_tiles.TILE_TYPE.POINTCLOUD:
        return this._makePointCloudLayer(tileHeader, oldLayer);
      case import_tiles.TILE_TYPE.SCENEGRAPH:
        return this._make3DModelLayer(tileHeader);
      case import_tiles.TILE_TYPE.MESH:
        return this._makeSimpleMeshLayer(tileHeader, oldLayer);
      default:
        throw new Error(`Tile3DLayer: Failed to render layer of type ${tileHeader.content.type}`);
    }
  }
  _makePointCloudLayer(tileHeader, oldLayer) {
    const { attributes, pointCount, constantRGBA, cartographicOrigin, modelMatrix } = tileHeader.content;
    const { positions, normals, colors } = attributes;
    if (!positions) {
      return null;
    }
    const data = oldLayer && oldLayer.props.data || {
      header: {
        vertexCount: pointCount
      },
      attributes: {
        POSITION: positions,
        NORMAL: normals,
        COLOR_0: colors
      }
    };
    const { pointSize, getPointColor } = this.props;
    const SubLayerClass = this.getSubLayerClass("pointcloud", import_layers7.PointCloudLayer);
    return new SubLayerClass({
      pointSize
    }, this.getSubLayerProps({
      id: "pointcloud"
    }), {
      id: `${this.id}-pointcloud-${tileHeader.id}`,
      tile: tileHeader,
      data,
      coordinateSystem: import_core9.COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: cartographicOrigin,
      modelMatrix,
      getColor: constantRGBA || getPointColor,
      _offset: 0
    });
  }
  _make3DModelLayer(tileHeader) {
    const { gltf, instances, cartographicOrigin, modelMatrix } = tileHeader.content;
    const SubLayerClass = this.getSubLayerClass("scenegraph", import_mesh_layers2.ScenegraphLayer);
    return new SubLayerClass({
      _lighting: "pbr"
    }, this.getSubLayerProps({
      id: "scenegraph"
    }), {
      id: `${this.id}-scenegraph-${tileHeader.id}`,
      tile: tileHeader,
      data: instances || SINGLE_DATA,
      scenegraph: gltf,
      coordinateSystem: import_core9.COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: cartographicOrigin,
      modelMatrix,
      getTransformMatrix: (instance) => instance.modelMatrix,
      getPosition: [0, 0, 0],
      _offset: 0
    });
  }
  _makeSimpleMeshLayer(tileHeader, oldLayer) {
    const content = tileHeader.content;
    const { attributes, indices, modelMatrix, cartographicOrigin, coordinateSystem = import_core9.COORDINATE_SYSTEM.METER_OFFSETS, material, featureIds } = content;
    const { _getMeshColor } = this.props;
    const geometry = oldLayer && oldLayer.props.mesh || new import_engine2.Geometry({
      topology: "triangle-list",
      attributes: getMeshGeometry(attributes),
      indices
    });
    const SubLayerClass = this.getSubLayerClass("mesh", mesh_layer_default);
    return new SubLayerClass(this.getSubLayerProps({
      id: "mesh"
    }), {
      id: `${this.id}-mesh-${tileHeader.id}`,
      tile: tileHeader,
      mesh: geometry,
      data: SINGLE_DATA,
      getColor: _getMeshColor(tileHeader),
      pbrMaterial: material,
      modelMatrix,
      coordinateOrigin: cartographicOrigin,
      coordinateSystem,
      featureIds,
      _offset: 0
    });
  }
  renderLayers() {
    const { tileset3d, layerMap } = this.state;
    if (!tileset3d) {
      return null;
    }
    return tileset3d.tiles.map((tile) => {
      const layerCache = layerMap[tile.id] = layerMap[tile.id] || { tile };
      let { layer } = layerCache;
      if (tile.selected) {
        if (!layer) {
          layer = this._getSubLayer(tile);
        } else if (layerCache.needsUpdate) {
          layer = this._getSubLayer(tile, layer);
          layerCache.needsUpdate = false;
        }
      }
      layerCache.layer = layer;
      return layer;
    }).filter(Boolean);
  }
};
Tile3DLayer.defaultProps = defaultProps11;
Tile3DLayer.layerName = "Tile3DLayer";
var tile_3d_layer_default = Tile3DLayer;
function getMeshGeometry(contentAttributes) {
  const attributes = {};
  attributes.positions = {
    ...contentAttributes.positions,
    value: new Float32Array(contentAttributes.positions.value)
  };
  if (contentAttributes.normals) {
    attributes.normals = contentAttributes.normals;
  }
  if (contentAttributes.texCoords) {
    attributes.texCoords = contentAttributes.texCoords;
  }
  if (contentAttributes.colors) {
    attributes.colors = contentAttributes.colors;
  }
  if (contentAttributes.uvRegions) {
    attributes.uvRegions = contentAttributes.uvRegions;
  }
  return attributes;
}

// dist/terrain-layer/terrain-layer.js
var import_core11 = require("@deck.gl/core");
var import_mesh_layers3 = require("@deck.gl/mesh-layers");
var import_core12 = require("@deck.gl/core");
var import_terrain = require("@loaders.gl/terrain");
var DUMMY_DATA = [1];
var defaultProps12 = {
  ...tile_layer_default.defaultProps,
  // Image url that encodes height data
  elevationData: urlType,
  // Image url to use as texture
  texture: { ...urlType, optional: true },
  // Martini error tolerance in meters, smaller number -> more detailed mesh
  meshMaxError: { type: "number", value: 4 },
  // Bounding box of the terrain image, [minX, minY, maxX, maxY] in world coordinates
  bounds: { type: "array", value: null, optional: true, compare: true },
  // Color to use if texture is unavailable
  color: { type: "color", value: [255, 255, 255] },
  // Object to decode height data, from (r, g, b) to height in meters
  elevationDecoder: {
    type: "object",
    value: {
      rScaler: 1,
      gScaler: 0,
      bScaler: 0,
      offset: 0
    }
  },
  // Supply url to local terrain worker bundle. Only required if running offline and cannot access CDN.
  workerUrl: "",
  // Same as SimpleMeshLayer wireframe
  wireframe: false,
  material: true,
  loaders: [import_terrain.TerrainWorkerLoader]
};
function urlTemplateToUpdateTrigger(template) {
  if (Array.isArray(template)) {
    return template.join(";");
  }
  return template || "";
}
var TerrainLayer = class extends import_core11.CompositeLayer {
  updateState({ props, oldProps }) {
    const elevationDataChanged = props.elevationData !== oldProps.elevationData;
    if (elevationDataChanged) {
      const { elevationData } = props;
      const isTiled = elevationData && (Array.isArray(elevationData) || elevationData.includes("{x}") && elevationData.includes("{y}"));
      this.setState({ isTiled });
    }
    const shouldReload = elevationDataChanged || props.meshMaxError !== oldProps.meshMaxError || props.elevationDecoder !== oldProps.elevationDecoder || props.bounds !== oldProps.bounds;
    if (!this.state.isTiled && shouldReload) {
      const terrain = this.loadTerrain(props);
      this.setState({ terrain });
    }
    if (props.workerUrl) {
      import_core11.log.removed("workerUrl", "loadOptions.terrain.workerUrl")();
    }
  }
  loadTerrain({ elevationData, bounds, elevationDecoder, meshMaxError, signal }) {
    if (!elevationData) {
      return null;
    }
    let loadOptions = this.getLoadOptions();
    loadOptions = {
      ...loadOptions,
      terrain: {
        skirtHeight: this.state.isTiled ? meshMaxError * 2 : 0,
        ...loadOptions == null ? void 0 : loadOptions.terrain,
        bounds,
        meshMaxError,
        elevationDecoder
      }
    };
    const { fetch } = this.props;
    return fetch(elevationData, { propName: "elevationData", layer: this, loadOptions, signal });
  }
  getTiledTerrainData(tile) {
    const { elevationData, fetch, texture, elevationDecoder, meshMaxError } = this.props;
    const { viewport } = this.context;
    const dataUrl = getURLFromTemplate(elevationData, tile);
    const textureUrl = texture && getURLFromTemplate(texture, tile);
    const { signal } = tile;
    let bottomLeft = [0, 0];
    let topRight = [0, 0];
    if (viewport.isGeospatial) {
      const bbox = tile.bbox;
      bottomLeft = viewport.projectFlat([bbox.west, bbox.south]);
      topRight = viewport.projectFlat([bbox.east, bbox.north]);
    } else {
      const bbox = tile.bbox;
      bottomLeft = [bbox.left, bbox.bottom];
      topRight = [bbox.right, bbox.top];
    }
    const bounds = [bottomLeft[0], bottomLeft[1], topRight[0], topRight[1]];
    const terrain = this.loadTerrain({
      elevationData: dataUrl,
      bounds,
      elevationDecoder,
      meshMaxError,
      signal
    });
    const surface = textureUrl ? (
      // If surface image fails to load, the tile should still be displayed
      fetch(textureUrl, { propName: "texture", layer: this, loaders: [], signal }).catch((_) => null)
    ) : Promise.resolve(null);
    return Promise.all([terrain, surface]);
  }
  renderSubLayers(props) {
    const SubLayerClass = this.getSubLayerClass("mesh", import_mesh_layers3.SimpleMeshLayer);
    const { color, wireframe, material } = this.props;
    const { data } = props;
    if (!data) {
      return null;
    }
    const [mesh, texture] = data;
    return new SubLayerClass(props, {
      data: DUMMY_DATA,
      mesh,
      texture,
      _instanced: false,
      coordinateSystem: import_core12.COORDINATE_SYSTEM.CARTESIAN,
      getPosition: (d) => [0, 0, 0],
      getColor: color,
      wireframe,
      material
    });
  }
  // Update zRange of viewport
  onViewportLoad(tiles) {
    if (!tiles) {
      return;
    }
    const { zRange } = this.state;
    const ranges = tiles.map((tile) => tile.content).filter(Boolean).map((arr) => {
      const bounds = arr[0].header.boundingBox;
      return bounds.map((bound) => bound[2]);
    });
    if (ranges.length === 0) {
      return;
    }
    const minZ = Math.min(...ranges.map((x) => x[0]));
    const maxZ = Math.max(...ranges.map((x) => x[1]));
    if (!zRange || minZ < zRange[0] || maxZ > zRange[1]) {
      this.setState({ zRange: [minZ, maxZ] });
    }
  }
  renderLayers() {
    const { color, material, elevationData, texture, wireframe, meshMaxError, elevationDecoder, tileSize, maxZoom, minZoom, extent, maxRequests, onTileLoad, onTileUnload, onTileError, maxCacheSize, maxCacheByteSize, refinementStrategy } = this.props;
    if (this.state.isTiled) {
      return new tile_layer_default(this.getSubLayerProps({
        id: "tiles"
      }), {
        getTileData: this.getTiledTerrainData.bind(this),
        renderSubLayers: this.renderSubLayers.bind(this),
        updateTriggers: {
          getTileData: {
            elevationData: urlTemplateToUpdateTrigger(elevationData),
            texture: urlTemplateToUpdateTrigger(texture),
            meshMaxError,
            elevationDecoder
          }
        },
        onViewportLoad: this.onViewportLoad.bind(this),
        zRange: this.state.zRange || null,
        tileSize,
        maxZoom,
        minZoom,
        extent,
        maxRequests,
        onTileLoad,
        onTileUnload,
        onTileError,
        maxCacheSize,
        maxCacheByteSize,
        refinementStrategy
      });
    }
    if (!elevationData) {
      return null;
    }
    const SubLayerClass = this.getSubLayerClass("mesh", import_mesh_layers3.SimpleMeshLayer);
    return new SubLayerClass(this.getSubLayerProps({
      id: "mesh"
    }), {
      data: DUMMY_DATA,
      mesh: this.state.terrain,
      texture,
      _instanced: false,
      getPosition: (d) => [0, 0, 0],
      getColor: color,
      material,
      wireframe
    });
  }
};
TerrainLayer.defaultProps = defaultProps12;
TerrainLayer.layerName = "TerrainLayer";
var terrain_layer_default = TerrainLayer;

// dist/mvt-layer/mvt-layer.js
var import_core14 = require("@deck.gl/core");
var import_layers8 = require("@deck.gl/layers");
var import_extensions = require("@deck.gl/extensions");
var import_core15 = require("@math.gl/core");
var import_mvt = require("@loaders.gl/mvt");
var import_gis = require("@loaders.gl/gis");

// dist/mvt-layer/coordinate-transform.js
var import_core13 = require("@math.gl/core");
var availableTransformations = {
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon
};
function Point([pointX, pointY], [nw, se], viewport) {
  const x = (0, import_core13.lerp)(nw[0], se[0], pointX);
  const y = (0, import_core13.lerp)(nw[1], se[1], pointY);
  return viewport.unprojectFlat([x, y]);
}
function getPoints(geometry, bbox, viewport) {
  return geometry.map((g) => Point(g, bbox, viewport));
}
function MultiPoint(multiPoint, bbox, viewport) {
  return getPoints(multiPoint, bbox, viewport);
}
function LineString(line, bbox, viewport) {
  return getPoints(line, bbox, viewport);
}
function MultiLineString(multiLineString, bbox, viewport) {
  return multiLineString.map((lineString) => LineString(lineString, bbox, viewport));
}
function Polygon(polygon, bbox, viewport) {
  return polygon.map((polygonRing) => getPoints(polygonRing, bbox, viewport));
}
function MultiPolygon(multiPolygon, bbox, viewport) {
  return multiPolygon.map((polygon) => Polygon(polygon, bbox, viewport));
}
function transform(geometry, bbox, viewport) {
  const nw = viewport.projectFlat([bbox.west, bbox.north]);
  const se = viewport.projectFlat([bbox.east, bbox.south]);
  const projectedBbox = [nw, se];
  return {
    ...geometry,
    coordinates: availableTransformations[geometry.type](geometry.coordinates, projectedBbox, viewport)
  };
}

// dist/mvt-layer/find-index-binary.js
var GEOM_TYPES = ["points", "lines", "polygons"];
function findIndexBinary(data, uniqueIdProperty, featureId, layerName) {
  for (const gt of GEOM_TYPES) {
    const index = data[gt] && findIndexByType(data[gt], uniqueIdProperty, featureId, layerName);
    if (index >= 0) {
      return index;
    }
  }
  return -1;
}
function findIndexByType(geomData, uniqueIdProperty, featureId, layerName) {
  const featureIds = geomData.featureIds.value;
  if (!featureIds.length) {
    return -1;
  }
  let startFeatureIndex = 0;
  let endFeatureIndex = featureIds[featureIds.length - 1] + 1;
  if (layerName) {
    const layerRange = getLayerRange(geomData, layerName);
    if (layerRange) {
      startFeatureIndex = layerRange[0];
      endFeatureIndex = layerRange[1] + 1;
    } else {
      return -1;
    }
  }
  let featureIndex = -1;
  if (uniqueIdProperty in geomData.numericProps) {
    const vertexIndex = geomData.numericProps[uniqueIdProperty].value.findIndex((x, i) => x === featureId && featureIds[i] >= startFeatureIndex && featureIds[i] < endFeatureIndex);
    return vertexIndex >= 0 ? geomData.globalFeatureIds.value[vertexIndex] : -1;
  } else if (uniqueIdProperty) {
    featureIndex = findIndex(geomData.properties, (elem) => elem[uniqueIdProperty] === featureId, startFeatureIndex, endFeatureIndex);
  } else if (geomData.fields) {
    featureIndex = findIndex(geomData.fields, (elem) => elem.id === featureId, startFeatureIndex, endFeatureIndex);
  }
  return featureIndex >= 0 ? getGlobalFeatureId(geomData, featureIndex) : -1;
}
function getLayerRange(geomData, layerName) {
  if (!geomData.__layers) {
    const layerNames = {};
    const { properties } = geomData;
    for (let i = 0; i < properties.length; i++) {
      const { layerName: key } = properties[i];
      if (!key) {
      } else if (layerNames[key]) {
        layerNames[key][1] = i;
      } else {
        layerNames[key] = [i, i];
      }
    }
    geomData.__layers = layerNames;
  }
  return geomData.__layers[layerName];
}
function getGlobalFeatureId(geomData, featureIndex) {
  if (!geomData.__ids) {
    const result = [];
    const featureIds = geomData.featureIds.value;
    const globalFeatureIds = geomData.globalFeatureIds.value;
    for (let i = 0; i < featureIds.length; i++) {
      result[featureIds[i]] = globalFeatureIds[i];
    }
    geomData.__ids = result;
  }
  return geomData.__ids[featureIndex];
}
function findIndex(array, predicate, startIndex, endIndex) {
  for (let i = startIndex; i < endIndex; i++) {
    if (predicate(array[i], i)) {
      return i;
    }
  }
  return -1;
}

// dist/mvt-layer/mvt-layer.js
var WORLD_SIZE = 512;
var defaultProps13 = {
  ...import_layers8.GeoJsonLayer.defaultProps,
  data: urlType,
  onDataLoad: { type: "function", value: null, optional: true, compare: false },
  uniqueIdProperty: "",
  highlightedFeatureId: null,
  loaders: [import_mvt.MVTWorkerLoader],
  binary: true
};
var MVTLayer = class extends tile_layer_default {
  initializeState() {
    super.initializeState();
    const binary = this.context.viewport.resolution !== void 0 ? false : this.props.binary;
    this.setState({
      binary,
      data: null,
      tileJSON: null,
      hoveredFeatureId: null,
      hoveredFeatureLayerName: null
    });
  }
  get isLoaded() {
    var _a;
    return Boolean(((_a = this.state) == null ? void 0 : _a.data) && super.isLoaded);
  }
  updateState({ props, oldProps, context, changeFlags }) {
    var _a;
    if (changeFlags.dataChanged) {
      this._updateTileData();
    }
    if ((_a = this.state) == null ? void 0 : _a.data) {
      super.updateState({ props, oldProps, context, changeFlags });
      this._setWGS84PropertyForTiles();
    }
    const { highlightColor } = props;
    if (highlightColor !== oldProps.highlightColor && Array.isArray(highlightColor)) {
      this.setState({ highlightColor });
    }
  }
  /* eslint-disable complexity */
  async _updateTileData() {
    let data = this.props.data;
    let tileJSON = null;
    if (typeof data === "string" && !isURLTemplate(data)) {
      const { onDataLoad, fetch } = this.props;
      this.setState({ data: null, tileJSON: null });
      try {
        tileJSON = await fetch(data, { propName: "data", layer: this, loaders: [] });
      } catch (error) {
        this.raiseError(error, "loading TileJSON");
        data = null;
      }
      if (onDataLoad) {
        onDataLoad(tileJSON, { propName: "data", layer: this });
      }
    } else if (data && typeof data === "object" && "tilejson" in data) {
      tileJSON = data;
    }
    if (tileJSON) {
      data = tileJSON.tiles;
    }
    this.setState({ data, tileJSON });
  }
  _getTilesetOptions() {
    const opts = super._getTilesetOptions();
    const tileJSON = this.state.tileJSON;
    const { minZoom, maxZoom } = this.props;
    if (tileJSON) {
      if (Number.isFinite(tileJSON.minzoom) && tileJSON.minzoom > minZoom) {
        opts.minZoom = tileJSON.minzoom;
      }
      if (Number.isFinite(tileJSON.maxzoom) && (!Number.isFinite(maxZoom) || tileJSON.maxzoom < maxZoom)) {
        opts.maxZoom = tileJSON.maxzoom;
      }
    }
    return opts;
  }
  /* eslint-disable complexity */
  renderLayers() {
    var _a;
    if (!((_a = this.state) == null ? void 0 : _a.data))
      return null;
    return super.renderLayers();
  }
  getTileData(loadProps) {
    const { data, binary } = this.state;
    const { index, signal } = loadProps;
    const url = getURLFromTemplate(data, loadProps);
    if (!url) {
      return Promise.reject("Invalid URL");
    }
    let loadOptions = this.getLoadOptions();
    const { fetch } = this.props;
    loadOptions = {
      ...loadOptions,
      mimeType: "application/x-protobuf",
      mvt: {
        ...loadOptions == null ? void 0 : loadOptions.mvt,
        coordinates: this.context.viewport.resolution ? "wgs84" : "local",
        tileIndex: index
        // Local worker debug
        // workerUrl: `modules/mvt/dist/mvt-loader.worker.js`
        // Set worker to null to skip web workers
        // workerUrl: null
      },
      gis: binary ? { format: "binary" } : {}
    };
    return fetch(url, { propName: "data", layer: this, loadOptions, signal });
  }
  renderSubLayers(props) {
    const { x, y, z } = props.tile.index;
    const worldScale = Math.pow(2, z);
    const xScale = WORLD_SIZE / worldScale;
    const yScale = -xScale;
    const xOffset = WORLD_SIZE * x / worldScale;
    const yOffset = WORLD_SIZE * (1 - y / worldScale);
    const modelMatrix = new import_core15.Matrix4().scale([xScale, yScale, 1]);
    props.autoHighlight = false;
    if (!this.context.viewport.resolution) {
      props.modelMatrix = modelMatrix;
      props.coordinateOrigin = [xOffset, yOffset, 0];
      props.coordinateSystem = import_core14.COORDINATE_SYSTEM.CARTESIAN;
      props.extensions = [...props.extensions || [], new import_extensions.ClipExtension()];
    }
    const subLayers = super.renderSubLayers(props);
    if (this.state.binary && !(subLayers instanceof import_layers8.GeoJsonLayer)) {
      import_core14.log.warn("renderSubLayers() must return GeoJsonLayer when using binary:true")();
    }
    return subLayers;
  }
  _updateAutoHighlight(info) {
    const { uniqueIdProperty } = this.props;
    const { hoveredFeatureId, hoveredFeatureLayerName } = this.state;
    const hoveredFeature = info.object;
    let newHoveredFeatureId = null;
    let newHoveredFeatureLayerName = null;
    if (hoveredFeature) {
      newHoveredFeatureId = getFeatureUniqueId(hoveredFeature, uniqueIdProperty);
      newHoveredFeatureLayerName = getFeatureLayerName(hoveredFeature);
    }
    let { highlightColor } = this.props;
    if (typeof highlightColor === "function") {
      highlightColor = highlightColor(info);
    }
    if (hoveredFeatureId !== newHoveredFeatureId || hoveredFeatureLayerName !== newHoveredFeatureLayerName) {
      this.setState({
        highlightColor,
        hoveredFeatureId: newHoveredFeatureId,
        hoveredFeatureLayerName: newHoveredFeatureLayerName
      });
    }
  }
  _isWGS84() {
    return Boolean(this.context.viewport.resolution);
  }
  getPickingInfo(params) {
    const info = super.getPickingInfo(params);
    if (this.state.binary && info.index !== -1) {
      const { data } = params.sourceLayer.props;
      info.object = (0, import_gis.binaryToGeojson)(data, {
        globalFeatureId: info.index
      });
    }
    if (info.object && !this._isWGS84()) {
      info.object = transformTileCoordsToWGS84(
        info.object,
        info.tile.bbox,
        // eslint-disable-line
        this.context.viewport
      );
    }
    return info;
  }
  getSubLayerPropsByTile(tile) {
    return {
      highlightedObjectIndex: this.getHighlightedObjectIndex(tile),
      highlightColor: this.state.highlightColor
    };
  }
  getHighlightedObjectIndex(tile) {
    const { hoveredFeatureId, hoveredFeatureLayerName, binary } = this.state;
    const { uniqueIdProperty, highlightedFeatureId } = this.props;
    const data = tile.content;
    const isHighlighted = isFeatureIdDefined(highlightedFeatureId);
    const isFeatureIdPresent = isFeatureIdDefined(hoveredFeatureId) || isHighlighted;
    if (!isFeatureIdPresent) {
      return -1;
    }
    const featureIdToHighlight = isHighlighted ? highlightedFeatureId : hoveredFeatureId;
    if (Array.isArray(data)) {
      return data.findIndex((feature) => {
        const isMatchingId = getFeatureUniqueId(feature, uniqueIdProperty) === featureIdToHighlight;
        const isMatchingLayer = isHighlighted || getFeatureLayerName(feature) === hoveredFeatureLayerName;
        return isMatchingId && isMatchingLayer;
      });
    } else if (data && binary) {
      return findIndexBinary(data, uniqueIdProperty, featureIdToHighlight, isHighlighted ? "" : hoveredFeatureLayerName);
    }
    return -1;
  }
  _pickObjects(maxObjects) {
    const { deck, viewport } = this.context;
    const width = viewport.width;
    const height = viewport.height;
    const x = viewport.x;
    const y = viewport.y;
    const layerIds = [this.id];
    return deck.pickObjects({ x, y, width, height, layerIds, maxObjects });
  }
  /** Get the rendered features in the current viewport. */
  getRenderedFeatures(maxFeatures = null) {
    const features = this._pickObjects(maxFeatures);
    const featureCache = /* @__PURE__ */ new Set();
    const renderedFeatures = [];
    for (const f of features) {
      const featureId = getFeatureUniqueId(f.object, this.props.uniqueIdProperty);
      if (featureId === void 0) {
        renderedFeatures.push(f.object);
      } else if (!featureCache.has(featureId)) {
        featureCache.add(featureId);
        renderedFeatures.push(f.object);
      }
    }
    return renderedFeatures;
  }
  _setWGS84PropertyForTiles() {
    const propName = "dataInWGS84";
    const tileset = this.state.tileset;
    tileset.selectedTiles.forEach((tile) => {
      if (!tile.hasOwnProperty(propName)) {
        Object.defineProperty(tile, propName, {
          get: () => {
            if (!tile.content) {
              return null;
            }
            if (this.state.binary && Array.isArray(tile.content) && !tile.content.length) {
              return [];
            }
            const { bbox } = tile;
            if (tile._contentWGS84 === void 0 && isGeoBoundingBox(bbox)) {
              const content = this.state.binary ? (0, import_gis.binaryToGeojson)(tile.content) : tile.content;
              tile._contentWGS84 = content.map((feature) => transformTileCoordsToWGS84(feature, bbox, this.context.viewport));
            }
            return tile._contentWGS84;
          }
        });
      }
    });
  }
};
MVTLayer.layerName = "MVTLayer";
MVTLayer.defaultProps = defaultProps13;
var mvt_layer_default = MVTLayer;
function getFeatureUniqueId(feature, uniqueIdProperty) {
  if (feature.properties && uniqueIdProperty) {
    return feature.properties[uniqueIdProperty];
  }
  if ("id" in feature) {
    return feature.id;
  }
  return void 0;
}
function getFeatureLayerName(feature) {
  var _a;
  return ((_a = feature.properties) == null ? void 0 : _a.layerName) || null;
}
function isFeatureIdDefined(value) {
  return value !== void 0 && value !== null && value !== "";
}
function transformTileCoordsToWGS84(object, bbox, viewport) {
  const feature = {
    ...object,
    geometry: {
      type: object.geometry.type
    }
  };
  Object.defineProperty(feature.geometry, "coordinates", {
    get: () => {
      const wgs84Geom = transform(object.geometry, bbox, viewport);
      return wgs84Geom.coordinates;
    }
  });
  return feature;
}

// dist/geohash-layer/geohash-utils.js
var BASE32_CODES = "0123456789bcdefghjkmnpqrstuvwxyz";
var BASE32_CODES_DICT = {};
for (let i = 0; i < BASE32_CODES.length; i++) {
  BASE32_CODES_DICT[BASE32_CODES.charAt(i)] = i;
}
var MIN_LAT = -90;
var MAX_LAT = 90;
var MIN_LON = -180;
var MAX_LON = 180;
function getGeohashBounds(geohash) {
  let isLon = true;
  let maxLat = MAX_LAT;
  let minLat = MIN_LAT;
  let maxLon = MAX_LON;
  let minLon = MIN_LON;
  let mid;
  let hashValue = 0;
  for (let i = 0, l = geohash.length; i < l; i++) {
    const code = geohash[i].toLowerCase();
    hashValue = BASE32_CODES_DICT[code];
    for (let bits = 4; bits >= 0; bits--) {
      const bit = hashValue >> bits & 1;
      if (isLon) {
        mid = (maxLon + minLon) / 2;
        if (bit === 1) {
          minLon = mid;
        } else {
          maxLon = mid;
        }
      } else {
        mid = (maxLat + minLat) / 2;
        if (bit === 1) {
          minLat = mid;
        } else {
          maxLat = mid;
        }
      }
      isLon = !isLon;
    }
  }
  return [minLat, minLon, maxLat, maxLon];
}
function getGeohashPolygon(geohash) {
  const [s, w, n, e] = getGeohashBounds(geohash);
  return [e, n, e, s, w, s, w, n, e, n];
}

// dist/geohash-layer/geohash-layer.js
var defaultProps14 = {
  getGeohash: { type: "accessor", value: (d) => d.geohash }
};
var GeohashLayer = class extends GeoCellLayer_default {
  indexToBounds() {
    const { data, getGeohash } = this.props;
    return {
      data,
      _normalize: false,
      positionFormat: "XY",
      getPolygon: (x, objectInfo) => getGeohashPolygon(getGeohash(x, objectInfo))
    };
  }
};
GeohashLayer.layerName = "GeohashLayer";
GeohashLayer.defaultProps = defaultProps14;
var geohash_layer_default = GeohashLayer;
//# sourceMappingURL=index.cjs.map

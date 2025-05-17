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
  GEOPARQUET_METADATA_JSON_SCHEMA: () => GEOPARQUET_METADATA_JSON_SCHEMA,
  binaryToGeojson: () => binaryToGeojson,
  binaryToGeometry: () => binaryToGeometry,
  convertWKBTableToGeoJSON: () => convertWKBTableToGeoJSON,
  flatGeojsonToBinary: () => flatGeojsonToBinary,
  geojsonToBinary: () => geojsonToBinary,
  geojsonToFlatGeojson: () => geojsonToFlatGeojson,
  getGeoMetadata: () => getGeoMetadata,
  getGeometryColumnsFromSchema: () => getGeometryColumnsFromSchema,
  setGeoMetadata: () => setGeoMetadata,
  transformBinaryCoords: () => transformBinaryCoords,
  transformGeoJsonCoords: () => transformGeoJsonCoords,
  unpackGeoMetadata: () => unpackGeoMetadata,
  unpackJSONStringMetadata: () => unpackJSONStringMetadata
});
module.exports = __toCommonJS(dist_exports);

// dist/lib/geo/geoparquet-metadata-schema.js
var GEOPARQUET_METADATA_JSON_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "GeoParquet",
  description: "Parquet metadata included in the geo field.",
  type: "object",
  required: ["version", "primary_column", "columns"],
  properties: {
    version: { type: "string", const: "1.0.0-beta.1" },
    primary_column: { type: "string", minLength: 1 },
    columns: {
      type: "object",
      minProperties: 1,
      patternProperties: {
        ".+": {
          type: "object",
          required: ["encoding", "geometry_types"],
          properties: {
            encoding: { type: "string", const: "WKB" },
            geometry_types: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "string",
                pattern: "^(GeometryCollection|(Multi)?(Point|LineString|Polygon))( Z)?$"
              }
            },
            crs: {
              oneOf: [
                {
                  $ref: "https://proj.org/schemas/v0.5/projjson.schema.json"
                },
                { type: "null" }
              ]
            },
            edges: { type: "string", enum: ["planar", "spherical"] },
            orientation: { type: "string", const: "counterclockwise" },
            bbox: {
              type: "array",
              items: { type: "number" },
              oneOf: [
                {
                  description: "2D bbox consisting of (xmin, ymin, xmax, ymax)",
                  minItems: 4,
                  maxItems: 4
                },
                {
                  description: "3D bbox consisting of (xmin, ymin, zmin, xmax, ymax, zmax)",
                  minItems: 6,
                  maxItems: 6
                }
              ]
            },
            epoch: { type: "number" }
          }
        }
      },
      additionalProperties: false
    }
  }
};

// dist/lib/geo/geoparquet-metadata.js
function getGeoMetadata(schema) {
  const geoMetadata = parseJSONStringMetadata(schema, "geo");
  if (!geoMetadata) {
    return null;
  }
  for (const column of Object.values(geoMetadata.columns || {})) {
    if (column.encoding) {
      column.encoding = column.encoding.toLowerCase();
    }
  }
  return geoMetadata;
}
function setGeoMetadata(schema, geoMetadata) {
  const stringifiedGeoMetadata = JSON.stringify(geoMetadata);
  schema.metadata.geo = stringifiedGeoMetadata;
}
function unpackGeoMetadata(schema) {
  const geoMetadata = getGeoMetadata(schema);
  if (!geoMetadata) {
    return;
  }
  const { version, primary_column, columns } = geoMetadata;
  if (version) {
    schema.metadata["geo.version"] = version;
  }
  if (primary_column) {
    schema.metadata["geo.primary_column"] = primary_column;
  }
  schema.metadata["geo.columns"] = Object.keys(columns || {}).join("");
  for (const [columnName, columnMetadata] of Object.entries(columns || {})) {
    const field = schema.fields.find((field2) => field2.name === columnName);
    if (field) {
      if (field.name === primary_column) {
        setFieldMetadata(field, "geo.primary_field", "true");
      }
      unpackGeoFieldMetadata(field, columnMetadata);
    }
  }
}
function unpackGeoFieldMetadata(field, columnMetadata) {
  for (const [key, value] of Object.entries(columnMetadata || {})) {
    switch (key) {
      case "geometry_types":
        setFieldMetadata(field, `geo.${key}`, value.join(","));
        break;
      case "bbox":
        setFieldMetadata(field, `geo.crs.${key}`, JSON.stringify(value));
        break;
      case "crs":
        for (const [crsKey, crsValue] of Object.entries(value || {})) {
          switch (crsKey) {
            case "id":
              const crsId = typeof crsValue === "object" ? (
                // @ts-ignore
                `${crsValue == null ? void 0 : crsValue.authority}:${crsValue == null ? void 0 : crsValue.code}`
              ) : JSON.stringify(crsValue);
              setFieldMetadata(field, `geo.crs.${crsKey}`, crsId);
              break;
            default:
              setFieldMetadata(field, `geo.crs.${crsKey}`, typeof crsValue === "string" ? crsValue : JSON.stringify(crsValue));
              break;
          }
        }
        break;
      case "edges":
      default:
        setFieldMetadata(field, `geo.${key}`, typeof value === "string" ? value : JSON.stringify(value));
    }
  }
}
function setFieldMetadata(field, key, value) {
  field.metadata = field.metadata || {};
  field.metadata[key] = value;
}
function parseJSONStringMetadata(schema, metadataKey) {
  const stringifiedMetadata = schema.metadata[metadataKey];
  if (!stringifiedMetadata) {
    return null;
  }
  try {
    const metadata = JSON.parse(stringifiedMetadata);
    if (!metadata || typeof metadata !== "object") {
      return null;
    }
    return metadata;
  } catch {
    return null;
  }
}
function unpackJSONStringMetadata(schema, metadataKey) {
  const json = parseJSONStringMetadata(schema, metadataKey);
  for (const [key, value] of Object.entries(json || {})) {
    schema.metadata[`${metadataKey}.${key}`] = typeof value === "string" ? value : JSON.stringify(value);
  }
}

// dist/lib/geo/geoarrow-metadata.js
var GEOARROW_ENCODINGS = [
  "geoarrow.multipolygon",
  "geoarrow.polygon",
  "geoarrow.multilinestring",
  "geoarrow.linestring",
  "geoarrow.multipoint",
  "geoarrow.point",
  "geoarrow.wkb",
  "geoarrow.wkt"
];
var GEOARROW_COLUMN_METADATA_ENCODING = "ARROW:extension:name";
var GEOARROW_COLUMN_METADATA_METADATA = "ARROW:extension:metadata";
function getGeometryColumnsFromSchema(schema) {
  const geometryColumns = {};
  for (const field of schema.fields) {
    const metadata = getGeometryMetadataForField(field);
    if (metadata) {
      geometryColumns[field.name] = metadata;
    }
  }
  return geometryColumns;
}
function getGeometryMetadataForField(field) {
  var _a, _b;
  let metadata = null;
  let geoEncoding = (_a = field.metadata) == null ? void 0 : _a[GEOARROW_COLUMN_METADATA_ENCODING];
  if (geoEncoding) {
    geoEncoding = geoEncoding.toLowerCase();
    if (geoEncoding === "wkb") {
      geoEncoding = "geoarrow.wkb";
    }
    if (geoEncoding === "wkt") {
      geoEncoding = "geoarrow.wkt";
    }
    if (!GEOARROW_ENCODINGS.includes(geoEncoding)) {
      console.warn(`Invalid GeoArrow encoding: ${geoEncoding}`);
    } else {
      metadata = metadata || {};
      metadata.encoding = geoEncoding;
    }
  }
  const columnMetadata = (_b = field.metadata) == null ? void 0 : _b[GEOARROW_COLUMN_METADATA_METADATA];
  if (columnMetadata) {
    try {
      metadata = JSON.parse(columnMetadata);
    } catch (error) {
      console.warn("Failed to parse GeoArrow metadata", error);
    }
  }
  return metadata || null;
}

// dist/lib/tables/convert-table-to-geojson.js
var import_schema = require("@loaders.gl/schema");
function convertWKBTableToGeoJSON(table, schema, loaders) {
  const geoMetadata = getGeoMetadata(schema);
  const primaryColumn = geoMetadata == null ? void 0 : geoMetadata.primary_column;
  if (!primaryColumn) {
    throw new Error("no geometry column");
  }
  const columnMetadata = geoMetadata.columns[primaryColumn];
  const features = [];
  const length = (0, import_schema.getTableLength)(table);
  for (let rowIndex = 0; rowIndex < length; rowIndex++) {
    const row = (0, import_schema.getTableRowAsObject)(table, rowIndex);
    const geometry = parseGeometry(row[primaryColumn], columnMetadata, loaders);
    delete row[primaryColumn];
    const feature = { type: "Feature", geometry, properties: row };
    features.push(feature);
  }
  return { shape: "geojson-table", schema, type: "FeatureCollection", features };
}
function parseGeometry(geometry, columnMetadata, loaders) {
  var _a, _b;
  switch (columnMetadata.encoding) {
    case "wkt":
      const wktLoader = loaders.find((loader) => loader.id === "wkt");
      return ((_a = wktLoader == null ? void 0 : wktLoader.parseTextSync) == null ? void 0 : _a.call(wktLoader, geometry)) || null;
    case "wkb":
    default:
      const wkbLoader = loaders.find((loader) => loader.id === "wkb");
      const arrayBuffer = ArrayBuffer.isView(geometry) ? geometry.buffer.slice(geometry.byteOffset, geometry.byteOffset + geometry.byteLength) : geometry;
      const geojson = (_b = wkbLoader == null ? void 0 : wkbLoader.parseSync) == null ? void 0 : _b.call(wkbLoader, arrayBuffer, {
        wkb: { shape: "geojson-geometry" }
      });
      return geojson;
  }
}

// dist/lib/binary-features/flat-geojson-to-binary.js
var import_polygon = require("@math.gl/polygon");
function flatGeojsonToBinary(features, geometryInfo, options) {
  const propArrayTypes = extractNumericPropTypes(features);
  const numericPropKeys = Object.keys(propArrayTypes).filter((k) => propArrayTypes[k] !== Array);
  return fillArrays(features, {
    propArrayTypes,
    ...geometryInfo
  }, {
    numericPropKeys: options && options.numericPropKeys || numericPropKeys,
    PositionDataType: options ? options.PositionDataType : Float32Array,
    triangulate: options ? options.triangulate : true
  });
}
function extractNumericPropTypes(features) {
  const propArrayTypes = {};
  for (const feature of features) {
    if (feature.properties) {
      for (const key in feature.properties) {
        const val = feature.properties[key];
        propArrayTypes[key] = deduceArrayType(val, propArrayTypes[key]);
      }
    }
  }
  return propArrayTypes;
}
function fillArrays(features, geometryInfo, options) {
  const { pointPositionsCount, pointFeaturesCount, linePositionsCount, linePathsCount, lineFeaturesCount, polygonPositionsCount, polygonObjectsCount, polygonRingsCount, polygonFeaturesCount, propArrayTypes, coordLength } = geometryInfo;
  const { numericPropKeys = [], PositionDataType = Float32Array, triangulate = true } = options;
  const hasGlobalId = features[0] && "id" in features[0];
  const GlobalFeatureIdsDataType = features.length > 65535 ? Uint32Array : Uint16Array;
  const points = {
    type: "Point",
    positions: new PositionDataType(pointPositionsCount * coordLength),
    globalFeatureIds: new GlobalFeatureIdsDataType(pointPositionsCount),
    featureIds: pointFeaturesCount > 65535 ? new Uint32Array(pointPositionsCount) : new Uint16Array(pointPositionsCount),
    numericProps: {},
    properties: [],
    fields: []
  };
  const lines = {
    type: "LineString",
    pathIndices: linePositionsCount > 65535 ? new Uint32Array(linePathsCount + 1) : new Uint16Array(linePathsCount + 1),
    positions: new PositionDataType(linePositionsCount * coordLength),
    globalFeatureIds: new GlobalFeatureIdsDataType(linePositionsCount),
    featureIds: lineFeaturesCount > 65535 ? new Uint32Array(linePositionsCount) : new Uint16Array(linePositionsCount),
    numericProps: {},
    properties: [],
    fields: []
  };
  const polygons = {
    type: "Polygon",
    polygonIndices: polygonPositionsCount > 65535 ? new Uint32Array(polygonObjectsCount + 1) : new Uint16Array(polygonObjectsCount + 1),
    primitivePolygonIndices: polygonPositionsCount > 65535 ? new Uint32Array(polygonRingsCount + 1) : new Uint16Array(polygonRingsCount + 1),
    positions: new PositionDataType(polygonPositionsCount * coordLength),
    globalFeatureIds: new GlobalFeatureIdsDataType(polygonPositionsCount),
    featureIds: polygonFeaturesCount > 65535 ? new Uint32Array(polygonPositionsCount) : new Uint16Array(polygonPositionsCount),
    numericProps: {},
    properties: [],
    fields: []
  };
  if (triangulate) {
    polygons.triangles = [];
  }
  for (const object of [points, lines, polygons]) {
    for (const propName of numericPropKeys) {
      const T = propArrayTypes[propName];
      object.numericProps[propName] = new T(object.positions.length / coordLength);
    }
  }
  lines.pathIndices[linePathsCount] = linePositionsCount;
  polygons.polygonIndices[polygonObjectsCount] = polygonPositionsCount;
  polygons.primitivePolygonIndices[polygonRingsCount] = polygonPositionsCount;
  const indexMap = {
    pointPosition: 0,
    pointFeature: 0,
    linePosition: 0,
    linePath: 0,
    lineFeature: 0,
    polygonPosition: 0,
    polygonObject: 0,
    polygonRing: 0,
    polygonFeature: 0,
    feature: 0
  };
  for (const feature of features) {
    const geometry = feature.geometry;
    const properties = feature.properties || {};
    switch (geometry.type) {
      case "Point":
        handlePoint(geometry, points, indexMap, coordLength, properties);
        points.properties.push(keepStringProperties(properties, numericPropKeys));
        if (hasGlobalId) {
          points.fields.push({ id: feature.id });
        }
        indexMap.pointFeature++;
        break;
      case "LineString":
        handleLineString(geometry, lines, indexMap, coordLength, properties);
        lines.properties.push(keepStringProperties(properties, numericPropKeys));
        if (hasGlobalId) {
          lines.fields.push({ id: feature.id });
        }
        indexMap.lineFeature++;
        break;
      case "Polygon":
        handlePolygon(geometry, polygons, indexMap, coordLength, properties);
        polygons.properties.push(keepStringProperties(properties, numericPropKeys));
        if (hasGlobalId) {
          polygons.fields.push({ id: feature.id });
        }
        indexMap.polygonFeature++;
        break;
      default:
        throw new Error("Invalid geometry type");
    }
    indexMap.feature++;
  }
  return makeAccessorObjects(points, lines, polygons, coordLength);
}
function handlePoint(geometry, points, indexMap, coordLength, properties) {
  points.positions.set(geometry.data, indexMap.pointPosition * coordLength);
  const nPositions = geometry.data.length / coordLength;
  fillNumericProperties(points, properties, indexMap.pointPosition, nPositions);
  points.globalFeatureIds.fill(indexMap.feature, indexMap.pointPosition, indexMap.pointPosition + nPositions);
  points.featureIds.fill(indexMap.pointFeature, indexMap.pointPosition, indexMap.pointPosition + nPositions);
  indexMap.pointPosition += nPositions;
}
function handleLineString(geometry, lines, indexMap, coordLength, properties) {
  lines.positions.set(geometry.data, indexMap.linePosition * coordLength);
  const nPositions = geometry.data.length / coordLength;
  fillNumericProperties(lines, properties, indexMap.linePosition, nPositions);
  lines.globalFeatureIds.fill(indexMap.feature, indexMap.linePosition, indexMap.linePosition + nPositions);
  lines.featureIds.fill(indexMap.lineFeature, indexMap.linePosition, indexMap.linePosition + nPositions);
  for (let i = 0, il = geometry.indices.length; i < il; ++i) {
    const start = geometry.indices[i];
    const end = i === il - 1 ? geometry.data.length : geometry.indices[i + 1];
    lines.pathIndices[indexMap.linePath++] = indexMap.linePosition;
    indexMap.linePosition += (end - start) / coordLength;
  }
}
function handlePolygon(geometry, polygons, indexMap, coordLength, properties) {
  polygons.positions.set(geometry.data, indexMap.polygonPosition * coordLength);
  const nPositions = geometry.data.length / coordLength;
  fillNumericProperties(polygons, properties, indexMap.polygonPosition, nPositions);
  polygons.globalFeatureIds.fill(indexMap.feature, indexMap.polygonPosition, indexMap.polygonPosition + nPositions);
  polygons.featureIds.fill(indexMap.polygonFeature, indexMap.polygonPosition, indexMap.polygonPosition + nPositions);
  for (let l = 0, ll = geometry.indices.length; l < ll; ++l) {
    const startPosition = indexMap.polygonPosition;
    polygons.polygonIndices[indexMap.polygonObject++] = startPosition;
    const areas = geometry.areas[l];
    const indices = geometry.indices[l];
    const nextIndices = geometry.indices[l + 1];
    for (let i = 0, il = indices.length; i < il; ++i) {
      const start = indices[i];
      const end = i === il - 1 ? (
        // last line, so either read to:
        nextIndices === void 0 ? geometry.data.length : nextIndices[0]
      ) : indices[i + 1];
      polygons.primitivePolygonIndices[indexMap.polygonRing++] = indexMap.polygonPosition;
      indexMap.polygonPosition += (end - start) / coordLength;
    }
    const endPosition = indexMap.polygonPosition;
    triangulatePolygon(polygons, areas, indices, { startPosition, endPosition, coordLength });
  }
}
function triangulatePolygon(polygons, areas, indices, { startPosition, endPosition, coordLength }) {
  if (!polygons.triangles) {
    return;
  }
  const start = startPosition * coordLength;
  const end = endPosition * coordLength;
  const polygonPositions = polygons.positions.subarray(start, end);
  const offset = indices[0];
  const holes = indices.slice(1).map((n) => (n - offset) / coordLength);
  const triangles = (0, import_polygon.earcut)(polygonPositions, holes, coordLength, areas);
  for (let t = 0, tl = triangles.length; t < tl; ++t) {
    polygons.triangles.push(startPosition + triangles[t]);
  }
}
function wrapProps(obj, size) {
  const returnObj = {};
  for (const key in obj) {
    returnObj[key] = { value: obj[key], size };
  }
  return returnObj;
}
function makeAccessorObjects(points, lines, polygons, coordLength) {
  const binaryFeatures = {
    shape: "binary-feature-collection",
    points: {
      ...points,
      positions: { value: points.positions, size: coordLength },
      globalFeatureIds: { value: points.globalFeatureIds, size: 1 },
      featureIds: { value: points.featureIds, size: 1 },
      numericProps: wrapProps(points.numericProps, 1)
    },
    lines: {
      ...lines,
      positions: { value: lines.positions, size: coordLength },
      pathIndices: { value: lines.pathIndices, size: 1 },
      globalFeatureIds: { value: lines.globalFeatureIds, size: 1 },
      featureIds: { value: lines.featureIds, size: 1 },
      numericProps: wrapProps(lines.numericProps, 1)
    },
    polygons: {
      ...polygons,
      positions: { value: polygons.positions, size: coordLength },
      polygonIndices: { value: polygons.polygonIndices, size: 1 },
      primitivePolygonIndices: { value: polygons.primitivePolygonIndices, size: 1 },
      globalFeatureIds: { value: polygons.globalFeatureIds, size: 1 },
      featureIds: { value: polygons.featureIds, size: 1 },
      numericProps: wrapProps(polygons.numericProps, 1)
    }
    // triangles not expected
  };
  if (binaryFeatures.polygons && polygons.triangles) {
    binaryFeatures.polygons.triangles = { value: new Uint32Array(polygons.triangles), size: 1 };
  }
  return binaryFeatures;
}
function fillNumericProperties(object, properties, index, length) {
  for (const numericPropName in object.numericProps) {
    if (numericPropName in properties) {
      const value = properties[numericPropName];
      object.numericProps[numericPropName].fill(value, index, index + length);
    }
  }
}
function keepStringProperties(properties, numericKeys) {
  const props = {};
  for (const key in properties) {
    if (!numericKeys.includes(key)) {
      props[key] = properties[key];
    }
  }
  return props;
}
function deduceArrayType(x, constructor) {
  if (constructor === Array || !Number.isFinite(x)) {
    return Array;
  }
  return constructor === Float64Array || Math.fround(x) !== x ? Float64Array : Float32Array;
}

// dist/lib/binary-features/extract-geometry-info.js
function extractGeometryInfo(features) {
  let pointPositionsCount = 0;
  let pointFeaturesCount = 0;
  let linePositionsCount = 0;
  let linePathsCount = 0;
  let lineFeaturesCount = 0;
  let polygonPositionsCount = 0;
  let polygonObjectsCount = 0;
  let polygonRingsCount = 0;
  let polygonFeaturesCount = 0;
  const coordLengths = /* @__PURE__ */ new Set();
  for (const feature of features) {
    const geometry = feature.geometry;
    switch (geometry.type) {
      case "Point":
        pointFeaturesCount++;
        pointPositionsCount++;
        coordLengths.add(geometry.coordinates.length);
        break;
      case "MultiPoint":
        pointFeaturesCount++;
        pointPositionsCount += geometry.coordinates.length;
        for (const point of geometry.coordinates) {
          coordLengths.add(point.length);
        }
        break;
      case "LineString":
        lineFeaturesCount++;
        linePositionsCount += geometry.coordinates.length;
        linePathsCount++;
        for (const coord of geometry.coordinates) {
          coordLengths.add(coord.length);
        }
        break;
      case "MultiLineString":
        lineFeaturesCount++;
        for (const line of geometry.coordinates) {
          linePositionsCount += line.length;
          linePathsCount++;
          for (const coord of line) {
            coordLengths.add(coord.length);
          }
        }
        break;
      case "Polygon":
        polygonFeaturesCount++;
        polygonObjectsCount++;
        polygonRingsCount += geometry.coordinates.length;
        const flattened = geometry.coordinates.flat();
        polygonPositionsCount += flattened.length;
        for (const coord of flattened) {
          coordLengths.add(coord.length);
        }
        break;
      case "MultiPolygon":
        polygonFeaturesCount++;
        for (const polygon of geometry.coordinates) {
          polygonObjectsCount++;
          polygonRingsCount += polygon.length;
          const flattened2 = polygon.flat();
          polygonPositionsCount += flattened2.length;
          for (const coord of flattened2) {
            coordLengths.add(coord.length);
          }
        }
        break;
      default:
        throw new Error(`Unsupported geometry type: ${geometry.type}`);
    }
  }
  return {
    coordLength: coordLengths.size > 0 ? Math.max(...coordLengths) : 2,
    pointPositionsCount,
    pointFeaturesCount,
    linePositionsCount,
    linePathsCount,
    lineFeaturesCount,
    polygonPositionsCount,
    polygonObjectsCount,
    polygonRingsCount,
    polygonFeaturesCount
  };
}

// dist/lib/binary-features/geojson-to-flat-geojson.js
var import_polygon2 = require("@math.gl/polygon");
function geojsonToFlatGeojson(features, options = { coordLength: 2, fixRingWinding: true }) {
  return features.map((feature) => flattenFeature(feature, options));
}
function flattenPoint(coordinates, data, indices, options) {
  indices.push(data.length);
  data.push(...coordinates);
  for (let i = coordinates.length; i < options.coordLength; i++) {
    data.push(0);
  }
}
function flattenLineString(coordinates, data, indices, options) {
  indices.push(data.length);
  for (const c of coordinates) {
    data.push(...c);
    for (let i = c.length; i < options.coordLength; i++) {
      data.push(0);
    }
  }
}
function flattenPolygon(coordinates, data, indices, areas, options) {
  let count = 0;
  const ringAreas = [];
  const polygons = [];
  for (const lineString of coordinates) {
    const lineString2d = lineString.map((p) => p.slice(0, 2));
    let area = (0, import_polygon2.getPolygonSignedArea)(lineString2d.flat());
    const ccw = area < 0;
    if (options.fixRingWinding && (count === 0 && !ccw || count > 0 && ccw)) {
      lineString.reverse();
      area = -area;
    }
    ringAreas.push(area);
    flattenLineString(lineString, data, polygons, options);
    count++;
  }
  if (count > 0) {
    areas.push(ringAreas);
    indices.push(polygons);
  }
}
function flattenFeature(feature, options) {
  const { geometry } = feature;
  if (geometry.type === "GeometryCollection") {
    throw new Error("GeometryCollection type not supported");
  }
  const data = [];
  const indices = [];
  let areas;
  let type;
  switch (geometry.type) {
    case "Point":
      type = "Point";
      flattenPoint(geometry.coordinates, data, indices, options);
      break;
    case "MultiPoint":
      type = "Point";
      geometry.coordinates.map((c) => flattenPoint(c, data, indices, options));
      break;
    case "LineString":
      type = "LineString";
      flattenLineString(geometry.coordinates, data, indices, options);
      break;
    case "MultiLineString":
      type = "LineString";
      geometry.coordinates.map((c) => flattenLineString(c, data, indices, options));
      break;
    case "Polygon":
      type = "Polygon";
      areas = [];
      flattenPolygon(geometry.coordinates, data, indices, areas, options);
      break;
    case "MultiPolygon":
      type = "Polygon";
      areas = [];
      geometry.coordinates.map((c) => flattenPolygon(c, data, indices, areas, options));
      break;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
  return { ...feature, geometry: { type, indices, data, areas } };
}

// dist/lib/binary-features/geojson-to-binary.js
function geojsonToBinary(features, options = { fixRingWinding: true, triangulate: true }) {
  const geometryInfo = extractGeometryInfo(features);
  const coordLength = geometryInfo.coordLength;
  const { fixRingWinding } = options;
  const flatFeatures = geojsonToFlatGeojson(features, { coordLength, fixRingWinding });
  return flatGeojsonToBinary(flatFeatures, geometryInfo, {
    numericPropKeys: options.numericPropKeys,
    PositionDataType: options.PositionDataType || Float32Array,
    triangulate: options.triangulate
  });
}

// dist/lib/binary-features/binary-to-geojson.js
function binaryToGeojson(data, options) {
  const globalFeatureId = options == null ? void 0 : options.globalFeatureId;
  if (globalFeatureId !== void 0) {
    return getSingleFeature(data, globalFeatureId);
  }
  return parseFeatures(data, options == null ? void 0 : options.type);
}
function getSingleFeature(data, globalFeatureId) {
  const dataArray = normalizeInput(data);
  for (const data2 of dataArray) {
    let lastIndex = 0;
    let lastValue = data2.featureIds.value[0];
    for (let i = 0; i < data2.featureIds.value.length; i++) {
      const currValue = data2.featureIds.value[i];
      if (currValue === lastValue) {
        continue;
      }
      if (globalFeatureId === data2.globalFeatureIds.value[lastIndex]) {
        return parseFeature(data2, lastIndex, i);
      }
      lastIndex = i;
      lastValue = currValue;
    }
    if (globalFeatureId === data2.globalFeatureIds.value[lastIndex]) {
      return parseFeature(data2, lastIndex, data2.featureIds.value.length);
    }
  }
  throw new Error(`featureId:${globalFeatureId} not found`);
}
function parseFeatures(data, type) {
  const dataArray = normalizeInput(data, type);
  return parseFeatureCollection(dataArray);
}
function binaryToGeometry(data, startIndex, endIndex) {
  switch (data.type) {
    case "Point":
      return pointToGeoJson(data, startIndex, endIndex);
    case "LineString":
      return lineStringToGeoJson(data, startIndex, endIndex);
    case "Polygon":
      return polygonToGeoJson(data, startIndex, endIndex);
    default:
      const unexpectedInput = data;
      throw new Error(`Unsupported geometry type: ${unexpectedInput == null ? void 0 : unexpectedInput.type}`);
  }
}
function normalizeInput(data, type) {
  const features = [];
  if (data.points) {
    data.points.type = "Point";
    features.push(data.points);
  }
  if (data.lines) {
    data.lines.type = "LineString";
    features.push(data.lines);
  }
  if (data.polygons) {
    data.polygons.type = "Polygon";
    features.push(data.polygons);
  }
  return features;
}
function parseFeatureCollection(dataArray) {
  const features = [];
  for (const data of dataArray) {
    if (data.featureIds.value.length === 0) {
      continue;
    }
    let lastIndex = 0;
    let lastValue = data.featureIds.value[0];
    for (let i = 0; i < data.featureIds.value.length; i++) {
      const currValue = data.featureIds.value[i];
      if (currValue === lastValue) {
        continue;
      }
      features.push(parseFeature(data, lastIndex, i));
      lastIndex = i;
      lastValue = currValue;
    }
    features.push(parseFeature(data, lastIndex, data.featureIds.value.length));
  }
  return features;
}
function parseFeature(data, startIndex, endIndex) {
  const geometry = binaryToGeometry(data, startIndex, endIndex);
  const properties = parseProperties(data, startIndex, endIndex);
  const fields = parseFields(data, startIndex, endIndex);
  return { type: "Feature", geometry, properties, ...fields };
}
function parseFields(data, startIndex = 0, endIndex) {
  return data.fields && data.fields[data.featureIds.value[startIndex]];
}
function parseProperties(data, startIndex = 0, endIndex) {
  const properties = Object.assign({}, data.properties[data.featureIds.value[startIndex]]);
  for (const key in data.numericProps) {
    properties[key] = data.numericProps[key].value[startIndex];
  }
  return properties;
}
function polygonToGeoJson(data, startIndex = -Infinity, endIndex = Infinity) {
  const { positions } = data;
  const polygonIndices = data.polygonIndices.value.filter((x) => x >= startIndex && x <= endIndex);
  const primitivePolygonIndices = data.primitivePolygonIndices.value.filter((x) => x >= startIndex && x <= endIndex);
  const multi = polygonIndices.length > 2;
  if (!multi) {
    const coordinates2 = [];
    for (let i = 0; i < primitivePolygonIndices.length - 1; i++) {
      const startRingIndex = primitivePolygonIndices[i];
      const endRingIndex = primitivePolygonIndices[i + 1];
      const ringCoordinates = ringToGeoJson(positions, startRingIndex, endRingIndex);
      coordinates2.push(ringCoordinates);
    }
    return { type: "Polygon", coordinates: coordinates2 };
  }
  const coordinates = [];
  for (let i = 0; i < polygonIndices.length - 1; i++) {
    const startPolygonIndex = polygonIndices[i];
    const endPolygonIndex = polygonIndices[i + 1];
    const polygonCoordinates = polygonToGeoJson(data, startPolygonIndex, endPolygonIndex).coordinates;
    coordinates.push(polygonCoordinates);
  }
  return { type: "MultiPolygon", coordinates };
}
function lineStringToGeoJson(data, startIndex = -Infinity, endIndex = Infinity) {
  const { positions } = data;
  const pathIndices = data.pathIndices.value.filter((x) => x >= startIndex && x <= endIndex);
  const multi = pathIndices.length > 2;
  if (!multi) {
    const coordinates2 = ringToGeoJson(positions, pathIndices[0], pathIndices[1]);
    return { type: "LineString", coordinates: coordinates2 };
  }
  const coordinates = [];
  for (let i = 0; i < pathIndices.length - 1; i++) {
    const ringCoordinates = ringToGeoJson(positions, pathIndices[i], pathIndices[i + 1]);
    coordinates.push(ringCoordinates);
  }
  return { type: "MultiLineString", coordinates };
}
function pointToGeoJson(data, startIndex, endIndex) {
  const { positions } = data;
  const coordinates = ringToGeoJson(positions, startIndex, endIndex);
  const multi = coordinates.length > 1;
  if (multi) {
    return { type: "MultiPoint", coordinates };
  }
  return { type: "Point", coordinates: coordinates[0] };
}
function ringToGeoJson(positions, startIndex, endIndex) {
  startIndex = startIndex || 0;
  endIndex = endIndex || positions.value.length / positions.size;
  const ringCoordinates = [];
  for (let j = startIndex; j < endIndex; j++) {
    const coord = Array();
    for (let k = j * positions.size; k < (j + 1) * positions.size; k++) {
      coord.push(Number(positions.value[k]));
    }
    ringCoordinates.push(coord);
  }
  return ringCoordinates;
}

// dist/lib/binary-features/transform.js
function transformBinaryCoords(binaryFeatures, transformCoordinate) {
  if (binaryFeatures.points) {
    transformBinaryGeometryPositions(binaryFeatures.points, transformCoordinate);
  }
  if (binaryFeatures.lines) {
    transformBinaryGeometryPositions(binaryFeatures.lines, transformCoordinate);
  }
  if (binaryFeatures.polygons) {
    transformBinaryGeometryPositions(binaryFeatures.polygons, transformCoordinate);
  }
  return binaryFeatures;
}
function transformBinaryGeometryPositions(binaryGeometry, fn) {
  const { positions } = binaryGeometry;
  for (let i = 0; i < positions.value.length; i += positions.size) {
    const coord = Array.from(positions.value.subarray(i, i + positions.size));
    const transformedCoord = fn(coord);
    positions.value.set(transformedCoord, i);
  }
}
function transformGeoJsonCoords(features, fn) {
  for (const feature of features) {
    feature.geometry.coordinates = coordMap(feature.geometry.coordinates, fn);
  }
  return features;
}
function coordMap(array, fn) {
  if (isCoord(array)) {
    return fn(array);
  }
  return array.map((item) => {
    return coordMap(item, fn);
  });
}
function isCoord(array) {
  return Array.isArray(array) && Number.isFinite(array[0]) && Number.isFinite(array[1]);
}
//# sourceMappingURL=index.cjs.map

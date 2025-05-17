import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';
import booleanWithin from '@turf/boolean-within';
import intersect from '@turf/intersect';
import {transformToTileCoords} from '../utils/transformToTileCoords.js';
import {transformTileCoordsToWGS84} from '../utils/transformTileCoordsToWGS84.js';
import {TileFormat} from '../constants.js';
import {
  BBox,
  Feature,
  Geometry,
  LineString,
  MultiPolygon,
  Point,
  Polygon,
  Position,
} from 'geojson';
import {SpatialFilter, Tile} from '../types.js';
import {TileFeatureExtractOptions} from './tileFeatures.js';
import {featureCollection} from '@turf/helpers';
import {FeatureData} from '../types-internal.js';
import {
  BinaryAttribute,
  BinaryFeature,
  BinaryGeometryType,
  BinaryPointFeature,
  TypedArrayConstructor,
} from '@loaders.gl/schema';

export const FEATURE_GEOM_PROPERTY = '__geomValue';

type TileMap = Map<unknown, unknown>;

type TileDataInternal = {
  uniqueId: string | number | undefined;
  properties: any;
  numericProps: Record<string, number>;
};

export function tileFeaturesGeometries({
  tiles,
  tileFormat,
  spatialFilter,
  uniqueIdProperty,
  options,
}: {
  tiles: Tile[];
  tileFormat?: TileFormat;
  spatialFilter: SpatialFilter;
  uniqueIdProperty?: string;
  options?: {storeGeometry?: boolean};
}): FeatureData[] {
  const map = new Map();

  for (const tile of tiles) {
    // Discard if it's not a visible tile (only check false value, not undefined)
    // or tile has not data
    if (tile.isVisible === false || !tile.data) {
      continue;
    }

    const bbox = [
      tile.bbox.west,
      tile.bbox.south,
      tile.bbox.east,
      tile.bbox.north,
    ] as BBox;
    const bboxToGeom = bboxPolygon(bbox);
    const tileIsFullyVisible = booleanWithin(bboxToGeom, spatialFilter);

    // Clip the geometry to intersect with the tile
    const spatialFilterFeature: Feature<Polygon | MultiPolygon> = {
      type: 'Feature',
      geometry: spatialFilter,
      properties: {},
    };
    const clippedGeometryToIntersect = intersect(
      featureCollection([bboxToGeom, spatialFilterFeature])
    );

    if (!clippedGeometryToIntersect) {
      continue;
    }

    // We assume that MVT tileFormat uses local coordinates so we transform the geometry to intersect to tile coordinates [0..1],
    // while in the case of 'geojson' or binary, the geometries are already in WGS84
    const transformedGeometryToIntersect =
      tileFormat === TileFormat.MVT
        ? transformToTileCoords(clippedGeometryToIntersect.geometry, bbox)
        : clippedGeometryToIntersect.geometry;

    createIndicesForPoints(tile.data.points!);

    calculateFeatures({
      map,
      tileIsFullyVisible,
      geometryIntersection: transformedGeometryToIntersect,
      data: tile.data.points!,
      type: 'Point',
      bbox,
      tileFormat,
      uniqueIdProperty,
      options,
    });
    calculateFeatures({
      map,
      tileIsFullyVisible,
      geometryIntersection: transformedGeometryToIntersect,
      data: tile.data.lines!,
      type: 'LineString',
      bbox,
      tileFormat,
      uniqueIdProperty,
      options,
    });
    calculateFeatures({
      map,
      tileIsFullyVisible,
      geometryIntersection: transformedGeometryToIntersect,
      data: tile.data.polygons!,
      type: 'Polygon',
      bbox,
      tileFormat,
      uniqueIdProperty,
      options,
    });
  }
  return Array.from(map.values());
}

function processTileFeatureProperties({
  map,
  data,
  startIndex,
  endIndex,
  type,
  bbox,
  tileFormat,
  uniqueIdProperty,
  storeGeometry,
  geometryIntersection,
}: {
  map: TileMap;
  data: BinaryFeature;
  startIndex: number;
  endIndex: number;
  type: BinaryGeometryType;
  bbox: BBox;
  tileFormat?: TileFormat;
  uniqueIdProperty?: string;
  storeGeometry: boolean;
  geometryIntersection?: Geometry;
}) {
  const tileProps = getPropertiesFromTile(data, startIndex);
  const uniquePropertyValue = getUniquePropertyValue(
    tileProps,
    uniqueIdProperty,
    map
  );

  if (!uniquePropertyValue || map.has(uniquePropertyValue)) {
    return;
  }
  let geometry: Geometry | null = null;

  // Only calculate geometry if necessary
  if (storeGeometry || geometryIntersection) {
    const {positions} = data;
    const ringCoordinates = getRingCoordinatesFor(
      startIndex,
      endIndex,
      positions
    );
    geometry = getFeatureByType(ringCoordinates, type);
  }

  // If intersection is required, check before proceeding
  if (
    geometry &&
    geometryIntersection &&
    !intersects(geometry, geometryIntersection)
  ) {
    return;
  }

  const properties = parseProperties(tileProps);

  // Only save geometry if necessary
  if (storeGeometry && geometry) {
    properties[FEATURE_GEOM_PROPERTY] =
      tileFormat === TileFormat.MVT
        ? transformTileCoordsToWGS84(geometry, bbox)
        : geometry;
  }
  map.set(uniquePropertyValue, properties);
}

function addIntersectedFeaturesInTile({
  map,
  data,
  geometryIntersection,
  type,
  bbox,
  tileFormat,
  uniqueIdProperty,
  options,
}: {
  map: TileMap;
  data: BinaryFeature;
  geometryIntersection: Geometry;
  type: BinaryGeometryType;
  bbox: BBox;
  tileFormat?: TileFormat;
  uniqueIdProperty?: string;
  options?: TileFeatureExtractOptions;
}) {
  const indices = getIndices(data);
  const storeGeometry = options?.storeGeometry || false;

  for (let i = 0; i < indices.length - 1; i++) {
    const startIndex = indices[i];
    const endIndex = indices[i + 1];
    processTileFeatureProperties({
      map,
      data,
      startIndex,
      endIndex,
      type,
      bbox,
      tileFormat,
      uniqueIdProperty,
      storeGeometry,
      geometryIntersection,
    });
  }
}

function getIndices(data: BinaryFeature) {
  let indices: BinaryAttribute;
  switch (data.type) {
    case 'Point':
      // @ts-expect-error Missing or changed types?
      indices = data.pointIndices;
      break;
    case 'LineString':
      indices = data.pathIndices;
      break;
    case 'Polygon':
      indices = data.primitivePolygonIndices;
      break;
    default:
      throw new Error(`Unexpected type, "${(data as BinaryFeature).type}"`);
  }
  return indices.value;
}

function getFeatureId(data: BinaryFeature, startIndex: number) {
  return data.featureIds.value[startIndex];
}

function getPropertiesFromTile(data: BinaryFeature, startIndex: number) {
  const featureId = getFeatureId(data, startIndex);
  const {properties, numericProps, fields} = data;
  const result: TileDataInternal = {
    uniqueId: (fields?.[featureId] as {id: string | number})?.id,
    properties: properties[featureId],
    numericProps: {},
  };

  for (const key in numericProps) {
    result.numericProps[key] = numericProps[key].value[startIndex];
  }

  return result;
}

function parseProperties(tileProps: TileDataInternal) {
  const {properties, numericProps} = tileProps;
  return Object.assign({}, properties, numericProps);
}

function getUniquePropertyValue(
  tileProps: TileDataInternal,
  uniqueIdProperty: string | undefined,
  map: TileMap
) {
  if (uniqueIdProperty) {
    return getValueFromTileProps(tileProps, uniqueIdProperty);
  }

  if (tileProps.uniqueId) {
    return tileProps.uniqueId;
  }

  const artificialId = map.size + 1; // a counter, assumed as a valid new id
  return (
    getValueFromTileProps(tileProps, 'cartodb_id') ||
    getValueFromTileProps(tileProps, 'geoid') ||
    artificialId
  );
}

function getValueFromTileProps(
  tileProps: TileDataInternal,
  propertyName: string
) {
  const {properties, numericProps} = tileProps;
  return numericProps[propertyName] || properties[propertyName];
}

function getFeatureByType(
  coordinates: Position[],
  type: BinaryGeometryType
): Polygon | LineString | Point {
  switch (type) {
    case 'Polygon':
      return {type: 'Polygon', coordinates: [coordinates]};
    case 'LineString':
      return {type: 'LineString', coordinates};
    case 'Point':
      return {type: 'Point', coordinates: coordinates[0]};
    default:
      throw new Error('Invalid geometry type');
  }
}

function getRingCoordinatesFor(
  startIndex: number,
  endIndex: number,
  positions: BinaryAttribute
) {
  const ringCoordinates = [];

  for (let j = startIndex; j < endIndex; j++) {
    ringCoordinates.push(
      Array.from(
        positions.value.subarray(j * positions.size, (j + 1) * positions.size)
      )
    );
  }

  return ringCoordinates;
}

function calculateFeatures({
  map,
  tileIsFullyVisible,
  geometryIntersection,
  data,
  type,
  bbox,
  tileFormat,
  uniqueIdProperty,
  options,
}: {
  map: TileMap;
  tileIsFullyVisible: boolean;
  geometryIntersection: SpatialFilter;
  data: BinaryFeature;
  type: BinaryGeometryType;
  bbox: BBox;
  tileFormat?: TileFormat;
  uniqueIdProperty?: string;
  options?: TileFeatureExtractOptions;
}) {
  if (!data?.properties.length) {
    return;
  }

  if (tileIsFullyVisible) {
    addAllFeaturesInTile({
      map,
      data,
      type,
      bbox,
      tileFormat,
      uniqueIdProperty,
      options,
    });
  } else {
    addIntersectedFeaturesInTile({
      map,
      data,
      geometryIntersection,
      type,
      bbox,
      tileFormat,
      uniqueIdProperty,
      options,
    });
  }
}

function addAllFeaturesInTile({
  map,
  data,
  type,
  bbox,
  tileFormat,
  uniqueIdProperty,
  options,
}: {
  map: TileMap;
  data: BinaryFeature;
  type: BinaryGeometryType;
  bbox: BBox;
  tileFormat?: TileFormat;
  uniqueIdProperty?: string;
  options?: TileFeatureExtractOptions;
}) {
  const indices = getIndices(data);
  const storeGeometry = options?.storeGeometry || false;
  for (let i = 0; i < indices.length - 1; i++) {
    const startIndex = indices[i];
    const endIndex = indices[i + 1];
    processTileFeatureProperties({
      map,
      data,
      startIndex,
      endIndex,
      type,
      bbox,
      tileFormat,
      uniqueIdProperty,
      storeGeometry,
    });
  }
}

function createIndicesForPoints(data: BinaryPointFeature) {
  const featureIds = data.featureIds.value;
  const lastFeatureId = featureIds[featureIds.length - 1];
  const PointIndicesArray = featureIds.constructor as TypedArrayConstructor;

  const pointIndices: BinaryAttribute = {
    value: new PointIndicesArray(featureIds.length + 1),
    size: 1,
  };
  pointIndices.value.set(featureIds);
  pointIndices.value.set([lastFeatureId + 1], featureIds.length);

  // @ts-expect-error Missing or changed types?
  data.pointIndices = pointIndices;
}

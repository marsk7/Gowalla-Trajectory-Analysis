import bboxClip from '@turf/bbox-clip';
import bboxPolygon from '@turf/bbox-polygon';
import union from '@turf/union';
import {getType} from '@turf/invariant';
import {polygon, multiPolygon, feature, featureCollection} from '@turf/helpers';
import type {BBox, Geometry, MultiPolygon, Polygon, Position} from 'geojson';
import {SpatialFilter} from './types.js';

/**
 * Returns a {@link SpatialFilter} for a given viewport, typically obtained
 * from deck.gl's `viewport.getBounds()` method ([west, south, east, north]).
 * If the viewport covers the entire world (to some margin of error in Web
 * Mercator space), `undefined` is returned instead.
 *
 * If the viewport extends beyond longitude range [-180, +180], the polygon
 * may be reformatted for compatibility with CARTO APIs.
 */
export function createViewportSpatialFilter(
  viewport: BBox
): SpatialFilter | undefined {
  if (_isGlobalViewport(viewport)) {
    return;
  }
  return createPolygonSpatialFilter(bboxPolygon(viewport).geometry);
}

/**
 * Returns a {@link SpatialFilter} for a given {@link Polygon} or
 * {@link MultiPolygon}. If the polygon(s) extend outside longitude
 * range [-180, +180], the result may be reformatted for compatibility
 * with CARTO APIs.
 */
export function createPolygonSpatialFilter(
  spatialFilter: Polygon | MultiPolygon
): SpatialFilter | undefined {
  return (spatialFilter && _normalizeGeometry(spatialFilter)) || undefined;
}

/**
 * Check if a viewport is large enough to represent a global coverage.
 * In this case the spatial filter parameter for widget calculation is removed.
 *
 * @privateRemarks Source: @carto/react-core
 */
function _isGlobalViewport(viewport: BBox) {
  const [minx, miny, maxx, maxy] = viewport;
  return maxx - minx > 179.5 * 2 && maxy - miny > 85.05 * 2;
}

/**
 * Normalized a geometry, coming from a mask or a viewport. The parts
 * spanning outside longitude range [-180, +180] are clipped and "folded"
 * back to the valid range and unioned to the polygons inide that range.
 *
 * It results in a Polygon or MultiPolygon strictly inside the validity range.
 *
 * @privateRemarks Source: @carto/react-core
 */
function _normalizeGeometry(
  geometry: Polygon | MultiPolygon
): Polygon | MultiPolygon | null {
  const WORLD = [-180, -90, +180, +90] as BBox;
  const worldClip = _clean(
    bboxClip(geometry, WORLD).geometry as Polygon | MultiPolygon
  );

  const geometryTxWest = _tx(geometry, 360);
  const geometryTxEast = _tx(geometry, -360);

  let result: Polygon | MultiPolygon | null = worldClip;

  if (result && geometryTxWest) {
    const worldWestClip = _clean(
      bboxClip(geometryTxWest, WORLD).geometry as Polygon | MultiPolygon
    );
    if (worldWestClip) {
      const collection = featureCollection([
        feature(result),
        feature(worldWestClip),
      ]);
      const merged = union(collection);
      result = merged ? _clean(merged.geometry) : result;
    }
  }

  if (result && geometryTxEast) {
    const worldEastClip = _clean(
      bboxClip(geometryTxEast, WORLD).geometry as Polygon | MultiPolygon
    );
    if (worldEastClip) {
      const collection = featureCollection([
        feature(result),
        feature(worldEastClip),
      ]);
      const merged = union(collection);
      result = merged ? _clean(merged.geometry) : result;
    }
  }

  return result;
}

/** @privateRemarks Source: @carto/react-core */
function _cleanPolygonCoords(cc: Position[][]) {
  const coords = cc.filter((c) => c.length > 0);
  return coords.length > 0 ? coords : null;
}

/** @privateRemarks Source: @carto/react-core */
function _cleanMultiPolygonCoords(ccc: Position[][][]) {
  const coords = ccc.map(_cleanPolygonCoords).filter((cc) => cc);
  return coords.length > 0 ? coords : null;
}

/** @privateRemarks Source: @carto/react-core */
function _clean(
  geometry: Polygon | MultiPolygon | null
): Polygon | MultiPolygon | null {
  if (!geometry) {
    return null;
  }

  if (_isPolygon(geometry)) {
    const coords = _cleanPolygonCoords(geometry.coordinates);
    return coords ? polygon(coords).geometry : null;
  }

  if (_isMultiPolygon(geometry)) {
    const coords = _cleanMultiPolygonCoords(geometry.coordinates);
    return coords ? multiPolygon(coords as Position[][][]).geometry : null;
  }

  return null;
}

/** @privateRemarks Source: @carto/react-core */
function _txContourCoords(cc: Position[], distance: number) {
  return cc.map((c) => [c[0] + distance, c[1]]);
}

/** @privateRemarks Source: @carto/react-core */
function _txPolygonCoords(ccc: Position[][], distance: number) {
  return ccc.map((cc) => _txContourCoords(cc, distance));
}

/** @privateRemarks Source: @carto/react-core */
function _txMultiPolygonCoords(cccc: Position[][][], distance: number) {
  return cccc.map((ccc) => _txPolygonCoords(ccc, distance));
}

/** @privateRemarks Source: @carto/react-core */
function _tx(geometry: Polygon | MultiPolygon, distance: number) {
  if (geometry && getType(geometry) === 'Polygon') {
    const coords = _txPolygonCoords(
      (geometry as Polygon).coordinates,
      distance
    );
    return polygon(coords).geometry;
  } else if (geometry && getType(geometry) === 'MultiPolygon') {
    const coords = _txMultiPolygonCoords(
      (geometry as MultiPolygon).coordinates,
      distance
    );
    return multiPolygon(coords).geometry;
  } else {
    return null;
  }
}

function _isPolygon(geometry: Geometry): geometry is Polygon {
  return getType(geometry) === 'Polygon';
}

function _isMultiPolygon(geometry: Geometry): geometry is MultiPolygon {
  return getType(geometry) === 'MultiPolygon';
}

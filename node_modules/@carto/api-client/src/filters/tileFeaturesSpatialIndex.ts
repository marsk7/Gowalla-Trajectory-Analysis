import {SpatialIndex} from '../constants.js';
import {getResolution as quadbinGetResolution, geometryToCells} from 'quadbin';
import bboxClip from '@turf/bbox-clip';
import {SpatialFilter, SpatialIndexTile} from '../types.js';
import {BBox, Feature} from 'geojson';
import {getResolution as h3GetResolution, polygonToCells} from 'h3-js';
import {FeatureData} from '../types-internal.js';
import {SpatialDataType} from '../sources/types.js';

export type TileFeaturesSpatialIndexOptions = {
  tiles: SpatialIndexTile[];
  spatialFilter: SpatialFilter;
  spatialDataColumn: string;
  spatialDataType: SpatialDataType;
};

export function tileFeaturesSpatialIndex({
  tiles,
  spatialFilter,
  spatialDataColumn,
  spatialDataType,
}: TileFeaturesSpatialIndexOptions): FeatureData[] {
  const map = new Map();
  const spatialIndex = getSpatialIndex(spatialDataType);
  const resolution = getResolution(tiles, spatialIndex);
  const spatialIndexIDName = spatialDataColumn
    ? spatialDataColumn
    : spatialIndex;

  if (!resolution) {
    return [];
  }
  const cells = getCellsCoverGeometry(spatialFilter, spatialIndex, resolution);

  if (!cells?.length) {
    return [];
  }

  // We transform cells to Set to improve the performace
  const cellsSet = new Set<bigint | string>(cells);

  for (const tile of tiles) {
    if (tile.isVisible === false || !tile.data) {
      continue;
    }

    tile.data.forEach((d: Feature) => {
      if (cellsSet.has(d.id as bigint | string)) {
        map.set(d.id, {...d.properties, [spatialIndexIDName]: d.id});
      }
    });
  }
  return Array.from(map.values());
}

function getResolution(
  tiles: SpatialIndexTile[],
  spatialIndex: SpatialIndex
): number | undefined {
  const data = tiles.find((tile) => tile.data?.length)?.data;

  if (!data) {
    return;
  }

  if (spatialIndex === SpatialIndex.QUADBIN) {
    return Number(quadbinGetResolution(data[0].id));
  }

  if (spatialIndex === SpatialIndex.H3) {
    return h3GetResolution(data[0].id);
  }
}

const bboxWest: BBox = [-180, -90, 0, 90];
const bboxEast: BBox = [0, -90, 180, 90];

function getCellsCoverGeometry(
  geometry: SpatialFilter,
  spatialIndex: SpatialIndex,
  resolution: number
) {
  if (spatialIndex === SpatialIndex.QUADBIN) {
    // @ts-expect-error TODO: Probably ought to be stricter about number vs. bigint types in this file.
    return geometryToCells(geometry, resolution);
  }

  if (spatialIndex === SpatialIndex.H3) {
    // The current H3 polyfill algorithm can't deal with polygon segments of greater than 180 degrees longitude
    // so we clip the geometry to be sure that none of them is greater than 180 degrees
    // https://github.com/uber/h3-js/issues/24#issuecomment-431893796
    return polygonToCells(
      bboxClip(geometry, bboxWest).geometry.coordinates as
        | number[][]
        | number[][][],
      resolution,
      true
    ).concat(
      polygonToCells(
        bboxClip(geometry, bboxEast).geometry.coordinates as
          | number[][]
          | number[][][],
        resolution,
        true
      )
    );
  }
}

function getSpatialIndex(spatialDataType: SpatialDataType): SpatialIndex {
  switch (spatialDataType) {
    case 'h3':
      return SpatialIndex.H3;
    case 'quadbin':
      return SpatialIndex.QUADBIN;
    default:
      throw new Error('Unexpected spatial data type');
  }
}

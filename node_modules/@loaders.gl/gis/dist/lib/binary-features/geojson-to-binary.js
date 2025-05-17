import { extractGeometryInfo } from "./extract-geometry-info.js";
import { geojsonToFlatGeojson } from "./geojson-to-flat-geojson.js";
import { flatGeojsonToBinary } from "./flat-geojson-to-binary.js";
/**
 * Convert GeoJSON features to flat binary arrays
 *
 * @param features
 * @param options
 * @returns features in binary format, grouped by geometry type
 */
export function geojsonToBinary(features, options = { fixRingWinding: true, triangulate: true }) {
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

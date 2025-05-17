export { GEOPARQUET_METADATA_JSON_SCHEMA } from "./lib/geo/geoparquet-metadata-schema.js";
export type { GeoMetadata } from "./lib/geo/geoparquet-metadata.js";
export { getGeoMetadata, setGeoMetadata, unpackGeoMetadata } from "./lib/geo/geoparquet-metadata.js";
export { unpackJSONStringMetadata } from "./lib/geo/geoparquet-metadata.js";
export type { GeoArrowEncoding, GeoArrowMetadata } from "./lib/geo/geoarrow-metadata.js";
export { getGeometryColumnsFromSchema } from "./lib/geo/geoarrow-metadata.js";
export { convertWKBTableToGeoJSON } from "./lib/tables/convert-table-to-geojson.js";
export { flatGeojsonToBinary } from "./lib/binary-features/flat-geojson-to-binary.js";
export { geojsonToBinary } from "./lib/binary-features/geojson-to-binary.js";
export { geojsonToFlatGeojson } from "./lib/binary-features/geojson-to-flat-geojson.js";
export { binaryToGeojson, binaryToGeometry } from "./lib/binary-features/binary-to-geojson.js";
export { transformBinaryCoords, transformGeoJsonCoords } from "./lib/binary-features/transform.js";
//# sourceMappingURL=index.d.ts.map
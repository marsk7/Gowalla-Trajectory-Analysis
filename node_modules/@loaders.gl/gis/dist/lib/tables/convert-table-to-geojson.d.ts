import type { LoaderWithParser } from '@loaders.gl/loader-utils';
import type { ArrayRowTable, GeoJSONTable, ObjectRowTable, Schema } from '@loaders.gl/schema';
/** TODO - move to loaders.gl/gis? */
export declare function convertWKBTableToGeoJSON(table: ArrayRowTable | ObjectRowTable, schema: Schema, loaders: LoaderWithParser[]): GeoJSONTable;
//# sourceMappingURL=convert-table-to-geojson.d.ts.map
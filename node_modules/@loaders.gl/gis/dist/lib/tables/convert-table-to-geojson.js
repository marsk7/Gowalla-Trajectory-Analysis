// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { getTableLength, getTableRowAsObject } from '@loaders.gl/schema';
import { getGeoMetadata } from "../geo/geoparquet-metadata.js";
/** TODO - move to loaders.gl/gis? */
export function convertWKBTableToGeoJSON(table, schema, loaders) {
    const geoMetadata = getGeoMetadata(schema);
    const primaryColumn = geoMetadata?.primary_column;
    if (!primaryColumn) {
        throw new Error('no geometry column');
    }
    const columnMetadata = geoMetadata.columns[primaryColumn];
    const features = [];
    const length = getTableLength(table);
    for (let rowIndex = 0; rowIndex < length; rowIndex++) {
        const row = getTableRowAsObject(table, rowIndex);
        const geometry = parseGeometry(row[primaryColumn], columnMetadata, loaders);
        delete row[primaryColumn];
        const feature = { type: 'Feature', geometry: geometry, properties: row };
        features.push(feature);
    }
    return { shape: 'geojson-table', schema, type: 'FeatureCollection', features };
}
function parseGeometry(geometry, columnMetadata, loaders) {
    switch (columnMetadata.encoding) {
        case 'wkt':
            const wktLoader = loaders.find((loader) => loader.id === 'wkt');
            return wktLoader?.parseTextSync?.(geometry) || null;
        case 'wkb':
        default:
            const wkbLoader = loaders.find((loader) => loader.id === 'wkb');
            const arrayBuffer = ArrayBuffer.isView(geometry)
                ? geometry.buffer.slice(geometry.byteOffset, geometry.byteOffset + geometry.byteLength)
                : geometry;
            const geojson = wkbLoader?.parseSync?.(arrayBuffer, {
                wkb: { shape: 'geojson-geometry' }
            });
            return geojson; // binaryGeometry ? binaryToGeometry(binaryGeometry) : null;
        // const binaryGeometry = WKBLoader.parseSync?.(geometry);
        // ts-ignore
        // return binaryGeometry ? binaryToGeometry(binaryGeometry) : null;
    }
}

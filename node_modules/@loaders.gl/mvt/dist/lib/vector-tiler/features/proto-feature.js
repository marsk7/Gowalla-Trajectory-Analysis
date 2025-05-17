// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Forked from https://github.com/mapbox/geojson-vt under compatible ISC license
export function createProtoFeature(id, type, geometry, tags) {
    const feature = {
        // eslint-disable-next-line
        id: id == null ? null : id,
        type,
        simplifiedType: undefined, // TODO
        geometry,
        tags,
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    };
    // TODO break out into separate function
    switch (type) {
        case 'Point':
        case 'MultiPoint':
        case 'LineString':
            calcLineBBox(feature, geometry);
            break;
        case 'MultiLineString':
            for (const line of geometry) {
                calcLineBBox(feature, line);
            }
            break;
        case 'Polygon':
            // the outer ring (ie [0]) contains all inner rings
            calcLineBBox(feature, geometry[0]);
            break;
        case 'MultiPolygon':
            for (const polygon of geometry) {
                // the outer ring (ie [0]) contains all inner rings
                calcLineBBox(feature, polygon[0]);
            }
            break;
        default:
            throw new Error(String(type));
    }
    return feature;
}
function calcLineBBox(feature, geometry) {
    for (let i = 0; i < geometry.length; i += 3) {
        feature.minX = Math.min(feature.minX, geometry[i]);
        feature.minY = Math.min(feature.minY, geometry[i + 1]);
        feature.maxX = Math.max(feature.maxX, geometry[i]);
        feature.maxY = Math.max(feature.maxY, geometry[i + 1]);
    }
}

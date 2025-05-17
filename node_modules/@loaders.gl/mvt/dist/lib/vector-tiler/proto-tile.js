// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Forked from https://github.com/mapbox/geojson-vt under compatible ISC license
/**
 * Create a tile from features and tile index
 */
export function createProtoTile(features, z, tx, ty, options) {
    const tolerance = z === options.maxZoom ? 0 : options.tolerance / ((1 << z) * options.extent);
    const tile = {
        protoFeatures: [],
        sourceFeatures: null,
        numPoints: 0,
        numSimplified: 0,
        numFeatures: features.length,
        x: tx,
        y: ty,
        z,
        transformed: false,
        minX: 2,
        minY: 1,
        maxX: -1,
        maxY: 0
    };
    for (const feature of features) {
        addProtoFeature(tile, feature, tolerance, options);
    }
    return tile;
}
// eslint-disable-next-line complexity, max-statements
function addProtoFeature(tile, feature, tolerance, options) {
    const geometry = feature.geometry;
    const type = feature.type;
    const simplifiedGeometry = [];
    tile.minX = Math.min(tile.minX, feature.minX);
    tile.minY = Math.min(tile.minY, feature.minY);
    tile.maxX = Math.max(tile.maxX, feature.maxX);
    tile.maxY = Math.max(tile.maxY, feature.maxY);
    let simplifiedType;
    switch (type) {
        case 'Point':
        case 'MultiPoint':
            simplifiedType = 1;
            for (let i = 0; i < geometry.length; i += 3) {
                simplifiedGeometry.push(geometry[i], geometry[i + 1]);
                tile.numPoints++;
                tile.numSimplified++;
            }
            break;
        case 'LineString':
            simplifiedType = 2;
            addProtoLine(simplifiedGeometry, geometry, tile, tolerance, false, false);
            break;
        case 'MultiLineString':
            simplifiedType = 2;
            for (let i = 0; i < geometry.length; i++) {
                addProtoLine(simplifiedGeometry, geometry[i], tile, tolerance, false, i === 0);
            }
            break;
        case 'Polygon':
            simplifiedType = 3;
            for (let i = 0; i < geometry.length; i++) {
                addProtoLine(simplifiedGeometry, geometry[i], tile, tolerance, true, i === 0);
            }
            break;
        case 'MultiPolygon':
            simplifiedType = 3;
            for (let k = 0; k < geometry.length; k++) {
                const polygon = geometry[k];
                for (let i = 0; i < polygon.length; i++) {
                    addProtoLine(simplifiedGeometry, polygon[i], tile, tolerance, true, i === 0);
                }
            }
            break;
        default:
            throw new Error(`Unknown geometry type: ${type}`);
    }
    if (simplifiedGeometry.length) {
        let tags = feature.tags || null;
        if (type === 'LineString' && options.lineMetrics) {
            tags = {};
            for (const key in feature.tags) {
                tags[key] = feature.tags[key];
            }
            // @ts-expect-error adding fields to arrays
            // eslint-disable-next-line camelcase
            tags.mapbox_clip_start = geometry.start / geometry.size;
            // @ts-expect-error adding fields to arrays
            // eslint-disable-next-line camelcase
            tags.mapbox_clip_end = geometry.end / geometry.size;
        }
        const tileFeature = {
            geometry: simplifiedGeometry,
            simplifiedType,
            // @ts-expect-error
            tags
        };
        if (feature.id !== null) {
            tileFeature.id = feature.id;
        }
        tile.protoFeatures.push(tileFeature);
    }
}
// eslint-disable-next-line max-params, max-statements
function addProtoLine(result, geometry, tile, tolerance, isPolygon, isOuter) {
    const sqTolerance = tolerance * tolerance;
    if (tolerance > 0 && geometry.size < (isPolygon ? sqTolerance : tolerance)) {
        tile.numPoints += geometry.length / 3;
        return;
    }
    const ring = [];
    for (let i = 0; i < geometry.length; i += 3) {
        if (tolerance === 0 || geometry[i + 2] > sqTolerance) {
            tile.numSimplified++;
            ring.push(geometry[i], geometry[i + 1]);
        }
        tile.numPoints++;
    }
    if (isPolygon)
        rewind(ring, isOuter);
    result.push(ring);
}
function rewind(ring, clockwise) {
    let area = 0;
    for (let i = 0, j = ring.length - 2; i < ring.length; j = i, i += 2) {
        area += (ring[i] - ring[j]) * (ring[i + 1] + ring[j + 1]);
    }
    if (area > 0 === clockwise) {
        for (let i = 0, len = ring.length; i < len / 2; i += 2) {
            const x = ring[i];
            const y = ring[i + 1];
            ring[i] = ring[len - 2 - i];
            ring[i + 1] = ring[len - 1 - i];
            ring[len - 2 - i] = x;
            ring[len - 1 - i] = y;
        }
    }
}

// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Forked from https://github.com/mapbox/geojson-vt under compatible ISC license
import { projectToLngLat, convertToLocalCoordinates } from "../utils/geometry-utils.js";
// eslint-disable-next-line max-statements, complexity
export function convertTileToGeoJSON(protoTile, props) {
    const features = [];
    for (const rawFeature of protoTile.protoFeatures) {
        if (!rawFeature || !rawFeature.geometry) {
            // eslint-disable-next-line no-continue
            continue;
        }
        let type;
        let coordinates;
        // raw geometry
        switch (rawFeature.simplifiedType) {
            case 1:
                if (rawFeature.geometry.length === 1) {
                    type = 'Point';
                    coordinates = rawFeature.geometry[0];
                }
                else {
                    type = 'MultiPoint';
                    coordinates = rawFeature.geometry;
                }
                break;
            case 2:
                if (rawFeature.geometry.length === 1) {
                    type = 'LineString';
                    coordinates = rawFeature.geometry[0];
                }
                else {
                    type = 'MultiLineString';
                    coordinates = rawFeature.geometry;
                }
                break;
            case 3:
                if (rawFeature.geometry.length > 1) {
                    type = 'MultiPolygon';
                    coordinates = [rawFeature.geometry];
                }
                else {
                    type = 'Polygon';
                    coordinates = rawFeature.geometry;
                }
                break;
            default:
                throw new Error(`${rawFeature.simplifiedType}is not a valid simplified type`);
        }
        switch (props.coordinates) {
            case 'EPSG:4326':
            case 'wgs84':
                projectToLngLat(coordinates, props.tileIndex, props.extent);
                break;
            default:
                convertToLocalCoordinates(coordinates, props.extent);
                break;
        }
        const feature = {
            type: 'Feature',
            geometry: {
                type,
                coordinates
            },
            properties: rawFeature.tags || {},
            id: rawFeature.id
        };
        features.push(feature);
    }
    if (features.length === 0) {
        return null;
    }
    const table = {
        shape: 'geojson-table',
        type: 'FeatureCollection',
        features
    };
    return table;
}

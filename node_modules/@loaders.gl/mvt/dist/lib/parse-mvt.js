// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors
import { flatGeojsonToBinary } from '@loaders.gl/gis';
import { log } from '@loaders.gl/loader-utils';
import Protobuf from 'pbf';
import { VectorTile } from "./vector-tile/vector-tile.js";
/**
 * Parse MVT arrayBuffer and return GeoJSON.
 *
 * @param arrayBuffer A MVT arrayBuffer
 * @param options
 * @returns A GeoJSON geometry object or a binary representation
 */
export function parseMVT(arrayBuffer, options) {
    const mvtOptions = checkOptions(options);
    const shape = options?.gis?.format || options?.mvt?.shape || options?.shape;
    switch (shape) {
        case 'columnar-table': // binary + some JS arrays
            return { shape: 'columnar-table', data: parseToBinary(arrayBuffer, mvtOptions) };
        case 'geojson-table': {
            const table = {
                shape: 'geojson-table',
                type: 'FeatureCollection',
                features: parseToGeojsonFeatures(arrayBuffer, mvtOptions)
            };
            return table;
        }
        case 'geojson':
            return parseToGeojsonFeatures(arrayBuffer, mvtOptions);
        case 'binary-geometry':
            return parseToBinary(arrayBuffer, mvtOptions);
        case 'binary':
            return parseToBinary(arrayBuffer, mvtOptions);
        default:
            throw new Error(shape || 'undefined shape');
    }
}
function parseToBinary(arrayBuffer, options) {
    const [flatGeoJsonFeatures, geometryInfo] = parseToFlatGeoJson(arrayBuffer, options);
    const binaryData = flatGeojsonToBinary(flatGeoJsonFeatures, geometryInfo);
    // Add the original byteLength (as a reasonable approximation of the size of the binary data)
    // TODO decide where to store extra fields like byteLength (header etc) and document
    // @ts-ignore
    binaryData.byteLength = arrayBuffer.byteLength;
    return binaryData;
}
function parseToFlatGeoJson(arrayBuffer, options) {
    const features = [];
    const geometryInfo = {
        coordLength: 2,
        pointPositionsCount: 0,
        pointFeaturesCount: 0,
        linePositionsCount: 0,
        linePathsCount: 0,
        lineFeaturesCount: 0,
        polygonPositionsCount: 0,
        polygonObjectsCount: 0,
        polygonRingsCount: 0,
        polygonFeaturesCount: 0
    };
    if (arrayBuffer.byteLength <= 0) {
        return [features, geometryInfo];
    }
    const tile = new VectorTile(new Protobuf(arrayBuffer));
    const selectedLayers = options && Array.isArray(options.layers) ? options.layers : Object.keys(tile.layers);
    selectedLayers.forEach((layerName) => {
        const vectorTileLayer = tile.layers[layerName];
        if (!vectorTileLayer) {
            return;
        }
        for (let i = 0; i < vectorTileLayer.length; i++) {
            const vectorTileFeature = vectorTileLayer.getBinaryFeature(i, geometryInfo);
            const decodedFeature = getDecodedFeatureBinary(vectorTileFeature, options, layerName);
            features.push(decodedFeature);
        }
    });
    return [features, geometryInfo];
}
function parseToGeojsonFeatures(arrayBuffer, options) {
    if (arrayBuffer.byteLength <= 0) {
        return [];
    }
    const features = [];
    const tile = new VectorTile(new Protobuf(arrayBuffer));
    const selectedLayers = Array.isArray(options.layers) ? options.layers : Object.keys(tile.layers);
    selectedLayers.forEach((layerName) => {
        const vectorTileLayer = tile.layers[layerName];
        if (!vectorTileLayer) {
            return;
        }
        for (let i = 0; i < vectorTileLayer.length; i++) {
            const vectorTileFeature = vectorTileLayer.getGeoJSONFeature(i);
            const decodedFeature = getDecodedFeature(vectorTileFeature, options, layerName);
            features.push(decodedFeature);
        }
    });
    return features;
}
/** Check that options are good */
function checkOptions(options) {
    if (!options?.mvt) {
        throw new Error('mvt options required');
    }
    if (options.mvt?.coordinates === 'wgs84' && !options.mvt.tileIndex) {
        throw new Error('MVT Loader: WGS84 coordinates need tileIndex property');
    }
    if (options.gis) {
        log.warn('MVTLoader: "options.gis" is deprecated, use "options.mvt.shape" instead')();
    }
    return options.mvt;
}
/**
 * @param feature
 * @param options
 * @returns decoded feature
 */
function getDecodedFeature(feature, options, layerName) {
    const decodedFeature = feature.toGeoJSONFeature(options.coordinates || 'local', options.tileIndex);
    // Add layer name to GeoJSON properties
    if (options.layerProperty) {
        decodedFeature.properties ||= {};
        decodedFeature.properties[options.layerProperty] = layerName;
    }
    return decodedFeature;
}
/**
 * @param feature
 * @param options
 * @returns decoded binary feature
 */
function getDecodedFeatureBinary(feature, options, layerName) {
    const decodedFeature = feature.toBinaryFeature(options.coordinates || 'local', options.tileIndex);
    // Add layer name to GeoJSON properties
    if (options.layerProperty && decodedFeature.properties) {
        decodedFeature.properties[options.layerProperty] = layerName;
    }
    return decodedFeature;
}

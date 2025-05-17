// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { deviation, extent, groupSort, median, variance } from 'd3-array';
import { rgb } from 'd3-color';
import { scaleLinear, scaleOrdinal, scaleLog, scalePoint, scaleQuantile, scaleQuantize, scaleSqrt, scaleThreshold } from 'd3-scale';
import { format as d3Format } from 'd3-format';
import moment from 'moment-timezone';
import { GridLayer, HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
import { GeoJsonLayer } from '@deck.gl/layers';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import ClusterTileLayer from "../layers/cluster-tile-layer.js";
import H3TileLayer from "../layers/h3-tile-layer.js";
import QuadbinTileLayer from "../layers/quadbin-tile-layer.js";
import RasterTileLayer from "../layers/raster-tile-layer.js";
import VectorTileLayer from "../layers/vector-tile-layer.js";
import { assert, createBinaryProxy, scaleIdentity } from "../utils.js";
import HeatmapTileLayer from "../layers/heatmap-tile-layer.js";
const SCALE_FUNCS = {
    linear: scaleLinear,
    ordinal: scaleOrdinal,
    log: scaleLog,
    point: scalePoint,
    quantile: scaleQuantile,
    quantize: scaleQuantize,
    sqrt: scaleSqrt,
    custom: scaleThreshold,
    identity: scaleIdentity
};
function identity(v) {
    return v;
}
const UNKNOWN_COLOR = '#868d91';
export const AGGREGATION = {
    average: 'MEAN',
    maximum: 'MAX',
    minimum: 'MIN',
    sum: 'SUM'
};
export const OPACITY_MAP = {
    getFillColor: 'opacity',
    getLineColor: 'strokeOpacity',
    getTextColor: 'opacity'
};
const AGGREGATION_FUNC = {
    'count unique': (values, accessor) => groupSort(values, v => v.length, accessor).length,
    median,
    // Unfortunately mode() is only available in d3-array@3+ which is ESM only
    mode: (values, accessor) => groupSort(values, v => v.length, accessor).pop(),
    stddev: deviation,
    variance
};
const TILE_LAYER_TYPE_TO_LAYER = {
    clusterTile: ClusterTileLayer,
    h3: H3TileLayer,
    heatmapTile: HeatmapTileLayer,
    mvt: VectorTileLayer,
    quadbin: QuadbinTileLayer,
    raster: RasterTileLayer,
    tileset: VectorTileLayer
};
const hexToRGBA = c => {
    const { r, g, b, opacity } = rgb(c);
    return [r, g, b, 255 * opacity];
};
// Kepler prop value -> Deck.gl prop value
// Supports nested definitions, and function transforms:
//   {keplerProp: 'deckProp'} is equivalent to:
//   {keplerProp: x => ({deckProp: x})}
const sharedPropMap = {
    // Apply the value of Kepler `color` prop to the deck `getFillColor` prop
    color: 'getFillColor',
    isVisible: 'visible',
    label: 'cartoLabel',
    textLabel: {
        alignment: 'getTextAlignmentBaseline',
        anchor: 'getTextAnchor',
        // Apply the value of Kepler `textLabel.color` prop to the deck `getTextColor` prop
        color: 'getTextColor',
        size: 'getTextSize'
    },
    visConfig: {
        enable3d: 'extruded',
        elevationScale: 'elevationScale',
        filled: 'filled',
        strokeColor: 'getLineColor',
        stroked: 'stroked',
        thickness: 'getLineWidth',
        radius: 'getPointRadius',
        wireframe: 'wireframe'
    }
};
const customMarkersPropsMap = {
    color: 'getIconColor',
    visConfig: {
        radius: 'getIconSize'
    }
};
const heatmapTilePropsMap = {
    visConfig: {
        colorRange: x => ({ colorRange: x.colors.map(hexToRGBA) }),
        radius: 'radiusPixels'
    }
};
const aggregationVisConfig = {
    colorAggregation: x => ({ colorAggregation: AGGREGATION[x] || AGGREGATION.sum }),
    colorRange: x => ({ colorRange: x.colors.map(hexToRGBA) }),
    coverage: 'coverage',
    elevationPercentile: ['elevationLowerPercentile', 'elevationUpperPercentile'],
    percentile: ['lowerPercentile', 'upperPercentile']
};
const defaultProps = {
    lineMiterLimit: 2,
    lineWidthUnits: 'pixels',
    pointRadiusUnits: 'pixels',
    rounded: true,
    wrapLongitude: false
};
function mergePropMaps(a = {}, b = {}) {
    return { ...a, ...b, visConfig: { ...a.visConfig, ...b.visConfig } };
}
export function getLayer(type, config, dataset) {
    let basePropMap = sharedPropMap;
    if (config.visConfig?.customMarkers) {
        basePropMap = mergePropMaps(basePropMap, customMarkersPropsMap);
    }
    if (type === 'heatmapTile') {
        basePropMap = mergePropMaps(basePropMap, heatmapTilePropsMap);
    }
    if (TILE_LAYER_TYPE_TO_LAYER[type]) {
        return getTileLayer(dataset, basePropMap, type);
    }
    const geoColumn = dataset?.geoColumn;
    const getPosition = d => d[geoColumn].coordinates;
    const hexagonId = config.columns?.hex_id;
    const layerTypeDefs = {
        point: {
            Layer: GeoJsonLayer,
            propMap: {
                columns: {
                    altitude: x => ({ parameters: { depthWriteEnabled: Boolean(x) } })
                },
                visConfig: { outline: 'stroked' }
            }
        },
        geojson: {
            Layer: GeoJsonLayer
        },
        grid: {
            Layer: GridLayer,
            propMap: { visConfig: { ...aggregationVisConfig, worldUnitSize: x => ({ cellSize: 1000 * x }) } },
            defaultProps: { getPosition }
        },
        heatmap: {
            Layer: HeatmapLayer,
            propMap: { visConfig: { ...aggregationVisConfig, radius: 'radiusPixels' } },
            defaultProps: { getPosition }
        },
        hexagon: {
            Layer: HexagonLayer,
            propMap: { visConfig: { ...aggregationVisConfig, worldUnitSize: x => ({ radius: 1000 * x }) } },
            defaultProps: { getPosition }
        },
        hexagonId: {
            Layer: H3HexagonLayer,
            propMap: { visConfig: { coverage: 'coverage' } },
            defaultProps: { getHexagon: d => d[hexagonId], stroked: false }
        }
    };
    const layer = layerTypeDefs[type];
    assert(layer, `Unsupported layer type: ${type}`);
    return {
        ...layer,
        propMap: mergePropMaps(basePropMap, layer.propMap),
        defaultProps: { ...defaultProps, ...layer.defaultProps }
    };
}
function getTileLayer(dataset, basePropMap, type) {
    const { aggregationExp, aggregationResLevel } = dataset;
    return {
        Layer: TILE_LAYER_TYPE_TO_LAYER[type] || VectorTileLayer,
        propMap: basePropMap,
        defaultProps: {
            ...defaultProps,
            ...(aggregationExp && { aggregationExp }),
            ...(aggregationResLevel && { aggregationResLevel }),
            uniqueIdProperty: 'geoid'
        }
    };
}
function domainFromAttribute(attribute, scaleType, scaleLength) {
    if (scaleType === 'ordinal' || scaleType === 'point') {
        return attribute.categories.map(c => c.category).filter(c => c !== undefined && c !== null);
    }
    if (scaleType === 'quantile' && attribute.quantiles) {
        return attribute.quantiles.global
            ? attribute.quantiles.global[scaleLength]
            : attribute.quantiles[scaleLength];
    }
    let { min } = attribute;
    if (scaleType === 'log' && min === 0) {
        min = 1e-5;
    }
    return [min, attribute.max];
}
function domainFromValues(values, scaleType) {
    if (scaleType === 'ordinal' || scaleType === 'point') {
        return groupSort(values, g => -g.length, d => d);
    }
    else if (scaleType === 'quantile') {
        return values.sort((a, b) => a - b);
    }
    else if (scaleType === 'log') {
        const [d0, d1] = extent(values);
        return [d0 === 0 ? 1e-5 : d0, d1];
    }
    return extent(values);
}
function calculateDomain(data, name, scaleType, scaleLength) {
    if (data.tilestats) {
        // Tileset data type
        const { attributes } = data.tilestats.layers[0];
        const attribute = attributes.find(a => a.attribute === name);
        return domainFromAttribute(attribute, scaleType, scaleLength);
    }
    else if (data.features) {
        // GeoJSON data type
        const values = data.features.map(({ properties }) => properties[name]);
        return domainFromValues(values, scaleType);
    }
    else if (Array.isArray(data) && data[0][name] !== undefined) {
        // JSON data type
        const values = data.map(properties => properties[name]);
        return domainFromValues(values, scaleType);
    }
    return [0, 1];
}
function normalizeAccessor(accessor, data) {
    if (data.features || data.tilestats) {
        return (object, info) => {
            if (object) {
                return accessor(object.properties || object.__source.object.properties);
            }
            const { data, index } = info;
            const proxy = createBinaryProxy(data, index);
            return accessor(proxy);
        };
    }
    return accessor;
}
export function opacityToAlpha(opacity) {
    return opacity !== undefined ? Math.round(255 * Math.pow(opacity, 1 / 2.2)) : 255;
}
function getAccessorKeys(name, aggregation) {
    let keys = [name];
    if (aggregation) {
        // Snowflake will capitalized the keys, need to check lower and upper case version
        keys = keys.concat([aggregation, aggregation.toUpperCase()].map(a => `${name}_${a}`));
    }
    return keys;
}
function findAccessorKey(keys, properties) {
    for (const key of keys) {
        if (key in properties) {
            return [key];
        }
    }
    throw new Error(`Could not find property for any accessor key: ${keys}`);
}
export function getColorValueAccessor({ name }, colorAggregation, data) {
    const aggregator = AGGREGATION_FUNC[colorAggregation];
    const accessor = values => aggregator(values, p => p[name]);
    return normalizeAccessor(accessor, data);
}
export function getColorAccessor({ name, colorColumn }, scaleType, { aggregation, range }, opacity, data) {
    const scale = calculateLayerScale(colorColumn || name, scaleType, range, data);
    const alpha = opacityToAlpha(opacity);
    let accessorKeys = getAccessorKeys(name, aggregation);
    const accessor = properties => {
        if (!(accessorKeys[0] in properties)) {
            accessorKeys = findAccessorKey(accessorKeys, properties);
        }
        const propertyValue = properties[accessorKeys[0]];
        const { r, g, b } = rgb(scale(propertyValue));
        return [r, g, b, propertyValue === null ? 0 : alpha];
    };
    return normalizeAccessor(accessor, data);
}
function calculateLayerScale(name, scaleType, range, data) {
    const scale = SCALE_FUNCS[scaleType]();
    let domain = [];
    let scaleColor = [];
    if (scaleType !== 'identity') {
        const { colorMap, colors } = range;
        if (Array.isArray(colorMap)) {
            colorMap.forEach(([value, color]) => {
                domain.push(value);
                scaleColor.push(color);
            });
        }
        else {
            domain = calculateDomain(data, name, scaleType, colors.length);
            scaleColor = colors;
        }
        if (scaleType === 'ordinal') {
            domain = domain.slice(0, scaleColor.length);
        }
    }
    scale.domain(domain);
    scale.range(scaleColor);
    scale.unknown(UNKNOWN_COLOR);
    return scale;
}
const FALLBACK_ICON = 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiLz4NCjwvc3ZnPg==';
export function getIconUrlAccessor(field, range, { fallbackUrl, maxIconSize, useMaskedIcons }, data) {
    const urlToUnpackedIcon = (url) => ({
        id: `${url}@@${maxIconSize}`,
        url,
        width: maxIconSize,
        height: maxIconSize,
        mask: useMaskedIcons
    });
    let unknownValue = fallbackUrl || FALLBACK_ICON;
    if (range?.othersMarker) {
        unknownValue = range.othersMarker;
    }
    const unknownIcon = urlToUnpackedIcon(unknownValue);
    if (!range || !field) {
        return () => unknownIcon;
    }
    const mapping = {};
    for (const { value, markerUrl } of range.markerMap) {
        if (markerUrl) {
            mapping[value] = urlToUnpackedIcon(markerUrl);
        }
    }
    const accessor = properties => {
        const propertyValue = properties[field.name];
        return mapping[propertyValue] || unknownIcon;
    };
    return normalizeAccessor(accessor, data);
}
export function getMaxMarkerSize(visConfig, visualChannels) {
    const { radiusRange, radius } = visConfig;
    const { radiusField, sizeField } = visualChannels;
    const field = radiusField || sizeField;
    return Math.ceil(radiusRange && field ? radiusRange[1] : radius);
}
export function negateAccessor(accessor) {
    return typeof accessor === 'function' ? (d, i) => -accessor(d, i) : -accessor;
}
export function getSizeAccessor({ name }, scaleType, aggregation, range, data) {
    const scale = scaleType ? SCALE_FUNCS[scaleType]() : identity;
    if (scaleType) {
        if (aggregation !== 'count') {
            scale.domain(calculateDomain(data, name, scaleType));
        }
        scale.range(range);
    }
    let accessorKeys = getAccessorKeys(name, aggregation);
    const accessor = properties => {
        if (!(accessorKeys[0] in properties)) {
            accessorKeys = findAccessorKey(accessorKeys, properties);
        }
        const propertyValue = properties[accessorKeys[0]];
        return scale(propertyValue);
    };
    return normalizeAccessor(accessor, data);
}
const FORMATS = {
    date: s => moment.utc(s).format('MM/DD/YY HH:mm:ssa'),
    integer: d3Format('i'),
    float: d3Format('.5f'),
    timestamp: s => moment.utc(s).format('X'),
    default: String
};
export function getTextAccessor({ name, type }, data) {
    const format = FORMATS[type] || FORMATS.default;
    const accessor = properties => {
        return format(properties[name]);
    };
    return normalizeAccessor(accessor, data);
}
export { domainFromValues as _domainFromValues };
//# sourceMappingURL=layer-map.js.map
import { useContext, useEffect, useMemo, useState, useRef } from 'react';
import { MapContext } from "./map.js";
import assert from "../utils/assert.js";
import { deepEqual } from "../utils/deep-equal.js";
/* eslint-disable complexity, max-statements */
function updateLayer(map, id, props, prevProps) {
    assert(props.id === prevProps.id, 'layer id changed');
    assert(props.type === prevProps.type, 'layer type changed');
    if (props.type === 'custom' || prevProps.type === 'custom') {
        return;
    }
    // @ts-ignore filter does not exist in some Layer types
    const { layout = {}, paint = {}, filter, minzoom, maxzoom, beforeId } = props;
    if (beforeId !== prevProps.beforeId) {
        map.moveLayer(id, beforeId);
    }
    if (layout !== prevProps.layout) {
        const prevLayout = prevProps.layout || {};
        for (const key in layout) {
            if (!deepEqual(layout[key], prevLayout[key])) {
                map.setLayoutProperty(id, key, layout[key]);
            }
        }
        for (const key in prevLayout) {
            if (!layout.hasOwnProperty(key)) {
                map.setLayoutProperty(id, key, undefined);
            }
        }
    }
    if (paint !== prevProps.paint) {
        const prevPaint = prevProps.paint || {};
        for (const key in paint) {
            if (!deepEqual(paint[key], prevPaint[key])) {
                map.setPaintProperty(id, key, paint[key]);
            }
        }
        for (const key in prevPaint) {
            if (!paint.hasOwnProperty(key)) {
                map.setPaintProperty(id, key, undefined);
            }
        }
    }
    // @ts-ignore filter does not exist in some Layer types
    if (!deepEqual(filter, prevProps.filter)) {
        map.setFilter(id, filter);
    }
    if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
        map.setLayerZoomRange(id, minzoom, maxzoom);
    }
}
function createLayer(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded && (!('source' in props) || map.getSource(props.source))) {
        const options = { ...props, id };
        delete options.beforeId;
        // @ts-ignore
        map.addLayer(options, props.beforeId);
    }
}
/* eslint-enable complexity, max-statements */
let layerCounter = 0;
export function Layer(props) {
    const map = useContext(MapContext).map.getMap();
    const propsRef = useRef(props);
    const [, setStyleLoaded] = useState(0);
    const id = useMemo(() => props.id || `jsx-layer-${layerCounter++}`, []);
    useEffect(() => {
        if (map) {
            const forceUpdate = () => setStyleLoaded(version => version + 1);
            map.on('styledata', forceUpdate);
            forceUpdate();
            return () => {
                map.off('styledata', forceUpdate);
                // @ts-ignore
                if (map.style && map.style._loaded && map.getLayer(id)) {
                    map.removeLayer(id);
                }
            };
        }
        return undefined;
    }, [map]);
    // @ts-ignore
    const layer = map && map.style && map.getLayer(id);
    if (layer) {
        try {
            updateLayer(map, id, props, propsRef.current);
        }
        catch (error) {
            console.warn(error); // eslint-disable-line
        }
    }
    else {
        createLayer(map, id, props);
    }
    // Store last rendered props
    propsRef.current = props;
    return null;
}
//# sourceMappingURL=layer.js.map
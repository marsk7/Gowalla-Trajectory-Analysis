import * as React from 'react';
import { useState, useRef, useEffect, useContext, useMemo, useImperativeHandle } from 'react';
import { MountedMapsContext } from "./use-map.js";
import Mapbox from "../mapbox/mapbox.js";
import createRef from "../mapbox/create-ref.js";
import useIsomorphicLayoutEffect from "../utils/use-isomorphic-layout-effect.js";
import setGlobals from "../utils/set-globals.js";
export const MapContext = React.createContext(null);
function _Map(props, ref) {
    const mountedMapsContext = useContext(MountedMapsContext);
    const [mapInstance, setMapInstance] = useState(null);
    const containerRef = useRef();
    const { current: contextValue } = useRef({ mapLib: null, map: null });
    useEffect(() => {
        const mapLib = props.mapLib;
        let isMounted = true;
        let mapbox;
        Promise.resolve(mapLib || import('mapbox-gl'))
            .then((module) => {
            if (!isMounted) {
                return;
            }
            if (!module) {
                throw new Error('Invalid mapLib');
            }
            const mapboxgl = 'Map' in module ? module : module.default;
            if (!mapboxgl.Map) {
                throw new Error('Invalid mapLib');
            }
            setGlobals(mapboxgl, props);
            if (props.reuseMaps) {
                mapbox = Mapbox.reuse(props, containerRef.current);
            }
            if (!mapbox) {
                mapbox = new Mapbox(mapboxgl.Map, props, containerRef.current);
            }
            contextValue.map = createRef(mapbox);
            contextValue.mapLib = mapboxgl;
            setMapInstance(mapbox);
            mountedMapsContext?.onMapMount(contextValue.map, props.id);
        })
            .catch(error => {
            const { onError } = props;
            if (onError) {
                onError({
                    type: 'error',
                    target: null,
                    error,
                    originalEvent: error
                });
            }
            else {
                console.error(error); // eslint-disable-line
            }
        });
        return () => {
            isMounted = false;
            if (mapbox) {
                mountedMapsContext?.onMapUnmount(props.id);
                if (props.reuseMaps) {
                    mapbox.recycle();
                }
                else {
                    mapbox.destroy();
                }
            }
        };
    }, []);
    useIsomorphicLayoutEffect(() => {
        if (mapInstance) {
            mapInstance.setProps(props);
        }
    });
    useImperativeHandle(ref, () => contextValue.map, [mapInstance]);
    const style = useMemo(() => ({
        position: 'relative',
        width: '100%',
        height: '100%',
        ...props.style
    }), [props.style]);
    const CHILD_CONTAINER_STYLE = {
        height: '100%'
    };
    return (React.createElement("div", { id: props.id, ref: containerRef, style: style }, mapInstance && (React.createElement(MapContext.Provider, { value: contextValue },
        React.createElement("div", { "mapboxgl-children": "", style: CHILD_CONTAINER_STYLE }, props.children)))));
}
export const Map = React.forwardRef(_Map);
//# sourceMappingURL=map.js.map
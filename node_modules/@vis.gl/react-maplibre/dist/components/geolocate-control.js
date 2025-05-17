import { useImperativeHandle, useRef, useEffect, forwardRef, memo } from 'react';
import { applyReactStyle } from "../utils/apply-react-style.js";
import { useControl } from "./use-control.js";
function _GeolocateControl(props, ref) {
    const thisRef = useRef({ props });
    const ctrl = useControl(({ mapLib }) => {
        const gc = new mapLib.GeolocateControl(props);
        // Hack: fix GeolocateControl reuse
        // When using React strict mode, the component is mounted twice.
        // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
        const setupUI = gc._setupUI;
        gc._setupUI = () => {
            if (!gc._container.hasChildNodes()) {
                setupUI();
            }
        };
        gc.on('geolocate', e => {
            thisRef.current.props.onGeolocate?.(e);
        });
        gc.on('error', e => {
            thisRef.current.props.onError?.(e);
        });
        gc.on('outofmaxbounds', e => {
            thisRef.current.props.onOutOfMaxBounds?.(e);
        });
        gc.on('trackuserlocationstart', e => {
            thisRef.current.props.onTrackUserLocationStart?.(e);
        });
        gc.on('trackuserlocationend', e => {
            thisRef.current.props.onTrackUserLocationEnd?.(e);
        });
        return gc;
    }, { position: props.position });
    thisRef.current.props = props;
    useImperativeHandle(ref, () => ctrl, []);
    useEffect(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
export const GeolocateControl = memo(forwardRef(_GeolocateControl));
//# sourceMappingURL=geolocate-control.js.map
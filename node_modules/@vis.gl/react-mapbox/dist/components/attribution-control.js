import { useEffect, memo } from 'react';
import { applyReactStyle } from "../utils/apply-react-style.js";
import { useControl } from "./use-control.js";
function _AttributionControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.AttributionControl(props), {
        position: props.position
    });
    useEffect(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
export const AttributionControl = memo(_AttributionControl);
//# sourceMappingURL=attribution-control.js.map
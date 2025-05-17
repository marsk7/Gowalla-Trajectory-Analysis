import { useEffect, memo } from 'react';
import { applyReactStyle } from "../utils/apply-react-style.js";
import { useControl } from "./use-control.js";
function _FullscreenControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.FullscreenControl({
        container: props.containerId && document.getElementById(props.containerId)
    }), { position: props.position });
    useEffect(() => {
        // @ts-expect-error accessing private member
        applyReactStyle(ctrl._controlContainer, props.style);
    }, [props.style]);
    return null;
}
export const FullscreenControl = memo(_FullscreenControl);
//# sourceMappingURL=fullscreen-control.js.map
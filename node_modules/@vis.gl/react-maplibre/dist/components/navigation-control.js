import { useEffect, memo } from 'react';
import { applyReactStyle } from "../utils/apply-react-style.js";
import { useControl } from "./use-control.js";
function _NavigationControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.NavigationControl(props), {
        position: props.position
    });
    useEffect(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
export const NavigationControl = memo(_NavigationControl);
//# sourceMappingURL=navigation-control.js.map
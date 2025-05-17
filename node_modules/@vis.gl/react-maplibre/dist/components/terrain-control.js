import { useEffect, memo } from 'react';
import { applyReactStyle } from "../utils/apply-react-style.js";
import { useControl } from "./use-control.js";
function _TerrainControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.TerrainControl(props), {
        position: props.position
    });
    useEffect(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
export const TerrainControl = memo(_TerrainControl);
//# sourceMappingURL=terrain-control.js.map
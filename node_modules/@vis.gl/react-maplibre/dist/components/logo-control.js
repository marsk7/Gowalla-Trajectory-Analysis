import { useEffect, memo } from 'react';
import { applyReactStyle } from "../utils/apply-react-style.js";
import { useControl } from "./use-control.js";
function _LogoControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.LogoControl(props), { position: props.position });
    useEffect(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
export const LogoControl = memo(_LogoControl);
//# sourceMappingURL=logo-control.js.map
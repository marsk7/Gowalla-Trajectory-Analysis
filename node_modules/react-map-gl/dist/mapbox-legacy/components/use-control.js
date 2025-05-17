import { useContext, useMemo, useEffect } from 'react';
import { MapContext } from "./map.js";
export function useControl(onCreate, arg1, arg2, arg3) {
    const context = useContext(MapContext);
    const ctrl = useMemo(() => onCreate(context), []);
    useEffect(() => {
        const opts = (arg3 || arg2 || arg1);
        const onAdd = typeof arg1 === 'function' && typeof arg2 === 'function' ? arg1 : null;
        const onRemove = typeof arg2 === 'function' ? arg2 : typeof arg1 === 'function' ? arg1 : null;
        const { map } = context;
        if (!map.hasControl(ctrl)) {
            map.addControl(ctrl, opts?.position);
            if (onAdd) {
                onAdd(context);
            }
        }
        return () => {
            if (onRemove) {
                onRemove(context);
            }
            // Map might have been removed (parent effects are destroyed before child ones)
            if (map.hasControl(ctrl)) {
                map.removeControl(ctrl);
            }
        };
    }, []);
    return ctrl;
}
//# sourceMappingURL=use-control.js.map
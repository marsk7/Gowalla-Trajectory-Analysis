import type { IControl, ControlPosition } from "../types/lib.js";
import type { MapContextValue } from "./map.js";
type ControlOptions = {
    position?: ControlPosition;
};
export declare function useControl<T extends IControl>(onCreate: (context: MapContextValue) => T, opts?: ControlOptions): T;
export declare function useControl<T extends IControl>(onCreate: (context: MapContextValue) => T, onRemove: (context: MapContextValue) => void, opts?: ControlOptions): T;
export declare function useControl<T extends IControl>(onCreate: (context: MapContextValue) => T, onAdd: (context: MapContextValue) => void, onRemove: (context: MapContextValue) => void, opts?: ControlOptions): T;
export {};
//# sourceMappingURL=use-control.d.ts.map
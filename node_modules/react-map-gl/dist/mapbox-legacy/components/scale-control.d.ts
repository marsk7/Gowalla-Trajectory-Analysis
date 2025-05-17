import * as React from 'react';
import type { ControlPosition, ScaleControlOptions } from "../types/lib.js";
export type ScaleControlProps = ScaleControlOptions & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function _ScaleControl(props: ScaleControlProps): any;
export declare const ScaleControl: React.MemoExoticComponent<typeof _ScaleControl>;
export {};
//# sourceMappingURL=scale-control.d.ts.map
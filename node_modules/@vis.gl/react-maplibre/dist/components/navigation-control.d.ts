import * as React from 'react';
import type { ControlPosition, NavigationControlOptions } from "../types/lib.js";
export type NavigationControlProps = NavigationControlOptions & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function _NavigationControl(props: NavigationControlProps): any;
export declare const NavigationControl: React.MemoExoticComponent<typeof _NavigationControl>;
export {};
//# sourceMappingURL=navigation-control.d.ts.map
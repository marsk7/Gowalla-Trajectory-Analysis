import * as React from 'react';
import type { ControlPosition, LogoControlOptions } from "../types/lib.js";
export type LogoControlProps = LogoControlOptions & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function _LogoControl(props: LogoControlProps): any;
export declare const LogoControl: React.MemoExoticComponent<typeof _LogoControl>;
export {};
//# sourceMappingURL=logo-control.d.ts.map
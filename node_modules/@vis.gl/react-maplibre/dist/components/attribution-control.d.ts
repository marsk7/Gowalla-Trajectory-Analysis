import * as React from 'react';
import type { ControlPosition, AttributionControlOptions } from "../types/lib.js";
export type AttributionControlProps = AttributionControlOptions & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function _AttributionControl(props: AttributionControlProps): any;
export declare const AttributionControl: React.MemoExoticComponent<typeof _AttributionControl>;
export {};
//# sourceMappingURL=attribution-control.d.ts.map
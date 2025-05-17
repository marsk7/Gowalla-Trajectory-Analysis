import * as React from 'react';
import type { ControlPosition } from "../types/lib.js";
import type { TerrainSpecification } from "../types/style-spec.js";
export type TerrainControlProps = TerrainSpecification & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function _TerrainControl(props: TerrainControlProps): any;
export declare const TerrainControl: React.MemoExoticComponent<typeof _TerrainControl>;
export {};
//# sourceMappingURL=terrain-control.d.ts.map
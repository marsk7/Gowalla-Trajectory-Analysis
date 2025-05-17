import * as React from 'react';
import type { ControlPosition, FullscreenControlOptions } from "../types/lib.js";
export type FullscreenControlProps = Omit<FullscreenControlOptions, 'container'> & {
    /** Id of the DOM element which should be made full screen. By default, the map container
     * element will be made full screen. */
    containerId?: string;
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function _FullscreenControl(props: FullscreenControlProps): any;
export declare const FullscreenControl: React.MemoExoticComponent<typeof _FullscreenControl>;
export {};
//# sourceMappingURL=fullscreen-control.d.ts.map
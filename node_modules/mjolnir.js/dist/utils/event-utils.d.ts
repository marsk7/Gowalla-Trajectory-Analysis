import type { MjolnirEventRaw, Point } from "../types.js";
/**
 * Extract the involved mouse button
 */
export declare function whichButtons(event: MjolnirEventRaw): {
    leftButton: boolean;
    middleButton: boolean;
    rightButton: boolean;
} | null;
/**
 * Calculate event position relative to the root element
 */
export declare function getOffsetPosition(event: MjolnirEventRaw, rootElement: HTMLElement): {
    center: Point;
    offsetCenter: Point;
} | null;
//# sourceMappingURL=event-utils.d.ts.map
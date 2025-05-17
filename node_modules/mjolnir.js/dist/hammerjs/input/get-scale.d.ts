import type { PointerEventLike } from "./types.js";
/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 */
export declare function getScale(start: PointerEventLike[], end: PointerEventLike[]): number;
//# sourceMappingURL=get-scale.d.ts.map
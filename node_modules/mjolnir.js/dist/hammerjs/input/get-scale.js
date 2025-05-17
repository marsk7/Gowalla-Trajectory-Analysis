import { getEventDistance } from "./get-distance.js";
/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 */
export function getScale(start, end) {
    return getEventDistance(end[0], end[1]) / getEventDistance(start[0], start[1]);
}
//# sourceMappingURL=get-scale.js.map
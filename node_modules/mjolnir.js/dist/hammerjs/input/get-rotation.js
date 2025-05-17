import { getEventAngle } from "./get-angle.js";
/**
 * calculate the rotation degrees between two pointer sets
 * @returns rotation in degrees
 */
export function getRotation(start, end) {
    return getEventAngle(end[1], end[0]) - getEventAngle(start[1], start[0]);
}
//# sourceMappingURL=get-rotation.js.map
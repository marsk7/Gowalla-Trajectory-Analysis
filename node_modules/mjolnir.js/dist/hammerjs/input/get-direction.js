import { InputDirection } from "./input-consts.js";
/**
 * get the direction between two points
 * @returns direction
 */
export function getDirection(dx, dy) {
    if (dx === dy) {
        return InputDirection.None;
    }
    if (Math.abs(dx) >= Math.abs(dy)) {
        return dx < 0 ? InputDirection.Left : InputDirection.Right;
    }
    return dy < 0 ? InputDirection.Up : InputDirection.Down;
}
//# sourceMappingURL=get-direction.js.map
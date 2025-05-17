/**
 * calculate the velocity between two points. unit is in px per ms.
 */
export function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}
//# sourceMappingURL=get-velocity.js.map
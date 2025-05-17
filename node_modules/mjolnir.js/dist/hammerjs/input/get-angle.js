/**
 * calculate the angle between two coordinates
 * @returns angle in degrees
 */
export function getPointAngle(p1, p2) {
    const x = p2.x - p1.x;
    const y = p2.y - p1.y;
    return (Math.atan2(y, x) * 180) / Math.PI;
}
/**
 * calculate the angle between two pointer events
 * @returns angle in degrees
 */
export function getEventAngle(p1, p2) {
    const x = p2.clientX - p1.clientX;
    const y = p2.clientY - p1.clientY;
    return (Math.atan2(y, x) * 180) / Math.PI;
}
//# sourceMappingURL=get-angle.js.map
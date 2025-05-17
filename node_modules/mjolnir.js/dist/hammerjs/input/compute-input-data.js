import hasParent from "../utils/has-parent.js";
import { simpleCloneInputData } from "./simple-clone-input-data.js";
import { getCenter } from "./get-center.js";
import { getPointDistance } from "./get-distance.js";
import { getPointAngle } from "./get-angle.js";
import { getDirection } from "./get-direction.js";
import { computeDeltaXY } from "./get-delta-xy.js";
import { getVelocity } from "./get-velocity.js";
import { getScale } from "./get-scale.js";
import { getRotation } from "./get-rotation.js";
import { computeIntervalInputData } from "./compute-interval-input-data.js";
/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 */
export function computeInputData(manager, input) {
    const { session } = manager;
    const { pointers } = input;
    const { length: pointersLength } = pointers;
    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }
    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    }
    else if (pointersLength === 1) {
        session.firstMultiple = false;
    }
    const { firstInput, firstMultiple } = session;
    const offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
    const center = (input.center = getCenter(pointers));
    input.timeStamp = Date.now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;
    input.angle = getPointAngle(offsetCenter, center);
    input.distance = getPointDistance(offsetCenter, center);
    const { deltaX, deltaY } = computeDeltaXY(session, input);
    input.deltaX = deltaX;
    input.deltaY = deltaY;
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
    const overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity =
        Math.abs(overallVelocity.x) > Math.abs(overallVelocity.y)
            ? overallVelocity.x
            : overallVelocity.y;
    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
    input.maxPointers = !session.prevInput
        ? input.pointers.length
        : input.pointers.length > session.prevInput.maxPointers
            ? input.pointers.length
            : session.prevInput.maxPointers;
    // find the correct target
    let target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
    computeIntervalInputData(session, input);
    // All the optional fields have been populated
    return input;
}
//# sourceMappingURL=compute-input-data.js.map
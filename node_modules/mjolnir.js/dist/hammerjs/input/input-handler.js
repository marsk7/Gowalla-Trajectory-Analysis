import { InputEvent } from "./input-consts.js";
import { computeInputData } from "./compute-input-data.js";
/**
 * handle input events
 */
export function inputHandler(manager, eventType, input) {
    const pointersLen = input.pointers.length;
    const changedPointersLen = input.changedPointers.length;
    const isFirst = eventType & InputEvent.Start && pointersLen - changedPointersLen === 0;
    const isFinal = eventType & (InputEvent.End | InputEvent.Cancel) && pointersLen - changedPointersLen === 0;
    input.isFirst = Boolean(isFirst);
    input.isFinal = Boolean(isFinal);
    if (isFirst) {
        manager.session = {};
    }
    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;
    // compute scale, rotation etc
    const processedInput = computeInputData(manager, input);
    // emit secret event
    manager.emit('hammer.input', processedInput);
    manager.recognize(processedInput);
    manager.session.prevInput = processedInput;
}
//# sourceMappingURL=input-handler.js.map
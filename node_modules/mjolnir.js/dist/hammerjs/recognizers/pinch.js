import { AttrRecognizer } from "./attribute.js";
import { TOUCH_ACTION_NONE } from "../touchaction/touchaction-Consts.js";
import { RecognizerState } from "../recognizer/recognizer-state.js";
const EVENT_NAMES = ['', 'start', 'move', 'end', 'cancel', 'in', 'out'];
/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 */
export class PinchRecognizer extends AttrRecognizer {
    constructor(options = {}) {
        super({
            enable: true,
            event: 'pinch',
            threshold: 0,
            pointers: 2,
            ...options
        });
    }
    getTouchAction() {
        return [TOUCH_ACTION_NONE];
    }
    getEventNames() {
        return EVENT_NAMES.map((suffix) => this.options.event + suffix);
    }
    attrTest(input) {
        return (super.attrTest(input) &&
            (Math.abs(input.scale - 1) > this.options.threshold ||
                Boolean(this.state & RecognizerState.Began)));
    }
    emit(input) {
        if (input.scale !== 1) {
            const inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        super.emit(input);
    }
}
//# sourceMappingURL=pinch.js.map
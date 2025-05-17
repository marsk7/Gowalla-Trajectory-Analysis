import { AttrRecognizer } from "./attribute.js";
import { TOUCH_ACTION_NONE } from "../touchaction/touchaction-Consts.js";
import { RecognizerState } from "../recognizer/recognizer-state.js";
const EVENT_NAMES = ['', 'start', 'move', 'end', 'cancel'];
/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 */
export class RotateRecognizer extends AttrRecognizer {
    constructor(options = {}) {
        super({
            enable: true,
            event: 'rotate',
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
            (Math.abs(input.rotation) > this.options.threshold ||
                Boolean(this.state & RecognizerState.Began)));
    }
}
//# sourceMappingURL=rotate.js.map
/* global setTimeout, clearTimeout */
import { Recognizer } from "../recognizer/recognizer.js";
import { RecognizerState } from "../recognizer/recognizer-state.js";
import { TOUCH_ACTION_AUTO } from "../touchaction/touchaction-Consts.js";
import { InputEvent } from "../input/input-consts.js";
const EVENT_NAMES = ['', 'up'];
/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 */
export class PressRecognizer extends Recognizer {
    constructor(options = {}) {
        super({
            enable: true,
            event: 'press',
            pointers: 1,
            time: 251,
            threshold: 9,
            ...options
        });
        this._timer = null;
        this._input = null;
    }
    getTouchAction() {
        return [TOUCH_ACTION_AUTO];
    }
    getEventNames() {
        return EVENT_NAMES.map((suffix) => this.options.event + suffix);
    }
    process(input) {
        const { options } = this;
        const validPointers = input.pointers.length === options.pointers;
        const validMovement = input.distance < options.threshold;
        const validTime = input.deltaTime > options.time;
        this._input = input;
        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement ||
            !validPointers ||
            (input.eventType & (InputEvent.End | InputEvent.Cancel) && !validTime)) {
            this.reset();
        }
        else if (input.eventType & InputEvent.Start) {
            this.reset();
            this._timer = setTimeout(() => {
                this.state = RecognizerState.Recognized;
                this.tryEmit();
            }, options.time);
        }
        else if (input.eventType & InputEvent.End) {
            return RecognizerState.Recognized;
        }
        return RecognizerState.Failed;
    }
    reset() {
        clearTimeout(this._timer);
    }
    emit(input) {
        if (this.state !== RecognizerState.Recognized) {
            return;
        }
        if (input && input.eventType & InputEvent.End) {
            this.manager.emit(`${this.options.event}up`, input);
        }
        else {
            this._input.timeStamp = Date.now();
            this.manager.emit(this.options.event, this._input);
        }
    }
}
//# sourceMappingURL=press.js.map
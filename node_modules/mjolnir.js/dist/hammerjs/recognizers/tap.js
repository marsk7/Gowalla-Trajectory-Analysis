/* global setTimeout, clearTimeout */
import { Recognizer } from "../recognizer/recognizer.js";
import { TOUCH_ACTION_MANIPULATION } from "../touchaction/touchaction-Consts.js";
import { InputEvent } from "../input/input-consts.js";
import { RecognizerState } from "../recognizer/recognizer-state.js";
import { getPointDistance } from "../input/get-distance.js";
/**
 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 */
export class TapRecognizer extends Recognizer {
    constructor(options = {}) {
        super({
            enable: true,
            event: 'tap',
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10,
            ...options
        });
        /** previous time for tap counting */
        this.pTime = null;
        /** previous center for tap counting */
        this.pCenter = null;
        this._timer = null;
        this._input = null;
        this.count = 0;
    }
    getTouchAction() {
        return [TOUCH_ACTION_MANIPULATION];
    }
    process(input) {
        const { options } = this;
        const validPointers = input.pointers.length === options.pointers;
        const validMovement = input.distance < options.threshold;
        const validTouchTime = input.deltaTime < options.time;
        this.reset();
        if (input.eventType & InputEvent.Start && this.count === 0) {
            return this.failTimeout();
        }
        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType !== InputEvent.End) {
                return this.failTimeout();
            }
            const validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
            const validMultiTap = !this.pCenter || getPointDistance(this.pCenter, input.center) < options.posThreshold;
            this.pTime = input.timeStamp;
            this.pCenter = input.center;
            if (!validMultiTap || !validInterval) {
                this.count = 1;
            }
            else {
                this.count += 1;
            }
            this._input = input;
            // if tap count matches we have recognized it,
            // else it has began recognizing...
            const tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return RecognizerState.Recognized;
                }
                this._timer = setTimeout(() => {
                    this.state = RecognizerState.Recognized;
                    this.tryEmit(this._input);
                }, options.interval);
                return RecognizerState.Began;
            }
        }
        return RecognizerState.Failed;
    }
    failTimeout() {
        this._timer = setTimeout(() => {
            this.state = RecognizerState.Failed;
        }, this.options.interval);
        return RecognizerState.Failed;
    }
    reset() {
        clearTimeout(this._timer);
    }
    emit(input) {
        if (this.state === RecognizerState.Recognized) {
            input.tapCount = this.count;
            this.manager.emit(this.options.event, input);
        }
    }
}
//# sourceMappingURL=tap.js.map
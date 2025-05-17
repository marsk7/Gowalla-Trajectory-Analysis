import { AttrRecognizer } from "./attribute.js";
import { InputDirection, InputEvent } from "../input/input-consts.js";
import { PanRecognizer } from "./pan.js";
const EVENT_NAMES = ['', 'up', 'down', 'left', 'right'];
/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 */
export class SwipeRecognizer extends AttrRecognizer {
    constructor(options = {}) {
        super({
            enable: true,
            event: 'swipe',
            threshold: 10,
            velocity: 0.3,
            direction: InputDirection.All,
            pointers: 1,
            ...options
        });
    }
    getTouchAction() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    }
    getEventNames() {
        return EVENT_NAMES.map((suffix) => this.options.event + suffix);
    }
    attrTest(input) {
        const { direction } = this.options;
        let velocity = 0;
        if (direction & InputDirection.All) {
            velocity = input.overallVelocity;
        }
        else if (direction & InputDirection.Horizontal) {
            velocity = input.overallVelocityX;
        }
        else if (direction & InputDirection.Vertical) {
            velocity = input.overallVelocityY;
        }
        return (super.attrTest(input) &&
            Boolean(direction & input.offsetDirection) &&
            input.distance > this.options.threshold &&
            input.maxPointers === this.options.pointers &&
            Math.abs(velocity) > this.options.velocity &&
            Boolean(input.eventType & InputEvent.End));
    }
    emit(input) {
        const direction = InputDirection[input.offsetDirection].toLowerCase();
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }
        this.manager.emit(this.options.event, input);
    }
}
//# sourceMappingURL=swipe.js.map
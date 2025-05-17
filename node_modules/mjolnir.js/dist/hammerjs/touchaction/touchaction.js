import { TOUCH_ACTION_COMPUTE } from "./touchaction-Consts.js";
import cleanTouchActions from "./clean-touch-actions.js";
/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 */
export class TouchAction {
    constructor(manager, value) {
        this.actions = '';
        this.manager = manager;
        this.set(value);
    }
    /**
     * set the touchAction value on the element or enable the polyfill
     */
    set(value) {
        // find out the touch-action by the event handlers
        if (value === TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }
        if (this.manager.element) {
            this.manager.element.style.touchAction = value;
            this.actions = value;
        }
    }
    /**
     * just re-set the touchAction value
     */
    update() {
        this.set(this.manager.options.touchAction);
    }
    /**
     * compute the value for the touchAction property based on the recognizer's settings
     */
    compute() {
        let actions = [];
        for (const recognizer of this.manager.recognizers) {
            if (recognizer.options.enable) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        }
        return cleanTouchActions(actions.join(' '));
    }
}
//# sourceMappingURL=touchaction.js.map
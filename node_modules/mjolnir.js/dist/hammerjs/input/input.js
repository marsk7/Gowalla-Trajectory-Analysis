import { addEventListeners, removeEventListeners } from "../utils/event-listeners.js";
import { getWindowForElement } from "../utils/get-window-for-element.js";
import { inputHandler } from "./input-handler.js";
/**
 * create new input type manager
 */
export class Input {
    constructor(manager) {
        this.evEl = '';
        this.evWin = '';
        this.evTarget = '';
        /** smaller wrapper around the handler, for the scope and the enabled state of the manager,
         * so when disabled the input events are completely bypassed.
         */
        this.domHandler = (ev) => {
            if (this.manager.options.enable) {
                this.handler(ev);
            }
        };
        this.manager = manager;
        this.element = manager.element;
        this.target = manager.options.inputTarget || manager.element;
    }
    callback(eventType, input) {
        inputHandler(this.manager, eventType, input);
    }
    // eslint-disable @typescript-eslint/unbound-method
    /**
     * bind the events
     */
    init() {
        addEventListeners(this.element, this.evEl, this.domHandler);
        addEventListeners(this.target, this.evTarget, this.domHandler);
        addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
    /**
     * unbind the events
     */
    destroy() {
        removeEventListeners(this.element, this.evEl, this.domHandler);
        removeEventListeners(this.target, this.evTarget, this.domHandler);
        removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
}
//# sourceMappingURL=input.js.map
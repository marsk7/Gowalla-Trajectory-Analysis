// mjolnir.js
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Input } from "./input.js";
const KEY_EVENTS = ['keydown', 'keyup'];
export class KeyInput extends Input {
    constructor(element, callback, options) {
        super(element, callback, { enable: true, tabIndex: 0, ...options });
        this.handleEvent = (event) => {
            // Ignore if focused on text input
            const targetElement = (event.target || event.srcElement);
            if ((targetElement.tagName === 'INPUT' && targetElement.type === 'text') ||
                targetElement.tagName === 'TEXTAREA') {
                return;
            }
            if (this.enableDownEvent && event.type === 'keydown') {
                this.callback({
                    type: 'keydown',
                    srcEvent: event,
                    key: event.key,
                    target: event.target
                });
            }
            if (this.enableUpEvent && event.type === 'keyup') {
                this.callback({
                    type: 'keyup',
                    srcEvent: event,
                    key: event.key,
                    target: event.target
                });
            }
        };
        this.enableDownEvent = this.options.enable;
        this.enableUpEvent = this.options.enable;
        element.tabIndex = this.options.tabIndex;
        element.style.outline = 'none';
        KEY_EVENTS.forEach((event) => element.addEventListener(event, this.handleEvent));
    }
    destroy() {
        KEY_EVENTS.forEach((event) => this.element.removeEventListener(event, this.handleEvent));
    }
    /**
     * Enable this input (begin processing events)
     * if the specified event type is among those handled by this input.
     */
    enableEventType(eventType, enabled) {
        if (eventType === 'keydown') {
            this.enableDownEvent = enabled;
        }
        if (eventType === 'keyup') {
            this.enableUpEvent = enabled;
        }
    }
}
//# sourceMappingURL=key-input.js.map
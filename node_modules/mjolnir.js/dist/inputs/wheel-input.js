// mjolnir.js
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Input } from "./input.js";
import { userAgent } from "../utils/globals.js";
const firefox = userAgent.indexOf('firefox') !== -1;
// Constants for normalizing input delta
const WHEEL_DELTA_MAGIC_SCALER = 4.000244140625;
const WHEEL_DELTA_PER_LINE = 40;
// Slow down zoom if shift key is held for more precise zooming
const SHIFT_MULTIPLIER = 0.25;
export class WheelInput extends Input {
    constructor(element, callback, options) {
        super(element, callback, { enable: true, ...options });
        /* eslint-disable complexity, max-statements */
        this.handleEvent = (event) => {
            if (!this.options.enable) {
                return;
            }
            let value = event.deltaY;
            if (globalThis.WheelEvent) {
                // Firefox doubles the values on retina screens...
                if (firefox && event.deltaMode === globalThis.WheelEvent.DOM_DELTA_PIXEL) {
                    value /= globalThis.devicePixelRatio;
                }
                if (event.deltaMode === globalThis.WheelEvent.DOM_DELTA_LINE) {
                    value *= WHEEL_DELTA_PER_LINE;
                }
            }
            if (value !== 0 && value % WHEEL_DELTA_MAGIC_SCALER === 0) {
                // This one is definitely a mouse wheel event.
                // Normalize this value to match trackpad.
                value = Math.floor(value / WHEEL_DELTA_MAGIC_SCALER);
            }
            if (event.shiftKey && value) {
                value = value * SHIFT_MULTIPLIER;
            }
            this.callback({
                type: 'wheel',
                center: {
                    x: event.clientX,
                    y: event.clientY
                },
                delta: -value,
                srcEvent: event,
                pointerType: 'mouse',
                target: event.target
            });
        };
        element.addEventListener('wheel', this.handleEvent, { passive: false });
    }
    destroy() {
        this.element.removeEventListener('wheel', this.handleEvent);
    }
    /**
     * Enable this input (begin processing events)
     * if the specified event type is among those handled by this input.
     */
    enableEventType(eventType, enabled) {
        if (eventType === 'wheel') {
            this.options.enable = enabled;
        }
    }
}
//# sourceMappingURL=wheel-input.js.map
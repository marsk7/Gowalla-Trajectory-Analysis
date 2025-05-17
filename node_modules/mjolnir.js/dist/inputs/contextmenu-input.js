// mjolnir.js
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Input } from "./input.js";
export class ContextmenuInput extends Input {
    constructor(element, callback, options) {
        super(element, callback, options);
        this.handleEvent = (event) => {
            if (!this.options.enable) {
                return;
            }
            this.callback({
                type: 'contextmenu',
                center: {
                    x: event.clientX,
                    y: event.clientY
                },
                srcEvent: event,
                pointerType: 'mouse',
                target: event.target
            });
        };
        element.addEventListener('contextmenu', this.handleEvent);
    }
    destroy() {
        this.element.removeEventListener('contextmenu', this.handleEvent);
    }
    /**
     * Enable this input (begin processing events)
     * if the specified event type is among those handled by this input.
     */
    enableEventType(eventType, enabled) {
        if (eventType === 'contextmenu') {
            this.options.enable = enabled;
        }
    }
}
//# sourceMappingURL=contextmenu-input.js.map
// mjolnir.js
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Manager as HammerManager } from "./hammerjs/index.js";
import { WheelInput } from "./inputs/wheel-input.js";
import { MoveInput } from "./inputs/move-input.js";
import { KeyInput } from "./inputs/key-input.js";
import { ContextmenuInput } from "./inputs/contextmenu-input.js";
import { EventRegistrar } from "./utils/event-registrar.js";
function normalizeRecognizer(item) {
    if ('recognizer' in item) {
        return item;
    }
    let recognizer;
    const itemArray = Array.isArray(item) ? [...item] : [item];
    if (typeof itemArray[0] === 'function') {
        // Backward compatibility: v2 / hammerjs style
        const RecognizerType = itemArray.shift();
        const options = itemArray.shift() || {};
        recognizer = new RecognizerType(options);
    }
    else {
        recognizer = itemArray.shift();
    }
    return {
        recognizer,
        recognizeWith: typeof itemArray[0] === 'string' ? [itemArray[0]] : itemArray[0],
        requireFailure: typeof itemArray[1] === 'string' ? [itemArray[1]] : itemArray[1]
    };
}
// Unified API for subscribing to events about both
// basic input events (e.g. 'mousemove', 'touchstart', 'wheel')
// and gestural input (e.g. 'click', 'tap', 'panstart').
// Delegates gesture related event registration and handling to Hammer.js.
export class EventManager {
    constructor(element = null, options = {}) {
        /**
         * Handle basic events using the 'hammer.input' Hammer.js API:
         * Before running Recognizers, Hammer emits a 'hammer.input' event
         * with the basic event info. This function emits all basic events
         * aliased to the "class" of event received.
         * See constants.BASIC_EVENT_CLASSES basic event class definitions.
         */
        this._onBasicInput = (event) => {
            this.manager.emit(event.srcEvent.type, event);
        };
        /**
         * Handle events not supported by Hammer.js,
         * and pipe back out through same (Hammer) channel used by other events.
         */
        this._onOtherEvent = (event) => {
            // console.log('onotherevent', event.type, event)
            this.manager.emit(event.type, event);
        };
        this.options = {
            recognizers: [],
            events: {},
            touchAction: 'compute',
            tabIndex: 0,
            cssProps: {},
            ...options
        };
        this.events = new Map();
        this.element = element;
        if (!element)
            return;
        this.manager = new HammerManager(element, this.options);
        for (const item of this.options.recognizers) {
            const { recognizer, recognizeWith, requireFailure } = normalizeRecognizer(item);
            this.manager.add(recognizer);
            if (recognizeWith) {
                recognizer.recognizeWith(recognizeWith);
            }
            if (requireFailure) {
                recognizer.requireFailure(requireFailure);
            }
        }
        this.manager.on('hammer.input', this._onBasicInput);
        // Handle events not handled by Hammer.js:
        // - mouse wheel
        // - pointer/touch/mouse move
        this.wheelInput = new WheelInput(element, this._onOtherEvent, {
            enable: false
        });
        this.moveInput = new MoveInput(element, this._onOtherEvent, {
            enable: false
        });
        this.keyInput = new KeyInput(element, this._onOtherEvent, {
            enable: false,
            tabIndex: options.tabIndex
        });
        this.contextmenuInput = new ContextmenuInput(element, this._onOtherEvent, {
            enable: false
        });
        // Register all passed events.
        this.on(this.options.events);
    }
    getElement() {
        return this.element;
    }
    // Tear down internal event management implementations.
    destroy() {
        // manager etc. cannot exist if there is no element
        if (!this.element)
            return;
        this.wheelInput.destroy();
        this.moveInput.destroy();
        this.keyInput.destroy();
        this.contextmenuInput.destroy();
        this.manager.destroy();
    }
    /** Register an event handler function to be called on `event` */
    on(event, handler, opts) {
        this._addEventHandler(event, handler, opts, false);
    }
    once(event, handler, opts) {
        this._addEventHandler(event, handler, opts, true);
    }
    watch(event, handler, opts) {
        this._addEventHandler(event, handler, opts, false, true);
    }
    off(event, handler) {
        this._removeEventHandler(event, handler);
    }
    /*
     * Enable/disable recognizer for the given event
     */
    _toggleRecognizer(name, enabled) {
        const { manager } = this;
        if (!manager) {
            return;
        }
        const recognizer = manager.get(name);
        if (recognizer) {
            recognizer.set({ enable: enabled });
            manager.touchAction.update();
        }
        this.wheelInput?.enableEventType(name, enabled);
        this.moveInput?.enableEventType(name, enabled);
        this.keyInput?.enableEventType(name, enabled);
        this.contextmenuInput?.enableEventType(name, enabled);
    }
    /**
     * Process the event registration for a single event + handler.
     */
    _addEventHandler(event, handler, opts, once, passive) {
        if (typeof event !== 'string') {
            // @ts-ignore
            opts = handler;
            // If `event` is a map, call `on()` for each entry.
            for (const [eventName, eventHandler] of Object.entries(event)) {
                this._addEventHandler(eventName, eventHandler, opts, once, passive);
            }
            return;
        }
        const { manager, events } = this;
        if (!manager)
            return;
        let eventRegistrar = events.get(event);
        if (!eventRegistrar) {
            // Enable recognizer for this event.
            const recognizerName = this._getRecognizerName(event) || event;
            eventRegistrar = new EventRegistrar(this, recognizerName);
            events.set(event, eventRegistrar);
            // Listen to the event
            if (manager) {
                manager.on(event, eventRegistrar.handleEvent);
            }
        }
        eventRegistrar.add(event, handler, opts, once, passive);
        if (!eventRegistrar.isEmpty()) {
            this._toggleRecognizer(eventRegistrar.recognizerName, true);
        }
    }
    /**
     * Process the event deregistration for a single event + handler.
     */
    _removeEventHandler(event, handler) {
        if (typeof event !== 'string') {
            // If `event` is a map, call `off()` for each entry.
            for (const [eventName, eventHandler] of Object.entries(event)) {
                this._removeEventHandler(eventName, eventHandler);
            }
            return;
        }
        const { events } = this;
        const eventRegistrar = events.get(event);
        if (!eventRegistrar) {
            return;
        }
        eventRegistrar.remove(event, handler);
        if (eventRegistrar.isEmpty()) {
            const { recognizerName } = eventRegistrar;
            // Disable recognizer if no more handlers are attached to its events
            let isRecognizerUsed = false;
            for (const eh of events.values()) {
                if (eh.recognizerName === recognizerName && !eh.isEmpty()) {
                    isRecognizerUsed = true;
                    break;
                }
            }
            if (!isRecognizerUsed) {
                this._toggleRecognizer(recognizerName, false);
            }
        }
    }
    _getRecognizerName(event) {
        return this.manager.recognizers.find((recognizer) => {
            return recognizer.getEventNames().includes(event);
        })?.options.event;
    }
}
//# sourceMappingURL=event-manager.js.map
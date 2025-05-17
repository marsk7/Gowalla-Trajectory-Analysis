import { Recognizer } from "./hammerjs/index.js";
import type { MjolnirEvent, MjolnirEventHandlers } from "./types.js";
import { HandlerOptions } from "./utils/event-registrar.js";
type RecognizerConstructor = {
    new (options: any): Recognizer;
};
type RecognizerTupleNormalized = {
    recognizer: Recognizer;
    /** Allow another gesture to be recognized simultaneously with this one.
     * For example an interaction can trigger pinch and rotate at the same time. */
    recognizeWith?: string[];
    /** Another recognizer is mutually exclusive with this one.
     * For example an interaction could be singletap or doubletap; pan-horizontal or pan-vertical; but never both. */
    requireFailure?: string[];
};
export type RecognizerTuple = Recognizer | RecognizerConstructor | RecognizerTupleNormalized
/** hammer.js/mjolnir.js@2 style */
 | [
    recognizer: RecognizerConstructor,
    options?: any,
    /** Allow another gesture to be recognized simultaneously with this one.
     * For example an interaction can trigger pinch and rotate at the same time. */
    recognizeWith?: string | string[],
    /** Another recognizer is mutually exclusive with this one.
     * For example an interaction could be singletap or doubletap; pan-horizontal or pan-vertical; but never both. */
    requireFailure?: string | string[]
];
export type EventManagerOptions = {
    /** Event listeners */
    events?: MjolnirEventHandlers;
    /** Gesture recognizers */
    recognizers?: RecognizerTuple[];
    /** Touch action to set on the target element.
     * Use 'compute' to automatically set as the least restrictive value to support the recognizers.
     * https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
     * @default 'compute'
     */
    touchAction?: 'none' | 'compute' | 'manipulation' | 'pan-x' | 'pan-y' | 'pan-x pan-y';
    /** Tab index of the target element */
    tabIndex?: number;
    /**
     * Optional CSS properties to be applied to the target element.
     */
    cssProps?: Partial<CSSStyleDeclaration>;
};
export declare class EventManager {
    private element;
    private manager;
    private options;
    private events;
    private wheelInput;
    private moveInput;
    private contextmenuInput;
    private keyInput;
    constructor(element?: HTMLElement | null, options?: EventManagerOptions);
    getElement(): HTMLElement | null;
    destroy(): void;
    /** Register multiple event handlers */
    on(events: MjolnirEventHandlers, opts?: HandlerOptions): void;
    on<EventT extends MjolnirEvent>(event: EventT['type'], handler: (ev: EventT) => void, opts?: HandlerOptions): void;
    /** Register an event handler function to be called on `event`, then remove it */
    once(events: MjolnirEventHandlers, opts?: HandlerOptions): void;
    once<EventT extends MjolnirEvent>(event: EventT['type'], handler: (ev: EventT) => void, opts?: HandlerOptions): void;
    /** Register an event handler function to be called on `event`
     * This handler does not ask the event to be recognized at all times.
     * Instead, it only "intercepts" the event if some other handler is getting it.
     */
    watch(events: MjolnirEventHandlers, opts?: HandlerOptions): void;
    watch<EventT extends MjolnirEvent>(event: EventT['type'], handler: (ev: EventT) => void, opts?: HandlerOptions): void;
    /**
     * Deregister a previously-registered event handler.
     */
    off(events: MjolnirEventHandlers): void;
    off<EventT extends MjolnirEvent>(event: EventT['type'], handler: (ev: EventT) => void): void;
    private _toggleRecognizer;
    /**
     * Process the event registration for a single event + handler.
     */
    private _addEventHandler;
    /**
     * Process the event deregistration for a single event + handler.
     */
    private _removeEventHandler;
    private _getRecognizerName;
    /**
     * Handle basic events using the 'hammer.input' Hammer.js API:
     * Before running Recognizers, Hammer emits a 'hammer.input' event
     * with the basic event info. This function emits all basic events
     * aliased to the "class" of event received.
     * See constants.BASIC_EVENT_CLASSES basic event class definitions.
     */
    private _onBasicInput;
    /**
     * Handle events not supported by Hammer.js,
     * and pipe back out through same (Hammer) channel used by other events.
     */
    private _onOtherEvent;
}
export {};
//# sourceMappingURL=event-manager.d.ts.map
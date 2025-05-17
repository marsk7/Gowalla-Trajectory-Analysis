import { TouchAction } from "./touchaction/touchaction.js";
import type { Input } from "./input/input.js";
import type { Recognizer } from "./recognizer/recognizer.js";
import type { Session, HammerInput } from "./input/types.js";
export type ManagerOptions = {
    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @default compute
     */
    touchAction?: string;
    /**
     * @default true
     */
    enable?: boolean;
    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @default null
     */
    inputTarget?: null | EventTarget;
    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     */
    cssProps?: Partial<CSSStyleDeclaration>;
};
export type HammerEvent = HammerInput & {
    type: string;
    preventDefault: () => void;
};
export type EventHandler = (event: HammerEvent) => void;
/**
 * Manager
 */
export declare class Manager {
    options: Required<ManagerOptions>;
    element: HTMLElement | null;
    touchAction: TouchAction;
    oldCssProps: {
        [prop: string]: any;
    };
    session: Session;
    recognizers: Recognizer[];
    input: Input;
    handlers: {
        [event: string]: EventHandler[];
    };
    constructor(element: HTMLElement, options: ManagerOptions);
    /**
     * set options
     */
    set(options: Partial<ManagerOptions>): this;
    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     */
    stop(force?: boolean): void;
    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     */
    recognize(inputData: HammerInput): void;
    /**
     * get a recognizer by its event name.
     */
    get(recognizerName: string): Recognizer | null;
    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     */
    add(recognizer: Recognizer | Recognizer[]): this | Recognizer<any>;
    /**
     * remove a recognizer by name or instance
     */
    remove(recognizerOrName: Recognizer | string | (Recognizer | string)[]): this;
    /**
     * bind event
     */
    on(events: string, handler: EventHandler): void;
    /**
     * unbind event, leave hander blank to remove all handlers
     */
    off(events: string, handler?: EventHandler): void;
    /**
     * emit event to the listeners
     */
    emit(event: string, data: HammerInput): void;
    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy(): void;
    /**
     * add/remove the css properties as defined in manager.options.cssProps
     */
    private toggleCssProps;
}
//# sourceMappingURL=manager.d.ts.map
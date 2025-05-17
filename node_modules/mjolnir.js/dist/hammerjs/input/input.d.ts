import { InputEvent } from "./input-consts.js";
import type { RawInput } from "./types.js";
import type { Manager } from "../manager.js";
/**
 * create new input type manager
 */
export declare abstract class Input {
    manager: Manager;
    element: HTMLElement;
    target: EventTarget;
    evEl: string;
    evWin: string;
    evTarget: string;
    constructor(manager: Manager);
    /** smaller wrapper around the handler, for the scope and the enabled state of the manager,
     * so when disabled the input events are completely bypassed.
     */
    protected domHandler: (ev: Event) => void;
    protected callback(eventType: InputEvent, input: RawInput): void;
    /**
     * should handle the inputEvent data and trigger the callback
     */
    abstract handler(ev: Event): void;
    /**
     * bind the events
     */
    init(): void;
    /**
     * unbind the events
     */
    destroy(): void;
}
//# sourceMappingURL=input.d.ts.map
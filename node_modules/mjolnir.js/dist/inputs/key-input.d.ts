import type { MjolnirKeyEventRaw } from "../types.js";
import { Input, InputOptions } from "./input.js";
type KeyInputOptions = InputOptions & {
    tabIndex?: number;
};
export declare class KeyInput extends Input<MjolnirKeyEventRaw, Required<KeyInputOptions>> {
    enableDownEvent: boolean;
    enableUpEvent: boolean;
    constructor(element: HTMLElement, callback: (event: MjolnirKeyEventRaw) => void, options: KeyInputOptions);
    destroy(): void;
    /**
     * Enable this input (begin processing events)
     * if the specified event type is among those handled by this input.
     */
    enableEventType(eventType: string, enabled: boolean): void;
    handleEvent: (event: KeyboardEvent) => void;
}
export {};
//# sourceMappingURL=key-input.d.ts.map
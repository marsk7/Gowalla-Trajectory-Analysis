import type { MjolnirWheelEventRaw } from "../types.js";
import { Input, InputOptions } from "./input.js";
export declare class WheelInput extends Input<MjolnirWheelEventRaw, Required<InputOptions>> {
    constructor(element: HTMLElement, callback: (event: MjolnirWheelEventRaw) => void, options: InputOptions);
    destroy(): void;
    /**
     * Enable this input (begin processing events)
     * if the specified event type is among those handled by this input.
     */
    enableEventType(eventType: string, enabled: boolean): void;
    handleEvent: (event: WheelEvent) => void;
}
//# sourceMappingURL=wheel-input.d.ts.map
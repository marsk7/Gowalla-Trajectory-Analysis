import type { MjolnirPointerEventRaw } from "../types.js";
import { Input, InputOptions } from "./input.js";
type MoveEventType = 'pointermove' | 'pointerover' | 'pointerout' | 'pointerenter' | 'pointerleave';
/**
 * Hammer.js swallows 'move' events (for pointer/touch/mouse)
 * when the pointer is not down. This class sets up a handler
 * specifically for these events to work around this limitation.
 * Note that this could be extended to more intelligently handle
 * move events across input types, e.g. storing multiple simultaneous
 * pointer/touch events, calculating speed/direction, etc.
 */
export declare class MoveInput extends Input<MjolnirPointerEventRaw, Required<InputOptions>> {
    pressed: boolean;
    enableMoveEvent: boolean;
    enableEnterEvent: boolean;
    enableLeaveEvent: boolean;
    enableOutEvent: boolean;
    enableOverEvent: boolean;
    constructor(element: HTMLElement, callback: (event: MjolnirPointerEventRaw) => void, options: InputOptions);
    destroy(): void;
    /**
     * Enable this input (begin processing events)
     * if the specified event type is among those handled by this input.
     */
    enableEventType(eventType: string, enabled: boolean): void;
    handleEvent: (event: MouseEvent) => void;
    handleOverEvent(event: MouseEvent): void;
    handleOutEvent(event: MouseEvent): void;
    handleEnterEvent(event: MouseEvent): void;
    handleLeaveEvent(event: MouseEvent): void;
    handleMoveEvent(event: MouseEvent): void;
    _emit(type: MoveEventType, event: MouseEvent): void;
}
export {};
//# sourceMappingURL=move-input.d.ts.map
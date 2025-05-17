import type { Manager } from "../manager.js";
/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 */
export declare class TouchAction {
    manager: Manager;
    actions: string;
    constructor(manager: Manager, value: string);
    /**
     * set the touchAction value on the element or enable the polyfill
     */
    set(value: string): void;
    /**
     * just re-set the touchAction value
     */
    update(): void;
    /**
     * compute the value for the touchAction property based on the recognizer's settings
     */
    compute(): string;
}
//# sourceMappingURL=touchaction.d.ts.map
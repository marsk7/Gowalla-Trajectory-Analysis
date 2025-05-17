import { AttrRecognizer } from "./attribute.js";
import type { HammerInput } from "../input/types.js";
export type PinchRecognizerOptions = {
    /** Name of the event.
     * @default 'pinch'
     */
    event?: string;
    /** Enable this event.
     * @default true
     */
    enable?: boolean;
    /** Required number of pointers, with a minimum of 2.
     * @default 2
     */
    pointers?: number;
    /** Minimal scale before recognizing.
     * @default 0
     */
    threshold?: number;
};
/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 */
export declare class PinchRecognizer extends AttrRecognizer<Required<PinchRecognizerOptions>> {
    constructor(options?: PinchRecognizerOptions);
    getTouchAction(): string[];
    getEventNames(): string[];
    attrTest(input: HammerInput): boolean;
    emit(input: HammerInput): void;
}
//# sourceMappingURL=pinch.d.ts.map
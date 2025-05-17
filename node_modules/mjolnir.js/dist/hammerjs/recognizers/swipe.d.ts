import { AttrRecognizer } from "./attribute.js";
import { InputDirection } from "../input/input-consts.js";
import type { HammerInput } from "../input/types.js";
export type SwipeRecognizerOptions = {
    /** Name of the event.
     * @default 'swipe'
     */
    event?: string;
    /** Enable this event.
     * @default true
     */
    enable?: boolean;
    /** Required number of pointers.
     * @default 1
     */
    pointers?: number;
    /** Direction of the panning.
     * @default InputDirection.All
     */
    direction?: InputDirection;
    /** Minimal distance required before recognizing.
     * @default 10
     */
    threshold?: number;
    /** Minimal velocity required before recognizing, in px/ms
     * @default 0.3
     */
    velocity?: number;
};
/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 */
export declare class SwipeRecognizer extends AttrRecognizer<Required<SwipeRecognizerOptions>> {
    constructor(options?: SwipeRecognizerOptions);
    getTouchAction(): any;
    getEventNames(): string[];
    attrTest(input: HammerInput): boolean;
    emit(input: HammerInput): void;
}
//# sourceMappingURL=swipe.d.ts.map
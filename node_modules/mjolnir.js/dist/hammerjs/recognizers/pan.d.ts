import { AttrRecognizer } from "./attribute.js";
import { InputDirection } from "../input/input-consts.js";
import type { HammerInput } from "../input/types.js";
export type PanRecognizerOptions = {
    /** Name of the event.
     * @default 'pan'
     */
    event?: string;
    /** Enable this event.
     * @default true
     */
    enable?: boolean;
    /** Required number of pointers. 0 for all pointers.
     * @default 1
     */
    pointers?: number;
    /** Required direction of panning.
     * @default InputDirection.All
     */
    direction?: InputDirection;
    /** Minimal pan distance required before recognizing.
     * @default 10
     */
    threshold?: number;
};
/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 */
export declare class PanRecognizer extends AttrRecognizer<Required<PanRecognizerOptions>> {
    pX: number | null;
    pY: number | null;
    constructor(options?: PanRecognizerOptions);
    getTouchAction(): string[];
    getEventNames(): string[];
    directionTest(input: HammerInput): boolean;
    attrTest(input: HammerInput): boolean;
    emit(input: HammerInput): void;
}
//# sourceMappingURL=pan.d.ts.map
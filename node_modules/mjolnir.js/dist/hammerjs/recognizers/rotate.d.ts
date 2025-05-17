import { AttrRecognizer } from "./attribute.js";
import type { HammerInput } from "../input/types.js";
export type RotateRecognizerOptions = {
    /** Name of the event.
     * @default 'rotate'
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
    /** Minimal rotation before recognizing.
     * @default 0
     */
    threshold?: number;
};
/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 */
export declare class RotateRecognizer extends AttrRecognizer<Required<RotateRecognizerOptions>> {
    constructor(options?: RotateRecognizerOptions);
    getTouchAction(): string[];
    getEventNames(): string[];
    attrTest(input: HammerInput): boolean;
}
//# sourceMappingURL=rotate.d.ts.map
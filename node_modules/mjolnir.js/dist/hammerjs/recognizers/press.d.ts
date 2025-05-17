import { Recognizer } from "../recognizer/recognizer.js";
import { RecognizerState } from "../recognizer/recognizer-state.js";
import { HammerInput } from "../input/types.js";
export type PressRecognizerOptions = {
    /** Name of the event.
     * @default 'press'
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
    /** Minimal press time in ms.
     * @default 251
     */
    time?: number;
    /** Minimal movement that is allowed while pressing.
     * @default 9
     */
    threshold?: number;
};
/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 */
export declare class PressRecognizer extends Recognizer<Required<PressRecognizerOptions>> {
    private _timer;
    private _input;
    constructor(options?: PressRecognizerOptions);
    getTouchAction(): string[];
    getEventNames(): string[];
    process(input: HammerInput): RecognizerState.Ended | RecognizerState.Failed;
    reset(): void;
    emit(input?: HammerInput): void;
}
//# sourceMappingURL=press.d.ts.map
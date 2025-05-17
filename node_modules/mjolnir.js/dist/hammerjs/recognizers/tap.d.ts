import { Recognizer } from "../recognizer/recognizer.js";
import { RecognizerState } from "../recognizer/recognizer-state.js";
import type { HammerInput } from "../input/types.js";
export type TapRecognizerOptions = {
    /** Name of the event.
     * @default 'tap'
     */
    event?: string;
    /** Enable this event.
     * @default true
     */
    enable?: boolean;
    /** Required pointers.
     * @default 1
     */
    pointers?: number;
    /** Required number of taps in succession.
     * @default 1
     */
    taps?: number;
    /** Maximum time in ms between multiple taps.
     * @default 300
     */
    interval?: number;
    /** Maximum press time in ms.
     * @default 250
     */
    time?: number;
    /** While doing a tap some small movement is allowed.
     * @default 9
     */
    threshold?: number;
    /** The maximum position difference between multiple taps.
     * @default 10
     */
    posThreshold?: number;
};
/**
 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 */
export declare class TapRecognizer extends Recognizer<Required<TapRecognizerOptions>> {
    /** previous time for tap counting */
    private pTime;
    /** previous center for tap counting */
    private pCenter;
    private _timer;
    private _input;
    private count;
    constructor(options?: TapRecognizerOptions);
    getTouchAction(): string[];
    process(input: HammerInput): RecognizerState;
    failTimeout(): RecognizerState;
    reset(): void;
    emit(input: HammerInput): void;
}
//# sourceMappingURL=tap.d.ts.map
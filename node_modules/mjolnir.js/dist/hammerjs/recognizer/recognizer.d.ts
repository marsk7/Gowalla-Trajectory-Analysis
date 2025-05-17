import { RecognizerState } from "./recognizer-state.js";
import type { Manager } from "../manager.js";
import type { HammerInput } from "../input/types.js";
export type RecognizerOptions = {
    /** Name of the event */
    event: string;
    /** Enable this recognizer */
    enable: boolean;
};
/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 */
export declare abstract class Recognizer<OptionsT extends RecognizerOptions = any> {
    id: number;
    state: RecognizerState;
    manager: Manager;
    readonly options: OptionsT;
    protected simultaneous: {
        [id: string]: Recognizer;
    };
    protected requireFail: Recognizer[];
    constructor(options: OptionsT);
    /**
     * set options
     */
    set(options: Partial<OptionsT>): this;
    /**
     * recognize simultaneous with an other recognizer.
     */
    recognizeWith(recognizerOrName: Recognizer | string | (Recognizer | string)[]): this;
    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     */
    dropRecognizeWith(recognizerOrName: Recognizer | string | (Recognizer | string)[]): this;
    /**
     * recognizer can only run when an other is failing
     */
    requireFailure(recognizerOrName: Recognizer | string | (Recognizer | string)[]): this;
    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     */
    dropRequireFailure(recognizerOrName: Recognizer | string | (Recognizer | string)[]): this;
    /**
     * has require failures boolean
     */
    hasRequireFailures(): boolean;
    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     */
    canRecognizeWith(otherRecognizer: Recognizer): boolean;
    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     */
    protected emit(input?: HammerInput): void;
    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     */
    protected tryEmit(input?: HammerInput): void;
    /**
     * can we emit?
     */
    protected canEmit(): boolean;
    /**
     * update the recognizer
     */
    recognize(inputData: HammerInput): void;
    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     */
    abstract process(inputData: HammerInput): RecognizerState;
    /**
     * return the preferred touch-action
     */
    abstract getTouchAction(): string[];
    /**
     * return the event names that are emitted by this recognizer
     */
    getEventNames(): string[];
    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     */
    reset(): void;
}
//# sourceMappingURL=recognizer.d.ts.map
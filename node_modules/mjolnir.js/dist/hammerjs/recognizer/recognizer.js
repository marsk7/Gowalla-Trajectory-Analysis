import { RecognizerState } from "./recognizer-state.js";
import { uniqueId } from "../utils/unique-id.js";
import { stateStr } from "./state-str.js";
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
export class Recognizer {
    constructor(options) {
        this.options = options;
        this.id = uniqueId();
        this.state = RecognizerState.Possible;
        this.simultaneous = {};
        this.requireFail = [];
    }
    /**
     * set options
     */
    set(options) {
        Object.assign(this.options, options);
        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager.touchAction.update();
        return this;
    }
    /**
     * recognize simultaneous with an other recognizer.
     */
    recognizeWith(recognizerOrName) {
        if (Array.isArray(recognizerOrName)) {
            for (const item of recognizerOrName) {
                this.recognizeWith(item);
            }
            return this;
        }
        let otherRecognizer;
        if (typeof recognizerOrName === 'string') {
            otherRecognizer = this.manager.get(recognizerOrName);
            if (!otherRecognizer) {
                throw new Error(`Cannot find recognizer ${recognizerOrName}`);
            }
        }
        else {
            otherRecognizer = recognizerOrName;
        }
        const { simultaneous } = this;
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    }
    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     */
    dropRecognizeWith(recognizerOrName) {
        if (Array.isArray(recognizerOrName)) {
            for (const item of recognizerOrName) {
                this.dropRecognizeWith(item);
            }
            return this;
        }
        let otherRecognizer;
        if (typeof recognizerOrName === 'string') {
            otherRecognizer = this.manager.get(recognizerOrName);
        }
        else {
            otherRecognizer = recognizerOrName;
        }
        if (otherRecognizer) {
            delete this.simultaneous[otherRecognizer.id];
        }
        return this;
    }
    /**
     * recognizer can only run when an other is failing
     */
    requireFailure(recognizerOrName) {
        if (Array.isArray(recognizerOrName)) {
            for (const item of recognizerOrName) {
                this.requireFailure(item);
            }
            return this;
        }
        let otherRecognizer;
        if (typeof recognizerOrName === 'string') {
            otherRecognizer = this.manager.get(recognizerOrName);
            if (!otherRecognizer) {
                throw new Error(`Cannot find recognizer ${recognizerOrName}`);
            }
        }
        else {
            otherRecognizer = recognizerOrName;
        }
        const { requireFail } = this;
        if (requireFail.indexOf(otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    }
    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     */
    dropRequireFailure(recognizerOrName) {
        if (Array.isArray(recognizerOrName)) {
            for (const item of recognizerOrName) {
                this.dropRequireFailure(item);
            }
            return this;
        }
        let otherRecognizer;
        if (typeof recognizerOrName === 'string') {
            otherRecognizer = this.manager.get(recognizerOrName);
        }
        else {
            otherRecognizer = recognizerOrName;
        }
        if (otherRecognizer) {
            const index = this.requireFail.indexOf(otherRecognizer);
            if (index > -1) {
                this.requireFail.splice(index, 1);
            }
        }
        return this;
    }
    /**
     * has require failures boolean
     */
    hasRequireFailures() {
        return Boolean(this.requireFail.find((recognier) => recognier.options.enable));
    }
    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     */
    canRecognizeWith(otherRecognizer) {
        return Boolean(this.simultaneous[otherRecognizer.id]);
    }
    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     */
    emit(input) {
        // Some recognizers override emit() with their own logic
        if (!input)
            return;
        const { state } = this;
        // 'panstart' and 'panmove'
        if (state < RecognizerState.Ended) {
            this.manager.emit(this.options.event + stateStr(state), input);
        }
        // simple 'eventName' events
        this.manager.emit(this.options.event, input);
        // additional event(panleft, panright, pinchin, pinchout...)
        if (input.additionalEvent) {
            this.manager.emit(input.additionalEvent, input);
        }
        // panend and pancancel
        if (state >= RecognizerState.Ended) {
            this.manager.emit(this.options.event + stateStr(state), input);
        }
    }
    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     */
    tryEmit(input) {
        if (this.canEmit()) {
            this.emit(input);
        }
        else {
            // it's failing anyway
            this.state = RecognizerState.Failed;
        }
    }
    /**
     * can we emit?
     */
    canEmit() {
        let i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (RecognizerState.Failed | RecognizerState.Possible))) {
                return false;
            }
            i++;
        }
        return true;
    }
    /**
     * update the recognizer
     */
    recognize(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        const inputDataClone = { ...inputData };
        // is is enabled and allow recognizing?
        if (!this.options.enable) {
            this.reset();
            this.state = RecognizerState.Failed;
            return;
        }
        // reset when we've reached the end
        if (this.state &
            (RecognizerState.Recognized | RecognizerState.Cancelled | RecognizerState.Failed)) {
            this.state = RecognizerState.Possible;
        }
        this.state = this.process(inputDataClone);
        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state &
            (RecognizerState.Began |
                RecognizerState.Changed |
                RecognizerState.Ended |
                RecognizerState.Cancelled)) {
            this.tryEmit(inputDataClone);
        }
    }
    /**
     * return the event names that are emitted by this recognizer
     */
    getEventNames() {
        return [this.options.event];
    }
    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     */
    reset() { }
}
//# sourceMappingURL=recognizer.js.map
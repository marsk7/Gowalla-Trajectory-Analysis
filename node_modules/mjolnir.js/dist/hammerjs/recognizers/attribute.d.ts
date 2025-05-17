import { Recognizer, RecognizerOptions } from "../recognizer/recognizer.js";
import type { HammerInput } from "../input/types.js";
type AttrRecognizerOptions = RecognizerOptions & {
    pointers: number;
};
/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 */
export declare abstract class AttrRecognizer<OptionsT extends AttrRecognizerOptions> extends Recognizer<OptionsT> {
    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     */
    attrTest(input: HammerInput): boolean;
    /**
     * Process the input and return the state for the recognizer
     */
    process(input: HammerInput): number;
}
export {};
//# sourceMappingURL=attribute.d.ts.map
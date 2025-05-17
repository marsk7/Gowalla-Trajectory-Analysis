import { RecognizerState } from "./recognizer-state.js";
/**
 * get a usable string, used as event postfix
 */
export function stateStr(state) {
    if (state & RecognizerState.Cancelled) {
        return 'cancel';
    }
    else if (state & RecognizerState.Ended) {
        return 'end';
    }
    else if (state & RecognizerState.Changed) {
        return 'move';
    }
    else if (state & RecognizerState.Began) {
        return 'start';
    }
    return '';
}
//# sourceMappingURL=state-str.js.map
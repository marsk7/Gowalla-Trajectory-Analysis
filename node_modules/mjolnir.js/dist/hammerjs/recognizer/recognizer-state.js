export var RecognizerState;
(function (RecognizerState) {
    RecognizerState[RecognizerState["Possible"] = 1] = "Possible";
    RecognizerState[RecognizerState["Began"] = 2] = "Began";
    RecognizerState[RecognizerState["Changed"] = 4] = "Changed";
    RecognizerState[RecognizerState["Ended"] = 8] = "Ended";
    RecognizerState[RecognizerState["Recognized"] = 8] = "Recognized";
    RecognizerState[RecognizerState["Cancelled"] = 16] = "Cancelled";
    RecognizerState[RecognizerState["Failed"] = 32] = "Failed";
})(RecognizerState || (RecognizerState = {}));
//# sourceMappingURL=recognizer-state.js.map
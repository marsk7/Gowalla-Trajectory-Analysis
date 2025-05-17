export const MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
export const COMPUTE_INTERVAL = 25;
export var InputEvent;
(function (InputEvent) {
    InputEvent[InputEvent["Start"] = 1] = "Start";
    InputEvent[InputEvent["Move"] = 2] = "Move";
    InputEvent[InputEvent["End"] = 4] = "End";
    InputEvent[InputEvent["Cancel"] = 8] = "Cancel";
})(InputEvent || (InputEvent = {}));
export var InputDirection;
(function (InputDirection) {
    InputDirection[InputDirection["None"] = 0] = "None";
    InputDirection[InputDirection["Left"] = 1] = "Left";
    InputDirection[InputDirection["Right"] = 2] = "Right";
    InputDirection[InputDirection["Up"] = 4] = "Up";
    InputDirection[InputDirection["Down"] = 8] = "Down";
    InputDirection[InputDirection["Horizontal"] = 3] = "Horizontal";
    InputDirection[InputDirection["Vertical"] = 12] = "Vertical";
    InputDirection[InputDirection["All"] = 15] = "All";
})(InputDirection || (InputDirection = {}));
//# sourceMappingURL=input-consts.js.map
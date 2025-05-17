import { splitStr } from "./split-str.js";
/**
 * addEventListener with multiple events at once
 */
export function addEventListeners(target, types, handler) {
    if (!target) {
        return;
    }
    for (const type of splitStr(types)) {
        target.addEventListener(type, handler, false);
    }
}
/**
 * removeEventListener with multiple events at once
 */
export function removeEventListeners(target, types, handler) {
    if (!target) {
        return;
    }
    for (const type of splitStr(types)) {
        target.removeEventListener(type, handler, false);
    }
}
//# sourceMappingURL=event-listeners.js.map
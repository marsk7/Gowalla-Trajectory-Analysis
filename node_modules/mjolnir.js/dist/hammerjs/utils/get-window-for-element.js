/**
 * get the window object of an element
 */
export function getWindowForElement(element) {
    const doc = element.ownerDocument || element;
    return doc.defaultView;
}
//# sourceMappingURL=get-window-for-element.js.map
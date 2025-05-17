/**
 * find if a node is in the given parent
 */
export default function hasParent(node, parent) {
    let ancestor = node;
    while (ancestor) {
        if (ancestor === parent) {
            return true;
        }
        ancestor = ancestor.parentNode;
    }
    return false;
}
//# sourceMappingURL=has-parent.js.map
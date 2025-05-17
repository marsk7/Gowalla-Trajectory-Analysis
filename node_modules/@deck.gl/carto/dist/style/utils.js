// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { assert } from "../utils.js";
const ALLOWED_ATTR_TYPES = Object.freeze(['function', 'string']);
export function getAttrValue(attr, d, info) {
    assert(typeof d === 'object', 'Expected "data" to be an object');
    assert(ALLOWED_ATTR_TYPES.includes(typeof attr), 'Expected "attr" to be a function or string');
    // Is function
    if (typeof attr === 'function') {
        return attr(d, info);
    }
    return d?.properties?.[attr];
}
//# sourceMappingURL=utils.js.map
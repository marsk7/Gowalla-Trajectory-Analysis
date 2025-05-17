// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import getPalette, { DEFAULT_PALETTE, NULL_COLOR, OTHERS_COLOR } from "./palette.js";
import { assert } from "../utils.js";
import { getAttrValue } from "./utils.js";
/**
 * Helper function for quickly creating a color category style.
 *
 * Data values of each attribute listed in the domain are mapped one to one
 * with corresponding colors in the range.
 *
 * @return accessor that maps objects to `Color` values
 */
export default function colorCategories({ attr, domain, colors = DEFAULT_PALETTE, nullColor = NULL_COLOR, othersColor = OTHERS_COLOR }) {
    assert(Array.isArray(domain), 'Expected "domain" to be an array of numbers or strings');
    const colorsByCategory = {};
    const palette = typeof colors === 'string' ? getPalette(colors, domain.length) : colors;
    for (const [i, c] of domain.entries()) {
        colorsByCategory[c] = palette[i];
    }
    return (d, info) => {
        const value = getAttrValue(attr, d, info);
        return (typeof value === 'number' && Number.isFinite(value)) || typeof value === 'string'
            ? colorsByCategory[value] || othersColor
            : nullColor;
    };
}
//# sourceMappingURL=color-categories-style.js.map
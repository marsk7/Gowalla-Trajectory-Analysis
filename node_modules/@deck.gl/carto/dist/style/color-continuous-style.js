// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { scaleLinear } from 'd3-scale';
import getPalette, { DEFAULT_PALETTE, NULL_COLOR } from "./palette.js";
import { assert } from "../utils.js";
import { getAttrValue } from "./utils.js";
/**
 * Helper function for quickly creating a color continuous style.
 *
 * Data values of each field are interpolated linearly across values in the domain and
 * are then styled with a blend of the corresponding color in the range.
 *
 * @return accessor that maps objects to `Color` values
 */
export default function colorContinuous({ attr, domain, colors = DEFAULT_PALETTE, nullColor = NULL_COLOR }) {
    assert(Array.isArray(domain), 'Expected "domain" to be an array of numbers');
    const palette = typeof colors === 'string' ? getPalette(colors, domain.length) : colors;
    const color = scaleLinear().domain(domain).range(palette);
    return (d, info) => {
        const value = getAttrValue(attr, d, info);
        return typeof value === 'number' && Number.isFinite(value) ? color(value) : nullColor;
    };
}
//# sourceMappingURL=color-continuous-style.js.map
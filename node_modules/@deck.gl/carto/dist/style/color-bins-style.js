// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { scaleThreshold } from 'd3-scale';
import getPalette, { DEFAULT_PALETTE, NULL_COLOR } from "./palette.js";
import { assert } from "../utils.js";
import { getAttrValue } from "./utils.js";
/**
 * Helper function for quickly creating a color bins style based on `d3` `scaleThreshold`.
 *
 * Data values of each attribute are rounded down to the nearest value in the domain and are then
 * styled with the corresponding color.
 *
 * @return accessor that maps objects to `Color` values
 */
export default function colorBins({ attr, domain, colors = DEFAULT_PALETTE, nullColor = NULL_COLOR }) {
    assert(Array.isArray(domain), 'Expected "domain" to be an array of numbers');
    const palette = typeof colors === 'string' ? getPalette(colors, domain.length + 1) : colors;
    const color = scaleThreshold().domain(domain).range(palette);
    return (d, info) => {
        const value = getAttrValue(attr, d, info);
        return typeof value === 'number' && Number.isFinite(value) ? color(value) : nullColor;
    };
}
//# sourceMappingURL=color-bins-style.js.map
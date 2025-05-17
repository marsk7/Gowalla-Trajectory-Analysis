// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright vis.gl contributors
import { getS2CellFromQuadKey, getS2QuadkeyFromCellId } from "./s2-geometry.js";
import { getS2CellIdFromToken } from "../s2-token-functions.js";
/**
 * Return the S2Cell from the cell's hex token or the Hilbert quad key
 * @param tokenOrKey {string} A string that is the cell's hex token or the Hilbert quad key (containing /)
 * @returns {@link S2Cell}
 */
export function getS2Cell(tokenOrKey) {
    const key = getS2QuadKey(tokenOrKey);
    const s2cell = getS2CellFromQuadKey(key);
    return s2cell;
}
/**
 * Get the underlying Hilbert quad key
 * @param tokenOrKey {string} A string that is the cell's hex token or the Hilbert quad key (containing /)
 * @returns Hilbert quad key
 */
export function getS2QuadKey(tokenOrKey) {
    if (tokenOrKey.indexOf('/') > 0) {
        // is Hilbert quad key
        return tokenOrKey;
    }
    // is S2 cell's hex token
    const id = getS2CellIdFromToken(tokenOrKey);
    return getS2QuadkeyFromCellId(id);
}

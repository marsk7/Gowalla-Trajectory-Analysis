// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { isKTX, parseKTX } from "./parse-ktx.js";
import { isDDS, parseDDS } from "./parse-dds.js";
import { isPVR, parsePVR } from "./parse-pvr.js";
/**
 * Deduces format and parses compressed texture loaded in ArrayBuffer
 * @param data - binary data of compressed texture
 * @returns Array of the texture levels
 */
export function parseCompressedTexture(data) {
    if (isKTX(data)) {
        // TODO: remove @ts-ignore when `parseKTX` output is normalized to loaders.gl texture format
        // @ts-ignore
        return parseKTX(data);
    }
    if (isDDS(data)) {
        return parseDDS(data);
    }
    if (isPVR(data)) {
        return parsePVR(data);
    }
    throw new Error('Texture container format not recognized');
}

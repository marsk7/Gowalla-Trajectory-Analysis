// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/* global document */
import TinySDF from '@mapbox/tiny-sdf';
import { log } from '@deck.gl/core';
import { buildMapping } from "./utils.js";
import LRUCache from "./lru-cache.js";
// import type {Texture} from '@deck.gl/core';
function getDefaultCharacterSet() {
    const charSet = [];
    for (let i = 32; i < 128; i++) {
        charSet.push(String.fromCharCode(i));
    }
    return charSet;
}
export const DEFAULT_FONT_SETTINGS = {
    fontFamily: 'Monaco, monospace',
    fontWeight: 'normal',
    characterSet: getDefaultCharacterSet(),
    fontSize: 64,
    buffer: 4,
    sdf: false,
    cutoff: 0.25,
    radius: 12,
    smoothing: 0.1
};
const MAX_CANVAS_WIDTH = 1024;
const BASELINE_SCALE = 0.9;
const HEIGHT_SCALE = 1.2;
// only preserve latest three fontAtlas
const CACHE_LIMIT = 3;
let cache = new LRUCache(CACHE_LIMIT);
/**
 * get all the chars not in cache
 * @returns chars not in cache
 */
function getNewChars(cacheKey, characterSet) {
    let newCharSet;
    if (typeof characterSet === 'string') {
        newCharSet = new Set(Array.from(characterSet));
    }
    else {
        newCharSet = new Set(characterSet);
    }
    const cachedFontAtlas = cache.get(cacheKey);
    if (!cachedFontAtlas) {
        return newCharSet;
    }
    for (const char in cachedFontAtlas.mapping) {
        if (newCharSet.has(char)) {
            newCharSet.delete(char);
        }
    }
    return newCharSet;
}
function populateAlphaChannel(alphaChannel, imageData) {
    // populate distance value from tinySDF to image alpha channel
    for (let i = 0; i < alphaChannel.length; i++) {
        imageData.data[4 * i + 3] = alphaChannel[i];
    }
}
function setTextStyle(ctx, fontFamily, fontSize, fontWeight) {
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
}
/**
 * Sets the Font Atlas LRU Cache Limit
 * @param {number} limit LRU Cache limit
 */
export function setFontAtlasCacheLimit(limit) {
    log.assert(Number.isFinite(limit) && limit >= CACHE_LIMIT, 'Invalid cache limit');
    cache = new LRUCache(limit);
}
export default class FontAtlasManager {
    constructor() {
        /** Font settings */
        this.props = { ...DEFAULT_FONT_SETTINGS };
    }
    get atlas() {
        return this._atlas;
    }
    // TODO - cut during v9 porting as types reveal this is not correct
    // get texture(): Texture | undefined {
    //   return this._atlas;
    // }
    get mapping() {
        return this._atlas && this._atlas.mapping;
    }
    get scale() {
        const { fontSize, buffer } = this.props;
        return (fontSize * HEIGHT_SCALE + buffer * 2) / fontSize;
    }
    setProps(props = {}) {
        Object.assign(this.props, props);
        // update cache key
        this._key = this._getKey();
        const charSet = getNewChars(this._key, this.props.characterSet);
        const cachedFontAtlas = cache.get(this._key);
        // if a fontAtlas associated with the new settings is cached and
        // there are no new chars
        if (cachedFontAtlas && charSet.size === 0) {
            // update texture with cached fontAtlas
            if (this._atlas !== cachedFontAtlas) {
                this._atlas = cachedFontAtlas;
            }
            return;
        }
        // update fontAtlas with new settings
        const fontAtlas = this._generateFontAtlas(charSet, cachedFontAtlas);
        this._atlas = fontAtlas;
        // update cache
        cache.set(this._key, fontAtlas);
    }
    // eslint-disable-next-line max-statements
    _generateFontAtlas(characterSet, cachedFontAtlas) {
        const { fontFamily, fontWeight, fontSize, buffer, sdf, radius, cutoff } = this.props;
        let canvas = cachedFontAtlas && cachedFontAtlas.data;
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.width = MAX_CANVAS_WIDTH;
        }
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        setTextStyle(ctx, fontFamily, fontSize, fontWeight);
        // 1. build mapping
        const { mapping, canvasHeight, xOffset, yOffset } = buildMapping({
            getFontWidth: char => ctx.measureText(char).width,
            fontHeight: fontSize * HEIGHT_SCALE,
            buffer,
            characterSet,
            maxCanvasWidth: MAX_CANVAS_WIDTH,
            ...(cachedFontAtlas && {
                mapping: cachedFontAtlas.mapping,
                xOffset: cachedFontAtlas.xOffset,
                yOffset: cachedFontAtlas.yOffset
            })
        });
        // 2. update canvas
        // copy old canvas data to new canvas only when height changed
        if (canvas.height !== canvasHeight) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas.height = canvasHeight;
            ctx.putImageData(imageData, 0, 0);
        }
        setTextStyle(ctx, fontFamily, fontSize, fontWeight);
        // 3. layout characters
        if (sdf) {
            const tinySDF = new TinySDF({
                fontSize,
                buffer,
                radius,
                cutoff,
                fontFamily,
                fontWeight: `${fontWeight}`
            });
            for (const char of characterSet) {
                const { data, width, height, glyphTop } = tinySDF.draw(char);
                mapping[char].width = width;
                mapping[char].layoutOffsetY = fontSize * BASELINE_SCALE - glyphTop;
                const imageData = ctx.createImageData(width, height);
                populateAlphaChannel(data, imageData);
                ctx.putImageData(imageData, mapping[char].x, mapping[char].y);
            }
        }
        else {
            for (const char of characterSet) {
                ctx.fillText(char, mapping[char].x, mapping[char].y + buffer + fontSize * BASELINE_SCALE);
            }
        }
        return {
            xOffset,
            yOffset,
            mapping,
            data: canvas,
            width: canvas.width,
            height: canvas.height
        };
    }
    _getKey() {
        const { fontFamily, fontWeight, fontSize, buffer, sdf, radius, cutoff } = this.props;
        if (sdf) {
            return `${fontFamily} ${fontWeight} ${fontSize} ${buffer} ${radius} ${cutoff}`;
        }
        return `${fontFamily} ${fontWeight} ${fontSize} ${buffer}`;
    }
}
//# sourceMappingURL=font-atlas-manager.js.map
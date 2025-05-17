import type { Color } from '@deck.gl/core';
import type { Device, Texture } from '@luma.gl/core';
import type { NumericArray, TypedArray, TypedArrayConstructor } from '@math.gl/types';
import type { ScaleType } from "../types.js";
export declare const defaultColorRange: Color[];
export declare function colorRangeToFlatArray(colorRange: Color[] | NumericArray, normalize?: boolean, ArrayType?: TypedArrayConstructor): TypedArray;
export declare const COLOR_RANGE_FILTER: Record<ScaleType, 'linear' | 'nearest'>;
export declare function updateColorRangeTexture(texture: Texture, type: ScaleType): void;
export declare function createColorRangeTexture(device: Device, colorRange: Color[] | NumericArray, type?: ScaleType): Texture;
//# sourceMappingURL=color-utils.d.ts.map
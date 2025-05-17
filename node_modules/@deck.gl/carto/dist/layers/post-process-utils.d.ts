import { _ConstructorOf, CompositeLayer, Layer, LayersList } from '@deck.gl/core';
type Constructor<T> = (new (...args: any[]) => T) & {
    layerName: string;
};
type DrawableCompositeLayer = CompositeLayer & {
    renderLayers(): Layer<{}> | null | LayersList;
};
/**
 * Modifier that marks a layer for Render-to-Target rendering.
 * Resulting layer must be used as a sublayer of a layer created
 * with `PostProcessModifier`
 */
export declare function RTTModifier<T extends _ConstructorOf<Layer>>(BaseLayer: T): T;
/**
 * Modifier that returns the a modified Layer, which applies a
 * postprocess effect to all subLayers created using `RTTModifier`
 */
export declare function PostProcessModifier<T extends Constructor<DrawableCompositeLayer>>(BaseLayer: T, effect: any): T;
/**
 * Copy
 * Simple module that just copies input color to output
 */
export declare const copy: {
    readonly name: "copy";
    readonly fs: "vec4 copy_filterColor_ext(vec4 color, vec2 texSize, vec2 texCoord) {\n  return color;\n}\n";
    readonly getUniforms: () => {};
    readonly passes: [{
        readonly filter: true;
    }];
};
export {};
//# sourceMappingURL=post-process-utils.d.ts.map
import type { ShaderModule } from '@luma.gl/shadertools';
import { LayerExtension } from '@deck.gl/core';
import type { Layer } from '@deck.gl/core';
export type ClipExtensionProps = {
    /** Rectangular bounds to be used for clipping the rendered region, in `[left, bottom, right, top]`.
     * @default [0, 0, 1, 1]
     */
    clipBounds?: [number, number, number, number];
    /**
     * Controls whether an object is clipped by its anchor (e.g. icon, point) or by its geometry (e.g. path, polygon).
     * If not specified, it is automatically deduced from the layer.
     */
    clipByInstance?: boolean;
};
export type ClipModuleProps = {
    bounds: [number, number, number, number];
};
/** Adds support for clipping rendered layers by rectangular bounds. */
export default class ClipExtension extends LayerExtension {
    static defaultProps: {
        clipBounds: number[];
        clipByInstance: undefined;
    };
    static extensionName: string;
    getShaders(this: Layer<ClipExtensionProps>): {
        modules: ShaderModule<ClipModuleProps>[];
        inject: {
            'vs:#decl': string;
            'vs:DECKGL_FILTER_GL_POSITION': string;
            'fs:#decl': string;
            'fs:DECKGL_FILTER_COLOR': string;
        };
    };
    draw(this: Layer<Required<ClipExtensionProps>>): void;
}
//# sourceMappingURL=clip-extension.d.ts.map
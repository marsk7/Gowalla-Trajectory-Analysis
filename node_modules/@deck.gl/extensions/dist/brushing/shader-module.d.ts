import type { ShaderModule } from '@luma.gl/shadertools';
import type { Viewport } from '@deck.gl/core';
import type { BrushingExtensionProps } from "./brushing-extension.js";
export type BrushingModuleProps = {
    viewport: Viewport;
    mousePosition?: {
        x: number;
        y: number;
    };
} & BrushingExtensionProps;
type BrushingModuleUniforms = {
    enabled?: boolean;
    target?: number;
    mousePos?: [number, number];
    radius?: number;
};
declare const _default: ShaderModule<BrushingModuleProps, BrushingModuleUniforms, {}>;
export default _default;
//# sourceMappingURL=shader-module.d.ts.map
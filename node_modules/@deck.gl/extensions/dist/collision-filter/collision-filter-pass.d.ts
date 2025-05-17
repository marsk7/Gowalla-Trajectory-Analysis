import { Framebuffer, Parameters } from '@luma.gl/core';
import { Layer, _LayersPass as LayersPass, LayersPassRenderOptions, Viewport } from '@deck.gl/core';
type CollisionFilterPassRenderOptions = LayersPassRenderOptions & {};
export default class CollisionFilterPass extends LayersPass {
    renderCollisionMap(target: Framebuffer, options: CollisionFilterPassRenderOptions): void;
    protected getLayerParameters(layer: Layer, layerIndex: number, viewport: Viewport): Parameters;
    getShaderModuleProps(): {
        collision: {
            drawToCollisionMap: boolean;
        };
        picking: {
            isActive: number;
            isAttribute: boolean;
        };
        lighting: {
            enabled: boolean;
        };
    };
}
export {};
//# sourceMappingURL=collision-filter-pass.d.ts.map
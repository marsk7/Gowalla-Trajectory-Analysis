import { Device, Framebuffer, Parameters, Texture } from '@luma.gl/core';
import type Layer from "../lib/layer.js";
import type Viewport from "../viewports/viewport.js";
import LayersPass from "./layers-pass.js";
export default class ShadowPass extends LayersPass {
    fbo: Framebuffer;
    constructor(device: Device, props?: {
        id: any;
    });
    delete(): void;
    getShadowMap(): Texture;
    render(params: any): void;
    protected getLayerParameters(layer: Layer<{}>, layerIndex: number, viewport: Viewport): Parameters;
    shouldDrawLayer(layer: any): boolean;
    getShaderModuleProps(layer: Layer, effects: any, otherShaderModuleProps: Record<string, any>): {
        shadow: {
            project: any;
            drawToShadowMap: boolean;
        };
    };
}
//# sourceMappingURL=shadow-pass.d.ts.map
import type { Device, Framebuffer, Parameters, Texture } from '@luma.gl/core';
import { Layer, _LayersPass as LayersPass, LayersPassRenderOptions, Viewport } from '@deck.gl/core';
type MaskPassRenderOptions = LayersPassRenderOptions & {
    /** The channel to render into, 0:red, 1:green, 2:blue, 3:alpha */
    channel: 0 | 1 | 2 | 3;
};
export default class MaskPass extends LayersPass {
    maskMap: Texture;
    fbo: Framebuffer;
    constructor(device: Device, props: {
        id: string;
        mapSize?: number;
    });
    render(options: MaskPassRenderOptions): void;
    protected getLayerParameters(layer: Layer<{}>, layerIndex: number, viewport: Viewport): Parameters;
    shouldDrawLayer(layer: any): any;
    delete(): void;
}
export {};
//# sourceMappingURL=mask-pass.d.ts.map
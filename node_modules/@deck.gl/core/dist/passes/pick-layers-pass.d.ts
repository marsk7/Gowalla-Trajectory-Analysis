import LayersPass, { LayersPassRenderOptions, RenderStats, Rect } from "./layers-pass.js";
import type { Framebuffer, Parameters } from '@luma.gl/core';
import type { Effect } from "../lib/effect.js";
import type Viewport from "../viewports/viewport.js";
import type Layer from "../lib/layer.js";
type PickLayersPassRenderOptions = LayersPassRenderOptions & {
    pickingFBO: Framebuffer;
    deviceRect: Rect;
    pickZ: boolean;
};
type EncodedPickingColors = {
    a: number;
    layer: Layer;
    viewports: Viewport[];
};
export type PickingColorDecoder = (pickedColor: number[] | Uint8Array) => {
    pickedLayer: Layer;
    pickedViewports: Viewport[];
    pickedObjectIndex: number;
} | undefined;
export default class PickLayersPass extends LayersPass {
    private pickZ?;
    private _colorEncoderState;
    render(props: LayersPassRenderOptions | PickLayersPassRenderOptions): any;
    _drawPickingBuffer({ layers, layerFilter, views, viewports, onViewportActive, pickingFBO, deviceRect: { x, y, width, height }, cullRect, effects, pass, pickZ, shaderModuleProps }: PickLayersPassRenderOptions): {
        decodePickingColor: PickingColorDecoder | null;
        stats: RenderStats;
    };
    shouldDrawLayer(layer: Layer): boolean;
    protected getShaderModuleProps(layer: Layer, effects: Effect[] | undefined, otherShaderModuleProps: Record<string, any>): any;
    protected getLayerParameters(layer: Layer, layerIndex: number, viewport: Viewport): Parameters;
    protected _resetColorEncoder(pickZ: boolean): {
        byLayer: Map<Layer, EncodedPickingColors>;
        byAlpha: EncodedPickingColors[];
    } | null;
}
export {};
//# sourceMappingURL=pick-layers-pass.d.ts.map
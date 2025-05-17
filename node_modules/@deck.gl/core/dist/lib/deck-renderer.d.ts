import type { Device } from '@luma.gl/core';
import { Framebuffer } from '@luma.gl/core';
import DrawLayersPass from "../passes/draw-layers-pass.js";
import PickLayersPass from "../passes/pick-layers-pass.js";
import type Layer from "./layer.js";
import type Viewport from "../viewports/viewport.js";
import type View from "../views/view.js";
import type { Effect } from "./effect.js";
import type { FilterContext } from "../passes/layers-pass.js";
type LayerFilter = ((context: FilterContext) => boolean) | null;
export default class DeckRenderer {
    device: Device;
    layerFilter: LayerFilter;
    drawPickingColors: boolean;
    drawLayersPass: DrawLayersPass;
    pickLayersPass: PickLayersPass;
    private renderCount;
    private _needsRedraw;
    private renderBuffers;
    private lastPostProcessEffect;
    constructor(device: Device);
    setProps(props: {
        layerFilter: LayerFilter;
        drawPickingColors: boolean;
    }): void;
    renderLayers(opts: {
        pass: string;
        layers: Layer[];
        viewports: Viewport[];
        views: {
            [viewId: string]: View;
        };
        onViewportActive: (viewport: Viewport) => void;
        effects: Effect[];
        target?: Framebuffer | null;
        layerFilter?: LayerFilter;
        clearStack?: boolean;
        clearCanvas?: boolean;
    }): void;
    needsRedraw(opts?: {
        clearRedrawFlags: boolean;
    }): string | false;
    finalize(): void;
    private _preRender;
    private _resizeRenderBuffers;
    private _postRender;
}
export {};
//# sourceMappingURL=deck-renderer.d.ts.map
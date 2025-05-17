import type { Parameters } from '@luma.gl/core';
import type { Framebuffer } from '@luma.gl/core';
import Pass from "./pass.js";
import type Viewport from "../viewports/viewport.js";
import type View from "../views/view.js";
import type Layer from "../lib/layer.js";
import type { Effect } from "../lib/effect.js";
export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type LayersPassRenderOptions = {
    /** @deprecated TODO v9 recommend we rename this to framebuffer to minimize confusion */
    target?: Framebuffer | null;
    isPicking?: boolean;
    pass: string;
    layers: Layer[];
    viewports: Viewport[];
    onViewportActive?: (viewport: Viewport) => void;
    cullRect?: Rect;
    views?: Record<string, View>;
    effects?: Effect[];
    /** If true, recalculates render index (z) from 0. Set to false if a stack of layers are rendered in multiple passes. */
    clearStack?: boolean;
    clearCanvas?: boolean;
    clearColor?: number[];
    colorMask?: number;
    scissorRect?: number[];
    layerFilter?: ((context: FilterContext) => boolean) | null;
    shaderModuleProps?: any;
    /** Stores returned results from Effect.preRender, for use downstream in the render pipeline */
    preRenderStats?: Record<string, any>;
};
export type DrawLayerParameters = {
    shouldDrawLayer: boolean;
    layerRenderIndex: number;
    shaderModuleProps: any;
    layerParameters: Parameters;
};
export type FilterContext = {
    layer: Layer;
    viewport: Viewport;
    isPicking: boolean;
    renderPass: string;
    cullRect?: Rect;
};
export type RenderStats = {
    totalCount: number;
    visibleCount: number;
    compositeCount: number;
    pickableCount: number;
};
/** A Pass that renders all layers */
export default class LayersPass extends Pass {
    _lastRenderIndex: number;
    render(options: LayersPassRenderOptions): any;
    /** Draw a list of layers in a list of viewports */
    private _drawLayers;
    protected _getDrawLayerParams(viewport: Viewport, { layers, pass, isPicking, layerFilter, cullRect, effects, shaderModuleProps }: LayersPassRenderOptions, 
    /** Internal flag, true if only used to determine whether each layer should be drawn */
    evaluateShouldDrawOnly?: boolean): DrawLayerParameters[];
    private _drawLayersInViewport;
    shouldDrawLayer(layer: Layer): boolean;
    protected getShaderModuleProps(layer: Layer, effects: Effect[] | undefined, otherShaderModuleProps: Record<string, any>): any;
    protected getLayerParameters(layer: Layer, layerIndex: number, viewport: Viewport): Parameters;
    private _shouldDrawLayer;
    private _getShaderModuleProps;
}
export declare function layerIndexResolver(startIndex?: number, layerIndices?: Record<string, number>): (layer: Layer, isDrawn: boolean) => number;
//# sourceMappingURL=layers-pass.d.ts.map
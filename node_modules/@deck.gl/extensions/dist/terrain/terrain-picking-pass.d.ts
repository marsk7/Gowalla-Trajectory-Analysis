import { Layer, Viewport, LayersPassRenderOptions, _PickLayersPass as PickLayersPass } from '@deck.gl/core';
import type { TerrainCover } from "./terrain-cover.js";
import { Parameters } from '@luma.gl/core';
export type TerrainPickingPassRenderOptions = LayersPassRenderOptions & {
    pickZ: boolean;
};
/** Renders textures used by the TerrainEffect picking pass */
export declare class TerrainPickingPass extends PickLayersPass {
    /** Save layer index for use when drawing to terrain cover.
     * When a terrain cover's picking buffer is rendered,
     * we need to make sure each layer receives a consistent index (encoded in the alpha channel)
     * so that a picked color can be decoded back to the correct layer.
     * Updated in getRenderableLayers which is called in TerrainEffect.preRender
     */
    drawParameters: Record<string, any>;
    getRenderableLayers(viewport: Viewport, opts: TerrainPickingPassRenderOptions): Layer[];
    renderTerrainCover(terrainCover: TerrainCover, opts: Partial<TerrainPickingPassRenderOptions>): void;
    protected getLayerParameters(layer: Layer, layerIndex: number, viewport: Viewport): Parameters;
    getShaderModuleProps(layer: Layer, effects: any, otherShaderModuleProps: Record<string, any>): {
        terrain: {
            project: any;
        };
    };
}
//# sourceMappingURL=terrain-picking-pass.d.ts.map
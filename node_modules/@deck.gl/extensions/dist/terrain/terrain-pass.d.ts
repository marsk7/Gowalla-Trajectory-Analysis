import { Parameters } from '@luma.gl/core';
import { Layer, Viewport, _LayersPass as LayersPass, LayersPassRenderOptions } from '@deck.gl/core';
import type { HeightMapBuilder } from "./height-map-builder.js";
import type { TerrainCover } from "./terrain-cover.js";
export type TerrainPassRenderOptions = LayersPassRenderOptions;
/** Renders textures used by the TerrainEffect render pass */
export declare class TerrainPass extends LayersPass {
    getRenderableLayers(viewport: Viewport, opts: TerrainPassRenderOptions): Layer[];
    renderHeightMap(heightMap: HeightMapBuilder, opts: Partial<TerrainPassRenderOptions>): void;
    renderTerrainCover(terrainCover: TerrainCover, opts: Partial<TerrainPassRenderOptions>): void;
    protected getLayerParameters(layer: Layer<{}>, layerIndex: number, viewport: Viewport): Parameters;
    getShaderModuleProps(layer: Layer, effects: any, otherShaderModuleProps: Record<string, any>): {
        terrain: {
            project: any;
        };
    };
}
//# sourceMappingURL=terrain-pass.d.ts.map
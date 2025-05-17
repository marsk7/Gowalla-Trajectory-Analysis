import { TerrainModuleProps } from "./shader-module.js";
import type { Effect, EffectContext, PreRenderOptions, Layer } from '@deck.gl/core';
/** Class to manage terrain effect */
export declare class TerrainEffect implements Effect {
    id: string;
    props: null;
    useInPicking: boolean;
    /** true if picking in the current pass */
    private isPicking;
    /** true if should use in the current pass */
    private isDrapingEnabled;
    /** An empty texture as placeholder */
    private dummyHeightMap?;
    /** A texture encoding the ground elevation, updated once per redraw. Used by layers with offset mode */
    private heightMap?;
    private terrainPass;
    private terrainPickingPass;
    /** One texture for each primitive terrain layer, into which the draped layers render */
    private terrainCovers;
    setup({ device, deck }: EffectContext): void;
    preRender(opts: PreRenderOptions): void;
    getShaderModuleProps(layer: Layer, otherShaderModuleProps: Record<string, any>): {
        terrain: TerrainModuleProps;
    };
    cleanup({ deck }: EffectContext): void;
    private _updateHeightMap;
    private _updateTerrainCovers;
    private _updateTerrainCover;
    private _pruneTerrainCovers;
}
//# sourceMappingURL=terrain-effect.d.ts.map
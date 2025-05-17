import { Effect, EffectContext, PreRenderOptions, CoordinateSystem } from '@deck.gl/core';
import type { Texture } from '@luma.gl/core';
import { Bounds } from "../utils/projection-utils.js";
type Mask = {
    /** The channel index */
    index: 0 | 1 | 2 | 3;
    bounds: Bounds;
    coordinateOrigin: [number, number, number];
    coordinateSystem: CoordinateSystem;
};
export type MaskPreRenderStats = {
    didRender: boolean;
};
export default class MaskEffect implements Effect {
    id: string;
    props: null;
    useInPicking: boolean;
    order: number;
    private dummyMaskMap?;
    private channels;
    private masks;
    private maskPass?;
    private maskMap?;
    private lastViewport?;
    setup({ device }: EffectContext): void;
    preRender({ layers, layerFilter, viewports, onViewportActive, views, isPicking }: PreRenderOptions): MaskPreRenderStats;
    private _renderChannel;
    /**
     * Find a channel to render each mask into
     * If a maskId already exists, diff and update the existing channel
     * Otherwise replace a removed mask
     * Otherwise create a new channel
     * Returns a map from mask layer id to channel info
     */
    private _sortMaskChannels;
    getShaderModuleProps(): {
        mask: {
            maskMap: Texture;
            maskChannels: Record<string, Mask> | null;
        };
    };
    cleanup(): void;
}
export {};
//# sourceMappingURL=mask-effect.d.ts.map
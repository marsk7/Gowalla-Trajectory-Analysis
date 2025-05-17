import { Device } from '@luma.gl/core';
import type { Effect, EffectContext, Layer, PreRenderOptions } from '@deck.gl/core';
import type { CollisionModuleProps } from "./shader-module.js";
export default class CollisionFilterEffect implements Effect {
    id: string;
    props: null;
    useInPicking: boolean;
    order: number;
    private context?;
    private channels;
    private collisionFilterPass?;
    private collisionFBOs;
    private dummyCollisionMap?;
    private lastViewport?;
    setup(context: EffectContext): void;
    preRender({ effects: allEffects, layers, layerFilter, viewports, onViewportActive, views, isPicking, preRenderStats }: PreRenderOptions): void;
    private _render;
    /**
     * Group layers by collisionGroup
     * Returns a map from collisionGroup to render info
     */
    private _groupByCollisionGroup;
    getShaderModuleProps(layer: Layer): {
        collision: CollisionModuleProps;
    };
    cleanup(): void;
    createFBO(device: Device, collisionGroup: string): void;
    destroyFBO(collisionGroup: string): void;
}
//# sourceMappingURL=collision-filter-effect.d.ts.map
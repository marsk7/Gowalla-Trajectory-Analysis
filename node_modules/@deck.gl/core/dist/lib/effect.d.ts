import type Deck from "./deck.js";
import type Layer from "./layer.js";
import type { LayersPassRenderOptions } from "../passes/layers-pass.js";
import type { Device } from '@luma.gl/core';
import type { Framebuffer } from '@luma.gl/core';
export type PreRenderOptions = LayersPassRenderOptions;
export type PostRenderOptions = LayersPassRenderOptions & {
    inputBuffer: Framebuffer;
    swapBuffer: Framebuffer;
};
export type EffectContext = {
    deck: Deck<any>;
    device: Device;
};
export interface Effect {
    id: string;
    props: any;
    /** If true, this effect will also be used when rendering to the picking buffer */
    useInPicking?: boolean;
    /** Effects with smaller value gets executed first. If not provided, will get executed in the order added. */
    order?: number;
    /** Called before layers are rendered to screen */
    preRender(opts: PreRenderOptions): void;
    /** Called after layers are rendered to screen */
    postRender?(opts: PostRenderOptions): Framebuffer | null;
    /** Module settings passed to models */
    getShaderModuleProps?(layer: Layer, otherShaderModuleProps: Record<string, any>): any;
    /** Called when this effect is added */
    setup(context: EffectContext): void;
    /** Called when the effect's props are updated. */
    setProps?(props: any): void;
    /** Called when this effect is removed */
    cleanup(context: EffectContext): void;
}
//# sourceMappingURL=effect.d.ts.map
import type { Framebuffer } from '@luma.gl/core';
import { ShaderPass } from '@luma.gl/shadertools';
import ScreenPass from "../passes/screen-pass.js";
import type { Effect, EffectContext, PostRenderOptions } from "../lib/effect.js";
export default class PostProcessEffect<ShaderPassT extends ShaderPass> implements Effect {
    id: string;
    props: ShaderPassT['props'];
    module: ShaderPassT;
    passes?: ScreenPass[];
    constructor(module: ShaderPassT, props: ShaderPassT['props']);
    setup({ device }: EffectContext): void;
    setProps(props: ShaderPassT['props']): void;
    preRender(): void;
    postRender(params: PostRenderOptions): Framebuffer;
    cleanup(): void;
}
//# sourceMappingURL=post-process-effect.d.ts.map
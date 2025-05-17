import type { Device, Framebuffer } from '@luma.gl/core';
import { ClipSpace } from '@luma.gl/engine';
import type { ShaderModule } from '@luma.gl/shadertools';
import Pass from "./pass.js";
type ScreenPassProps = {
    module: ShaderModule;
    fs: string;
    id: string;
};
type ScreenPassRenderOptions = {
    clearCanvas?: boolean;
    inputBuffer: Framebuffer;
    outputBuffer: Framebuffer | null;
    moduleProps: ShaderModule['props'];
};
/** A base render pass. */
export default class ScreenPass extends Pass {
    model: ClipSpace;
    constructor(device: Device, props: ScreenPassProps);
    render(params: ScreenPassRenderOptions): void;
    delete(): void;
    /**
     * Renders the pass.
     * This is an abstract method that should be overridden.
     * @param inputBuffer - Frame buffer that contains the result of the previous pass
     * @param outputBuffer - Frame buffer that serves as the output render target
     */
    protected _renderPass(device: Device, options: ScreenPassRenderOptions): void;
}
export {};
//# sourceMappingURL=screen-pass.d.ts.map
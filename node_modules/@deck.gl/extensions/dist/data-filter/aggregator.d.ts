import { Device, Framebuffer, RenderPipelineParameters } from '@luma.gl/core';
import { Model, ModelProps } from '@luma.gl/engine';
export declare function supportsFloatTarget(device: Device): boolean;
export declare function getFramebuffer(device: Device, useFloatTarget: boolean): Framebuffer;
export declare function getModel(device: Device, bufferLayout: ModelProps['bufferLayout'], shaderOptions: any, useFloatTarget: boolean): Model;
export declare const parameters: RenderPipelineParameters;
//# sourceMappingURL=aggregator.d.ts.map
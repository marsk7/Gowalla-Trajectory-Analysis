import { Framebuffer, Texture } from '@luma.gl/core';
import type { ShaderModule } from '@luma.gl/shadertools';
export type CollisionModuleProps = {
    enabled: boolean;
    collisionFBO?: Framebuffer;
    drawToCollisionMap?: boolean;
    dummyCollisionMap?: Texture;
};
declare const _default: ShaderModule<CollisionModuleProps>;
export default _default;
//# sourceMappingURL=shader-module.d.ts.map
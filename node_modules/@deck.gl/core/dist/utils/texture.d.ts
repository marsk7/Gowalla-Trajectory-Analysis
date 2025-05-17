import { Device, Texture, SamplerProps } from '@luma.gl/core';
/**
 *
 * @param owner
 * @param device
 * @param image could be one of:
 *   - Texture
 *   - Browser object: Image, ImageData, ImageData, HTMLCanvasElement, HTMLVideoElement, ImageBitmap
 *   - Plain object: {width: <number>, height: <number>, data: <Uint8Array>}
 * @param parameters
 * @returns
 */
export declare function createTexture(owner: string, device: Device, image: any, sampler: SamplerProps): Texture | null;
export declare function destroyTexture(owner: string, texture: Texture): void;
//# sourceMappingURL=texture.d.ts.map
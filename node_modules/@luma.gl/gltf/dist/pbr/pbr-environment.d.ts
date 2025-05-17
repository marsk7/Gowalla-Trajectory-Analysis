import { Device } from '@luma.gl/core';
import { AsyncTexture } from '@luma.gl/engine';
/** Environment textures for PBR module */
export type PBREnvironment = {
    /** Bi-directional Reflectance Distribution Function (BRDF) lookup table */
    brdfLutTexture: AsyncTexture;
    diffuseEnvSampler: AsyncTexture;
    specularEnvSampler: AsyncTexture;
};
export type PBREnvironmentProps = {
    brdfLutUrl: string;
    getTexUrl: (name: string, dir: number, level: number) => string;
    specularMipLevels?: number;
};
/** Loads textures for PBR environment */
export declare function loadPBREnvironment(device: Device, props: PBREnvironmentProps): PBREnvironment;
//# sourceMappingURL=pbr-environment.d.ts.map
import { Texture } from '@luma.gl/core';
export type WeightProps = {
    commonBounds: [number, number, number, number];
    radiusPixels: number;
    textureWidth: number;
    weightsScale: number;
    weightsTexture: Texture;
};
export declare const weightUniforms: {
    readonly name: "weight";
    readonly vs: "uniform weightUniforms {\n  vec4 commonBounds;\n  float radiusPixels;\n  float textureWidth;\n  float weightsScale;\n} weight;\n";
    readonly uniformTypes: {
        readonly commonBounds: "vec4<f32>";
        readonly radiusPixels: "f32";
        readonly textureWidth: "f32";
        readonly weightsScale: "f32";
    };
};
export type MaxWeightProps = {
    inTexture: Texture;
    textureSize: number;
};
export declare const maxWeightUniforms: {
    readonly name: "maxWeight";
    readonly vs: "uniform maxWeightUniforms {\n  float textureSize;\n} maxWeight;\n";
    readonly uniformTypes: {
        readonly textureSize: "f32";
    };
};
//# sourceMappingURL=heatmap-layer-uniforms.d.ts.map
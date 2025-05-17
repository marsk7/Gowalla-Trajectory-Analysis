import { Texture } from '@luma.gl/core';
export type TriangleProps = {
    aggregationMode: number;
    colorDomain: [number, number];
    intensity: number;
    threshold: number;
    colorTexture: Texture;
    maxTexture: Texture;
    weightsTexture: Texture;
};
export declare const triangleUniforms: {
    readonly name: "triangle";
    readonly vs: "uniform triangleUniforms {\n  float aggregationMode;\n  vec2 colorDomain;\n  float intensity;\n  float threshold;\n} triangle;\n";
    readonly fs: "uniform triangleUniforms {\n  float aggregationMode;\n  vec2 colorDomain;\n  float intensity;\n  float threshold;\n} triangle;\n";
    readonly uniformTypes: {
        readonly aggregationMode: "f32";
        readonly colorDomain: "vec2<f32>";
        readonly intensity: "f32";
        readonly threshold: "f32";
    };
};
//# sourceMappingURL=triangle-layer-uniforms.d.ts.map
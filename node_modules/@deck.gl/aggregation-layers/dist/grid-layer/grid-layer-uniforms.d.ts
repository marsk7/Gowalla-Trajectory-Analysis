import { Texture } from '@luma.gl/core';
export type GridProps = {
    colorDomain: [number, number, number, number];
    colorRange: Texture;
    elevationDomain: [number, number, number, number];
    elevationRange: [number, number];
    originCommon: [number, number];
    sizeCommon: [number, number];
};
export declare const gridUniforms: {
    readonly name: "grid";
    readonly vs: "uniform gridUniforms {\n  vec4 colorDomain;\n  vec4 elevationDomain;\n  vec2 elevationRange;\n  vec2 originCommon;\n  vec2 sizeCommon;\n} grid;\n";
    readonly uniformTypes: {
        readonly colorDomain: "vec4<f32>";
        readonly elevationDomain: "vec4<f32>";
        readonly elevationRange: "vec2<f32>";
        readonly originCommon: "vec2<f32>";
        readonly sizeCommon: "vec2<f32>";
    };
};
//# sourceMappingURL=grid-layer-uniforms.d.ts.map
import { Texture } from '@luma.gl/core';
export type HexagonProps = {
    colorDomain: [number, number, number, number];
    colorRange: Texture;
    elevationDomain: [number, number, number, number];
    elevationRange: [number, number];
    originCommon: [number, number];
};
export declare const hexagonUniforms: {
    readonly name: "hexagon";
    readonly vs: "uniform hexagonUniforms {\n  vec4 colorDomain;\n  vec4 elevationDomain;\n  vec2 elevationRange;\n  vec2 originCommon;\n} hexagon;\n";
    readonly uniformTypes: {
        readonly colorDomain: "vec4<f32>";
        readonly elevationDomain: "vec4<f32>";
        readonly elevationRange: "vec2<f32>";
        readonly originCommon: "vec2<f32>";
    };
};
//# sourceMappingURL=hexagon-layer-uniforms.d.ts.map
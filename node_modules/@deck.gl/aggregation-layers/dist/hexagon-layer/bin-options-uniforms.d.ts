import { NumberArray2 } from '@math.gl/core';
export type BinOptions = {
    hexOriginCommon: NumberArray2;
    radiusCommon: number;
};
export declare const binOptionsUniforms: {
    readonly name: "binOptions";
    readonly vs: "uniform binOptionsUniforms {\n  vec2 hexOriginCommon;\n  float radiusCommon;\n} binOptions;\n";
    readonly uniformTypes: {
        readonly hexOriginCommon: "vec2<f32>";
        readonly radiusCommon: "f32";
    };
};
//# sourceMappingURL=bin-options-uniforms.d.ts.map
import { NumberArray3, NumberArray4 } from '@math.gl/core';
import { Texture } from '@luma.gl/core';
export type AggregatorTransformProps = {
    binIdRange: NumberArray4;
    isCount: NumberArray3;
    isMean: NumberArray3;
    bins: Texture;
};
export declare const aggregatorTransformUniforms: {
    readonly name: "aggregatorTransform";
    readonly vs: "uniform aggregatorTransformUniforms {\n  ivec4 binIdRange;\n  bvec3 isCount;\n  bvec3 isMean;\n  float naN;\n} aggregatorTransform;\n";
    readonly uniformTypes: {
        readonly binIdRange: "vec4<i32>";
        readonly isCount: "vec3<f32>";
        readonly isMean: "vec3<f32>";
    };
};
//# sourceMappingURL=aggregation-transform-uniforms.d.ts.map
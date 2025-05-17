export type SdfProps = {
    gamma: number;
    enabled: boolean;
    buffer: number;
    outlineBuffer: number;
    outlineColor: [number, number, number, number];
};
export declare const sdfUniforms: {
    readonly name: "sdf";
    readonly vs: "uniform sdfUniforms {\n  float gamma;\n  bool enabled;\n  float buffer;\n  float outlineBuffer;\n  vec4 outlineColor;\n} sdf;\n";
    readonly fs: "uniform sdfUniforms {\n  float gamma;\n  bool enabled;\n  float buffer;\n  float outlineBuffer;\n  vec4 outlineColor;\n} sdf;\n";
    readonly uniformTypes: {
        readonly gamma: "f32";
        readonly enabled: "f32";
        readonly buffer: "f32";
        readonly outlineBuffer: "f32";
        readonly outlineColor: "vec4<f32>";
    };
};
//# sourceMappingURL=sdf-uniforms.d.ts.map
export type BinOptions = {
    cellOriginCommon: [number, number];
    cellSizeCommon: [number, number];
};
export declare const binOptionsUniforms: {
    readonly name: "binOptions";
    readonly vs: "uniform binOptionsUniforms {\n  vec2 cellOriginCommon;\n  vec2 cellSizeCommon;\n} binOptions;\n";
    readonly uniformTypes: {
        readonly cellOriginCommon: "vec2<f32>";
        readonly cellSizeCommon: "vec2<f32>";
    };
};
//# sourceMappingURL=bin-options-uniforms.d.ts.map
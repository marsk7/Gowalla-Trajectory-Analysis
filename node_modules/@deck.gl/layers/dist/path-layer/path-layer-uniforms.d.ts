export type PathProps = {
    widthScale: number;
    widthMinPixels: number;
    widthMaxPixels: number;
    jointType: number;
    capType: number;
    miterLimit: number;
    billboard: boolean;
    widthUnits: number;
};
export declare const pathUniforms: {
    readonly name: "path";
    readonly vs: "uniform pathUniforms {\n  float widthScale;\n  float widthMinPixels;\n  float widthMaxPixels;\n  float jointType;\n  float capType;\n  float miterLimit;\n  bool billboard;\n  highp int widthUnits;\n} path;\n";
    readonly fs: "uniform pathUniforms {\n  float widthScale;\n  float widthMinPixels;\n  float widthMaxPixels;\n  float jointType;\n  float capType;\n  float miterLimit;\n  bool billboard;\n  highp int widthUnits;\n} path;\n";
    readonly uniformTypes: {
        readonly widthScale: "f32";
        readonly widthMinPixels: "f32";
        readonly widthMaxPixels: "f32";
        readonly jointType: "f32";
        readonly capType: "f32";
        readonly miterLimit: "f32";
        readonly billboard: "f32";
        readonly widthUnits: "i32";
    };
};
//# sourceMappingURL=path-layer-uniforms.d.ts.map
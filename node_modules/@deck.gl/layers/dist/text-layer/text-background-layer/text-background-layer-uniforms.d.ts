export type TextBackgroundProps = {
    billboard: boolean;
    sizeScale: number;
    sizeMinPixels: number;
    sizeMaxPixels: number;
    borderRadius: [number, number, number, number];
    padding: [number, number, number, number];
    sizeUnits: number;
    stroked: boolean;
};
export declare const textBackgroundUniforms: {
    readonly name: "textBackground";
    readonly vs: "uniform textBackgroundUniforms {\n  bool billboard;\n  float sizeScale;\n  float sizeMinPixels;\n  float sizeMaxPixels;\n  vec4 borderRadius;\n  vec4 padding;\n  highp int sizeUnits;\n  bool stroked;\n} textBackground;\n";
    readonly fs: "uniform textBackgroundUniforms {\n  bool billboard;\n  float sizeScale;\n  float sizeMinPixels;\n  float sizeMaxPixels;\n  vec4 borderRadius;\n  vec4 padding;\n  highp int sizeUnits;\n  bool stroked;\n} textBackground;\n";
    readonly uniformTypes: {
        readonly billboard: "f32";
        readonly sizeScale: "f32";
        readonly sizeMinPixels: "f32";
        readonly sizeMaxPixels: "f32";
        readonly borderRadius: "vec4<f32>";
        readonly padding: "vec4<f32>";
        readonly sizeUnits: "i32";
        readonly stroked: "f32";
    };
};
//# sourceMappingURL=text-background-layer-uniforms.d.ts.map
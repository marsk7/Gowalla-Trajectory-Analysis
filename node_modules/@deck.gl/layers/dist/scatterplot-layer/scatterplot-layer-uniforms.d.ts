export type ScatterplotProps = {
    radiusScale: number;
    radiusMinPixels: number;
    radiusMaxPixels: number;
    lineWidthScale: number;
    lineWidthMinPixels: number;
    lineWidthMaxPixels: number;
    stroked: boolean;
    filled: boolean;
    antialiasing: boolean;
    billboard: boolean;
    radiusUnits: number;
    lineWidthUnits: number;
};
export declare const scatterplotUniforms: {
    readonly name: "scatterplot";
    readonly vs: "uniform scatterplotUniforms {\n  float radiusScale;\n  float radiusMinPixels;\n  float radiusMaxPixels;\n  float lineWidthScale;\n  float lineWidthMinPixels;\n  float lineWidthMaxPixels;\n  float stroked;\n  float filled;\n  bool antialiasing;\n  bool billboard;\n  highp int radiusUnits;\n  highp int lineWidthUnits;\n} scatterplot;\n";
    readonly fs: "uniform scatterplotUniforms {\n  float radiusScale;\n  float radiusMinPixels;\n  float radiusMaxPixels;\n  float lineWidthScale;\n  float lineWidthMinPixels;\n  float lineWidthMaxPixels;\n  float stroked;\n  float filled;\n  bool antialiasing;\n  bool billboard;\n  highp int radiusUnits;\n  highp int lineWidthUnits;\n} scatterplot;\n";
    readonly source: "";
    readonly uniformTypes: {
        readonly radiusScale: "f32";
        readonly radiusMinPixels: "f32";
        readonly radiusMaxPixels: "f32";
        readonly lineWidthScale: "f32";
        readonly lineWidthMinPixels: "f32";
        readonly lineWidthMaxPixels: "f32";
        readonly stroked: "f32";
        readonly filled: "f32";
        readonly antialiasing: "f32";
        readonly billboard: "f32";
        readonly radiusUnits: "i32";
        readonly lineWidthUnits: "i32";
    };
};
//# sourceMappingURL=scatterplot-layer-uniforms.d.ts.map
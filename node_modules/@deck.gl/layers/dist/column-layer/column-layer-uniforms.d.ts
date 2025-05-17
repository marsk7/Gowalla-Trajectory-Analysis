export type ColumnProps = {
    radius: number;
    angle: number;
    offset: [number, number];
    extruded: boolean;
    stroked: boolean;
    isStroke: boolean;
    coverage: number;
    elevationScale: number;
    edgeDistance: number;
    widthScale: number;
    widthMinPixels: number;
    widthMaxPixels: number;
    radiusUnits: number;
    widthUnits: number;
};
export declare const columnUniforms: {
    readonly name: "column";
    readonly vs: "uniform columnUniforms {\n  float radius;\n  float angle;\n  vec2 offset;\n  bool extruded;\n  bool stroked;\n  bool isStroke;\n  float coverage;\n  float elevationScale;\n  float edgeDistance;\n  float widthScale;\n  float widthMinPixels;\n  float widthMaxPixels;\n  highp int radiusUnits;\n  highp int widthUnits;\n} column;\n";
    readonly fs: "uniform columnUniforms {\n  float radius;\n  float angle;\n  vec2 offset;\n  bool extruded;\n  bool stroked;\n  bool isStroke;\n  float coverage;\n  float elevationScale;\n  float edgeDistance;\n  float widthScale;\n  float widthMinPixels;\n  float widthMaxPixels;\n  highp int radiusUnits;\n  highp int widthUnits;\n} column;\n";
    readonly uniformTypes: {
        readonly radius: "f32";
        readonly angle: "f32";
        readonly offset: "vec2<f32>";
        readonly extruded: "f32";
        readonly stroked: "f32";
        readonly isStroke: "f32";
        readonly coverage: "f32";
        readonly elevationScale: "f32";
        readonly edgeDistance: "f32";
        readonly widthScale: "f32";
        readonly widthMinPixels: "f32";
        readonly widthMaxPixels: "f32";
        readonly radiusUnits: "i32";
        readonly widthUnits: "i32";
    };
};
//# sourceMappingURL=column-layer-uniforms.d.ts.map
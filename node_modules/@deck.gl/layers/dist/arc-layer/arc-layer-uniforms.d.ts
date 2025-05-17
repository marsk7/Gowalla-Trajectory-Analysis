export type ArcProps = {
    greatCircle: boolean;
    useShortestPath: boolean;
    numSegments: number;
    widthScale: number;
    widthMinPixels: number;
    widthMaxPixels: number;
    widthUnits: number;
};
export declare const arcUniforms: {
    readonly name: "arc";
    readonly vs: "uniform arcUniforms {\n  bool greatCircle;\n  bool useShortestPath;\n  float numSegments;\n  float widthScale;\n  float widthMinPixels;\n  float widthMaxPixels;\n  highp int widthUnits;\n} arc;\n";
    readonly fs: "uniform arcUniforms {\n  bool greatCircle;\n  bool useShortestPath;\n  float numSegments;\n  float widthScale;\n  float widthMinPixels;\n  float widthMaxPixels;\n  highp int widthUnits;\n} arc;\n";
    readonly uniformTypes: {
        readonly greatCircle: "f32";
        readonly useShortestPath: "f32";
        readonly numSegments: "f32";
        readonly widthScale: "f32";
        readonly widthMinPixels: "f32";
        readonly widthMaxPixels: "f32";
        readonly widthUnits: "i32";
    };
};
//# sourceMappingURL=arc-layer-uniforms.d.ts.map
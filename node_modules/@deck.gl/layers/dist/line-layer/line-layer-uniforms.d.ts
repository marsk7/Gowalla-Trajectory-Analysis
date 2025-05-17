export type LineProps = {
    widthScale: number;
    widthMinPixels: number;
    widthMaxPixels: number;
    useShortestPath: number;
    widthUnits: number;
};
export declare const lineUniforms: {
    readonly name: "line";
    readonly source: "struct LineUniforms {\n  widthScale: f32,\n  widthMinPixels: f32,\n  widthMaxPixels: f32,\n  useShortestPath: f32,\n  widthUnits: i32,\n};\n\n@group(0) @binding(1)\nvar<uniform> line: LineUniforms;\n";
    readonly vs: "uniform lineUniforms {\n  float widthScale;\n  float widthMinPixels;\n  float widthMaxPixels;\n  float useShortestPath;\n  highp int widthUnits;\n} line;\n";
    readonly fs: "uniform lineUniforms {\n  float widthScale;\n  float widthMinPixels;\n  float widthMaxPixels;\n  float useShortestPath;\n  highp int widthUnits;\n} line;\n";
    readonly uniformTypes: {
        readonly widthScale: "f32";
        readonly widthMinPixels: "f32";
        readonly widthMaxPixels: "f32";
        readonly useShortestPath: "f32";
        readonly widthUnits: "i32";
    };
};
//# sourceMappingURL=line-layer-uniforms.d.ts.map
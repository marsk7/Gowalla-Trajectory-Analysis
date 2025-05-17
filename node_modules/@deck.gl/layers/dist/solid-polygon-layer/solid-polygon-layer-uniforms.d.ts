export type SolidPolygonProps = {
    extruded: boolean;
    isWireframe: boolean;
    elevationScale: number;
};
export declare const solidPolygonUniforms: {
    readonly name: "solidPolygon";
    readonly vs: "uniform solidPolygonUniforms {\n  bool extruded;\n  bool isWireframe;\n  float elevationScale;\n} solidPolygon;\n";
    readonly fs: "uniform solidPolygonUniforms {\n  bool extruded;\n  bool isWireframe;\n  float elevationScale;\n} solidPolygon;\n";
    readonly uniformTypes: {
        readonly extruded: "f32";
        readonly isWireframe: "f32";
        readonly elevationScale: "f32";
    };
};
//# sourceMappingURL=solid-polygon-layer-uniforms.d.ts.map
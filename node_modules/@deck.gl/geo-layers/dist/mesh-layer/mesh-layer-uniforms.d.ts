export type MeshProps = {
    pickFeatureIds: boolean;
};
export declare const meshUniforms: {
    readonly name: "mesh";
    readonly vs: "uniform meshUniforms {\n  bool pickFeatureIds;\n} mesh;\n";
    readonly fs: "uniform meshUniforms {\n  bool pickFeatureIds;\n} mesh;\n";
    readonly uniformTypes: {
        readonly pickFeatureIds: "f32";
    };
};
//# sourceMappingURL=mesh-layer-uniforms.d.ts.map
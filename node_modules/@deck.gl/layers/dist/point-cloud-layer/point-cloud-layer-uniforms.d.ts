export type PointCloudProps = {
    radiusPixels: number;
    sizeUnits: number;
};
export declare const pointCloudUniforms: {
    readonly name: "pointCloud";
    readonly vs: "uniform pointCloudUniforms {\n  float radiusPixels;\n  highp int sizeUnits;\n} pointCloud;\n";
    readonly fs: "uniform pointCloudUniforms {\n  float radiusPixels;\n  highp int sizeUnits;\n} pointCloud;\n";
    readonly uniformTypes: {
        readonly radiusPixels: "f32";
        readonly sizeUnits: "i32";
    };
};
//# sourceMappingURL=point-cloud-layer-uniforms.d.ts.map
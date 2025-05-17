export type TripsProps = {
    fadeTrail: boolean;
    trailLength: number;
    currentTime: number;
};
export declare const tripsUniforms: {
    readonly name: "trips";
    readonly vs: "uniform tripsUniforms {\n  bool fadeTrail;\n  float trailLength;\n  float currentTime;\n} trips;\n";
    readonly fs: "uniform tripsUniforms {\n  bool fadeTrail;\n  float trailLength;\n  float currentTime;\n} trips;\n";
    readonly uniformTypes: {
        readonly fadeTrail: "f32";
        readonly trailLength: "f32";
        readonly currentTime: "f32";
    };
};
//# sourceMappingURL=trips-layer-uniforms.d.ts.map
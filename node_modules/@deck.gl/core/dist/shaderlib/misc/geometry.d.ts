declare const _default: {
    readonly name: "geometry";
    readonly source: "const SMOOTH_EDGE_RADIUS: f32 = 0.5;\n\nstruct VertexGeometry {\n  position: vec4<f32>,\n  worldPosition: vec3<f32>,\n  worldPositionAlt: vec3<f32>,\n  normal: vec3<f32>,\n  uv: vec2<f32>,\n  pickingColor: vec3<f32>,\n};\n\nvar<private> geometry_: VertexGeometry = VertexGeometry(\n  vec4<f32>(0.0, 0.0, 1.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec2<f32>(0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0)\n);\n\nstruct FragmentGeometry {\n  uv: vec2<f32>,\n};\n\nvar<private> fragmentGeometry: FragmentGeometry;\n\nfn smoothedge(edge: f32, x: f32) -> f32 {\n  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);\n}\n";
    readonly vs: "#define SMOOTH_EDGE_RADIUS 0.5\n\nstruct VertexGeometry {\n  vec4 position;\n  vec3 worldPosition;\n  vec3 worldPositionAlt;\n  vec3 normal;\n  vec2 uv;\n  vec3 pickingColor;\n} geometry = VertexGeometry(\n  vec4(0.0, 0.0, 1.0, 0.0),\n  vec3(0.0),\n  vec3(0.0),\n  vec3(0.0),\n  vec2(0.0),\n  vec3(0.0)\n);\n";
    readonly fs: "#define SMOOTH_EDGE_RADIUS 0.5\n\nstruct FragmentGeometry {\n  vec2 uv;\n} geometry;\n\nfloat smoothedge(float edge, float x) {\n  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);\n}\n";
};
export default _default;
//# sourceMappingURL=geometry.d.ts.map
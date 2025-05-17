import type { ProjectProps } from '@deck.gl/core';
import type { Texture } from '@luma.gl/core';
export type FillStyleModuleProps = {
    project: ProjectProps;
    fillPatternEnabled?: boolean;
    fillPatternMask?: boolean;
    fillPatternTexture: Texture;
};
type FillStyleModuleUniforms = {
    patternTextureSize?: [number, number];
    patternEnabled?: boolean;
    patternMask?: boolean;
    uvCoordinateOrigin?: [number, number];
    uvCoordinateOrigin64Low?: [number, number];
};
type FillStyleModuleBindings = {
    fill_patternTexture?: Texture;
};
declare function getPatternUniforms(opts?: FillStyleModuleProps | {}): FillStyleModuleBindings & FillStyleModuleUniforms;
export declare const patternShaders: {
    readonly name: "fill";
    readonly vs: "\nuniform fillUniforms {\n  vec2 patternTextureSize;\n  bool patternEnabled;\n  bool patternMask;\n  vec2 uvCoordinateOrigin;\n  vec2 uvCoordinateOrigin64Low;\n} fill;\n\n\nin vec4 fillPatternFrames;\nin float fillPatternScales;\nin vec2 fillPatternOffsets;\n\nout vec2 fill_uv;\nout vec4 fill_patternBounds;\nout vec4 fill_patternPlacement;\n\n";
    readonly fs: "\nuniform fillUniforms {\n  vec2 patternTextureSize;\n  bool patternEnabled;\n  bool patternMask;\n  vec2 uvCoordinateOrigin;\n  vec2 uvCoordinateOrigin64Low;\n} fill;\n\n\nuniform sampler2D fill_patternTexture;\n\nin vec4 fill_patternBounds;\nin vec4 fill_patternPlacement;\nin vec2 fill_uv;\n\nconst float FILL_UV_SCALE = 512.0 / 40000000.0;\n\n";
    readonly inject: {
        'vs:DECKGL_FILTER_GL_POSITION': string;
        'vs:DECKGL_FILTER_COLOR': string;
        'fs:DECKGL_FILTER_COLOR': string;
    };
    readonly dependencies: [{
        readonly name: "project";
        readonly dependencies: [{
            name: string;
            vs: string;
        }, {
            readonly name: "geometry";
            readonly source: "const SMOOTH_EDGE_RADIUS: f32 = 0.5;\n\nstruct VertexGeometry {\n  position: vec4<f32>,\n  worldPosition: vec3<f32>,\n  worldPositionAlt: vec3<f32>,\n  normal: vec3<f32>,\n  uv: vec2<f32>,\n  pickingColor: vec3<f32>,\n};\n\nvar<private> geometry_: VertexGeometry = VertexGeometry(\n  vec4<f32>(0.0, 0.0, 1.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec2<f32>(0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0)\n);\n\nstruct FragmentGeometry {\n  uv: vec2<f32>,\n};\n\nvar<private> fragmentGeometry: FragmentGeometry;\n\nfn smoothedge(edge: f32, x: f32) -> f32 {\n  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);\n}\n";
            readonly vs: "#define SMOOTH_EDGE_RADIUS 0.5\n\nstruct VertexGeometry {\n  vec4 position;\n  vec3 worldPosition;\n  vec3 worldPositionAlt;\n  vec3 normal;\n  vec2 uv;\n  vec3 pickingColor;\n} geometry = VertexGeometry(\n  vec4(0.0, 0.0, 1.0, 0.0),\n  vec3(0.0),\n  vec3(0.0),\n  vec3(0.0),\n  vec2(0.0),\n  vec3(0.0)\n);\n";
            readonly fs: "#define SMOOTH_EDGE_RADIUS 0.5\n\nstruct FragmentGeometry {\n  vec2 uv;\n} geometry;\n\nfloat smoothedge(float edge, float x) {\n  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);\n}\n";
        }];
        readonly source: string;
        readonly vs: string;
        readonly getUniforms: (opts?: ProjectProps | {}) => {};
        readonly uniformTypes: {
            readonly wrapLongitude: "f32";
            readonly coordinateSystem: "i32";
            readonly commonUnitsPerMeter: "vec3<f32>";
            readonly projectionMode: "i32";
            readonly scale: "f32";
            readonly commonUnitsPerWorldUnit: "vec3<f32>";
            readonly commonUnitsPerWorldUnit2: "vec3<f32>";
            readonly center: "vec4<f32>";
            readonly modelMatrix: "mat4x4<f32>";
            readonly viewProjectionMatrix: "mat4x4<f32>";
            readonly viewportSize: "vec2<f32>";
            readonly devicePixelRatio: "f32";
            readonly focalDistance: "f32";
            readonly cameraPosition: "vec3<f32>";
            readonly coordinateOrigin: "vec3<f32>";
            readonly commonOrigin: "vec3<f32>";
            readonly pseudoMeters: "f32";
        };
    }];
    readonly getUniforms: typeof getPatternUniforms;
    readonly uniformTypes: {
        readonly patternTextureSize: "vec2<f32>";
        readonly patternEnabled: "i32";
        readonly patternMask: "i32";
        readonly uvCoordinateOrigin: "vec2<f32>";
        readonly uvCoordinateOrigin64Low: "vec2<f32>";
    };
};
export {};
//# sourceMappingURL=shader-module.d.ts.map
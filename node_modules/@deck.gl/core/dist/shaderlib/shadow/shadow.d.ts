import { Matrix4 } from '@math.gl/core';
import type { Texture } from '@luma.gl/core';
import type { ProjectProps } from "../project/viewport-uniforms.js";
export type ShadowModuleProps = {
    project: ProjectProps;
    shadowEnabled?: boolean;
    drawToShadowMap?: boolean;
    shadowMaps?: Texture[];
    dummyShadowMap: Texture;
    shadowColor?: NumberArray4;
    shadowMatrices?: Matrix4[];
    shadowLightId?: number;
};
type ShadowModuleUniforms = {
    drawShadowMap: boolean;
    useShadowMap: boolean;
    color?: NumberArray4;
    lightId?: number;
    lightCount?: number;
    viewProjectionMatrix0?: NumberArray16;
    viewProjectionMatrix1?: NumberArray16;
    projectCenter0?: NumberArray4;
    projectCenter1?: NumberArray4;
};
type ShadowModuleBindings = {
    shadow_uShadowMap0: Texture;
    shadow_uShadowMap1: Texture;
};
declare function createShadowUniforms(opts: Partial<ShadowModuleProps>): ShadowModuleBindings & ShadowModuleUniforms;
declare const _default: {
    readonly name: "shadow";
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
    readonly vs: "\n\nuniform shadowUniforms {\n  bool drawShadowMap;\n  bool useShadowMap;\n  vec4 color;\n  highp int lightId;\n  float lightCount;\n  mat4 viewProjectionMatrix0;\n  mat4 viewProjectionMatrix1;\n  vec4 projectCenter0;\n  vec4 projectCenter1;\n} shadow;\n\n\nconst int max_lights = 2;\n\nout vec3 shadow_vPosition[max_lights];\n\nvec4 shadow_setVertexPosition(vec4 position_commonspace) {\n  mat4 viewProjectionMatrices[max_lights];\n  viewProjectionMatrices[0] = shadow.viewProjectionMatrix0;\n  viewProjectionMatrices[1] = shadow.viewProjectionMatrix1;\n  vec4 projectCenters[max_lights];\n  projectCenters[0] = shadow.projectCenter0;\n  projectCenters[1] = shadow.projectCenter1;\n\n  if (shadow.drawShadowMap) {\n    return project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[shadow.lightId], projectCenters[shadow.lightId]);\n  }\n  if (shadow.useShadowMap) {\n    for (int i = 0; i < max_lights; i++) {\n      if(i < int(shadow.lightCount)) {\n        vec4 shadowMap_position = project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[i], projectCenters[i]);\n        shadow_vPosition[i] = (shadowMap_position.xyz / shadowMap_position.w + 1.0) / 2.0;\n      }\n    }\n  }\n  return gl_Position;\n}\n\n";
    readonly fs: "\n\nuniform shadowUniforms {\n  bool drawShadowMap;\n  bool useShadowMap;\n  vec4 color;\n  highp int lightId;\n  float lightCount;\n  mat4 viewProjectionMatrix0;\n  mat4 viewProjectionMatrix1;\n  vec4 projectCenter0;\n  vec4 projectCenter1;\n} shadow;\n\n\nconst int max_lights = 2;\nuniform sampler2D shadow_uShadowMap0;\nuniform sampler2D shadow_uShadowMap1;\n\nin vec3 shadow_vPosition[max_lights];\n\nconst vec4 bitPackShift = vec4(1.0, 255.0, 65025.0, 16581375.0);\nconst vec4 bitUnpackShift = 1.0 / bitPackShift;\nconst vec4 bitMask = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0,  0.0);\n\nfloat shadow_getShadowWeight(vec3 position, sampler2D shadowMap) {\n  vec4 rgbaDepth = texture(shadowMap, position.xy);\n\n  float z = dot(rgbaDepth, bitUnpackShift);\n  return smoothstep(0.001, 0.01, position.z - z);\n}\n\nvec4 shadow_filterShadowColor(vec4 color) {\n  if (shadow.drawShadowMap) {\n    vec4 rgbaDepth = fract(gl_FragCoord.z * bitPackShift);\n    rgbaDepth -= rgbaDepth.gbaa * bitMask;\n    return rgbaDepth;\n  }\n  if (shadow.useShadowMap) {\n    float shadowAlpha = 0.0;\n    shadowAlpha += shadow_getShadowWeight(shadow_vPosition[0], shadow_uShadowMap0);\n    if(shadow.lightCount > 1.0) {\n      shadowAlpha += shadow_getShadowWeight(shadow_vPosition[1], shadow_uShadowMap1);\n    }\n    shadowAlpha *= shadow.color.a / shadow.lightCount;\n    float blendedAlpha = shadowAlpha + color.a * (1.0 - shadowAlpha);\n\n    return vec4(\n      mix(color.rgb, shadow.color.rgb, shadowAlpha / blendedAlpha),\n      blendedAlpha\n    );\n  }\n  return color;\n}\n\n";
    readonly inject: {
        readonly 'vs:DECKGL_FILTER_GL_POSITION': "\n    position = shadow_setVertexPosition(geometry.position);\n    ";
        readonly 'fs:DECKGL_FILTER_COLOR': "\n    color = shadow_filterShadowColor(color);\n    ";
    };
    readonly getUniforms: typeof createShadowUniforms;
    readonly uniformTypes: {
        readonly drawShadowMap: "f32";
        readonly useShadowMap: "f32";
        readonly color: "vec4<f32>";
        readonly lightId: "i32";
        readonly lightCount: "f32";
        readonly viewProjectionMatrix0: "mat4x4<f32>";
        readonly viewProjectionMatrix1: "mat4x4<f32>";
        readonly projectCenter0: "vec4<f32>";
        readonly projectCenter1: "vec4<f32>";
    };
};
export default _default;
type NumberArray4 = [number, number, number, number];
type NumberArray16 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
//# sourceMappingURL=shadow.d.ts.map
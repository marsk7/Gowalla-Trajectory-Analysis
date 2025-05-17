import type { Texture } from '@luma.gl/core';
type MaskBindingProps = {
    maskMap?: Texture;
};
type MaskUniformProps = {
    bounds: [number, number, number, number];
    channel: number;
    enabled: boolean;
    inverted: boolean;
    maskByInstance: boolean;
};
export type MaskProps = MaskBindingProps & MaskUniformProps;
declare const _default: {
    readonly name: "mask";
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
        readonly getUniforms: (opts?: import("@deck.gl/core").ProjectProps | {}) => {};
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
    readonly vs: "\nuniform maskUniforms {\n  vec4 bounds;\n  highp int channel;\n  bool enabled;\n  bool inverted;\n  bool maskByInstance;\n} mask;\n\n\nvec2 mask_getCoords(vec4 position) {\n  return (position.xy - mask.bounds.xy) / (mask.bounds.zw - mask.bounds.xy);\n}\n\n";
    readonly fs: "\nuniform maskUniforms {\n  vec4 bounds;\n  highp int channel;\n  bool enabled;\n  bool inverted;\n  bool maskByInstance;\n} mask;\n\n\nuniform sampler2D mask_texture;\n\nbool mask_isInBounds(vec2 texCoords) {\n  if (!mask.enabled) {\n    return true;\n  }\n  vec4 maskColor = texture(mask_texture, texCoords);\n  float maskValue = 1.0;\n  if (mask.channel == 0) {\n    maskValue = maskColor.r;\n  } else if (mask.channel == 1) {\n    maskValue = maskColor.g;\n  } else if (mask.channel == 2) {\n    maskValue = maskColor.b;\n  } else if (mask.channel == 3) {\n    maskValue = maskColor.a;\n  }\n\n  if (mask.inverted) {\n    return maskValue >= 0.5;\n  } else {\n    return maskValue < 0.5;\n  }\n}\n\n";
    readonly inject: {
        'vs:#decl': string;
        'vs:#main-end': string;
        'fs:#decl': string;
        'fs:#main-start': string;
    };
    readonly getUniforms: (opts?: MaskProps | {}) => Record<string, any>;
    readonly uniformTypes: {
        readonly bounds: "vec4<f32>";
        readonly channel: "i32";
        readonly enabled: "i32";
        readonly inverted: "i32";
        readonly maskByInstance: "i32";
    };
};
export default _default;
//# sourceMappingURL=shader-module.d.ts.map
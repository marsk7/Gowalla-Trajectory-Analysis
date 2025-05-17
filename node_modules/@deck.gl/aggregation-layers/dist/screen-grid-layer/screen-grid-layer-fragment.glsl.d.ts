declare const _default: "#version 300 es\n#define SHADER_NAME screen-grid-layer-fragment-shader\n\nprecision highp float;\n\nin vec4 vColor;\n\nout vec4 fragColor;\n\nvoid main(void) {\n  fragColor = vColor;\n\n  DECKGL_FILTER_COLOR(fragColor, geometry);\n}\n";
export default _default;
//# sourceMappingURL=screen-grid-layer-fragment.glsl.d.ts.map
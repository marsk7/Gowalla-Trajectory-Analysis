declare const _default: "#version 300 es\nin vec4 outTexture;\nout vec4 fragColor;\nvoid main() {\n  fragColor = outTexture;\n  fragColor.g = outTexture.r / max(1.0, outTexture.a);\n}\n";
export default _default;
//# sourceMappingURL=max-fs.glsl.d.ts.map
// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = `\
uniform pathUniforms {
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  float jointType;
  float capType;
  float miterLimit;
  bool billboard;
  highp int widthUnits;
} path;
`;
export const pathUniforms = {
    name: 'path',
    vs: uniformBlock,
    fs: uniformBlock,
    uniformTypes: {
        widthScale: 'f32',
        widthMinPixels: 'f32',
        widthMaxPixels: 'f32',
        jointType: 'f32',
        capType: 'f32',
        miterLimit: 'f32',
        billboard: 'f32',
        widthUnits: 'i32'
    }
};
//# sourceMappingURL=path-layer-uniforms.js.map
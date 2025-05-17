// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = `\
uniform bitmapUniforms {
  vec4 bounds;
  float coordinateConversion;
  float desaturate;
  vec3 tintColor;
  vec4 transparentColor;
} bitmap;
`;
export const bitmapUniforms = {
    name: 'bitmap',
    vs: uniformBlock,
    fs: uniformBlock,
    uniformTypes: {
        bounds: 'vec4<f32>',
        coordinateConversion: 'f32',
        desaturate: 'f32',
        tintColor: 'vec3<f32>',
        transparentColor: 'vec4<f32>'
    }
};
//# sourceMappingURL=bitmap-layer-uniforms.js.map
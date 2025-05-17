// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = `\
uniform scenegraphUniforms {
  float sizeScale;
  float sizeMinPixels;
  float sizeMaxPixels;
  mat4 sceneModelMatrix;
  bool composeModelMatrix;
} scenegraph;
`;
export const scenegraphUniforms = {
    name: 'scenegraph',
    vs: uniformBlock,
    fs: uniformBlock,
    uniformTypes: {
        sizeScale: 'f32',
        sizeMinPixels: 'f32',
        sizeMaxPixels: 'f32',
        sceneModelMatrix: 'mat4x4<f32>',
        composeModelMatrix: 'f32'
    }
};
//# sourceMappingURL=scenegraph-layer-uniforms.js.map
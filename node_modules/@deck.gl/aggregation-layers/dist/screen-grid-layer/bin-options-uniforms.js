// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = /* glsl */ `\
uniform binOptionsUniforms {
  float cellSizePixels;
} binOptions;
`;
export const binOptionsUniforms = {
    name: 'binOptions',
    vs: uniformBlock,
    uniformTypes: {
        cellSizePixels: 'f32'
    }
};
//# sourceMappingURL=bin-options-uniforms.js.map
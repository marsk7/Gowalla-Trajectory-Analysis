// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = `\
uniform weightUniforms {
  vec4 commonBounds;
  float radiusPixels;
  float textureWidth;
  float weightsScale;
} weight;
`;
export const weightUniforms = {
    name: 'weight',
    vs: uniformBlock,
    uniformTypes: {
        commonBounds: 'vec4<f32>',
        radiusPixels: 'f32',
        textureWidth: 'f32',
        weightsScale: 'f32'
    }
};
export const maxWeightUniforms = {
    name: 'maxWeight',
    vs: `\
uniform maxWeightUniforms {
  float textureSize;
} maxWeight;
`,
    uniformTypes: {
        textureSize: 'f32'
    }
};
//# sourceMappingURL=heatmap-layer-uniforms.js.map
// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = /* glsl */ `\
uniform hexagonUniforms {
  vec4 colorDomain;
  vec4 elevationDomain;
  vec2 elevationRange;
  vec2 originCommon;
} hexagon;
`;
export const hexagonUniforms = {
    name: 'hexagon',
    vs: uniformBlock,
    uniformTypes: {
        colorDomain: 'vec4<f32>',
        elevationDomain: 'vec4<f32>',
        elevationRange: 'vec2<f32>',
        originCommon: 'vec2<f32>'
    }
};
//# sourceMappingURL=hexagon-layer-uniforms.js.map
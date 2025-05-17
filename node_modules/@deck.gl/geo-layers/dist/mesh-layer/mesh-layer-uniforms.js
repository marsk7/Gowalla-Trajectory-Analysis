// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = `\
uniform meshUniforms {
  bool pickFeatureIds;
} mesh;
`;
export const meshUniforms = {
    name: 'mesh',
    vs: uniformBlock,
    fs: uniformBlock,
    uniformTypes: {
        pickFeatureIds: 'f32'
    }
};
//# sourceMappingURL=mesh-layer-uniforms.js.map
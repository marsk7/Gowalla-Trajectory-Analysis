// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = `\
uniform pointCloudUniforms {
  float radiusPixels;
  highp int sizeUnits;
} pointCloud;
`;
export const pointCloudUniforms = {
    name: 'pointCloud',
    vs: uniformBlock,
    fs: uniformBlock,
    uniformTypes: {
        radiusPixels: 'f32',
        sizeUnits: 'i32'
    }
};
//# sourceMappingURL=point-cloud-layer-uniforms.js.map
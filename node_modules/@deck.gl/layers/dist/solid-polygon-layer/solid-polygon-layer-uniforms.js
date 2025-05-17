// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = `\
uniform solidPolygonUniforms {
  bool extruded;
  bool isWireframe;
  float elevationScale;
} solidPolygon;
`;
export const solidPolygonUniforms = {
    name: 'solidPolygon',
    vs: uniformBlock,
    fs: uniformBlock,
    uniformTypes: {
        extruded: 'f32',
        isWireframe: 'f32',
        elevationScale: 'f32'
    }
};
//# sourceMappingURL=solid-polygon-layer-uniforms.js.map
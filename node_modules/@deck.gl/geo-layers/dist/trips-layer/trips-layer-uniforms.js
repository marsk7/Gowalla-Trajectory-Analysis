// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
const uniformBlock = `\
uniform tripsUniforms {
  bool fadeTrail;
  float trailLength;
  float currentTime;
} trips;
`;
export const tripsUniforms = {
    name: 'trips',
    vs: uniformBlock,
    fs: uniformBlock,
    uniformTypes: {
        fadeTrail: 'f32',
        trailLength: 'f32',
        currentTime: 'f32'
    }
};
//# sourceMappingURL=trips-layer-uniforms.js.map
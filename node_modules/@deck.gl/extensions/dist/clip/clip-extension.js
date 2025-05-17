// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { LayerExtension } from '@deck.gl/core';
const defaultProps = {
    clipBounds: [0, 0, 1, 1],
    clipByInstance: undefined
};
const shaderFunction = /* glsl */ `
uniform clipUniforms {
  vec4 bounds;
} clip;

bool clip_isInBounds(vec2 position) {
  return position.x >= clip.bounds[0] && position.y >= clip.bounds[1] && position.x < clip.bounds[2] && position.y < clip.bounds[3];
}
`;
/*
 * The vertex-shader version clips geometries by their anchor position
 * e.g. ScatterplotLayer - show if the center of a circle is within bounds
 */
const shaderModuleVs = {
    name: 'clip',
    vs: shaderFunction,
    uniformTypes: {
        bounds: 'vec4<f32>'
    }
};
const injectionVs = {
    'vs:#decl': /* glsl */ `
out float clip_isVisible;
`,
    'vs:DECKGL_FILTER_GL_POSITION': /* glsl */ `
  clip_isVisible = float(clip_isInBounds(geometry.worldPosition.xy));
`,
    'fs:#decl': /* glsl */ `
in float clip_isVisible;
`,
    'fs:DECKGL_FILTER_COLOR': /* glsl */ `
  if (clip_isVisible < 0.5) discard;
`
};
/*
 * The fragment-shader version clips pixels at the bounds
 * e.g. PolygonLayer - show the part of the polygon that intersect with the bounds
 */
const shaderModuleFs = {
    name: 'clip',
    fs: shaderFunction,
    uniformTypes: {
        bounds: 'vec4<f32>'
    }
};
const injectionFs = {
    'vs:#decl': /* glsl */ `
out vec2 clip_commonPosition;
`,
    'vs:DECKGL_FILTER_GL_POSITION': /* glsl */ `
  clip_commonPosition = geometry.position.xy;
`,
    'fs:#decl': /* glsl */ `
in vec2 clip_commonPosition;
`,
    'fs:DECKGL_FILTER_COLOR': /* glsl */ `
  if (!clip_isInBounds(clip_commonPosition)) discard;
`
};
/** Adds support for clipping rendered layers by rectangular bounds. */
class ClipExtension extends LayerExtension {
    getShaders() {
        // If `clipByInstance: true`, the entire object is shown/hidden based on its anchor position (done by vertex shader)
        // Otherwise, the object is trimmed by the clip bounds (done by fragment shader)
        // Default behavior: consider a layer instanced if it has attribute `instancePositions`
        let clipByInstance = 'instancePositions' in this.getAttributeManager().attributes;
        // Users can override by setting the `clipByInstance` prop
        if (this.props.clipByInstance !== undefined) {
            clipByInstance = Boolean(this.props.clipByInstance);
        }
        this.state.clipByInstance = clipByInstance;
        return clipByInstance
            ? {
                modules: [shaderModuleVs],
                inject: injectionVs
            }
            : {
                modules: [shaderModuleFs],
                inject: injectionFs
            };
    }
    /* eslint-disable camelcase */
    draw() {
        const { clipBounds } = this.props;
        const clipProps = {};
        if (this.state.clipByInstance) {
            clipProps.bounds = clipBounds;
        }
        else {
            const corner0 = this.projectPosition([clipBounds[0], clipBounds[1], 0]);
            const corner1 = this.projectPosition([clipBounds[2], clipBounds[3], 0]);
            clipProps.bounds = [
                Math.min(corner0[0], corner1[0]),
                Math.min(corner0[1], corner1[1]),
                Math.max(corner0[0], corner1[0]),
                Math.max(corner0[1], corner1[1])
            ];
        }
        this.setShaderModuleProps({ clip: clipProps });
    }
}
ClipExtension.defaultProps = defaultProps;
ClipExtension.extensionName = 'ClipExtension';
export default ClipExtension;
//# sourceMappingURL=clip-extension.js.map
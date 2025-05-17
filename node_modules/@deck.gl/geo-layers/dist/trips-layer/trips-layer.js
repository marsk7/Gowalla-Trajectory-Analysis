// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { PathLayer } from '@deck.gl/layers';
import { tripsUniforms } from "./trips-layer-uniforms.js";
const defaultProps = {
    fadeTrail: true,
    trailLength: { type: 'number', value: 120, min: 0 },
    currentTime: { type: 'number', value: 0, min: 0 },
    getTimestamps: { type: 'accessor', value: (d) => d.timestamps }
};
/** Render animated paths that represent vehicle trips. */
class TripsLayer extends PathLayer {
    getShaders() {
        const shaders = super.getShaders();
        shaders.inject = {
            'vs:#decl': `\
in float instanceTimestamps;
in float instanceNextTimestamps;
out float vTime;
`,
            // Timestamp of the vertex
            'vs:#main-end': `\
vTime = instanceTimestamps + (instanceNextTimestamps - instanceTimestamps) * vPathPosition.y / vPathLength;
`,
            'fs:#decl': `\
in float vTime;
`,
            // Drop the segments outside of the time window
            'fs:#main-start': `\
if(vTime > trips.currentTime || (trips.fadeTrail && (vTime < trips.currentTime - trips.trailLength))) {
  discard;
}
`,
            // Fade the color (currentTime - 100%, end of trail - 0%)
            'fs:DECKGL_FILTER_COLOR': `\
if(trips.fadeTrail) {
  color.a *= 1.0 - (trips.currentTime - vTime) / trips.trailLength;
}
`
        };
        shaders.modules = [...shaders.modules, tripsUniforms];
        return shaders;
    }
    initializeState() {
        super.initializeState();
        const attributeManager = this.getAttributeManager();
        attributeManager.addInstanced({
            timestamps: {
                size: 1,
                accessor: 'getTimestamps',
                shaderAttributes: {
                    instanceTimestamps: {
                        vertexOffset: 0
                    },
                    instanceNextTimestamps: {
                        vertexOffset: 1
                    }
                }
            }
        });
    }
    draw(params) {
        const { fadeTrail, trailLength, currentTime } = this.props;
        const tripsProps = { fadeTrail, trailLength, currentTime };
        const model = this.state.model;
        model.shaderInputs.setProps({ trips: tripsProps });
        super.draw(params);
    }
}
TripsLayer.layerName = 'TripsLayer';
TripsLayer.defaultProps = defaultProps;
export default TripsLayer;
//# sourceMappingURL=trips-layer.js.map
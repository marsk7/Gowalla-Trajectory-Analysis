// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { LayerExtension } from '@deck.gl/core';
import { patternShaders } from "./shader-module.js";
const defaultProps = {
    fillPatternEnabled: true,
    fillPatternAtlas: {
        type: 'image',
        value: null,
        async: true,
        parameters: { lodMaxClamp: 0 }
    },
    fillPatternMapping: { type: 'object', value: {}, async: true },
    fillPatternMask: true,
    getFillPattern: { type: 'accessor', value: d => d.pattern },
    getFillPatternScale: { type: 'accessor', value: 1 },
    getFillPatternOffset: { type: 'accessor', value: [0, 0] }
};
/** Adds selected features to layers that render a "fill", such as the `PolygonLayer` and `ScatterplotLayer`. */
class FillStyleExtension extends LayerExtension {
    constructor({ pattern = false } = {}) {
        super({ pattern });
    }
    isEnabled(layer) {
        return layer.getAttributeManager() !== null && !('pathTesselator' in layer.state);
    }
    getShaders(extension) {
        if (!extension.isEnabled(this)) {
            return null;
        }
        return {
            modules: [extension.opts.pattern && patternShaders].filter(Boolean)
        };
    }
    initializeState(context, extension) {
        if (!extension.isEnabled(this)) {
            return;
        }
        const attributeManager = this.getAttributeManager();
        if (extension.opts.pattern) {
            attributeManager.add({
                fillPatternFrames: {
                    size: 4,
                    stepMode: 'dynamic',
                    accessor: 'getFillPattern',
                    transform: extension.getPatternFrame.bind(this)
                },
                fillPatternScales: {
                    size: 1,
                    stepMode: 'dynamic',
                    accessor: 'getFillPatternScale',
                    defaultValue: 1
                },
                fillPatternOffsets: {
                    size: 2,
                    stepMode: 'dynamic',
                    accessor: 'getFillPatternOffset'
                }
            });
        }
        this.setState({
            emptyTexture: this.context.device.createTexture({
                data: new Uint8Array(4),
                width: 1,
                height: 1
            })
        });
    }
    updateState({ props, oldProps }, extension) {
        if (!extension.isEnabled(this)) {
            return;
        }
        if (props.fillPatternMapping && props.fillPatternMapping !== oldProps.fillPatternMapping) {
            this.getAttributeManager().invalidate('getFillPattern');
        }
    }
    draw(params, extension) {
        if (!extension.isEnabled(this)) {
            return;
        }
        const { fillPatternAtlas, fillPatternEnabled, fillPatternMask } = this.props;
        const fillProps = {
            project: params.shaderModuleProps.project,
            fillPatternEnabled,
            fillPatternMask,
            fillPatternTexture: (fillPatternAtlas || this.state.emptyTexture)
        };
        this.setShaderModuleProps({ fill: fillProps });
    }
    finalizeState() {
        const emptyTexture = this.state.emptyTexture;
        emptyTexture?.delete();
    }
    getPatternFrame(name) {
        const { fillPatternMapping } = this.getCurrentLayer().props;
        const def = fillPatternMapping && fillPatternMapping[name];
        return def ? [def.x, def.y, def.width, def.height] : [0, 0, 0, 0];
    }
}
FillStyleExtension.defaultProps = defaultProps;
FillStyleExtension.extensionName = 'FillStyleExtension';
export default FillStyleExtension;
//# sourceMappingURL=fill-style-extension.js.map
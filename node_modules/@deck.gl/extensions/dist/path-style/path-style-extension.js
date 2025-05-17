// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { LayerExtension, _mergeShaders as mergeShaders } from '@deck.gl/core';
import { vec3 } from '@math.gl/core';
import { dashShaders, offsetShaders } from "./shaders.glsl.js";
const defaultProps = {
    getDashArray: { type: 'accessor', value: [0, 0] },
    getOffset: { type: 'accessor', value: 0 },
    dashJustified: false,
    dashGapPickable: false
};
/** Adds selected features to the `PathLayer` and composite layers that render the `PathLayer`. */
class PathStyleExtension extends LayerExtension {
    constructor({ dash = false, offset = false, highPrecisionDash = false } = {}) {
        super({ dash: dash || highPrecisionDash, offset, highPrecisionDash });
    }
    isEnabled(layer) {
        return 'pathTesselator' in layer.state;
    }
    getShaders(extension) {
        if (!extension.isEnabled(this)) {
            return null;
        }
        // Merge shader injection
        let result = {};
        if (extension.opts.dash) {
            result = mergeShaders(result, dashShaders);
        }
        if (extension.opts.offset) {
            result = mergeShaders(result, offsetShaders);
        }
        const { inject } = result;
        const pathStyle = {
            name: 'pathStyle',
            inject,
            uniformTypes: {
                dashAlignMode: 'f32',
                dashGapPickable: 'i32'
            }
        };
        return {
            modules: [pathStyle]
        };
    }
    initializeState(context, extension) {
        const attributeManager = this.getAttributeManager();
        if (!attributeManager || !extension.isEnabled(this)) {
            // This extension only works with the PathLayer
            return;
        }
        if (extension.opts.dash) {
            attributeManager.addInstanced({
                instanceDashArrays: { size: 2, accessor: 'getDashArray' },
                instanceDashOffsets: extension.opts.highPrecisionDash
                    ? {
                        size: 1,
                        accessor: 'getPath',
                        transform: extension.getDashOffsets.bind(this)
                    }
                    : {
                        size: 1,
                        update: attribute => {
                            attribute.constant = true;
                            attribute.value = [0];
                        }
                    }
            });
        }
        if (extension.opts.offset) {
            attributeManager.addInstanced({
                instanceOffsets: { size: 1, accessor: 'getOffset' }
            });
        }
    }
    updateState(params, extension) {
        if (!extension.isEnabled(this)) {
            return;
        }
        if (extension.opts.dash) {
            const pathStyleProps = {
                dashAlignMode: this.props.dashJustified ? 1 : 0,
                dashGapPickable: Boolean(this.props.dashGapPickable)
            };
            this.setShaderModuleProps({ pathStyle: pathStyleProps });
        }
    }
    getDashOffsets(path) {
        const result = [0];
        const positionSize = this.props.positionFormat === 'XY' ? 2 : 3;
        const isNested = Array.isArray(path[0]);
        const geometrySize = isNested ? path.length : path.length / positionSize;
        let p;
        let prevP;
        for (let i = 0; i < geometrySize - 1; i++) {
            p = isNested ? path[i] : path.slice(i * positionSize, i * positionSize + positionSize);
            p = this.projectPosition(p);
            if (i > 0) {
                result[i] = result[i - 1] + vec3.dist(prevP, p);
            }
            prevP = p;
        }
        result[geometrySize - 1] = 0;
        return result;
    }
}
PathStyleExtension.defaultProps = defaultProps;
PathStyleExtension.extensionName = 'PathStyleExtension';
export default PathStyleExtension;
//# sourceMappingURL=path-style-extension.js.map
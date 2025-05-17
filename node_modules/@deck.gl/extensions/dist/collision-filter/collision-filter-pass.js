// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { _LayersPass as LayersPass } from '@deck.gl/core';
export default class CollisionFilterPass extends LayersPass {
    renderCollisionMap(target, options) {
        const padding = 1;
        const clearColor = [0, 0, 0, 0];
        const scissorRect = [padding, padding, target.width - 2 * padding, target.height - 2 * padding];
        this.render({ ...options, clearColor, scissorRect, target, pass: 'collision' });
    }
    getLayerParameters(layer, layerIndex, viewport) {
        return {
            ...layer.props.parameters,
            blend: false,
            depthWriteEnabled: true,
            depthCompare: 'less-equal'
        };
    }
    getShaderModuleProps() {
        // Draw picking colors into collision FBO
        return {
            collision: {
                drawToCollisionMap: true
            },
            picking: {
                isActive: 1,
                isAttribute: false
            },
            lighting: { enabled: false }
        };
    }
}
//# sourceMappingURL=collision-filter-pass.js.map
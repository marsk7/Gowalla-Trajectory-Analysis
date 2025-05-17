// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { LayerExtension } from '@deck.gl/core';
import shaderModule from "./shader-module.js";
const defaultProps = {
    getBrushingTarget: { type: 'accessor', value: [0, 0] },
    brushingTarget: 'source',
    brushingEnabled: true,
    brushingRadius: 10000
};
/** Adds GPU-based data brushing functionalities to layers. It allows the layer to show/hide objects based on the current pointer position. */
class BrushingExtension extends LayerExtension {
    getShaders() {
        return {
            modules: [shaderModule]
        };
    }
    initializeState(context, extension) {
        const attributeManager = this.getAttributeManager();
        if (attributeManager) {
            attributeManager.add({
                brushingTargets: {
                    size: 2,
                    stepMode: 'dynamic',
                    accessor: 'getBrushingTarget'
                }
            });
        }
        // Trigger redraw when mouse moves
        const onMouseMove = () => {
            this.getCurrentLayer()?.setNeedsRedraw();
        };
        // TODO - expose this in a better way
        this.state.onMouseMove = onMouseMove;
        if (context.deck) {
            // @ts-expect-error (2446) accessing protected property
            context.deck.eventManager.on({
                pointermove: onMouseMove,
                pointerleave: onMouseMove
            });
        }
    }
    finalizeState(context, extension) {
        // Remove event listeners
        if (context.deck) {
            const onMouseMove = this.state.onMouseMove;
            // @ts-expect-error (2446) accessing protected property
            context.deck.eventManager.off({
                pointermove: onMouseMove,
                pointerleave: onMouseMove
            });
        }
    }
    draw(params, extension) {
        const { viewport, mousePosition } = params.context;
        const { brushingEnabled, brushingRadius, brushingTarget } = this.props;
        const brushingProps = {
            viewport,
            mousePosition,
            brushingEnabled,
            brushingRadius,
            brushingTarget
        };
        this.setShaderModuleProps({ brushing: brushingProps });
    }
}
BrushingExtension.defaultProps = defaultProps;
BrushingExtension.extensionName = 'BrushingExtension';
export default BrushingExtension;
//# sourceMappingURL=brushing-extension.js.map
// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { LayerExtension } from '@deck.gl/core';
import collision from "./shader-module.js";
import CollisionFilterEffect from "./collision-filter-effect.js";
const defaultProps = {
    getCollisionPriority: { type: 'accessor', value: 0 },
    collisionEnabled: true,
    collisionGroup: { type: 'string', value: 'default' },
    collisionTestProps: {}
};
/** Allows layers to hide overlapping objects. */
class CollisionFilterExtension extends LayerExtension {
    getShaders() {
        return { modules: [collision] };
    }
    /* eslint-disable camelcase */
    draw({ shaderModuleProps }) {
        if (shaderModuleProps.collision?.drawToCollisionMap) {
            // Override any props with those defined in collisionTestProps
            // @ts-ignore
            this.props = this.clone(this.props.collisionTestProps).props;
        }
    }
    initializeState(context, extension) {
        if (this.getAttributeManager() === null) {
            return;
        }
        this.context.deck?._addDefaultEffect(new CollisionFilterEffect());
        const attributeManager = this.getAttributeManager();
        attributeManager.add({
            collisionPriorities: {
                size: 1,
                stepMode: 'dynamic',
                accessor: 'getCollisionPriority'
            }
        });
    }
    getNeedsPickingBuffer() {
        return this.props.collisionEnabled;
    }
}
CollisionFilterExtension.defaultProps = defaultProps;
CollisionFilterExtension.extensionName = 'CollisionFilterExtension';
export default CollisionFilterExtension;
//# sourceMappingURL=collision-filter-extension.js.map
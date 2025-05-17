// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { LayerExtension } from '@deck.gl/core';
import { TerrainEffect } from "./terrain-effect.js";
import { terrainModule } from "./shader-module.js";
const defaultProps = {
    terrainDrawMode: undefined
};
/** Allows layers to show/hide objects by a geofence. */
class TerrainExtension extends LayerExtension {
    getShaders() {
        return {
            modules: [terrainModule]
        };
    }
    initializeState() {
        this.context.deck?._addDefaultEffect(new TerrainEffect());
    }
    updateState(params) {
        const { props, oldProps } = params;
        if (this.state.terrainDrawMode &&
            props.terrainDrawMode === oldProps.terrainDrawMode &&
            // @ts-ignore `extruded` may not exist in props
            props.extruded === oldProps.extruded) {
            return;
        }
        let { terrainDrawMode } = props;
        if (!terrainDrawMode) {
            // props.extruded is used as an indication that the layer is 2.5D
            // @ts-ignore `extruded` may not exist in props
            const is3d = this.props.extruded;
            const attributes = this.getAttributeManager()?.attributes;
            const hasAnchor = attributes && 'instancePositions' in attributes;
            terrainDrawMode = is3d || hasAnchor ? 'offset' : 'drape';
        }
        this.setState({ terrainDrawMode });
    }
    onNeedsRedraw() {
        const state = this.state;
        if (state.terrainDrawMode === 'drape') {
            state.terrainCoverNeedsRedraw = true;
        }
    }
}
TerrainExtension.defaultProps = defaultProps;
TerrainExtension.extensionName = 'TerrainExtension';
export default TerrainExtension;
//# sourceMappingURL=terrain-extension.js.map
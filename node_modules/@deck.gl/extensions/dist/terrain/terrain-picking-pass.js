// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { _PickLayersPass as PickLayersPass } from '@deck.gl/core';
/** Renders textures used by the TerrainEffect picking pass */
export class TerrainPickingPass extends PickLayersPass {
    constructor() {
        super(...arguments);
        /** Save layer index for use when drawing to terrain cover.
         * When a terrain cover's picking buffer is rendered,
         * we need to make sure each layer receives a consistent index (encoded in the alpha channel)
         * so that a picked color can be decoded back to the correct layer.
         * Updated in getRenderableLayers which is called in TerrainEffect.preRender
         */
        this.drawParameters = {};
    }
    getRenderableLayers(viewport, opts) {
        const { layers } = opts;
        const result = [];
        this.drawParameters = {};
        this._resetColorEncoder(opts.pickZ);
        const drawParamsByIndex = this._getDrawLayerParams(viewport, opts);
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (!layer.isComposite && drawParamsByIndex[i].shouldDrawLayer) {
                result.push(layer);
                this.drawParameters[layer.id] = drawParamsByIndex[i].layerParameters;
            }
        }
        return result;
    }
    renderTerrainCover(terrainCover, opts) {
        // console.log('Updating terrain cover for picking ' + terrainCover.id)
        const target = terrainCover.getPickingFramebuffer();
        const viewport = terrainCover.renderViewport;
        if (!target || !viewport) {
            return;
        }
        const layers = terrainCover.filterLayers(opts.layers);
        const terrainLayer = terrainCover.targetLayer;
        if (terrainLayer.props.pickable) {
            layers.unshift(terrainLayer);
        }
        target.resize(viewport);
        this.render({
            ...opts,
            pickingFBO: target,
            pass: `terrain-cover-picking-${terrainCover.id}`,
            layers,
            effects: [],
            viewports: [viewport],
            // Disable the default culling because TileLayer would cull sublayers based on the screen viewport,
            // not the viewport of the terrain cover. Culling is already done by `terrainCover.filterLayers`
            cullRect: undefined,
            deviceRect: viewport,
            pickZ: false
        });
    }
    getLayerParameters(layer, layerIndex, viewport) {
        let parameters;
        if (this.drawParameters[layer.id]) {
            parameters = this.drawParameters[layer.id];
        }
        else {
            parameters = super.getLayerParameters(layer, layerIndex, viewport);
            parameters.blend = true;
        }
        return { ...parameters, depthCompare: 'always' };
    }
    getShaderModuleProps(layer, effects, otherShaderModuleProps) {
        return {
            terrain: {
                project: otherShaderModuleProps.project
            }
        };
    }
}
//# sourceMappingURL=terrain-picking-pass.js.map
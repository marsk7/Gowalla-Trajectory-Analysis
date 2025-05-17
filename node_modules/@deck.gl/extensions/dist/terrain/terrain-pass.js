// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { _LayersPass as LayersPass } from '@deck.gl/core';
const TERRAIN_BLENDING = {
    blendColorOperation: 'max',
    blendColorSrcFactor: 'one',
    blendColorDstFactor: 'one',
    blendAlphaOperation: 'max',
    blendAlphaSrcFactor: 'one',
    blendAlphaDstFactor: 'one'
};
/** Renders textures used by the TerrainEffect render pass */
export class TerrainPass extends LayersPass {
    getRenderableLayers(viewport, opts) {
        const { layers } = opts;
        const result = [];
        const drawParamsByIndex = this._getDrawLayerParams(viewport, opts, true);
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (!layer.isComposite && drawParamsByIndex[i].shouldDrawLayer) {
                result.push(layer);
            }
        }
        return result;
    }
    renderHeightMap(heightMap, opts) {
        // console.log('Updating height map')
        const target = heightMap.getRenderFramebuffer();
        const viewport = heightMap.renderViewport;
        if (!target || !viewport) {
            return;
        }
        target.resize(viewport);
        this.render({
            ...opts,
            target,
            pass: 'terrain-height-map',
            layers: opts.layers,
            viewports: [viewport],
            effects: [],
            clearColor: [0, 0, 0, 0]
        });
    }
    renderTerrainCover(terrainCover, opts) {
        // console.log('Updating terrain cover ' + terrainCover.id)
        const target = terrainCover.getRenderFramebuffer();
        const viewport = terrainCover.renderViewport;
        if (!target || !viewport) {
            return;
        }
        const layers = terrainCover.filterLayers(opts.layers);
        target.resize(viewport);
        this.render({
            ...opts,
            target,
            pass: `terrain-cover-${terrainCover.id}`,
            layers,
            effects: [],
            viewports: [viewport],
            clearColor: [0, 0, 0, 0]
        });
    }
    getLayerParameters(layer, layerIndex, viewport) {
        return {
            ...layer.props.parameters,
            blend: true,
            depthCompare: 'always',
            ...(layer.props.operation.includes('terrain') && TERRAIN_BLENDING)
        };
    }
    getShaderModuleProps(layer, effects, otherShaderModuleProps) {
        return {
            terrain: {
                project: otherShaderModuleProps.project
            }
        };
    }
}
//# sourceMappingURL=terrain-pass.js.map
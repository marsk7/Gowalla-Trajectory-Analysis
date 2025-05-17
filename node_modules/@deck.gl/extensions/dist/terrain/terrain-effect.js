// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { log } from '@deck.gl/core';
import { terrainModule } from "./shader-module.js";
import { TerrainCover } from "./terrain-cover.js";
import { TerrainPass } from "./terrain-pass.js";
import { TerrainPickingPass } from "./terrain-picking-pass.js";
import { HeightMapBuilder } from "./height-map-builder.js";
/** Class to manage terrain effect */
export class TerrainEffect {
    constructor() {
        this.id = 'terrain-effect';
        this.props = null;
        this.useInPicking = true;
        /** true if picking in the current pass */
        this.isPicking = false;
        /** true if should use in the current pass */
        this.isDrapingEnabled = false;
        /** One texture for each primitive terrain layer, into which the draped layers render */
        this.terrainCovers = new Map();
    }
    setup({ device, deck }) {
        this.dummyHeightMap = device.createTexture({
            width: 1,
            height: 1,
            data: new Uint8Array([0, 0, 0, 0])
        });
        this.terrainPass = new TerrainPass(device, { id: 'terrain' });
        this.terrainPickingPass = new TerrainPickingPass(device, { id: 'terrain-picking' });
        if (HeightMapBuilder.isSupported(device)) {
            this.heightMap = new HeightMapBuilder(device);
        }
        else {
            log.warn('Terrain offset mode is not supported by this browser')();
        }
        deck._addDefaultShaderModule(terrainModule);
    }
    preRender(opts) {
        // @ts-expect-error pickZ only defined in picking pass
        if (opts.pickZ) {
            // Do not update if picking attributes
            this.isDrapingEnabled = false;
            return;
        }
        const { viewports } = opts;
        const isPicking = opts.pass.startsWith('picking');
        this.isPicking = isPicking;
        this.isDrapingEnabled = true;
        // TODO - support multiple views?
        const viewport = viewports[0];
        const layers = (isPicking ? this.terrainPickingPass : this.terrainPass).getRenderableLayers(viewport, opts);
        const terrainLayers = layers.filter(l => l.props.operation.includes('terrain'));
        if (terrainLayers.length === 0) {
            return;
        }
        if (!isPicking) {
            const offsetLayers = layers.filter(l => l.state.terrainDrawMode === 'offset');
            if (offsetLayers.length > 0) {
                this._updateHeightMap(terrainLayers, viewport, opts);
            }
        }
        const drapeLayers = layers.filter(l => l.state.terrainDrawMode === 'drape');
        this._updateTerrainCovers(terrainLayers, drapeLayers, viewport, opts);
    }
    getShaderModuleProps(layer, otherShaderModuleProps) {
        const { terrainDrawMode } = layer.state;
        return {
            terrain: {
                project: otherShaderModuleProps.project,
                isPicking: this.isPicking,
                heightMap: this.heightMap?.getRenderFramebuffer()?.colorAttachments[0].texture || null,
                heightMapBounds: this.heightMap?.bounds,
                dummyHeightMap: this.dummyHeightMap,
                terrainCover: this.isDrapingEnabled ? this.terrainCovers.get(layer.id) : null,
                useTerrainHeightMap: terrainDrawMode === 'offset',
                terrainSkipRender: terrainDrawMode === 'drape' || !layer.props.operation.includes('draw')
            }
        };
    }
    cleanup({ deck }) {
        if (this.dummyHeightMap) {
            this.dummyHeightMap.delete();
            this.dummyHeightMap = undefined;
        }
        if (this.heightMap) {
            this.heightMap.delete();
            this.heightMap = undefined;
        }
        for (const terrainCover of this.terrainCovers.values()) {
            terrainCover.delete();
        }
        this.terrainCovers.clear();
        deck._removeDefaultShaderModule(terrainModule);
    }
    _updateHeightMap(terrainLayers, viewport, opts) {
        if (!this.heightMap) {
            // Not supported
            return;
        }
        const shouldUpdate = this.heightMap.shouldUpdate({ layers: terrainLayers, viewport });
        if (!shouldUpdate) {
            return;
        }
        this.terrainPass.renderHeightMap(this.heightMap, {
            ...opts,
            layers: terrainLayers,
            shaderModuleProps: {
                terrain: {
                    heightMapBounds: this.heightMap.bounds,
                    dummyHeightMap: this.dummyHeightMap,
                    drawToTerrainHeightMap: true
                },
                project: {
                    devicePixelRatio: 1
                }
            }
        });
    }
    _updateTerrainCovers(terrainLayers, drapeLayers, viewport, opts) {
        // Mark a terrain cover as dirty if one of the drape layers needs redraw
        const layerNeedsRedraw = {};
        for (const layer of drapeLayers) {
            if (layer.state.terrainCoverNeedsRedraw) {
                layerNeedsRedraw[layer.id] = true;
                layer.state.terrainCoverNeedsRedraw = false;
            }
        }
        for (const terrainCover of this.terrainCovers.values()) {
            terrainCover.isDirty = terrainCover.isDirty || terrainCover.shouldUpdate({ layerNeedsRedraw });
        }
        for (const layer of terrainLayers) {
            this._updateTerrainCover(layer, drapeLayers, viewport, opts);
        }
        if (!this.isPicking) {
            this._pruneTerrainCovers();
        }
    }
    _updateTerrainCover(terrainLayer, drapeLayers, viewport, opts) {
        const renderPass = this.isPicking ? this.terrainPickingPass : this.terrainPass;
        let terrainCover = this.terrainCovers.get(terrainLayer.id);
        if (!terrainCover) {
            terrainCover = new TerrainCover(terrainLayer);
            this.terrainCovers.set(terrainLayer.id, terrainCover);
        }
        try {
            const isDirty = terrainCover.shouldUpdate({
                targetLayer: terrainLayer,
                viewport,
                layers: drapeLayers
            });
            if (this.isPicking || terrainCover.isDirty || isDirty) {
                renderPass.renderTerrainCover(terrainCover, {
                    ...opts,
                    layers: drapeLayers,
                    shaderModuleProps: {
                        terrain: {
                            dummyHeightMap: this.dummyHeightMap,
                            terrainSkipRender: false
                        },
                        project: {
                            devicePixelRatio: 1
                        }
                    }
                });
                if (!this.isPicking) {
                    // IsDirty refers to the normal fbo, not the picking fbo.
                    // Only mark it as not dirty if the normal fbo was updated.
                    terrainCover.isDirty = false;
                }
            }
        }
        catch (err) {
            terrainLayer.raiseError(err, `Error rendering terrain cover ${terrainCover.id}`);
        }
    }
    _pruneTerrainCovers() {
        /** Prune the cache, remove textures for layers that have been removed */
        const idsToRemove = [];
        for (const [id, terrainCover] of this.terrainCovers) {
            if (!terrainCover.isActive) {
                idsToRemove.push(id);
            }
        }
        for (const id of idsToRemove) {
            this.terrainCovers.delete(id);
        }
    }
}
//# sourceMappingURL=terrain-effect.js.map
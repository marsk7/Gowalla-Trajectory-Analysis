// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Layer, PostProcessEffect } from '@deck.gl/core';
const TEXTURE_PROPS = {
    format: 'rgba8unorm',
    mipmaps: false,
    sampler: {
        minFilter: 'linear',
        magFilter: 'linear',
        addressModeU: 'clamp-to-edge',
        addressModeV: 'clamp-to-edge'
    }
};
function getPostProcessLayer(layer) {
    while (layer.parent && !layer.applyPostProcess) {
        layer = layer.parent;
    }
    return layer;
}
/**
 * Dummy Layer that draws nothing, just calls back to root Layer
 */
class DrawCallbackLayer extends Layer {
    initializeState() {
        this.id = `draw-callback-${getPostProcessLayer(this).props.id}`;
    }
    _drawLayer() {
        getPostProcessLayer(this).applyPostProcess();
    }
}
DrawCallbackLayer.layerName = 'DrawCallbackLayer';
/**
 * Modifier that marks a layer for Render-to-Target rendering.
 * Resulting layer must be used as a sublayer of a layer created
 * with `PostProcessModifier`
 */
export function RTTModifier(BaseLayer) {
    var _a;
    // @ts-expect-error initializeState is abstract
    return _a = class RTTLayer extends BaseLayer {
            draw(opts) {
                const { shaderModuleProps } = opts;
                const { picking } = shaderModuleProps;
                const postProcessLayer = getPostProcessLayer(this);
                if (!picking.isActive) {
                    postProcessLayer.enableRTT(opts);
                }
                // Draw actual layer
                super.draw(opts);
                if (!picking.isActive) {
                    postProcessLayer.disableRTT();
                }
            }
        },
        // @ts-expect-error typescript doesn't see static property
        _a.layerName = `RTT-${BaseLayer.layerName}`,
        _a;
}
/**
 * Modifier that returns the a modified Layer, which applies a
 * postprocess effect to all subLayers created using `RTTModifier`
 */
export function PostProcessModifier(BaseLayer, effect) {
    var _a;
    return _a = class PostProcessLayer extends BaseLayer {
            initializeState(context) {
                super.initializeState(context);
                this._createTextures();
                this.internalState.postProcess = new PostProcessEffect(effect, this.props);
                this.internalState.postProcess.setup(context);
            }
            updateState(params) {
                super.updateState(params);
                this.internalState.postProcess.setProps(this.props);
            }
            renderLayers() {
                let subLayers = super.renderLayers();
                if (!subLayers) {
                    return null;
                }
                subLayers = Array.isArray(subLayers) ? subLayers : [subLayers];
                return [...subLayers, new DrawCallbackLayer()];
            }
            _createTextures() {
                const { device } = this.context;
                this.internalState.renderBuffers = [0, 1].map(i => {
                    return device.createFramebuffer({
                        id: `layer-fbo-${i}`,
                        colorAttachments: [device.createTexture(TEXTURE_PROPS)],
                        depthStencilAttachment: 'depth16unorm'
                    });
                });
            }
            _resizeBuffers(opts) {
                // TODO we could likely render to a smaller buffer for better perf
                const { shaderModuleProps } = opts;
                const { viewport } = this.context;
                const { devicePixelRatio } = shaderModuleProps.project;
                const width = devicePixelRatio * viewport.width;
                const height = devicePixelRatio * viewport.height;
                this.internalState.renderBuffers.forEach((fbo) => fbo.resize({ width, height }));
            }
            enableRTT(opts) {
                this._resizeBuffers(opts);
                this.internalState.originalRenderPass = this.context.renderPass;
                const [framebuffer] = this.internalState.renderBuffers;
                // Create new render pass for RTT
                this.internalState.internalRenderPass = this.context.device.beginRenderPass({
                    framebuffer,
                    parameters: { viewport: [0, 0, framebuffer.width, framebuffer.height] },
                    // Only clear on first render
                    clearColor: this.internalState.renderInProgress ? false : [0, 0, 0, 0]
                });
                this.internalState.renderInProgress = true;
                this.context.renderPass = this.internalState.internalRenderPass;
            }
            disableRTT() {
                // End render pass, and reinstate original
                this.internalState.internalRenderPass.end();
                this.context.renderPass = this.internalState.originalRenderPass;
            }
            applyPostProcess() {
                if (!this.internalState.renderInProgress) {
                    return;
                }
                // Apply post process effect
                const [inputBuffer, swapBuffer] = this.internalState.renderBuffers;
                const { framebuffer: target } = this.context.renderPass.props;
                this.internalState.postProcess.postRender({
                    inputBuffer,
                    swapBuffer,
                    target
                });
                this.internalState.renderInProgress = false;
            }
            _finalize() {
                this.internalState.renderBuffers.forEach((fbo) => {
                    fbo.destroy();
                });
                this.internalState.renderBuffers = null;
                this.internalState.postProcess.cleanup();
            }
        },
        _a.layerName = `PostProcess${BaseLayer.layerName}`,
        _a;
}
const fs = /* glsl */ `\
vec4 copy_filterColor_ext(vec4 color, vec2 texSize, vec2 texCoord) {
  return color;
}
`;
/**
 * Copy
 * Simple module that just copies input color to output
 */
export const copy = {
    name: 'copy',
    fs,
    getUniforms: () => ({}),
    passes: [{ filter: true }]
};
//# sourceMappingURL=post-process-utils.js.map
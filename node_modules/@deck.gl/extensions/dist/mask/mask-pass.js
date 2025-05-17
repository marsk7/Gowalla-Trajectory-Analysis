// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { _LayersPass as LayersPass } from '@deck.gl/core';
const MASK_BLENDING = {
    blendColorOperation: 'subtract',
    blendColorSrcFactor: 'zero',
    blendColorDstFactor: 'one',
    blendAlphaOperation: 'subtract',
    blendAlphaSrcFactor: 'zero',
    blendAlphaDstFactor: 'one'
};
export default class MaskPass extends LayersPass {
    constructor(device, props) {
        super(device, props);
        const { mapSize = 2048 } = props;
        this.maskMap = device.createTexture({
            format: 'rgba8unorm',
            width: mapSize,
            height: mapSize,
            sampler: {
                minFilter: 'linear',
                magFilter: 'linear',
                addressModeU: 'clamp-to-edge',
                addressModeV: 'clamp-to-edge'
            }
        });
        this.fbo = device.createFramebuffer({
            id: 'maskmap',
            width: mapSize,
            height: mapSize,
            colorAttachments: [this.maskMap]
        });
    }
    render(options) {
        const colorMask = 2 ** options.channel;
        const clearColor = [255, 255, 255, 255];
        super.render({ ...options, clearColor, colorMask, target: this.fbo, pass: 'mask' });
    }
    getLayerParameters(layer, layerIndex, viewport) {
        return {
            ...layer.props.parameters,
            blend: true,
            depthCompare: 'always',
            ...MASK_BLENDING
        };
    }
    shouldDrawLayer(layer) {
        return layer.props.operation.includes('mask');
    }
    delete() {
        this.fbo.delete();
        this.maskMap.delete();
    }
}
//# sourceMappingURL=mask-pass.js.map
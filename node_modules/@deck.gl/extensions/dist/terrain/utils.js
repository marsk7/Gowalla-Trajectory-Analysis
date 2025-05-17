// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { GL } from '@luma.gl/constants';
export function createRenderTarget(device, opts) {
    return device.createFramebuffer({
        id: opts.id,
        colorAttachments: [
            device.createTexture({
                id: opts.id,
                ...(opts.float && {
                    format: 'rgba32float',
                    type: 5126
                }),
                mipmaps: false,
                sampler: opts.interpolate === false
                    ? {
                        minFilter: 'nearest',
                        magFilter: 'nearest'
                    }
                    : {
                        minFilter: 'linear',
                        magFilter: 'linear'
                    }
            })
        ]
    });
}
//# sourceMappingURL=utils.js.map
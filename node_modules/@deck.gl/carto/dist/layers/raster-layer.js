// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { CompositeLayer } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import { quadbinToOffset } from "./quadbin-utils.js";
import vs from "./raster-layer-vertex.glsl.js";
import { createBinaryProxy } from "../utils.js";
import { RTTModifier } from "./post-process-utils.js";
const defaultProps = {
    ...ColumnLayer.defaultProps,
    extruded: false,
    diskResolution: 4,
    vertices: [
        [-0.5, -0.5],
        [0.5, -0.5],
        [0.5, 0.5],
        [-0.5, 0.5]
    ]
};
// Modified ColumnLayer with custom vertex shader
// Use RTT to avoid inter-tile seams
class RasterColumnLayer extends RTTModifier(ColumnLayer) {
    getShaders() {
        const shaders = super.getShaders();
        const data = this.props.data;
        const BLOCK_WIDTH = data.data.blockSize ?? Math.sqrt(data.length);
        return { ...shaders, defines: { ...shaders.defines, BLOCK_WIDTH }, vs };
    }
    initializeState() {
        // Only add attributes needed by shader
        const attributeManager = this.getAttributeManager();
        /* eslint-disable max-len */
        attributeManager.addInstanced({
            instanceElevations: {
                size: 1,
                transition: true,
                accessor: 'getElevation'
            },
            instanceFillColors: {
                size: this.props.colorFormat.length,
                type: 'unorm8',
                transition: true,
                accessor: 'getFillColor',
                defaultValue: [0, 0, 0, 255]
            },
            instanceLineColors: {
                size: this.props.colorFormat.length,
                type: 'unorm8',
                transition: true,
                accessor: 'getLineColor',
                defaultValue: [255, 255, 255, 255]
            }
        });
    }
}
RasterColumnLayer.layerName = 'RasterColumnLayer';
function wrappedDataComparator(oldData, newData) {
    return oldData.data === newData.data && oldData.length === newData.length;
}
// Adapter layer around RasterColumnLayer that converts data & accessors into correct format
class RasterLayer extends CompositeLayer {
    renderLayers() {
        // Rendering props underlying layer
        const { data, getElevation, getFillColor, getLineColor, getLineWidth, tileIndex, updateTriggers } = this.props;
        if (!data || !tileIndex)
            return null;
        const blockSize = data.blockSize ?? 0;
        const [xOffset, yOffset, scale] = quadbinToOffset(tileIndex);
        const offset = [xOffset, yOffset];
        const lineWidthScale = scale / blockSize;
        // Filled Column Layer
        const CellLayer = this.getSubLayerClass('column', RasterColumnLayer);
        const { highlightedObjectIndex, highlightColor } = this.state;
        return new CellLayer(this.props, this.getSubLayerProps({
            id: 'cell',
            updateTriggers,
            getElevation: this.getSubLayerAccessor(getElevation),
            getFillColor: this.getSubLayerAccessor(getFillColor),
            getLineColor: this.getSubLayerAccessor(getLineColor),
            getLineWidth: this.getSubLayerAccessor(getLineWidth)
        }), {
            data: {
                data, // Pass through data for getSubLayerAccessor()
                length: blockSize * blockSize
            },
            dataComparator: wrappedDataComparator,
            offset,
            lineWidthScale, // Re-use widthScale prop to pass cell scale,
            highlightedObjectIndex,
            highlightColor,
            // RTT requires blending otherwise opacity < 1 blends with black
            // render target
            parameters: {
                blendColorSrcFactor: 'one',
                blendAlphaSrcFactor: 'one',
                blendColorDstFactor: 'zero',
                blendAlphaDstFactor: 'zero',
                blendColorOperation: 'add',
                blendAlphaOperation: 'add'
            }
        });
    }
    getSubLayerAccessor(accessor) {
        if (typeof accessor !== 'function') {
            return super.getSubLayerAccessor(accessor);
        }
        // Proxy values back in standard feature format
        return (object, info) => {
            const { data, index } = info;
            const binaryData = data.data;
            const proxy = createBinaryProxy(binaryData.cells, index);
            // @ts-ignore (TS2349) accessor is always function
            return accessor({ properties: proxy }, info);
        };
    }
    getPickingInfo(params) {
        const info = super.getPickingInfo(params);
        if (info.index !== -1) {
            info.object = this.getSubLayerAccessor((x) => x)(undefined, {
                data: this.props,
                index: info.index
            });
        }
        return info;
    }
    _updateAutoHighlight(info) {
        const { highlightedObjectIndex } = this.state;
        let newHighlightedObjectIndex = -1;
        if (info.index !== -1) {
            newHighlightedObjectIndex = info.index;
        }
        if (highlightedObjectIndex !== newHighlightedObjectIndex) {
            let { highlightColor } = this.props;
            if (typeof highlightColor === 'function') {
                highlightColor = highlightColor(info);
            }
            this.setState({
                highlightColor,
                highlightedObjectIndex: newHighlightedObjectIndex
            });
        }
    }
}
RasterLayer.layerName = 'RasterLayer';
RasterLayer.defaultProps = defaultProps;
export default RasterLayer;
//# sourceMappingURL=raster-layer.js.map
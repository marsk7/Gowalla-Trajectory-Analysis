// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Layer, project32, picking, UNIT } from '@deck.gl/core';
import { Geometry } from '@luma.gl/engine';
import { Model } from '@luma.gl/engine';
import PathTesselator from "./path-tesselator.js";
import { pathUniforms } from "./path-layer-uniforms.js";
import vs from "./path-layer-vertex.glsl.js";
import fs from "./path-layer-fragment.glsl.js";
const DEFAULT_COLOR = [0, 0, 0, 255];
const defaultProps = {
    widthUnits: 'meters',
    widthScale: { type: 'number', min: 0, value: 1 },
    widthMinPixels: { type: 'number', min: 0, value: 0 },
    widthMaxPixels: { type: 'number', min: 0, value: Number.MAX_SAFE_INTEGER },
    jointRounded: false,
    capRounded: false,
    miterLimit: { type: 'number', min: 0, value: 4 },
    billboard: false,
    _pathType: null,
    getPath: { type: 'accessor', value: (object) => object.path },
    getColor: { type: 'accessor', value: DEFAULT_COLOR },
    getWidth: { type: 'accessor', value: 1 },
    // deprecated props
    rounded: { deprecatedFor: ['jointRounded', 'capRounded'] }
};
const ATTRIBUTE_TRANSITION = {
    enter: (value, chunk) => {
        return chunk.length ? chunk.subarray(chunk.length - value.length) : value;
    }
};
/** Render lists of coordinate points as extruded polylines with mitering. */
class PathLayer extends Layer {
    getShaders() {
        return super.getShaders({ vs, fs, modules: [project32, picking, pathUniforms] }); // 'project' module added by default.
    }
    get wrapLongitude() {
        return false;
    }
    getBounds() {
        return this.getAttributeManager()?.getBounds(['vertexPositions']);
    }
    initializeState() {
        const noAlloc = true;
        const attributeManager = this.getAttributeManager();
        /* eslint-disable max-len */
        attributeManager.addInstanced({
            vertexPositions: {
                size: 3,
                // Start filling buffer from 1 vertex in
                vertexOffset: 1,
                type: 'float64',
                fp64: this.use64bitPositions(),
                transition: ATTRIBUTE_TRANSITION,
                accessor: 'getPath',
                // eslint-disable-next-line @typescript-eslint/unbound-method
                update: this.calculatePositions,
                noAlloc,
                shaderAttributes: {
                    instanceLeftPositions: {
                        vertexOffset: 0
                    },
                    instanceStartPositions: {
                        vertexOffset: 1
                    },
                    instanceEndPositions: {
                        vertexOffset: 2
                    },
                    instanceRightPositions: {
                        vertexOffset: 3
                    }
                }
            },
            instanceTypes: {
                size: 1,
                type: 'uint8',
                // eslint-disable-next-line @typescript-eslint/unbound-method
                update: this.calculateSegmentTypes,
                noAlloc
            },
            instanceStrokeWidths: {
                size: 1,
                accessor: 'getWidth',
                transition: ATTRIBUTE_TRANSITION,
                defaultValue: 1
            },
            instanceColors: {
                size: this.props.colorFormat.length,
                type: 'unorm8',
                accessor: 'getColor',
                transition: ATTRIBUTE_TRANSITION,
                defaultValue: DEFAULT_COLOR
            },
            instancePickingColors: {
                size: 4,
                type: 'uint8',
                accessor: (object, { index, target: value }) => this.encodePickingColor(object && object.__source ? object.__source.index : index, value)
            }
        });
        /* eslint-enable max-len */
        this.setState({
            pathTesselator: new PathTesselator({
                fp64: this.use64bitPositions()
            })
        });
    }
    updateState(params) {
        super.updateState(params);
        const { props, changeFlags } = params;
        const attributeManager = this.getAttributeManager();
        const geometryChanged = changeFlags.dataChanged ||
            (changeFlags.updateTriggersChanged &&
                (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getPath));
        if (geometryChanged) {
            const { pathTesselator } = this.state;
            const buffers = props.data.attributes || {};
            pathTesselator.updateGeometry({
                data: props.data,
                geometryBuffer: buffers.getPath,
                buffers,
                normalize: !props._pathType,
                loop: props._pathType === 'loop',
                getGeometry: props.getPath,
                positionFormat: props.positionFormat,
                wrapLongitude: props.wrapLongitude,
                // TODO - move the flag out of the viewport
                resolution: this.context.viewport.resolution,
                dataChanged: changeFlags.dataChanged
            });
            this.setState({
                numInstances: pathTesselator.instanceCount,
                startIndices: pathTesselator.vertexStarts
            });
            if (!changeFlags.dataChanged) {
                // Base `layer.updateState` only invalidates all attributes on data change
                // Cover the rest of the scenarios here
                attributeManager.invalidateAll();
            }
        }
        if (changeFlags.extensionsChanged) {
            this.state.model?.destroy();
            this.state.model = this._getModel();
            attributeManager.invalidateAll();
        }
    }
    getPickingInfo(params) {
        const info = super.getPickingInfo(params);
        const { index } = info;
        const data = this.props.data;
        // Check if data comes from a composite layer, wrapped with getSubLayerRow
        if (data[0] && data[0].__source) {
            // index decoded from picking color refers to the source index
            info.object = data.find(d => d.__source.index === index);
        }
        return info;
    }
    /** Override base Layer method */
    disablePickingIndex(objectIndex) {
        const data = this.props.data;
        // Check if data comes from a composite layer, wrapped with getSubLayerRow
        if (data[0] && data[0].__source) {
            // index decoded from picking color refers to the source index
            for (let i = 0; i < data.length; i++) {
                if (data[i].__source.index === objectIndex) {
                    this._disablePickingIndex(i);
                }
            }
        }
        else {
            super.disablePickingIndex(objectIndex);
        }
    }
    draw({ uniforms }) {
        const { jointRounded, capRounded, billboard, miterLimit, widthUnits, widthScale, widthMinPixels, widthMaxPixels } = this.props;
        const model = this.state.model;
        const pathProps = {
            jointType: Number(jointRounded),
            capType: Number(capRounded),
            billboard,
            widthUnits: UNIT[widthUnits],
            widthScale,
            miterLimit,
            widthMinPixels,
            widthMaxPixels
        };
        model.shaderInputs.setProps({ path: pathProps });
        model.draw(this.context.renderPass);
    }
    _getModel() {
        /*
         *       _
         *        "-_ 1                   3                       5
         *     _     "o---------------------o-------------------_-o
         *       -   / ""--..__              '.             _.-' /
         *   _     "@- - - - - ""--..__- - - - x - - - -_.@'    /
         *    "-_  /                   ""--..__ '.  _,-` :     /
         *       "o----------------------------""-o'    :     /
         *      0,2                            4 / '.  :     /
         *                                      /   '.:     /
         *                                     /     :'.   /
         *                                    /     :  ', /
         *                                   /     :     o
         */
        // prettier-ignore
        const SEGMENT_INDICES = [
            // start corner
            0, 1, 2,
            // body
            1, 4, 2,
            1, 3, 4,
            // end corner
            3, 5, 4
        ];
        // [0] position on segment - 0: start, 1: end
        // [1] side of path - -1: left, 0: center (joint), 1: right
        // prettier-ignore
        const SEGMENT_POSITIONS = [
            // bevel start corner
            0, 0,
            // start inner corner
            0, -1,
            // start outer corner
            0, 1,
            // end inner corner
            1, -1,
            // end outer corner
            1, 1,
            // bevel end corner
            1, 0
        ];
        return new Model(this.context.device, {
            ...this.getShaders(),
            id: this.props.id,
            bufferLayout: this.getAttributeManager().getBufferLayouts(),
            geometry: new Geometry({
                topology: 'triangle-list',
                attributes: {
                    indices: new Uint16Array(SEGMENT_INDICES),
                    positions: { value: new Float32Array(SEGMENT_POSITIONS), size: 2 }
                }
            }),
            isInstanced: true
        });
    }
    calculatePositions(attribute) {
        const { pathTesselator } = this.state;
        attribute.startIndices = pathTesselator.vertexStarts;
        attribute.value = pathTesselator.get('positions');
    }
    calculateSegmentTypes(attribute) {
        const { pathTesselator } = this.state;
        attribute.startIndices = pathTesselator.vertexStarts;
        attribute.value = pathTesselator.get('segmentTypes');
    }
}
PathLayer.defaultProps = defaultProps;
PathLayer.layerName = 'PathLayer';
export default PathLayer;
//# sourceMappingURL=path-layer.js.map
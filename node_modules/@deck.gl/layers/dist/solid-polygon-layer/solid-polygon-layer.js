// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Layer, project32, picking, COORDINATE_SYSTEM } from '@deck.gl/core';
import { Model, Geometry } from '@luma.gl/engine';
import { gouraudMaterial } from '@luma.gl/shadertools';
// Polygon geometry generation is managed by the polygon tesselator
import PolygonTesselator from "./polygon-tesselator.js";
import { solidPolygonUniforms } from "./solid-polygon-layer-uniforms.js";
import vsTop from "./solid-polygon-layer-vertex-top.glsl.js";
import vsSide from "./solid-polygon-layer-vertex-side.glsl.js";
import fs from "./solid-polygon-layer-fragment.glsl.js";
const DEFAULT_COLOR = [0, 0, 0, 255];
const defaultProps = {
    filled: true,
    extruded: false,
    wireframe: false,
    _normalize: true,
    _windingOrder: 'CW',
    _full3d: false,
    elevationScale: { type: 'number', min: 0, value: 1 },
    getPolygon: { type: 'accessor', value: (f) => f.polygon },
    getElevation: { type: 'accessor', value: 1000 },
    getFillColor: { type: 'accessor', value: DEFAULT_COLOR },
    getLineColor: { type: 'accessor', value: DEFAULT_COLOR },
    material: true
};
const ATTRIBUTE_TRANSITION = {
    enter: (value, chunk) => {
        return chunk.length ? chunk.subarray(chunk.length - value.length) : value;
    }
};
class SolidPolygonLayer extends Layer {
    getShaders(type) {
        return super.getShaders({
            vs: type === 'top' ? vsTop : vsSide,
            fs,
            defines: {
                RING_WINDING_ORDER_CW: !this.props._normalize && this.props._windingOrder === 'CCW' ? 0 : 1
            },
            modules: [project32, gouraudMaterial, picking, solidPolygonUniforms]
        });
    }
    get wrapLongitude() {
        return false;
    }
    getBounds() {
        return this.getAttributeManager()?.getBounds(['vertexPositions']);
    }
    initializeState() {
        const { viewport } = this.context;
        let { coordinateSystem } = this.props;
        const { _full3d } = this.props;
        if (viewport.isGeospatial && coordinateSystem === COORDINATE_SYSTEM.DEFAULT) {
            coordinateSystem = COORDINATE_SYSTEM.LNGLAT;
        }
        let preproject;
        if (coordinateSystem === COORDINATE_SYSTEM.LNGLAT) {
            if (_full3d) {
                preproject = viewport.projectPosition.bind(viewport);
            }
            else {
                preproject = viewport.projectFlat.bind(viewport);
            }
        }
        this.setState({
            numInstances: 0,
            polygonTesselator: new PolygonTesselator({
                // Lnglat coordinates are usually projected non-linearly, which affects tesselation results
                // Provide a preproject function if the coordinates are in lnglat
                preproject,
                fp64: this.use64bitPositions(),
                IndexType: Uint32Array
            })
        });
        const attributeManager = this.getAttributeManager();
        const noAlloc = true;
        attributeManager.remove(['instancePickingColors']);
        /* eslint-disable max-len */
        attributeManager.add({
            indices: {
                size: 1,
                isIndexed: true,
                // eslint-disable-next-line @typescript-eslint/unbound-method
                update: this.calculateIndices,
                noAlloc
            },
            vertexPositions: {
                size: 3,
                type: 'float64',
                stepMode: 'dynamic',
                fp64: this.use64bitPositions(),
                transition: ATTRIBUTE_TRANSITION,
                accessor: 'getPolygon',
                // eslint-disable-next-line @typescript-eslint/unbound-method
                update: this.calculatePositions,
                noAlloc,
                shaderAttributes: {
                    nextVertexPositions: {
                        vertexOffset: 1
                    }
                }
            },
            instanceVertexValid: {
                size: 1,
                type: 'uint16',
                stepMode: 'instance',
                // eslint-disable-next-line @typescript-eslint/unbound-method
                update: this.calculateVertexValid,
                noAlloc
            },
            elevations: {
                size: 1,
                stepMode: 'dynamic',
                transition: ATTRIBUTE_TRANSITION,
                accessor: 'getElevation'
            },
            fillColors: {
                size: this.props.colorFormat.length,
                type: 'unorm8',
                stepMode: 'dynamic',
                transition: ATTRIBUTE_TRANSITION,
                accessor: 'getFillColor',
                defaultValue: DEFAULT_COLOR
            },
            lineColors: {
                size: this.props.colorFormat.length,
                type: 'unorm8',
                stepMode: 'dynamic',
                transition: ATTRIBUTE_TRANSITION,
                accessor: 'getLineColor',
                defaultValue: DEFAULT_COLOR
            },
            pickingColors: {
                size: 4,
                type: 'uint8',
                stepMode: 'dynamic',
                accessor: (object, { index, target: value }) => this.encodePickingColor(object && object.__source ? object.__source.index : index, value)
            }
        });
        /* eslint-enable max-len */
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
        const { extruded, filled, wireframe, elevationScale } = this.props;
        const { topModel, sideModel, wireframeModel, polygonTesselator } = this.state;
        const renderUniforms = {
            extruded: Boolean(extruded),
            elevationScale,
            isWireframe: false
        };
        // Note - the order is important
        if (wireframeModel && wireframe) {
            wireframeModel.setInstanceCount(polygonTesselator.instanceCount - 1);
            wireframeModel.shaderInputs.setProps({ solidPolygon: { ...renderUniforms, isWireframe: true } });
            wireframeModel.draw(this.context.renderPass);
        }
        if (sideModel && filled) {
            sideModel.setInstanceCount(polygonTesselator.instanceCount - 1);
            sideModel.shaderInputs.setProps({ solidPolygon: renderUniforms });
            sideModel.draw(this.context.renderPass);
        }
        if (topModel && filled) {
            topModel.setVertexCount(polygonTesselator.vertexCount);
            topModel.shaderInputs.setProps({ solidPolygon: renderUniforms });
            topModel.draw(this.context.renderPass);
        }
    }
    updateState(updateParams) {
        super.updateState(updateParams);
        this.updateGeometry(updateParams);
        const { props, oldProps, changeFlags } = updateParams;
        const attributeManager = this.getAttributeManager();
        const regenerateModels = changeFlags.extensionsChanged ||
            props.filled !== oldProps.filled ||
            props.extruded !== oldProps.extruded;
        if (regenerateModels) {
            this.state.models?.forEach(model => model.destroy());
            this.setState(this._getModels());
            attributeManager.invalidateAll();
        }
    }
    updateGeometry({ props, oldProps, changeFlags }) {
        const geometryConfigChanged = changeFlags.dataChanged ||
            (changeFlags.updateTriggersChanged &&
                (changeFlags.updateTriggersChanged.all || changeFlags.updateTriggersChanged.getPolygon));
        // When the geometry config  or the data is changed,
        // tessellator needs to be invoked
        if (geometryConfigChanged) {
            const { polygonTesselator } = this.state;
            const buffers = props.data.attributes || {};
            polygonTesselator.updateGeometry({
                data: props.data,
                normalize: props._normalize,
                geometryBuffer: buffers.getPolygon,
                buffers,
                getGeometry: props.getPolygon,
                positionFormat: props.positionFormat,
                wrapLongitude: props.wrapLongitude,
                // TODO - move the flag out of the viewport
                resolution: this.context.viewport.resolution,
                fp64: this.use64bitPositions(),
                dataChanged: changeFlags.dataChanged,
                full3d: props._full3d
            });
            this.setState({
                numInstances: polygonTesselator.instanceCount,
                startIndices: polygonTesselator.vertexStarts
            });
            if (!changeFlags.dataChanged) {
                // Base `layer.updateState` only invalidates all attributes on data change
                // Cover the rest of the scenarios here
                this.getAttributeManager().invalidateAll();
            }
        }
    }
    _getModels() {
        const { id, filled, extruded } = this.props;
        let topModel;
        let sideModel;
        let wireframeModel;
        if (filled) {
            const shaders = this.getShaders('top');
            shaders.defines.NON_INSTANCED_MODEL = 1;
            const bufferLayout = this.getAttributeManager().getBufferLayouts({ isInstanced: false });
            topModel = new Model(this.context.device, {
                ...shaders,
                id: `${id}-top`,
                topology: 'triangle-list',
                bufferLayout,
                isIndexed: true,
                userData: {
                    excludeAttributes: { instanceVertexValid: true }
                }
            });
        }
        if (extruded) {
            const bufferLayout = this.getAttributeManager().getBufferLayouts({ isInstanced: true });
            sideModel = new Model(this.context.device, {
                ...this.getShaders('side'),
                id: `${id}-side`,
                bufferLayout,
                geometry: new Geometry({
                    topology: 'triangle-strip',
                    attributes: {
                        // top right - top left - bottom right - bottom left
                        positions: {
                            size: 2,
                            value: new Float32Array([1, 0, 0, 0, 1, 1, 0, 1])
                        }
                    }
                }),
                isInstanced: true,
                userData: {
                    excludeAttributes: { indices: true }
                }
            });
            wireframeModel = new Model(this.context.device, {
                ...this.getShaders('side'),
                id: `${id}-wireframe`,
                bufferLayout,
                geometry: new Geometry({
                    topology: 'line-strip',
                    attributes: {
                        // top right - top left - bottom left - bottom right
                        positions: {
                            size: 2,
                            value: new Float32Array([1, 0, 0, 0, 0, 1, 1, 1])
                        }
                    }
                }),
                isInstanced: true,
                userData: {
                    excludeAttributes: { indices: true }
                }
            });
        }
        return {
            models: [sideModel, wireframeModel, topModel].filter(Boolean),
            topModel,
            sideModel,
            wireframeModel
        };
    }
    calculateIndices(attribute) {
        const { polygonTesselator } = this.state;
        attribute.startIndices = polygonTesselator.indexStarts;
        attribute.value = polygonTesselator.get('indices');
    }
    calculatePositions(attribute) {
        const { polygonTesselator } = this.state;
        attribute.startIndices = polygonTesselator.vertexStarts;
        attribute.value = polygonTesselator.get('positions');
    }
    calculateVertexValid(attribute) {
        attribute.value = this.state.polygonTesselator.get('vertexValid');
    }
}
SolidPolygonLayer.defaultProps = defaultProps;
SolidPolygonLayer.layerName = 'SolidPolygonLayer';
export default SolidPolygonLayer;
//# sourceMappingURL=solid-polygon-layer.js.map
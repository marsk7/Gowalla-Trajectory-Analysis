// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Layer, project32, picking, UNIT } from '@deck.gl/core';
import { gouraudMaterial, phongMaterial } from '@luma.gl/shadertools';
import { Model } from '@luma.gl/engine';
import ColumnGeometry from "./column-geometry.js";
import { columnUniforms } from "./column-layer-uniforms.js";
import vs from "./column-layer-vertex.glsl.js";
import fs from "./column-layer-fragment.glsl.js";
const DEFAULT_COLOR = [0, 0, 0, 255];
const defaultProps = {
    diskResolution: { type: 'number', min: 4, value: 20 },
    vertices: null,
    radius: { type: 'number', min: 0, value: 1000 },
    angle: { type: 'number', value: 0 },
    offset: { type: 'array', value: [0, 0] },
    coverage: { type: 'number', min: 0, max: 1, value: 1 },
    elevationScale: { type: 'number', min: 0, value: 1 },
    radiusUnits: 'meters',
    lineWidthUnits: 'meters',
    lineWidthScale: 1,
    lineWidthMinPixels: 0,
    lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
    extruded: true,
    wireframe: false,
    filled: true,
    stroked: false,
    flatShading: false,
    getPosition: { type: 'accessor', value: (x) => x.position },
    getFillColor: { type: 'accessor', value: DEFAULT_COLOR },
    getLineColor: { type: 'accessor', value: DEFAULT_COLOR },
    getLineWidth: { type: 'accessor', value: 1 },
    getElevation: { type: 'accessor', value: 1000 },
    material: true,
    getColor: { deprecatedFor: ['getFillColor', 'getLineColor'] }
};
/** Render extruded cylinders (tessellated regular polygons) at given coordinates. */
class ColumnLayer extends Layer {
    getShaders() {
        const defines = {};
        const { flatShading } = this.props;
        if (flatShading) {
            defines.FLAT_SHADING = 1;
        }
        return super.getShaders({
            vs,
            fs,
            defines,
            modules: [project32, flatShading ? phongMaterial : gouraudMaterial, picking, columnUniforms]
        });
    }
    /**
     * DeckGL calls initializeState when GL context is available
     * Essentially a deferred constructor
     */
    initializeState() {
        const attributeManager = this.getAttributeManager();
        /* eslint-disable max-len */
        attributeManager.addInstanced({
            instancePositions: {
                size: 3,
                type: 'float64',
                fp64: this.use64bitPositions(),
                transition: true,
                accessor: 'getPosition'
            },
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
                defaultValue: DEFAULT_COLOR
            },
            instanceLineColors: {
                size: this.props.colorFormat.length,
                type: 'unorm8',
                transition: true,
                accessor: 'getLineColor',
                defaultValue: DEFAULT_COLOR
            },
            instanceStrokeWidths: {
                size: 1,
                accessor: 'getLineWidth',
                transition: true
            }
        });
        /* eslint-enable max-len */
    }
    updateState(params) {
        super.updateState(params);
        const { props, oldProps, changeFlags } = params;
        const regenerateModels = changeFlags.extensionsChanged || props.flatShading !== oldProps.flatShading;
        if (regenerateModels) {
            this.state.models?.forEach(model => model.destroy());
            this.setState(this._getModels());
            this.getAttributeManager().invalidateAll();
        }
        const instanceCount = this.getNumInstances();
        this.state.fillModel.setInstanceCount(instanceCount);
        this.state.wireframeModel.setInstanceCount(instanceCount);
        if (regenerateModels ||
            props.diskResolution !== oldProps.diskResolution ||
            props.vertices !== oldProps.vertices ||
            (props.extruded || props.stroked) !== (oldProps.extruded || oldProps.stroked)) {
            this._updateGeometry(props);
        }
    }
    getGeometry(diskResolution, vertices, hasThinkness) {
        const geometry = new ColumnGeometry({
            radius: 1,
            height: hasThinkness ? 2 : 0,
            vertices,
            nradial: diskResolution
        });
        let meanVertexDistance = 0;
        if (vertices) {
            for (let i = 0; i < diskResolution; i++) {
                const p = vertices[i];
                const d = Math.sqrt(p[0] * p[0] + p[1] * p[1]);
                meanVertexDistance += d / diskResolution;
            }
        }
        else {
            meanVertexDistance = 1;
        }
        this.setState({
            edgeDistance: Math.cos(Math.PI / diskResolution) * meanVertexDistance
        });
        return geometry;
    }
    _getModels() {
        const shaders = this.getShaders();
        const bufferLayout = this.getAttributeManager().getBufferLayouts();
        const fillModel = new Model(this.context.device, {
            ...shaders,
            id: `${this.props.id}-fill`,
            bufferLayout,
            isInstanced: true
        });
        const wireframeModel = new Model(this.context.device, {
            ...shaders,
            id: `${this.props.id}-wireframe`,
            bufferLayout,
            isInstanced: true
        });
        return {
            fillModel,
            wireframeModel,
            models: [wireframeModel, fillModel]
        };
    }
    _updateGeometry({ diskResolution, vertices, extruded, stroked }) {
        const geometry = this.getGeometry(diskResolution, vertices, extruded || stroked);
        this.setState({
            fillVertexCount: geometry.attributes.POSITION.value.length / 3
        });
        const fillModel = this.state.fillModel;
        const wireframeModel = this.state.wireframeModel;
        fillModel.setGeometry(geometry);
        fillModel.setTopology('triangle-strip');
        // Disable indices
        fillModel.setIndexBuffer(null);
        wireframeModel.setGeometry(geometry);
        wireframeModel.setTopology('line-list');
    }
    draw({ uniforms }) {
        const { lineWidthUnits, lineWidthScale, lineWidthMinPixels, lineWidthMaxPixels, radiusUnits, elevationScale, extruded, filled, stroked, wireframe, offset, coverage, radius, angle } = this.props;
        const fillModel = this.state.fillModel;
        const wireframeModel = this.state.wireframeModel;
        const { fillVertexCount, edgeDistance } = this.state;
        const columnProps = {
            radius,
            angle: (angle / 180) * Math.PI,
            offset,
            extruded,
            stroked,
            coverage,
            elevationScale,
            edgeDistance,
            radiusUnits: UNIT[radiusUnits],
            widthUnits: UNIT[lineWidthUnits],
            widthScale: lineWidthScale,
            widthMinPixels: lineWidthMinPixels,
            widthMaxPixels: lineWidthMaxPixels
        };
        // When drawing 3d: draw wireframe first so it doesn't get occluded by depth test
        if (extruded && wireframe) {
            wireframeModel.shaderInputs.setProps({
                column: {
                    ...columnProps,
                    isStroke: true
                }
            });
            wireframeModel.draw(this.context.renderPass);
        }
        if (filled) {
            // model.setProps({isIndexed: false});
            fillModel.setVertexCount(fillVertexCount);
            fillModel.shaderInputs.setProps({
                column: {
                    ...columnProps,
                    isStroke: false
                }
            });
            fillModel.draw(this.context.renderPass);
        }
        // When drawing 2d: draw fill before stroke so that the outline is always on top
        if (!extruded && stroked) {
            // model.setProps({isIndexed: false});
            // The width of the stroke is achieved by flattening the side of the cylinder.
            // Skip the last 1/3 of the vertices which is the top.
            fillModel.setVertexCount((fillVertexCount * 2) / 3);
            fillModel.shaderInputs.setProps({
                column: {
                    ...columnProps,
                    isStroke: true
                }
            });
            fillModel.draw(this.context.renderPass);
        }
    }
}
ColumnLayer.layerName = 'ColumnLayer';
ColumnLayer.defaultProps = defaultProps;
export default ColumnLayer;
//# sourceMappingURL=column-layer.js.map
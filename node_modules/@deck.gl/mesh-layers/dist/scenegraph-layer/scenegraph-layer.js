// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Layer, project32, picking, log } from '@deck.gl/core';
import { pbrMaterial } from '@luma.gl/shadertools';
import { ScenegraphNode, GroupNode, ModelNode } from '@luma.gl/engine';
import { createScenegraphsFromGLTF } from '@luma.gl/gltf';
import { GLTFLoader, postProcessGLTF } from '@loaders.gl/gltf';
import { waitForGLTFAssets } from "./gltf-utils.js";
import { MATRIX_ATTRIBUTES, shouldComposeModelMatrix } from "../utils/matrix.js";
import { scenegraphUniforms } from "./scenegraph-layer-uniforms.js";
import vs from "./scenegraph-layer-vertex.glsl.js";
import fs from "./scenegraph-layer-fragment.glsl.js";
const DEFAULT_COLOR = [255, 255, 255, 255];
const defaultProps = {
    scenegraph: { type: 'object', value: null, async: true },
    getScene: gltf => {
        if (gltf && gltf.scenes) {
            // gltf post processor replaces `gltf.scene` number with the scene `object`
            return typeof gltf.scene === 'object' ? gltf.scene : gltf.scenes[gltf.scene || 0];
        }
        return gltf;
    },
    getAnimator: scenegraph => scenegraph && scenegraph.animator,
    _animations: null,
    sizeScale: { type: 'number', value: 1, min: 0 },
    sizeMinPixels: { type: 'number', min: 0, value: 0 },
    sizeMaxPixels: { type: 'number', min: 0, value: Number.MAX_SAFE_INTEGER },
    getPosition: { type: 'accessor', value: (x) => x.position },
    getColor: { type: 'accessor', value: DEFAULT_COLOR },
    // flat or pbr
    _lighting: 'flat',
    // _lighting must be pbr for this to work
    _imageBasedLightingEnvironment: undefined,
    // yaw, pitch and roll are in degrees
    // https://en.wikipedia.org/wiki/Euler_angles
    // [pitch, yaw, roll]
    getOrientation: { type: 'accessor', value: [0, 0, 0] },
    getScale: { type: 'accessor', value: [1, 1, 1] },
    getTranslation: { type: 'accessor', value: [0, 0, 0] },
    // 4x4 matrix
    getTransformMatrix: { type: 'accessor', value: [] },
    loaders: [GLTFLoader]
};
/** Render a number of instances of a complete glTF scenegraph. */
class ScenegraphLayer extends Layer {
    getShaders() {
        const defines = {};
        let pbr;
        if (this.props._lighting === 'pbr') {
            pbr = pbrMaterial;
            defines.LIGHTING_PBR = 1;
        }
        else {
            // Dummy shader module needed to handle
            // pbrMaterial.pbr_baseColorSampler binding
            pbr = { name: 'pbrMaterial' };
        }
        const modules = [project32, picking, scenegraphUniforms, pbr];
        return super.getShaders({ defines, vs, fs, modules });
    }
    initializeState() {
        const attributeManager = this.getAttributeManager();
        // attributeManager is always defined for primitive layers
        attributeManager.addInstanced({
            instancePositions: {
                size: 3,
                type: 'float64',
                fp64: this.use64bitPositions(),
                accessor: 'getPosition',
                transition: true
            },
            instanceColors: {
                type: 'unorm8',
                size: this.props.colorFormat.length,
                accessor: 'getColor',
                defaultValue: DEFAULT_COLOR,
                transition: true
            },
            instanceModelMatrix: MATRIX_ATTRIBUTES
        });
    }
    updateState(params) {
        super.updateState(params);
        const { props, oldProps } = params;
        if (props.scenegraph !== oldProps.scenegraph) {
            this._updateScenegraph();
        }
        else if (props._animations !== oldProps._animations) {
            this._applyAnimationsProp(this.state.animator, props._animations);
        }
    }
    finalizeState(context) {
        super.finalizeState(context);
        this.state.scenegraph?.destroy();
    }
    get isLoaded() {
        return Boolean(this.state?.scenegraph && super.isLoaded);
    }
    _updateScenegraph() {
        const props = this.props;
        const { device } = this.context;
        let scenegraphData = null;
        if (props.scenegraph instanceof ScenegraphNode) {
            // Signature 1: props.scenegraph is a proper luma.gl Scenegraph
            scenegraphData = { scenes: [props.scenegraph] };
        }
        else if (props.scenegraph && typeof props.scenegraph === 'object') {
            // Converts loaders.gl gltf to luma.gl scenegraph using the undocumented @luma.gl/experimental function
            const gltf = props.scenegraph;
            // Tiles3DLoader already processes GLTF
            const processedGLTF = gltf.json ? postProcessGLTF(gltf) : gltf;
            const gltfObjects = createScenegraphsFromGLTF(device, processedGLTF, this._getModelOptions());
            scenegraphData = { gltf: processedGLTF, ...gltfObjects };
            waitForGLTFAssets(gltfObjects)
                .then(() => {
                this.setNeedsRedraw();
            })
                .catch(ex => {
                this.raiseError(ex, 'loading glTF');
            });
        }
        const options = { layer: this, device: this.context.device };
        const scenegraph = props.getScene(scenegraphData, options);
        const animator = props.getAnimator(scenegraphData, options);
        if (scenegraph instanceof GroupNode) {
            this.state.scenegraph?.destroy();
            this._applyAnimationsProp(animator, props._animations);
            const models = [];
            scenegraph.traverse(node => {
                if (node instanceof ModelNode) {
                    models.push(node.model);
                }
            });
            this.setState({ scenegraph, animator, models });
            this.getAttributeManager().invalidateAll();
        }
        else if (scenegraph !== null) {
            log.warn('invalid scenegraph:', scenegraph)();
        }
    }
    _applyAnimationsProp(animator, animationsProp) {
        if (!animator || !animationsProp) {
            return;
        }
        const animations = animator.getAnimations();
        // sort() to ensure '*' comes first so that other values can override
        Object.keys(animationsProp)
            .sort()
            .forEach(key => {
            // Key can be:
            //  - number for index number
            //  - name for animation name
            //  - * to affect all animations
            const value = animationsProp[key];
            if (key === '*') {
                animations.forEach(animation => {
                    Object.assign(animation, value);
                });
            }
            else if (Number.isFinite(Number(key))) {
                const number = Number(key);
                if (number >= 0 && number < animations.length) {
                    Object.assign(animations[number], value);
                }
                else {
                    log.warn(`animation ${key} not found`)();
                }
            }
            else {
                const findResult = animations.find(({ name }) => name === key);
                if (findResult) {
                    Object.assign(findResult, value);
                }
                else {
                    log.warn(`animation ${key} not found`)();
                }
            }
        });
    }
    _getModelOptions() {
        const { _imageBasedLightingEnvironment } = this.props;
        let env;
        if (_imageBasedLightingEnvironment) {
            if (typeof _imageBasedLightingEnvironment === 'function') {
                env = _imageBasedLightingEnvironment({ gl: this.context.gl, layer: this });
            }
            else {
                env = _imageBasedLightingEnvironment;
            }
        }
        return {
            imageBasedLightingEnvironment: env,
            modelOptions: {
                id: this.props.id,
                isInstanced: true,
                bufferLayout: this.getAttributeManager().getBufferLayouts(),
                ...this.getShaders()
            },
            // tangents are not supported
            useTangents: false
        };
    }
    draw({ context }) {
        if (!this.state.scenegraph)
            return;
        if (this.props._animations && this.state.animator) {
            this.state.animator.animate(context.timeline.getTime());
            this.setNeedsRedraw();
        }
        const { viewport, renderPass } = this.context;
        const { sizeScale, sizeMinPixels, sizeMaxPixels, coordinateSystem } = this.props;
        const numInstances = this.getNumInstances();
        this.state.scenegraph.traverse((node, { worldMatrix }) => {
            if (node instanceof ModelNode) {
                const { model } = node;
                model.setInstanceCount(numInstances);
                const pbrProjectionProps = {
                    // Needed for PBR (TODO: find better way to get it)
                    camera: model.uniforms.cameraPosition
                };
                const scenegraphProps = {
                    sizeScale,
                    sizeMinPixels,
                    sizeMaxPixels,
                    composeModelMatrix: shouldComposeModelMatrix(viewport, coordinateSystem),
                    sceneModelMatrix: worldMatrix
                };
                model.shaderInputs.setProps({
                    pbrProjection: pbrProjectionProps,
                    scenegraph: scenegraphProps
                });
                model.draw(renderPass);
            }
        });
    }
}
ScenegraphLayer.defaultProps = defaultProps;
ScenegraphLayer.layerName = 'ScenegraphLayer';
export default ScenegraphLayer;
//# sourceMappingURL=scenegraph-layer.js.map
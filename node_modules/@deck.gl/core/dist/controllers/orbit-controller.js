// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { clamp } from '@math.gl/core';
import Controller from "./controller.js";
import ViewState from "./view-state.js";
import { mod } from "../utils/math-utils.js";
import LinearInterpolator from "../transitions/linear-interpolator.js";
export class OrbitState extends ViewState {
    constructor(options) {
        const { 
        /* Viewport arguments */
        width, // Width of viewport
        height, // Height of viewport
        rotationX = 0, // Rotation around x axis
        rotationOrbit = 0, // Rotation around orbit axis
        target = [0, 0, 0], zoom = 0, 
        /* Viewport constraints */
        minRotationX = -90, maxRotationX = 90, minZoom = -Infinity, maxZoom = Infinity, 
        /** Interaction states, required to calculate change during transform */
        // Model state when the pan operation first started
        startPanPosition, 
        // Model state when the rotate operation first started
        startRotatePos, startRotationX, startRotationOrbit, 
        // Model state when the zoom operation first started
        startZoomPosition, startZoom } = options;
        super({
            width,
            height,
            rotationX,
            rotationOrbit,
            target,
            zoom,
            minRotationX,
            maxRotationX,
            minZoom,
            maxZoom
        }, {
            startPanPosition,
            startRotatePos,
            startRotationX,
            startRotationOrbit,
            startZoomPosition,
            startZoom
        });
        this.makeViewport = options.makeViewport;
    }
    /**
     * Start panning
     * @param {[Number, Number]} pos - position on screen where the pointer grabs
     */
    panStart({ pos }) {
        return this._getUpdatedState({
            startPanPosition: this._unproject(pos)
        });
    }
    /**
     * Pan
     * @param {[Number, Number]} pos - position on screen where the pointer is
     */
    pan({ pos, startPosition }) {
        const startPanPosition = this.getState().startPanPosition || startPosition;
        if (!startPanPosition) {
            return this;
        }
        const viewport = this.makeViewport(this.getViewportProps());
        const newProps = viewport.panByPosition(startPanPosition, pos);
        return this._getUpdatedState(newProps);
    }
    /**
     * End panning
     * Must call if `panStart()` was called
     */
    panEnd() {
        return this._getUpdatedState({
            startPanPosition: null
        });
    }
    /**
     * Start rotating
     * @param {[Number, Number]} pos - position on screen where the pointer grabs
     */
    rotateStart({ pos }) {
        return this._getUpdatedState({
            startRotatePos: pos,
            startRotationX: this.getViewportProps().rotationX,
            startRotationOrbit: this.getViewportProps().rotationOrbit
        });
    }
    /**
     * Rotate
     * @param {[Number, Number]} pos - position on screen where the pointer is
     */
    rotate({ pos, deltaAngleX = 0, deltaAngleY = 0 }) {
        const { startRotatePos, startRotationX, startRotationOrbit } = this.getState();
        const { width, height } = this.getViewportProps();
        if (!startRotatePos || startRotationX === undefined || startRotationOrbit === undefined) {
            return this;
        }
        let newRotation;
        if (pos) {
            let deltaScaleX = (pos[0] - startRotatePos[0]) / width;
            const deltaScaleY = (pos[1] - startRotatePos[1]) / height;
            if (startRotationX < -90 || startRotationX > 90) {
                // When looking at the "back" side of the scene, invert horizontal drag
                // so that the camera movement follows user input
                deltaScaleX *= -1;
            }
            newRotation = {
                rotationX: startRotationX + deltaScaleY * 180,
                rotationOrbit: startRotationOrbit + deltaScaleX * 180
            };
        }
        else {
            newRotation = {
                rotationX: startRotationX + deltaAngleY,
                rotationOrbit: startRotationOrbit + deltaAngleX
            };
        }
        return this._getUpdatedState(newRotation);
    }
    /**
     * End rotating
     * Must call if `rotateStart()` was called
     */
    rotateEnd() {
        return this._getUpdatedState({
            startRotationX: null,
            startRotationOrbit: null
        });
    }
    // shortest path between two view states
    shortestPathFrom(viewState) {
        const fromProps = viewState.getViewportProps();
        const props = { ...this.getViewportProps() };
        const { rotationOrbit } = props;
        if (Math.abs(rotationOrbit - fromProps.rotationOrbit) > 180) {
            props.rotationOrbit = rotationOrbit < 0 ? rotationOrbit + 360 : rotationOrbit - 360;
        }
        return props;
    }
    /**
     * Start zooming
     * @param {[Number, Number]} pos - position on screen where the pointer grabs
     */
    zoomStart({ pos }) {
        return this._getUpdatedState({
            startZoomPosition: this._unproject(pos),
            startZoom: this.getViewportProps().zoom
        });
    }
    /**
     * Zoom
     * @param {[Number, Number]} pos - position on screen where the current target is
     * @param {[Number, Number]} startPos - the target position at
     *   the start of the operation. Must be supplied of `zoomStart()` was not called
     * @param {Number} scale - a number between [0, 1] specifying the accumulated
     *   relative scale.
     */
    zoom({ pos, startPos, scale }) {
        let { startZoom, startZoomPosition } = this.getState();
        if (!startZoomPosition) {
            // We have two modes of zoom:
            // scroll zoom that are discrete events (transform from the current zoom level),
            // and pinch zoom that are continuous events (transform from the zoom level when
            // pinch started).
            // If startZoom state is defined, then use the startZoom state;
            // otherwise assume discrete zooming
            startZoom = this.getViewportProps().zoom;
            startZoomPosition = this._unproject(startPos) || this._unproject(pos);
        }
        if (!startZoomPosition) {
            return this;
        }
        const newZoom = this._calculateNewZoom({ scale, startZoom });
        const zoomedViewport = this.makeViewport({ ...this.getViewportProps(), zoom: newZoom });
        return this._getUpdatedState({
            zoom: newZoom,
            ...zoomedViewport.panByPosition(startZoomPosition, pos)
        });
    }
    /**
     * End zooming
     * Must call if `zoomStart()` was called
     */
    zoomEnd() {
        return this._getUpdatedState({
            startZoomPosition: null,
            startZoom: null
        });
    }
    zoomIn(speed = 2) {
        return this._getUpdatedState({
            zoom: this._calculateNewZoom({ scale: speed })
        });
    }
    zoomOut(speed = 2) {
        return this._getUpdatedState({
            zoom: this._calculateNewZoom({ scale: 1 / speed })
        });
    }
    moveLeft(speed = 50) {
        return this._panFromCenter([-speed, 0]);
    }
    moveRight(speed = 50) {
        return this._panFromCenter([speed, 0]);
    }
    moveUp(speed = 50) {
        return this._panFromCenter([0, -speed]);
    }
    moveDown(speed = 50) {
        return this._panFromCenter([0, speed]);
    }
    rotateLeft(speed = 15) {
        return this._getUpdatedState({
            rotationOrbit: this.getViewportProps().rotationOrbit - speed
        });
    }
    rotateRight(speed = 15) {
        return this._getUpdatedState({
            rotationOrbit: this.getViewportProps().rotationOrbit + speed
        });
    }
    rotateUp(speed = 10) {
        return this._getUpdatedState({
            rotationX: this.getViewportProps().rotationX - speed
        });
    }
    rotateDown(speed = 10) {
        return this._getUpdatedState({
            rotationX: this.getViewportProps().rotationX + speed
        });
    }
    /* Private methods */
    _unproject(pos) {
        const viewport = this.makeViewport(this.getViewportProps());
        // @ts-ignore
        return pos && viewport.unproject(pos);
    }
    // Calculates new zoom
    _calculateNewZoom({ scale, startZoom }) {
        const { maxZoom, minZoom } = this.getViewportProps();
        if (startZoom === undefined) {
            startZoom = this.getViewportProps().zoom;
        }
        const zoom = startZoom + Math.log2(scale);
        return clamp(zoom, minZoom, maxZoom);
    }
    _panFromCenter(offset) {
        const { width, height, target } = this.getViewportProps();
        return this.pan({
            startPosition: target,
            pos: [width / 2 + offset[0], height / 2 + offset[1]]
        });
    }
    _getUpdatedState(newProps) {
        // @ts-ignore
        return new this.constructor({
            makeViewport: this.makeViewport,
            ...this.getViewportProps(),
            ...this.getState(),
            ...newProps
        });
    }
    // Apply any constraints (mathematical or defined by _viewportProps) to map state
    applyConstraints(props) {
        // Ensure zoom is within specified range
        const { maxZoom, minZoom, zoom, maxRotationX, minRotationX, rotationOrbit } = props;
        props.zoom = Array.isArray(zoom)
            ? [clamp(zoom[0], minZoom, maxZoom), clamp(zoom[1], minZoom, maxZoom)]
            : clamp(zoom, minZoom, maxZoom);
        props.rotationX = clamp(props.rotationX, minRotationX, maxRotationX);
        if (rotationOrbit < -180 || rotationOrbit > 180) {
            props.rotationOrbit = mod(rotationOrbit + 180, 360) - 180;
        }
        return props;
    }
}
export default class OrbitController extends Controller {
    constructor() {
        super(...arguments);
        this.ControllerState = OrbitState;
        this.transition = {
            transitionDuration: 300,
            transitionInterpolator: new LinearInterpolator({
                transitionProps: {
                    compare: ['target', 'zoom', 'rotationX', 'rotationOrbit'],
                    required: ['target', 'zoom']
                }
            })
        };
    }
}
//# sourceMappingURL=orbit-controller.js.map
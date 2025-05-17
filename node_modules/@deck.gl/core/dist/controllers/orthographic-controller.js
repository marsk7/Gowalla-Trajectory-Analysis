// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { clamp } from '@math.gl/core';
import Controller from "./controller.js";
import { OrbitState } from "./orbit-controller.js";
import LinearInterpolator from "../transitions/linear-interpolator.js";
class OrthographicState extends OrbitState {
    constructor(props) {
        super(props);
        this.zoomAxis = props.zoomAxis || 'all';
    }
    _calculateNewZoom({ scale, startZoom }) {
        const { maxZoom, minZoom } = this.getViewportProps();
        if (startZoom === undefined) {
            startZoom = this.getViewportProps().zoom;
        }
        let deltaZoom = Math.log2(scale);
        if (Array.isArray(startZoom)) {
            let [newZoomX, newZoomY] = startZoom;
            switch (this.zoomAxis) {
                case 'X':
                    // Scale x only
                    newZoomX = clamp(newZoomX + deltaZoom, minZoom, maxZoom);
                    break;
                case 'Y':
                    // Scale y only
                    newZoomY = clamp(newZoomY + deltaZoom, minZoom, maxZoom);
                    break;
                default:
                    // Lock aspect ratio
                    let z = Math.min(newZoomX + deltaZoom, newZoomY + deltaZoom);
                    if (z < minZoom) {
                        deltaZoom += minZoom - z;
                    }
                    z = Math.max(newZoomX + deltaZoom, newZoomY + deltaZoom);
                    if (z > maxZoom) {
                        deltaZoom += maxZoom - z;
                    }
                    newZoomX += deltaZoom;
                    newZoomY += deltaZoom;
            }
            return [newZoomX, newZoomY];
        }
        // Ignore `zoomAxis`
        // `LinearTransitionInterpolator` does not support interpolation between a number and an array
        // So if zoom is a number (legacy use case), new zoom still has to be a number
        return clamp(startZoom + deltaZoom, minZoom, maxZoom);
    }
}
export default class OrthographicController extends Controller {
    constructor() {
        super(...arguments);
        this.ControllerState = OrthographicState;
        this.transition = {
            transitionDuration: 300,
            transitionInterpolator: new LinearInterpolator(['target', 'zoom'])
        };
        this.dragMode = 'pan';
    }
    _onPanRotate() {
        // No rotation in orthographic view
        return false;
    }
}
//# sourceMappingURL=orthographic-controller.js.map
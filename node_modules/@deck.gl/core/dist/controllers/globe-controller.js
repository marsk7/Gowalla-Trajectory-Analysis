// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { clamp } from '@math.gl/core';
import Controller from "./controller.js";
import { MapState } from "./map-controller.js";
import { mod } from "../utils/math-utils.js";
import LinearInterpolator from "../transitions/linear-interpolator.js";
import { MAX_LATITUDE } from '@math.gl/web-mercator';
class GlobeState extends MapState {
    // Apply any constraints (mathematical or defined by _viewportProps) to map state
    applyConstraints(props) {
        // Ensure zoom is within specified range
        const { maxZoom, minZoom, zoom } = props;
        props.zoom = clamp(zoom, minZoom, maxZoom);
        const { longitude, latitude } = props;
        if (longitude < -180 || longitude > 180) {
            props.longitude = mod(longitude + 180, 360) - 180;
        }
        props.latitude = clamp(latitude, -MAX_LATITUDE, MAX_LATITUDE);
        return props;
    }
}
export default class GlobeController extends Controller {
    constructor() {
        super(...arguments);
        this.ControllerState = GlobeState;
        this.transition = {
            transitionDuration: 300,
            transitionInterpolator: new LinearInterpolator(['longitude', 'latitude', 'zoom'])
        };
        this.dragMode = 'pan';
    }
    setProps(props) {
        super.setProps(props);
        // TODO - support pitching?
        this.dragRotate = false;
        this.touchRotate = false;
    }
}
//# sourceMappingURL=globe-controller.js.map
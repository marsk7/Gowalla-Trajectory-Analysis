import Controller from "./controller.js";
import ViewState from "./view-state.js";
import type Viewport from "../viewports/viewport.js";
import LinearInterpolator from "../transitions/linear-interpolator.js";
import { Vector3 } from '@math.gl/core';
type FirstPersonStateProps = {
    width: number;
    height: number;
    position?: number[];
    bearing?: number;
    pitch?: number;
    longitude?: number | null;
    latitude?: number | null;
    maxPitch?: number;
    minPitch?: number;
};
type FirstPersonStateInternal = {
    startRotatePos?: [number, number];
    startBearing?: number;
    startPitch?: number;
    startZoomPosition?: number[];
    startPanPos?: [number, number];
    startPanPosition?: number[];
};
declare class FirstPersonState extends ViewState<FirstPersonState, FirstPersonStateProps, FirstPersonStateInternal> {
    makeViewport: (props: Record<string, any>) => Viewport;
    constructor(options: FirstPersonStateProps & FirstPersonStateInternal & {
        makeViewport: (props: Record<string, any>) => Viewport;
    });
    /**
     * Start panning
     * @param {[Number, Number]} pos - position on screen where the pointer grabs
     */
    panStart({ pos }: {
        pos: any;
    }): FirstPersonState;
    /**
     * Pan
     * @param {[Number, Number]} pos - position on screen where the pointer is
     */
    pan({ pos }: {
        pos: any;
    }): FirstPersonState;
    /**
     * End panning
     * Must call if `panStart()` was called
     */
    panEnd(): FirstPersonState;
    /**
     * Start rotating
     * @param {[Number, Number]} pos - position on screen where the pointer grabs
     */
    rotateStart({ pos }: {
        pos: [number, number];
    }): FirstPersonState;
    /**
     * Rotate
     * @param {[Number, Number]} pos - position on screen where the pointer is
     */
    rotate({ pos, deltaAngleX, deltaAngleY }: {
        pos?: [number, number];
        deltaAngleX?: number;
        deltaAngleY: number;
    }): FirstPersonState;
    /**
     * End rotating
     * Must call if `rotateStart()` was called
     */
    rotateEnd(): FirstPersonState;
    /**
     * Start zooming
     * @param {[Number, Number]} pos - position on screen where the pointer grabs
     */
    zoomStart(): FirstPersonState;
    /**
     * Zoom
     * @param {[Number, Number]} pos - position on screen where the current center is
     * @param {[Number, Number]} startPos - the center position at
     *   the start of the operation. Must be supplied of `zoomStart()` was not called
     * @param {Number} scale - a number between [0, 1] specifying the accumulated
     *   relative scale.
     */
    zoom({ pos, scale }: {
        pos: [number, number];
        scale: number;
    }): FirstPersonState;
    /**
     * End zooming
     * Must call if `zoomStart()` was called
     */
    zoomEnd(): FirstPersonState;
    moveLeft(speed?: number): FirstPersonState;
    moveRight(speed?: number): FirstPersonState;
    moveUp(speed?: number): FirstPersonState;
    moveDown(speed?: number): FirstPersonState;
    rotateLeft(speed?: number): FirstPersonState;
    rotateRight(speed?: number): FirstPersonState;
    rotateUp(speed?: number): FirstPersonState;
    rotateDown(speed?: number): FirstPersonState;
    zoomIn(speed?: number): FirstPersonState;
    zoomOut(speed?: number): FirstPersonState;
    shortestPathFrom(viewState: FirstPersonState): {
        width: number;
        height: number;
        position: number[];
        bearing: number;
        pitch: number;
        longitude: number | null;
        latitude: number | null;
        maxPitch: number;
        minPitch: number;
    };
    _move(direction: Vector3, speed: number, fromPosition?: number[]): FirstPersonState;
    getDirection(use2D?: boolean): Vector3;
    _getUpdatedState(newProps: Record<string, any>): FirstPersonState;
    applyConstraints(props: Required<FirstPersonStateProps>): Required<FirstPersonStateProps>;
}
export default class FirstPersonController extends Controller<FirstPersonState> {
    ControllerState: typeof FirstPersonState;
    transition: {
        transitionDuration: number;
        transitionInterpolator: LinearInterpolator;
    };
}
export {};
//# sourceMappingURL=first-person-controller.d.ts.map
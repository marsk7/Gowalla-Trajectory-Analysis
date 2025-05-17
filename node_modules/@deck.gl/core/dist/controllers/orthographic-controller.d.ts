import Controller from "./controller.js";
import { OrbitState } from "./orbit-controller.js";
import LinearInterpolator from "../transitions/linear-interpolator.js";
declare class OrthographicState extends OrbitState {
    zoomAxis: 'X' | 'Y' | 'all';
    constructor(props: any);
    _calculateNewZoom({ scale, startZoom }: {
        scale: any;
        startZoom: any;
    }): number | any[];
}
export default class OrthographicController extends Controller<OrbitState> {
    ControllerState: typeof OrthographicState;
    transition: {
        transitionDuration: number;
        transitionInterpolator: LinearInterpolator;
    };
    dragMode: 'pan' | 'rotate';
    _onPanRotate(): boolean;
}
export {};
//# sourceMappingURL=orthographic-controller.d.ts.map
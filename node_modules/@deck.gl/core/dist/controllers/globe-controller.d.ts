import Controller, { ControllerProps } from "./controller.js";
import { MapState, MapStateProps } from "./map-controller.js";
import LinearInterpolator from "../transitions/linear-interpolator.js";
declare class GlobeState extends MapState {
    applyConstraints(props: Required<MapStateProps>): Required<MapStateProps>;
}
export default class GlobeController extends Controller<MapState> {
    ControllerState: typeof GlobeState;
    transition: {
        transitionDuration: number;
        transitionInterpolator: LinearInterpolator;
    };
    dragMode: 'pan' | 'rotate';
    setProps(props: ControllerProps): void;
}
export {};
//# sourceMappingURL=globe-controller.d.ts.map
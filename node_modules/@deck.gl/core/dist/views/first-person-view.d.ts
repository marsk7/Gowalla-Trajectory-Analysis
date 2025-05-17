import View, { CommonViewState, CommonViewProps } from "./view.js";
import FirstPersonViewport from "../viewports/first-person-viewport.js";
import FirstPersonController from "../controllers/first-person-controller.js";
export type FirstPersonViewState = {
    /** Longitude of the camera, in the geospatial case. */
    longitude?: number;
    /** Latitude of the camera, in the geospatial case. */
    latitude?: number;
    /** Meter offsets of the camera from the lng-lat anchor point. Default `[0, 0, 0]`. */
    position?: [number, number, number];
    /** Bearing (heading) of the camera in degrees. Default `0` (north). */
    bearing?: number;
    /** Pitch (tilt) of the camera in degrees. Default `0` (horizontal). */
    pitch?: number;
    /** Min pitch angle. Default `-90` (up). */
    minPitch?: number;
    /** Max pitch angle. Default `90` (down). */
    maxPitch?: number;
    /** Transform applied to the camera position and direction */
    modelMatrix?: number[] | null;
} & CommonViewState;
export type FirstPersonViewProps = {
    /** Custom projection matrix */
    projectionMatrix?: number[];
    /** Field of view covered by camera, in degrees. Default `75`. */
    fovy?: number;
    /** Distance of near clipping plane. Default `0.1`. */
    near?: number;
    /** Distance of far clipping plane. Default `1000`. */
    far?: number;
    /** Modifier of viewport scale. Corresponds to the number of pixels per meter. Default `1`. */
    focalDistance?: number;
} & CommonViewProps<FirstPersonViewState>;
export default class FirstPersonView extends View<FirstPersonViewState, FirstPersonViewProps> {
    static displayName: string;
    constructor(props?: FirstPersonViewProps);
    getViewportType(): typeof FirstPersonViewport;
    get ControllerType(): typeof FirstPersonController;
}
//# sourceMappingURL=first-person-view.d.ts.map
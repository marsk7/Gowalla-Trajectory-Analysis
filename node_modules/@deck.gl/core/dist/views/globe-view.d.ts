import View, { CommonViewState, CommonViewProps } from "./view.js";
import GlobeViewport from "../viewports/globe-viewport.js";
import WebMercatorViewport from "../viewports/web-mercator-viewport.js";
import GlobeController from "../controllers/globe-controller.js";
export type GlobeViewState = {
    /** Longitude of the map center */
    longitude: number;
    /** Latitude of the map center */
    latitude: number;
    /** Zoom level */
    zoom: number;
    /** Min zoom, default `0` */
    minZoom?: number;
    /** Max zoom, default `20` */
    maxZoom?: number;
    /** The near plane position */
    nearZ?: number;
    /** The far plane position */
    farZ?: number;
} & CommonViewState;
export type GlobeViewProps = {
    /** The resolution at which to turn flat features into 3D meshes, in degrees. Smaller numbers will generate more detailed mesh. Default `10`. */
    resolution?: number;
    /** Scaler for the near plane, 1 unit equals to the height of the viewport. Default to `0.1`. Overwrites the `near` parameter. */
    nearZMultiplier?: number;
    /** Scaler for the far plane, 1 unit equals to the distance from the camera to the top edge of the screen. Default to `1.01`. Overwrites the `far` parameter. */
    farZMultiplier?: number;
    /** Distance of the camera relative to viewport height. Default `1.5`. */
    altitude?: number;
} & CommonViewProps<GlobeViewState>;
export default class GlobeView extends View<GlobeViewState, GlobeViewProps> {
    static displayName: string;
    constructor(props?: GlobeViewProps);
    getViewportType(viewState: GlobeViewState): typeof WebMercatorViewport | typeof GlobeViewport;
    get ControllerType(): typeof GlobeController;
}
//# sourceMappingURL=globe-view.d.ts.map
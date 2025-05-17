import type { MapViewState } from "../views/map-view.js";
export type MapProps = {
    /** mapboxgl, maplibregl, or compatible library */
    mapLib: {
        Map: any;
        accessToken?: string;
    };
    container: HTMLElement;
    mapStyle?: string;
    mapboxApiAccessToken?: string;
    /** Directly passed to Map class constructor */
    mapOptions?: any;
    width: number;
    height: number;
    viewState: MapViewState;
};
/** A small wrapper that turns mapbox-gl or maplibre-gl Map into a stateless component
 */
export declare class MapWrapper {
    constructor(props: MapProps);
    private props;
    private map;
    private width;
    private height;
    finalize(): void;
    setProps(props: Partial<MapProps>): void;
    redraw(): void;
    getMap(): any;
    private _initialize;
    private _update;
}
//# sourceMappingURL=map-wrapper.d.ts.map
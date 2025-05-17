import type { ViewState, PointLike, PaddingOptions, ImmutableLike, LngLatBoundsLike } from "../types/common.js";
import type { StyleSpecification, SkySpecification, LightSpecification, TerrainSpecification, ProjectionSpecification } from "../types/style-spec.js";
import type { MapInstance } from "../types/lib.js";
import type { MapCallbacks } from "../types/events.js";
export type MaplibreProps = Partial<ViewState> & MapCallbacks & {
    /** Camera options used when constructing the Map instance */
    initialViewState?: Partial<ViewState> & {
        /** The initial bounds of the map. If bounds is specified, it overrides longitude, latitude and zoom options. */
        bounds?: LngLatBoundsLike;
        /** A fitBounds options object to use only when setting the bounds option. */
        fitBoundsOptions?: {
            offset?: PointLike;
            minZoom?: number;
            maxZoom?: number;
            padding?: number | PaddingOptions;
        };
    };
    /** If provided, render into an external WebGL context */
    gl?: WebGLRenderingContext;
    /** For external controller to override the camera state */
    viewState?: ViewState & {
        width: number;
        height: number;
    };
    /** Mapbox style */
    mapStyle?: string | StyleSpecification | ImmutableLike<StyleSpecification>;
    /** Enable diffing when the map style changes
     * @default true
     */
    styleDiffing?: boolean;
    /** The projection property of the style. Must conform to the Projection Style Specification.
     * @default 'mercator'
     */
    projection?: ProjectionSpecification | 'mercator' | 'globe';
    /** Light properties of the map. */
    light?: LightSpecification;
    /** Terrain property of the style. Must conform to the Terrain Style Specification.
     * If `undefined` is provided, removes terrain from the map. */
    terrain?: TerrainSpecification;
    /** Sky properties of the map. Must conform to the Sky Style Specification. */
    sky?: SkySpecification;
    /** Default layers to query on pointer events */
    interactiveLayerIds?: string[];
    /** CSS cursor */
    cursor?: string;
};
/**
 * A wrapper for mapbox-gl's Map class
 */
export default class Maplibre {
    private _MapClass;
    private _map;
    props: MaplibreProps;
    private _internalUpdate;
    private _hoveredFeatures;
    private _propsedCameraUpdate;
    private _styleComponents;
    static savedMaps: Maplibre[];
    constructor(MapClass: {
        new (options: any): MapInstance;
    }, props: MaplibreProps, container: HTMLDivElement);
    get map(): MapInstance;
    setProps(props: MaplibreProps): void;
    static reuse(props: MaplibreProps, container: HTMLDivElement): Maplibre;
    private _initialize;
    recycle(): void;
    destroy(): void;
    redraw(): void;
    private _updateSize;
    private _updateViewState;
    private _updateSettings;
    private _updateStyle;
    private _updateStyleComponents;
    private _updateHandlers;
    private _onEvent;
    private _onCameraEvent;
    private _onCameraUpdate;
    private _queryRenderedFeatures;
    private _updateHover;
    private _onPointerEvent;
}
//# sourceMappingURL=maplibre.d.ts.map
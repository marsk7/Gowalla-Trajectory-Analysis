import * as React from 'react';
import { MapboxProps } from "../mapbox/mapbox.js";
import { MapRef } from "../mapbox/create-ref.js";
import type { CSSProperties } from 'react';
import { GlobalSettings } from "../utils/set-globals.js";
import type { MapLib, MapOptions } from "../types/lib.js";
export type MapContextValue = {
    mapLib: MapLib;
    map: MapRef;
};
export declare const MapContext: React.Context<MapContextValue>;
type MapInitOptions = Omit<MapOptions, 'style' | 'container' | 'bounds' | 'fitBoundsOptions' | 'center'>;
export type MapProps = MapInitOptions & MapboxProps & GlobalSettings & {
    mapLib?: MapLib | Promise<MapLib>;
    reuseMaps?: boolean;
    /** Map container id */
    id?: string;
    /** Map container CSS style */
    style?: CSSProperties;
    children?: any;
};
export declare const Map: React.ForwardRefExoticComponent<MapInitOptions & Partial<import("..").ViewState> & import("..").MapCallbacks & {
    mapboxAccessToken?: string;
    initialViewState?: Partial<import("..").ViewState> & {
        bounds?: import("mapbox-gl").LngLatBoundsLike;
        fitBoundsOptions?: {
            offset?: import("mapbox-gl").PointLike;
            minZoom?: number;
            maxZoom?: number;
            padding?: number | import("mapbox-gl").PaddingOptions;
        };
    };
    gl?: WebGLRenderingContext;
    viewState?: import("..").ViewState & {
        width: number;
        height: number;
    };
    mapStyle?: string | import("mapbox-gl").StyleSpecification | import("..").ImmutableLike<import("mapbox-gl").StyleSpecification>;
    styleDiffing?: boolean;
    projection?: import("mapbox-gl").ProjectionSpecification | import("mapbox-gl").ProjectionSpecification["name"];
    fog?: import("mapbox-gl").FogSpecification;
    light?: import("mapbox-gl").LightSpecification;
    terrain?: import("mapbox-gl").TerrainSpecification;
    interactiveLayerIds?: string[];
    cursor?: string;
} & GlobalSettings & {
    mapLib?: MapLib | Promise<MapLib>;
    reuseMaps?: boolean;
    /** Map container id */
    id?: string;
    /** Map container CSS style */
    style?: CSSProperties;
    children?: any;
} & React.RefAttributes<MapRef>>;
export {};
//# sourceMappingURL=map.d.ts.map
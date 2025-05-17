import * as React from 'react';
import { MaplibreProps } from "../maplibre/maplibre.js";
import { MapRef } from "../maplibre/create-ref.js";
import type { CSSProperties } from 'react';
import { GlobalSettings } from "../utils/set-globals.js";
import type { MapLib, MapOptions } from "../types/lib.js";
export type MapContextValue = {
    mapLib: MapLib;
    map: MapRef;
};
export declare const MapContext: React.Context<MapContextValue>;
type MapInitOptions = Omit<MapOptions, 'style' | 'container' | 'bounds' | 'fitBoundsOptions' | 'center'>;
export type MapProps = MapInitOptions & MaplibreProps & GlobalSettings & {
    mapLib?: MapLib | Promise<MapLib>;
    reuseMaps?: boolean;
    /** Map container id */
    id?: string;
    /** Map container CSS style */
    style?: CSSProperties;
    children?: any;
};
export declare const Map: React.ForwardRefExoticComponent<MapInitOptions & Partial<import("..").ViewState> & import("..").MapCallbacks & {
    initialViewState?: Partial<import("..").ViewState> & {
        bounds?: import("maplibre-gl").LngLatBoundsLike;
        fitBoundsOptions?: {
            offset?: import("maplibre-gl").PointLike;
            minZoom?: number;
            maxZoom?: number;
            padding?: number | import("maplibre-gl").PaddingOptions;
        };
    };
    gl?: WebGLRenderingContext;
    viewState?: import("..").ViewState & {
        width: number;
        height: number;
    };
    mapStyle?: string | import("maplibre-gl").StyleSpecification | import("..").ImmutableLike<import("maplibre-gl").StyleSpecification>;
    styleDiffing?: boolean;
    projection?: import("maplibre-gl").ProjectionSpecification | "mercator" | "globe";
    light?: import("maplibre-gl").LightSpecification;
    terrain?: import("maplibre-gl").TerrainSpecification;
    sky?: import("maplibre-gl").SkySpecification;
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
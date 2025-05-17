import { Basemap, KeplerMapConfig } from "./types.js";
import { APIErrorContext } from '@carto/api-client';
/**
 * Get basemap properties for Carto map.
 *
 * For maplibre-based basemaps it returns style or style URL that can be used with  `maplibregl.Map` compatible component.
 *  * style url is returned for non-filtered standard Carto basemaps or if user used style URL directly in configuration
 *  * filtered style object returned for Carto basemaps with layer groups filtered
 *
 * For Google-maps base maps, it returns options that can be used with `google.maps.Map` constructor.
 */
export declare function fetchBasemapProps({ config, errorContext, applyLayerFilters }: {
    config: KeplerMapConfig;
    /** By default `fetchBasemapProps` applies layers filters to style. Set this to `false` to disable it. */
    applyLayerFilters?: boolean;
    errorContext?: APIErrorContext;
}): Promise<Basemap | null>;
//# sourceMappingURL=basemap.d.ts.map
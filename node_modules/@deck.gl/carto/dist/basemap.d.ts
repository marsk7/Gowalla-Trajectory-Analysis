import { APIErrorContext } from '@carto/api-client';
import { GoogleBasemapProps } from "./api/types.js";
export declare const CARTO_MAP_STYLES: string[];
export declare const GOOGLE_BASEMAPS: Record<string, GoogleBasemapProps>;
type StyleLayerGroupSlug = 'label' | 'road' | 'border' | 'building' | 'water' | 'land';
type StyleLayerGroup = {
    slug: StyleLayerGroupSlug;
    filter: (layer: any) => boolean;
    defaultVisibility: boolean;
};
export declare const STYLE_LAYER_GROUPS: StyleLayerGroup[];
export declare function applyLayerGroupFilters(style: any, visibleLayerGroups: Record<StyleLayerGroupSlug, boolean>): any;
export declare function someLayerGroupsDisabled(visibleLayerGroups?: Record<StyleLayerGroupSlug, boolean>): boolean | undefined;
export declare function getStyleUrl(styleType: string): string;
export declare function fetchStyle({ styleUrl, errorContext }: {
    styleUrl: string;
    errorContext?: APIErrorContext;
}): Promise<any>;
declare const _default: {
    readonly VOYAGER: string;
    readonly POSITRON: string;
    readonly DARK_MATTER: string;
    readonly VOYAGER_NOLABELS: string;
    readonly POSITRON_NOLABELS: string;
    readonly DARK_MATTER_NOLABELS: string;
};
export default _default;
//# sourceMappingURL=basemap.d.ts.map
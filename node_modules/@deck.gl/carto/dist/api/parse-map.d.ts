import { Layer } from '@deck.gl/core';
export type ParseMapResult = {
    /** Map id. */
    id: string;
    /** Title of map. */
    title: string;
    /** Description of map. */
    description?: string;
    createdAt: string;
    updatedAt: string;
    initialViewState: any;
    /** @deprecated Use `basemap`. */
    mapStyle: any;
    token: string;
    layers: Layer[];
};
export declare function parseMap(json: any): {
    id: any;
    title: any;
    description: any;
    createdAt: any;
    updatedAt: any;
    initialViewState: any;
    /** @deprecated Use `basemap`. */
    mapStyle: {
        styleType: string;
        visibleLayerGroups: Record<string, boolean>;
    };
    token: any;
    layers: any;
};
//# sourceMappingURL=parse-map.d.ts.map
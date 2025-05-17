import { ParseMapResult } from "./parse-map.js";
import type { Basemap } from "./types.js";
export type FetchMapOptions = {
    /**
     * CARTO platform access token. Only required for private maps.
     */
    accessToken?: string;
    /**
     * Base URL of the CARTO Maps API.
     *
     * Example for account located in EU-west region: `https://gcp-eu-west1.api.carto.com`
     *
     * @default https://gcp-us-east1.api.carto.com
     */
    apiBaseUrl?: string;
    /**
     * Identifier of map created in CARTO Builder.
     */
    cartoMapId: string;
    clientId?: string;
    /**
     * Custom HTTP headers added to map instantiation and data requests.
     */
    headers?: Record<string, string>;
    /**
     * Interval in seconds at which to autoRefresh the data. If provided, `onNewData` must also be provided.
     */
    autoRefresh?: number;
    /**
     * Callback function that will be invoked whenever data in layers is changed. If provided, `autoRefresh` must also be provided.
     */
    onNewData?: (map: any) => void;
    /**
     * Maximum URL character length. Above this limit, requests use POST.
     * Used to avoid browser and CDN limits.
     * @default {@link DEFAULT_MAX_LENGTH_URL}
     */
    maxLengthURL?: number;
};
export type FetchMapResult = ParseMapResult & {
    /**
     * Basemap properties.
     */
    basemap: Basemap | null;
    stopAutoRefresh?: () => void;
};
export declare function fetchMap({ accessToken, apiBaseUrl, cartoMapId, clientId, headers, autoRefresh, onNewData, maxLengthURL }: FetchMapOptions): Promise<FetchMapResult>;
//# sourceMappingURL=fetch-map.d.ts.map
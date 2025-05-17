import type { LoaderOptions } from '@loaders.gl/loader-utils';
export type TileJSONLoaderOptions = LoaderOptions & {
    /** Options for the TileJSONLoader */
    tilejson?: {
        /** Max number of unique values */
        maxValues?: number;
    };
};
/**
 * Loader for TileJSON metadata
 */
export declare const TileJSONLoader: any;
//# sourceMappingURL=tilejson-loader.d.ts.map
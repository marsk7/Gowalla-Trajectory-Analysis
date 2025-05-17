import type { LoaderOptions } from '@loaders.gl/loader-utils';
/** options to load data from 3tz */
export type Tiles3DArchiveFileLoaderOptions = LoaderOptions & {
    '3d-tiles-archive'?: {
        /** path inside the 3tz archive */
        path?: string;
    };
};
/**
 * Loader for 3tz packages
 */
export declare const Tiles3DArchiveFileLoader: {
    dataType: ArrayBuffer;
    batchType: never;
    name: string;
    id: string;
    module: string;
    version: any;
    mimeTypes: string[];
    parse: typeof parse3DTilesArchive;
    extensions: string[];
    options: {};
};
/**
 * returns a single file from the 3tz archive
 * @param data 3tz archive data
 * @param options options
 * @returns requested file
 */
declare function parse3DTilesArchive(data: ArrayBuffer, options?: Tiles3DArchiveFileLoaderOptions): Promise<ArrayBuffer>;
export {};
//# sourceMappingURL=3d-tiles-archive-loader.d.ts.map
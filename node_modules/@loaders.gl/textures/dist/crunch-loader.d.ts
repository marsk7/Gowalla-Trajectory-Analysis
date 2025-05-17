import type { LoaderOptions } from '@loaders.gl/loader-utils';
import type { TextureLevel } from '@loaders.gl/schema';
/** CrunchLoader options */
export type CrunchLoaderOptions = LoaderOptions & {
    /** CrunchLoader options */
    crunch?: {
        /** @deprecated Specify where to load the Crunch decoder library */
        libraryPath?: string;
        /** Override the URL to the worker bundle (by default loads from unpkg.com) */
        workerUrl?: string;
    };
};
/**
 * Worker loader for the Crunch compressed texture container format
 * @note We avoid bundling crunch - it is a rare format and large lib, so we only offer worker loader
 */
export declare const CrunchLoader: {
    readonly dataType: TextureLevel[];
    readonly batchType: never;
    readonly id: "crunch";
    readonly name: "Crunch";
    readonly module: "textures";
    readonly version: any;
    readonly worker: true;
    readonly extensions: ["crn"];
    readonly mimeTypes: ["image/crn", "image/x-crn", "application/octet-stream"];
    readonly binary: true;
    readonly options: {
        readonly crunch: {
            readonly libraryPath: "libs/";
        };
    };
};
//# sourceMappingURL=crunch-loader.d.ts.map
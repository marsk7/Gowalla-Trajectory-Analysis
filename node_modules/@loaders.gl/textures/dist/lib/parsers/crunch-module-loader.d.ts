import { LoaderOptions } from '@loaders.gl/loader-utils';
export declare const CRUNCH_EXTERNAL_LIBRARIES: {
    /** Crunch decoder library. It is used as dynamically imported script */
    DECODER: string;
};
/**
 * Load crunch decoder module
 * @param options - loader options
 * @returns Promise of module object
 */
export declare function loadCrunchModule(options: LoaderOptions): Promise<any>;
//# sourceMappingURL=crunch-module-loader.d.ts.map
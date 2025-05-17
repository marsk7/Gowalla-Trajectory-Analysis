import type { DataType, Loader, LoaderContext, LoaderOptions, LoaderOptionsType, LoaderReturnType, LoaderArrayOptionsType, LoaderArrayReturnType } from '@loaders.gl/loader-utils';
/**
 * Parses `data` using a specified loader
 * Note: Load does duplicate a lot of parse.
 * it can also call fetchFile on string urls, which `parse` won't do.
 * @param data
 * @param loaders
 * @param options
 * @param context
 */
export declare function load<LoaderT extends Loader, OptionsT extends LoaderOptions = LoaderOptionsType<LoaderT>>(url: string | DataType, loader: LoaderT, options?: OptionsT, context?: LoaderContext): Promise<LoaderReturnType<LoaderT>>;
export declare function load<LoaderArrayT extends Loader[], OptionsT extends LoaderOptions = LoaderArrayOptionsType<LoaderArrayT>>(url: string | DataType, loaders: LoaderArrayT, options?: OptionsT, context?: LoaderContext): Promise<LoaderArrayReturnType<LoaderArrayT>>;
/**
 * Loads data asynchronously by matching a pre-registered loader
 * @deprecated Loader registration is deprecated, use load(data, loaders, options) instead
 */
export declare function load(url: string | DataType, loaders?: LoaderOptions, context?: LoaderContext): Promise<unknown>;
//# sourceMappingURL=load.d.ts.map
import type { Loader, LoaderOptions, LoaderContext, SyncDataType, LoaderOptionsType, LoaderReturnType, LoaderArrayOptionsType, LoaderArrayReturnType } from '@loaders.gl/loader-utils';
/**
 * Parses `data` synchronously using the specified loader
 */
export declare function parseSync<LoaderT extends Loader, OptionsT extends LoaderOptions = LoaderOptionsType<LoaderT>>(data: SyncDataType, loader: LoaderT, options?: OptionsT, context?: LoaderContext): LoaderReturnType<LoaderT>;
/**
 * Parses `data` synchronously by matching one of the supplied loaders
 */
export declare function parseSync<LoaderArrayT extends Loader[], OptionsT extends LoaderOptions = LoaderArrayOptionsType<LoaderArrayT>>(data: SyncDataType, loaders: LoaderArrayT, options?: OptionsT, context?: LoaderContext): LoaderArrayReturnType<LoaderArrayT>;
/**
 * Parses `data` synchronously by matching a pre=registered loader
 * @deprecated Loader registration is deprecated, use parseSync(data, loaders, options) instead
 */
export declare function parseSync(data: SyncDataType, options?: LoaderOptions): unknown;
//# sourceMappingURL=parse-sync.d.ts.map
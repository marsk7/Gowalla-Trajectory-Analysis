import type { Loader, LoaderContext, LoaderOptions, DataType, LoaderOptionsType, LoaderReturnType, LoaderArrayOptionsType, LoaderArrayReturnType } from '@loaders.gl/loader-utils';
/**
 * Parses `data` asynchronously using the supplied loader
 */
export declare function parse<LoaderT extends Loader, OptionsT extends LoaderOptions = LoaderOptionsType<LoaderT>>(data: DataType | Promise<DataType>, loader: LoaderT, options?: OptionsT, context?: LoaderContext): Promise<LoaderReturnType<LoaderT>>;
/**
 * Parses `data` asynchronously by matching one of the supplied loader
 */
export declare function parse<LoaderArrayT extends Loader[], OptionsT extends LoaderOptions = LoaderArrayOptionsType<LoaderArrayT>>(data: DataType | Promise<DataType>, loaders: LoaderArrayT, options?: OptionsT, context?: LoaderContext): Promise<LoaderArrayReturnType<LoaderArrayT>>;
/**
 * Parses data asynchronously by matching a pre-registered loader
 * @deprecated Loader registration is deprecated, use parse(data, loaders, options) instead
 */
export declare function parse(data: DataType | Promise<DataType>, options?: LoaderOptions): Promise<unknown>;
//# sourceMappingURL=parse.d.ts.map
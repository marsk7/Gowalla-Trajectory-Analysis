import type { Loader, LoaderOptions, LoaderContext, BatchableDataType, LoaderOptionsType, LoaderBatchType, LoaderArrayOptionsType, LoaderArrayBatchType } from '@loaders.gl/loader-utils';
/**
 * Parses `data` synchronously using a specified loader
 */
export declare function parseInBatches<LoaderT extends Loader, OptionsT extends LoaderOptions = LoaderOptionsType<LoaderT>>(data: BatchableDataType, loader: LoaderT, options?: OptionsT, context?: LoaderContext): Promise<AsyncIterable<LoaderBatchType<LoaderT>>>;
/**
 * Parses `data` using one of the supplied loaders
 */
export declare function parseInBatches<LoaderArrayT extends Loader[], OptionsT extends LoaderOptions = LoaderArrayOptionsType<LoaderArrayT>>(data: BatchableDataType, loaders: LoaderArrayT, options?: OptionsT, context?: LoaderContext): Promise<LoaderArrayBatchType<LoaderArrayT>>;
/**
 * Parses `data` in batches by selecting a pre-registered loader
 * @deprecated Loader registration is deprecated, use parseInBatches(data, loaders, options) instead
 */
export declare function parseInBatches(data: BatchableDataType, options?: LoaderOptions): Promise<AsyncIterable<unknown>>;
//# sourceMappingURL=parse-in-batches.d.ts.map
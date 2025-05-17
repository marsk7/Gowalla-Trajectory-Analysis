import type { LoaderWithParser, LoaderOptions, LoaderContext, LoaderBatchType, LoaderOptionsType } from '@loaders.gl/loader-utils';
type FileType = string | File | Blob | Response | (string | File | Blob | Response)[] | FileList;
/**
 * Parses `data` synchronously using a specified loader
 */
export declare function loadInBatches<LoaderT extends LoaderWithParser, OptionsT extends LoaderOptions = LoaderOptionsType<LoaderT>>(files: FileType, loader: LoaderT, options?: OptionsT, context?: LoaderContext): Promise<AsyncIterable<LoaderBatchType<LoaderT>>>;
/**
 * Parses `data` using a specified loader
 * @param data
 * @param loaders
 * @param options
 * @param context
 */
export declare function loadInBatches(files: FileType, loaders?: LoaderWithParser | LoaderWithParser[] | LoaderOptions, options?: LoaderOptions, context?: LoaderContext): Promise<AsyncIterable<unknown>>;
export declare function loadInBatches(files: FileType[] | FileList, loaders?: LoaderWithParser | LoaderWithParser[] | LoaderOptions, options?: LoaderOptions, context?: LoaderContext): Promise<AsyncIterable<unknown>>[];
export {};
//# sourceMappingURL=load-in-batches.d.ts.map
import type { LoaderContext, LoaderOptions, FetchLike } from '@loaders.gl/loader-utils';
/**
 * Gets the current fetch function from options and context
 * @param options
 * @param context
 */
export declare function getFetchFunction(options?: LoaderOptions, context?: Omit<LoaderContext, 'fetch'> & Partial<Pick<LoaderContext, 'fetch'>>): FetchLike;
//# sourceMappingURL=get-fetch-function.d.ts.map
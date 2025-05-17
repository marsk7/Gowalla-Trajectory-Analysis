import { Loader } from '@loaders.gl/loader-utils';
/**
 * Register a list of global loaders
 * @note Registration erases loader type information.
 * @deprecated It is recommended that applications manage loader registration. This function will likely be remove in loaders.gl v5
 */
export declare function registerLoaders(loaders: Loader[] | Loader): void;
/**
 * @deprecated It is recommended that applications manage loader registration. This function will likely be remove in loaders.gl v5
 */
export declare function getRegisteredLoaders(): Loader[];
/** @deprecated For testing only  */
export declare function _unregisterLoaders(): void;
//# sourceMappingURL=register-loaders.d.ts.map
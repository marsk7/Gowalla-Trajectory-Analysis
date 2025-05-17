import { FileProviderInterface } from '@loaders.gl/loader-utils';
/** Description of zip signature type */
export type ZipSignature = Uint8Array;
/**
 * looking for the last occurrence of the provided
 * @param file
 * @param target
 * @returns
 */
export declare const searchFromTheEnd: (file: FileProviderInterface, target: ZipSignature) => Promise<bigint>;
//# sourceMappingURL=search-from-the-end.d.ts.map
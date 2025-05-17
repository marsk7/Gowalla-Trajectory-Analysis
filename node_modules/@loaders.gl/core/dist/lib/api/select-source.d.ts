import type { Source } from '@loaders.gl/loader-utils';
/** Guess service type from URL */
export declare function selectSource(url: string | Blob, sources: Source[], options?: {
    /** Provide id of a source to select that source. Omit or provide 'auto' to test the source*/
    type?: string;
    nothrow?: boolean;
}): Source | null;
//# sourceMappingURL=select-source.d.ts.map
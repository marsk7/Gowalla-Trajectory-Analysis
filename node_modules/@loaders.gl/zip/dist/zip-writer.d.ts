import type { WriterOptions } from '@loaders.gl/loader-utils';
import { JSZipGeneratorOptions } from 'jszip';
export type ZipWriterOptions = WriterOptions & {
    zip?: {
        onUpdate?: (metadata: {
            percent: number;
        }) => void;
    };
    /** Passthrough options to jszip */
    jszip?: JSZipGeneratorOptions;
};
/**
 * Zip exporter
 */
export declare const ZipWriter: {
    readonly name: "Zip Archive";
    readonly id: "zip";
    readonly module: "zip";
    readonly version: any;
    readonly extensions: ["zip"];
    readonly category: "archive";
    readonly mimeTypes: ["application/zip"];
    readonly options: {
        readonly zip: {
            readonly onUpdate: () => void;
        };
        readonly jszip: {};
    };
    readonly encode: typeof encodeZipAsync;
};
declare function encodeZipAsync(fileMap: Record<string, ArrayBuffer>, options?: ZipWriterOptions): Promise<ArrayBuffer>;
export {};
//# sourceMappingURL=zip-writer.d.ts.map
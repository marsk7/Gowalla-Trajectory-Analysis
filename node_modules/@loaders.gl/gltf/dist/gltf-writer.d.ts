import type { WriterOptions, WriterWithEncoder } from '@loaders.gl/loader-utils';
export type GLTFWriterOptions = WriterOptions & {
    gltf?: {};
    byteOffset?: number;
};
/**
 * GLTF exporter
 */
export declare const GLTFWriter: WriterWithEncoder<any, never, GLTFWriterOptions>;
//# sourceMappingURL=gltf-writer.d.ts.map
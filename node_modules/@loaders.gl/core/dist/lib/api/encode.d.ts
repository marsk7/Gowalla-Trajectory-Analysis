import type { WriterOptions, WriterWithEncoder, WriterOptionsType, WriterDataType, WriterBatchType } from '@loaders.gl/loader-utils';
/**
 * Encode loaded data into a binary ArrayBuffer using the specified Writer.
 */
export declare function encode<WriterT extends WriterWithEncoder>(data: WriterDataType<WriterT>, writer: WriterT, options_?: WriterOptionsType<WriterT>): Promise<ArrayBuffer>;
/**
 * Encode loaded data into a binary ArrayBuffer using the specified Writer.
 */
export declare function encodeSync<WriterT extends WriterWithEncoder>(data: WriterDataType<WriterT>, writer: WriterT, options?: WriterOptionsType<WriterT>): ArrayBuffer;
/**
 * Encode loaded data to text using the specified Writer
 * @note This is a convenience function not intended for production use on large input data.
 * It is not optimized for performance. Data maybe converted from text to binary and back.
 * @throws if the writer does not generate text output
 */
export declare function encodeText<WriterT extends WriterWithEncoder>(data: WriterDataType<WriterT>, writer: WriterT, options?: WriterOptionsType<WriterT>): Promise<string>;
/**
 * Encode loaded data to text using the specified Writer
 * @note This is a convenience function not intended for production use on large input data.
 * It is not optimized for performance. Data maybe converted from text to binary and back.
 * @throws if the writer does not generate text output
 */
export declare function encodeTextSync<WriterT extends WriterWithEncoder>(data: WriterDataType<WriterT>, writer: WriterT, options?: WriterOptionsType<WriterT>): string;
/**
 * Encode loaded data into a sequence (iterator) of binary ArrayBuffers using the specified Writer.
 */
export declare function encodeInBatches<WriterT extends WriterWithEncoder>(data: WriterBatchType<WriterT>, writer: WriterT, options?: WriterOptionsType<WriterT>): AsyncIterable<ArrayBuffer>;
/**
 * Encode loaded data into a sequence (iterator) of binary ArrayBuffers using the specified Writer.
 */
export declare function encodeTextInBatches(data: unknown, writer: WriterWithEncoder, options?: WriterOptions): AsyncIterable<ArrayBuffer>;
/**
 * Encode data stored in a file (on disk) to another file.
 * @note Node.js only. This function enables using command-line converters as "writers".
 */
export declare function encodeURLtoURL(inputUrl: string, outputUrl: string, writer: Omit<WriterWithEncoder, 'encode'>, options?: WriterOptions): Promise<string>;
//# sourceMappingURL=encode.d.ts.map
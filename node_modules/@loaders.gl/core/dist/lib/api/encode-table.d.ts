import { WriterOptionsType, WriterWithEncoder } from '@loaders.gl/loader-utils';
import { Table } from '@loaders.gl/schema';
export declare function encodeTable<WriterT extends WriterWithEncoder = WriterWithEncoder>(data: Table, writer: WriterT, options?: WriterOptionsType<WriterT>): Promise<ArrayBuffer>;
export declare function encodeTableAsText<WriterT extends WriterWithEncoder = WriterWithEncoder>(data: Table, writer: WriterT, options?: WriterOptionsType<WriterT>): Promise<string>;
export declare function encodeTableInBatches<WriterT extends WriterWithEncoder = WriterWithEncoder>(data: Table, writer: WriterT, options?: WriterOptionsType<WriterT>): AsyncIterable<ArrayBuffer>;
//# sourceMappingURL=encode-table.d.ts.map
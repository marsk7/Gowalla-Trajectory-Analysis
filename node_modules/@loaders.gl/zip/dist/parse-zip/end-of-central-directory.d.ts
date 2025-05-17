import { FileProviderInterface } from '@loaders.gl/loader-utils';
/**
 * End of central directory info
 * according to https://en.wikipedia.org/wiki/ZIP_(file_format)
 */
export type ZipEoCDRecord = {
    /** Relative offset of cd start */
    cdStartOffset: bigint;
    /** Total number of central directory records */
    cdRecordsNumber: bigint;
    /** Size of central directory */
    cdByteSize: bigint;
    offsets: ZipEoCDRecordOffsets;
};
/**
 * End of central directory offsets
 * according to https://en.wikipedia.org/wiki/ZIP_(file_format)
 */
export type ZipEoCDRecordOffsets = {
    zipEoCDOffset: bigint;
    zip64EoCDOffset?: bigint;
    zip64EoCDLocatorOffset?: bigint;
};
/**
 * Data to generate End of central directory record
 * according to https://en.wikipedia.org/wiki/ZIP_(file_format)
 */
export type ZipEoCDGenerationOptions = {
    recordsNumber: number;
    cdSize: number;
    cdOffset: bigint;
    eoCDStart: bigint;
};
/**
 * Parses end of central directory record of zip file
 * @param file - FileProvider instance
 * @returns Info from the header
 */
export declare const parseEoCDRecord: (file: FileProviderInterface) => Promise<ZipEoCDRecord>;
/**
 * updates EoCD record to add more files to the archieve
 * @param eocdBody buffer containing header
 * @param oldEoCDOffsets info read from EoCD record befor updating
 * @param newCDStartOffset CD start offset to be updated
 * @param eocdStartOffset EoCD start offset to be updated
 * @returns new EoCD header
 */
export declare function updateEoCD(eocdBody: ArrayBuffer, oldEoCDOffsets: ZipEoCDRecordOffsets, newCDStartOffset: bigint, eocdStartOffset: bigint, newCDRecordsNumber: bigint): Uint8Array;
/**
 * generates EoCD record
 * @param options data to generate EoCD record
 * @returns ArrayBuffer with EoCD record
 */
export declare function generateEoCD(options: ZipEoCDGenerationOptions): ArrayBuffer;
//# sourceMappingURL=end-of-central-directory.d.ts.map
export declare const signature: Uint8Array;
/** info that can be placed into zip64 field, doc: https://en.wikipedia.org/wiki/ZIP_(file_format)#ZIP64 */
type Zip64Options = {
    /** Original uncompressed file size and Size of compressed data */
    size?: number;
    /** Offset of local header record */
    offset?: number;
};
/**
 * creates zip64 extra field
 * @param options info that can be placed into zip64 field
 * @returns buffer with field
 */
export declare function createZip64Info(options: Zip64Options): ArrayBuffer;
/**
 * Writes values into buffer according to the bytes amount
 * @param header header where to write the data
 * @param fieldSize size of the field in bytes
 * @param fieldOffset offset of the field
 * @param value value to be written
 */
export declare function setFieldToNumber(header: DataView, fieldSize: number, fieldOffset: number | bigint, value: number | bigint): void;
export {};
//# sourceMappingURL=zip64-info-generation.d.ts.map
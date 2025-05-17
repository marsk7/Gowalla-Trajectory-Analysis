/**
 * Checks if bigint can be converted to number and convert it if possible
 * @param bigint bigint to be converted
 * @returns number
 */
const toNumber = (bigint) => {
    if (bigint > Number.MAX_SAFE_INTEGER) {
        throw new Error('Offset is out of bounds');
    }
    return Number(bigint);
};
/**
 * Provides file data using DataView
 * @deprecated - will be replaced with ReadableFile
 */
export class DataViewFile {
    /** The DataView from which data is provided */
    file;
    constructor(file) {
        this.file = file;
    }
    async destroy() { }
    /**
     * Gets an unsigned 8-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    async getUint8(offset) {
        return this.file.getUint8(toNumber(offset));
    }
    /**
     * Gets an unsigned 16-bit intege at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    async getUint16(offset) {
        return this.file.getUint16(toNumber(offset), true);
    }
    /**
     * Gets an unsigned 32-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    async getUint32(offset) {
        return this.file.getUint32(toNumber(offset), true);
    }
    /**
     * Gets an unsigned 64-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    async getBigUint64(offset) {
        return this.file.getBigUint64(toNumber(offset), true);
    }
    /**
     * returns an ArrayBuffer whose contents are a copy of this file bytes from startOffset, inclusive, up to endOffset, exclusive.
     * @param startOffset The offset, in bytes, from the start of the file where to start reading the data.
     * @param endOffset The offset, in bytes, from the start of the file where to end reading the data.
     */
    async slice(startOffset, endOffset) {
        return this.file.buffer.slice(toNumber(startOffset), toNumber(endOffset));
    }
    /** the length (in bytes) of the data. */
    get length() {
        return BigInt(this.file.byteLength);
    }
}

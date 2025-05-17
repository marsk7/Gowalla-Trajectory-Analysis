/**
 * Provides file data using range requests to the server
 * @deprecated - will be replaced with ReadableFile
 */
export class FileProvider {
    /** The File object from which data is provided */
    file;
    size;
    /** Create a new BrowserFile */
    constructor(file, size) {
        this.file = file;
        this.size = BigInt(size);
    }
    static async create(file) {
        let size = 0n;
        if (file.bigsize > 0n) {
            size = file.bigsize;
        }
        else if (file.size > 0) {
            size = file.size;
        }
        else {
            const stats = await file.stat?.();
            size = stats?.bigsize ?? 0n;
        }
        return new FileProvider(file, size);
    }
    /**
     * Truncates the file descriptor.
     * @param length desired file lenght
     */
    async truncate(length) {
        throw new Error('file loaded via range requests cannot be changed');
    }
    /**
     * Append data to a file.
     * @param buffer data to append
     */
    async append(buffer) {
        throw new Error('file loaded via range requests cannot be changed');
    }
    /** Close file */
    async destroy() {
        throw new Error('file loaded via range requests cannot be changed');
    }
    /**
     * Gets an unsigned 8-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    async getUint8(offset) {
        const arrayBuffer = await this.file.read(offset, 1);
        const val = new Uint8Array(arrayBuffer).at(0);
        if (val === undefined) {
            throw new Error('something went wrong');
        }
        return val;
    }
    /**
     * Gets an unsigned 16-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    async getUint16(offset) {
        const arrayBuffer = await this.file.read(offset, 2);
        const val = new Uint16Array(arrayBuffer).at(0);
        if (val === undefined) {
            throw new Error('something went wrong');
        }
        return val;
    }
    /**
     * Gets an unsigned 32-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    async getUint32(offset) {
        const arrayBuffer = await this.file.read(offset, 4);
        const val = new Uint32Array(arrayBuffer).at(0);
        if (val === undefined) {
            throw new Error('something went wrong');
        }
        return val;
    }
    /**
     * Gets an unsigned 32-bit integer at the specified byte offset from the start of the file.
     * @param offset The offset, in bytes, from the start of the file where to read the data.
     */
    async getBigUint64(offset) {
        const arrayBuffer = await this.file.read(offset, 8);
        const val = new BigInt64Array(arrayBuffer).at(0);
        if (val === undefined) {
            throw new Error('something went wrong');
        }
        return val;
    }
    /**
     * returns an ArrayBuffer whose contents are a copy of this file bytes from startOffset, inclusive, up to endOffset, exclusive.
     * @param startOffset The offset, in byte, from the start of the file where to start reading the data.
     * @param endOffset The offset, in bytes, from the start of the file where to end reading the data.
     */
    async slice(startOffset, endOffset) {
        const bigLength = BigInt(endOffset) - BigInt(startOffset);
        if (bigLength > Number.MAX_SAFE_INTEGER) {
            throw new Error('too big slice');
        }
        const length = Number(bigLength);
        return await this.file.read(startOffset, length);
    }
    /**
     * the length (in bytes) of the data.
     */
    get length() {
        return this.size;
    }
}

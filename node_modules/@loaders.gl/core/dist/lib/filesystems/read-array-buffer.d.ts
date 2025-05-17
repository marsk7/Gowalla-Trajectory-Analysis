/**
 * Read a slice of a Blob or File, without loading the entire file into memory
 * The trick when reading File objects is to read successive "slices" of the File
 * Per spec https://w3c.github.io/FileAPI/, slicing a File only updates the start and end fields
 * @param file to read
 */
export declare function readArrayBuffer(file: Blob | ArrayBuffer | any, start: number, length: number): Promise<ArrayBuffer>;
//# sourceMappingURL=read-array-buffer.d.ts.map
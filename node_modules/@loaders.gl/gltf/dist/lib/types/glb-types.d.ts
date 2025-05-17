export type GLBBinChunk = {
    byteOffset: number;
    byteLength: number;
    arrayBuffer: ArrayBuffer;
};
export type GLB = {
    type: string;
    version: number;
    header: {
        byteOffset: number;
        byteLength: number;
        hasBinChunk: boolean;
    };
    json: Record<string, any>;
    binChunks: GLBBinChunk[];
};
//# sourceMappingURL=glb-types.d.ts.map
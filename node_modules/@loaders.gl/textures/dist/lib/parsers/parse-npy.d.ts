import { TypedArray } from '@math.gl/types';
/** One numpy "tile" */
export type NPYTile = {
    /** tile header */
    header: NumpyHeader;
    /** data in tile */
    data: TypedArray;
};
type NumpyHeader = {
    descr: string;
    shape: number[];
};
export declare function parseNPY(arrayBuffer: ArrayBuffer, options?: {}): NPYTile;
export {};
//# sourceMappingURL=parse-npy.d.ts.map
import type { Bin } from "./cpu-aggregator.js";
/** Group data points into bins */
export declare function sortBins({ pointCount, getBinId }: {
    pointCount: number;
    getBinId: (index: number) => number[] | null;
}): Bin[];
/** Pack bin ids into a typed array */
export declare function packBinIds({ bins, dimensions, target }: {
    bins: Bin[];
    /** Size of bin IDs */
    dimensions: number;
    /** Array to write output into */
    target?: Float32Array | null;
}): Float32Array;
//# sourceMappingURL=sort-bins.d.ts.map
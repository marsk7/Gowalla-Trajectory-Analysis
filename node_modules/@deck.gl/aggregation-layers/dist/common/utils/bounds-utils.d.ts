/** Utility to estimate binIdRange as expected by AggregatorProps */
export declare function getBinIdRange({ dataBounds, getBinId, padding }: {
    /** Bounds of the input data */
    dataBounds: [min: number[], max: number[]];
    /** Given a data point, returns the bin id that it belongs to */
    getBinId: (p: number[]) => number[];
    /** Add a border around the result to avoid clipping */
    padding?: number;
}): [number, number][];
//# sourceMappingURL=bounds-utils.d.ts.map
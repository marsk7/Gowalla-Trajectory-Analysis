import { Aggregator } from "../common/aggregator/index.js";
type ValueReader = (x: number, y: number) => number;
/** Returns an accessor to the aggregated values from bin id */
export declare function getAggregatorValueReader(opts: {
    aggregator: Aggregator;
    binIdRange: [number, number][];
    channel: 0 | 1 | 2;
}): ValueReader | null;
export {};
//# sourceMappingURL=value-reader.d.ts.map
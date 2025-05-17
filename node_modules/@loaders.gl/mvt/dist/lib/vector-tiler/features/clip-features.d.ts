import type { ProtoFeature } from "./proto-feature.js";
/**
 * Clip features between two vertical or horizontal axis-parallel lines:
 *     |        |
 *  ___|___     |     /
 * /   |   \____|____/
 *     |        |
 *
 * @param k1 and k2 are the line coordinates
 * @param axis: 0 for x, 1 for y
 * @param minAll and maxAll: minimum and maximum coordinate value for all features
 */
export declare function clipFeatures(features: ProtoFeature[], scale: number, k1: number, k2: number, axis: any, minAll: number, maxAll: number, options: {
    lineMetrics: boolean;
}): ProtoFeature[] | null;
//# sourceMappingURL=clip-features.d.ts.map
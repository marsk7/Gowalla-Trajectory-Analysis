import type { ProtoFeature } from "./proto-feature.js";
/**
 * Options for wrap()
 */
export type WrapFeaturesOptions = {
    buffer: number /** number of pixels of buffer for the tile */;
    extent: number /** extent of each tile */;
    lineMetrics: boolean;
};
/**
 * Wrap across antemeridian, by clipping into two tiles, shifting the overflowing x coordinates
 * @param list of features to be wrapped
 * @param options buffer and extent
 * @returns
 */
export declare function wrapFeatures(features: ProtoFeature[], options: WrapFeaturesOptions): ProtoFeature[];
//# sourceMappingURL=wrap-features.d.ts.map
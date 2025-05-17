import type { Feature, FeatureCollection } from '@loaders.gl/schema';
import type { ProtoFeature } from "./proto-feature.js";
export type ConvertFeatureOptions = {
    /** max zoom to preserve detail on */
    maxZoom?: number;
    /** simplification tolerance (higher means simpler) */
    tolerance?: number;
    /** tile extent */
    extent?: number;
    /** whether to calculate line metrics */
    lineMetrics?: boolean;
};
/**
 * converts a GeoJSON feature into an intermediate projected JSON vector format
 * with simplification data
 */
export declare function convertFeaturesToProtoFeature(data: Feature | FeatureCollection, options: ConvertFeatureOptions): ProtoFeature[];
//# sourceMappingURL=convert-feature.d.ts.map
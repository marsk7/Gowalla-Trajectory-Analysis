import { LayerProps } from '@deck.gl/core';
import { PolygonLayerProps, ScatterplotLayerProps } from '..';
import type { ExtendedBinaryFeatureCollection } from "./geojson-binary.js";
import { SeparatedGeometries } from "./geojson.js";
type PathLayerProps = LayerProps & Record<string, any>;
export type SubLayersProps = {
    points: Partial<ScatterplotLayerProps>;
    lines: Partial<PathLayerProps>;
    polygons: Partial<PolygonLayerProps>;
    polygonsOutline: Partial<PathLayerProps>;
};
export declare function createLayerPropsFromFeatures(features: SeparatedGeometries, featuresDiff: any): SubLayersProps;
export declare function createLayerPropsFromBinary(geojsonBinary: Required<ExtendedBinaryFeatureCollection>, encodePickingColor: (id: number, result: number[]) => void): SubLayersProps;
export {};
//# sourceMappingURL=geojson-layer-props.d.ts.map
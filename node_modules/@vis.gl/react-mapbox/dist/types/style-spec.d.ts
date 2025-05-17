export type CanvasSourceSpecification = {
    type: 'canvas';
    coordinates: [[number, number], [number, number], [number, number], [number, number]];
    animate?: boolean;
    canvas: string | HTMLCanvasElement;
};
export type { LayerSpecification, FillLayerSpecification, LineLayerSpecification, SymbolLayerSpecification, CircleLayerSpecification, HeatmapLayerSpecification, FillExtrusionLayerSpecification, RasterLayerSpecification, RasterParticleLayerSpecification, HillshadeLayerSpecification, ModelLayerSpecification, BackgroundLayerSpecification, SkyLayerSpecification, SlotLayerSpecification, ClipLayerSpecification, SourceSpecification, VectorSourceSpecification, RasterSourceSpecification, RasterDEMSourceSpecification, RasterArraySourceSpecification, GeoJSONSourceSpecification, VideoSourceSpecification, ImageSourceSpecification, ModelSourceSpecification, StyleSpecification, LightSpecification, FogSpecification, TerrainSpecification, ProjectionSpecification } from 'mapbox-gl';
//# sourceMappingURL=style-spec.d.ts.map
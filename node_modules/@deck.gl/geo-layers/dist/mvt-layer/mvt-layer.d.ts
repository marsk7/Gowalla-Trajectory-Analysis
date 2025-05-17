import { Layer, LayersList, PickingInfo, UpdateParameters, GetPickingInfoParams, DefaultProps } from '@deck.gl/core';
import { GeoJsonLayerProps } from '@deck.gl/layers';
import type { Loader } from '@loaders.gl/loader-utils';
import type { BinaryFeatureCollection } from '@loaders.gl/schema';
import type { Feature, Geometry } from 'geojson';
import TileLayer, { TileLayerPickingInfo, TileLayerProps } from "../tile-layer/tile-layer.js";
import type { Tileset2DProps, TileLoadProps } from "../tileset-2d/index.js";
import { Tile2DHeader, URLTemplate } from "../tileset-2d/index.js";
export type TileJson = {
    tilejson: string;
    tiles: string[];
    vector_layers: any[];
    attribution?: string;
    scheme?: string;
    maxzoom?: number;
    minzoom?: number;
    version?: string;
};
type ParsedMvtTile = Feature[] | BinaryFeatureCollection;
export type MVTLayerPickingInfo<FeaturePropertiesT = {}> = TileLayerPickingInfo<ParsedMvtTile, PickingInfo<Feature<Geometry, FeaturePropertiesT>>>;
/** All props supported by the MVTLayer */
export type MVTLayerProps<FeaturePropertiesT = unknown> = _MVTLayerProps<FeaturePropertiesT> & Omit<TileLayerProps<ParsedMvtTile>, 'data'>;
/** Props added by the MVTLayer  */
export type _MVTLayerProps<FeaturePropertiesT> = Omit<GeoJsonLayerProps<FeaturePropertiesT>, 'data'> & {
    data: TileJson | URLTemplate;
    /** Called if `data` is a TileJSON URL when it is successfully fetched. */
    onDataLoad?: ((tilejson: TileJson | null) => void) | null;
    /** Needed for highlighting a feature split across two or more tiles. */
    uniqueIdProperty?: string;
    /** A feature with ID corresponding to the supplied value will be highlighted. */
    highlightedFeatureId?: string | number | null;
    /**
     * Use tile data in binary format.
     *
     * @default true
     */
    binary?: boolean;
    /**
     * Loaders used to transform tiles into `data` property passed to `renderSubLayers`.
     *
     * @default [MVTWorkerLoader] from `@loaders.gl/mvt`
     */
    loaders?: Loader[];
};
/** Render data formatted as [Mapbox Vector Tiles](https://docs.mapbox.com/vector-tiles/specification/). */
export default class MVTLayer<FeaturePropertiesT = any, ExtraProps extends {} = {}> extends TileLayer<ParsedMvtTile, Required<_MVTLayerProps<FeaturePropertiesT>> & ExtraProps> {
    static layerName: string;
    static defaultProps: DefaultProps<MVTLayerProps<unknown>>;
    state: TileLayer<ParsedMvtTile>['state'] & {
        binary: boolean;
        data: URLTemplate;
        tileJSON: TileJson | null;
        highlightColor?: number[];
        hoveredFeatureId: number | string | null;
        hoveredFeatureLayerName: string | null;
    };
    initializeState(): void;
    get isLoaded(): boolean;
    updateState({ props, oldProps, context, changeFlags }: UpdateParameters<this>): void;
    private _updateTileData;
    _getTilesetOptions(): Tileset2DProps;
    renderLayers(): Layer | null | LayersList;
    getTileData(loadProps: TileLoadProps): Promise<ParsedMvtTile>;
    renderSubLayers(props: TileLayer['props'] & {
        id: string;
        data: ParsedMvtTile;
        _offset: number;
        tile: Tile2DHeader<ParsedMvtTile>;
    }): Layer | null | LayersList;
    protected _updateAutoHighlight(info: PickingInfo): void;
    protected _isWGS84(): boolean;
    getPickingInfo(params: GetPickingInfoParams): MVTLayerPickingInfo<FeaturePropertiesT>;
    getSubLayerPropsByTile(tile: Tile2DHeader<ParsedMvtTile>): Record<string, any>;
    private getHighlightedObjectIndex;
    private _pickObjects;
    /** Get the rendered features in the current viewport. */
    getRenderedFeatures(maxFeatures?: number | null): Feature[];
    private _setWGS84PropertyForTiles;
}
export {};
//# sourceMappingURL=mvt-layer.d.ts.map
import { Accessor, Color, CompositeLayer, CompositeLayerProps, DefaultProps, Layer, UpdateParameters } from '@deck.gl/core';
import { HeatmapProps } from "./heatmap.js";
import { QuadbinTileLayerProps } from "./quadbin-tile-layer.js";
import { TilejsonResult } from '@carto/api-client';
import { _Tile2DHeader as Tile2DHeader } from '@deck.gl/geo-layers';
import { Texture } from '@luma.gl/core';
/** All properties supported by HeatmapTileLayer. */
export type HeatmapTileLayerProps<DataT = unknown> = _HeatmapTileLayerProps<DataT> & CompositeLayerProps & {
    data: null | TilejsonResult | Promise<TilejsonResult>;
};
/** Properties added by HeatmapTileLayer. */
type _HeatmapTileLayerProps<DataT> = QuadbinTileLayerProps<DataT> & HeatmapProps & {
    /**
     * Specified as an array of colors [color1, color2, ...].
     *
     * @default `6-class YlOrRd` - [colorbrewer](http://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=6)
     */
    colorRange: Color[];
    /**
     * The weight of each object.
     *
     * @default 1
     */
    getWeight?: Accessor<DataT, number>;
    /** Called when maximum density in displayed tiles changes. */
    onMaxDensityChange?: ((maxDensity: number) => void) | null;
};
declare class HeatmapTileLayer<DataT = any, ExtraProps extends {} = {}> extends CompositeLayer<ExtraProps & Required<_HeatmapTileLayerProps<DataT>>> {
    static layerName: string;
    static defaultProps: DefaultProps<HeatmapTileLayerProps<unknown>>;
    state: {
        colorTexture?: Texture;
        isLoaded: boolean;
        tiles: Set<Tile2DHeader>;
        viewportChanged?: boolean;
    };
    initializeState(): void;
    shouldUpdateState({ changeFlags }: {
        changeFlags: any;
    }): boolean;
    updateState(opts: UpdateParameters<this>): void;
    renderLayers(): Layer;
    _updateColorTexture(opts: any): void;
}
export default HeatmapTileLayer;
//# sourceMappingURL=heatmap-tile-layer.d.ts.map
import { TileSource, GetTileParameters, GetTileDataParameters } from "./tile-source.js";
import { ImageSource, ImageSourceMetadata } from "./image-source.js";
/**
 * MapTileSource - data sources that allow data to be queried by (geospatial) extents
 * @note
 * - If geospatial, bounding box is expected to be in web mercator coordinates
 */
export declare class TileSourceAdapter implements TileSource<ImageSourceMetadata> {
    readonly viewportSource: ImageSource;
    constructor(source: ImageSource);
    getMetadata(): Promise<ImageSourceMetadata>;
    /** Flat parameters */
    getTile(parameters: GetTileParameters): Promise<unknown>;
    /** deck.gl style parameters */
    getTileData(parameters: GetTileDataParameters): Promise<unknown | null>;
    /** Bounding box of tiles in this tileset `[[w, s], [e, n]]`  */
    protected getTileBoundingBox(parameters: GetTileParameters): [min: [x: number, y: number], max: [x: number, y: number]];
    getTileLowerLeftCorner(x: number, y: number, zoom: number): [number, number];
}
//# sourceMappingURL=tile-source-adapter.d.ts.map
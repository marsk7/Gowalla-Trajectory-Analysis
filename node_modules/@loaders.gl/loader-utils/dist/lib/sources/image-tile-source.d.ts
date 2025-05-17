import type { ImageType } from "./utils/image-type.js";
import type { TileSourceProps, TileSourceMetadata, GetTileParameters, TileSource } from "./tile-source.js";
export type ImageTileSourceProps = TileSourceProps;
/**
 * MapTileSource - data sources that allow data to be queried by (geospatial) tile
 * @note If geospatial, bounding box is expected to be in web mercator coordinates
 */
export interface ImageTileSource<PropsT extends TileSourceProps = TileSourceProps, MetadataT extends TileSourceMetadata = TileSourceMetadata> extends TileSource<PropsT, MetadataT> {
    getImageTile(parameters: GetTileParameters): Promise<ImageType | null>;
}
//# sourceMappingURL=image-tile-source.d.ts.map
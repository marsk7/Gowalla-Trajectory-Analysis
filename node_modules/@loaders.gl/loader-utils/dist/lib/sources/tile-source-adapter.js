// loaders.gl
// SPDX-License-Identifier: MIT
/**
 * MapTileSource - data sources that allow data to be queried by (geospatial) extents
 * @note
 * - If geospatial, bounding box is expected to be in web mercator coordinates
 */
// @ts-expect-error TODO - does not implement all DataSource members
export class TileSourceAdapter {
    viewportSource;
    constructor(source) {
        this.viewportSource = source;
    }
    async getMetadata() {
        return await this.viewportSource.getMetadata();
    }
    /** Flat parameters */
    getTile(parameters) {
        const width = 512;
        const height = 512;
        const boundingBox = this.getTileBoundingBox(parameters);
        return this.viewportSource.getImage({ boundingBox, layers: [], width, height });
    }
    /** deck.gl style parameters */
    getTileData(parameters) {
        return this.getTile(parameters.index);
    }
    /** Bounding box of tiles in this tileset `[[w, s], [e, n]]`  */
    getTileBoundingBox(parameters) {
        if (parameters.crs && parameters.crs !== 'ESPG3758') {
            throw new Error('SRS not ESPG3758');
        }
        const { x, y, z: zoom } = parameters;
        return [
            /** Bounding box of tile in this tileset `[[w, s], ...]`  */
            this.getTileLowerLeftCorner(x, y, zoom),
            /** Bounding box of tile in this tileset `[..., [e, n]]`  */
            this.getTileLowerLeftCorner(x + 1, y - 1, zoom)
        ];
    }
    getTileLowerLeftCorner(x, y, zoom) {
        const tiles = 2 ^ zoom;
        const longitude = (x / tiles) * 360.0 - 180.0;
        const latitudeRadians = Math.atan(Math.sinh(Math.PI * (1 - (2 * (y + 1)) / tiles)));
        const latitude = (180.0 * latitudeRadians) / Math.PI;
        return [longitude, latitude];
    }
}

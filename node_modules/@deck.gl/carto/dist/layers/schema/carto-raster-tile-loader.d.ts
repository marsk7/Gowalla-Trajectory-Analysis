import { LoaderWithParser } from '@loaders.gl/loader-utils';
import { NumericProps, Properties } from "./spatialjson-utils.js";
declare const CartoRasterTileLoader: LoaderWithParser;
export type Raster = {
    /** Raster tiles are square, with 'blockSize' width and height in pixels. */
    blockSize: number;
    cells: {
        numericProps: NumericProps;
        properties: Properties[];
    };
};
export default CartoRasterTileLoader;
//# sourceMappingURL=carto-raster-tile-loader.d.ts.map
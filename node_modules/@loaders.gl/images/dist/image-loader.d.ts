import type { LoaderOptions } from '@loaders.gl/loader-utils';
import type { ImageType } from "./types.js";
import { parseImage } from "./lib/parsers/parse-image.js";
export type ImageLoaderOptions = LoaderOptions & {
    image?: {
        type?: 'auto' | 'data' | 'imagebitmap' | 'image';
        decode?: boolean;
    };
    imagebitmap?: ImageBitmapOptions;
};
/**
 * Loads a platform-specific image type
 * Note: This type can be used as input data to WebGL texture creation
 */
export declare const ImageLoader: {
    readonly dataType: ImageType;
    readonly batchType: never;
    readonly id: "image";
    readonly module: "images";
    readonly name: "Images";
    readonly version: any;
    readonly mimeTypes: string[];
    readonly extensions: string[];
    readonly parse: typeof parseImage;
    readonly tests: [(arrayBuffer: ArrayBuffer) => boolean];
    readonly options: ImageLoaderOptions;
};
//# sourceMappingURL=image-loader.d.ts.map
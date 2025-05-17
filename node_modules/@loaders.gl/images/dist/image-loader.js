// import type { ImageType } from '@loaders.gl/schema';
import { VERSION } from "./lib/utils/version.js";
import { parseImage } from "./lib/parsers/parse-image.js";
import { getBinaryImageMetadata } from "./lib/category-api/binary-image-api.js";
const EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'svg', 'avif'];
const MIME_TYPES = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
    'image/avif',
    'image/bmp',
    'image/vnd.microsoft.icon',
    'image/svg+xml'
];
const DEFAULT_IMAGE_LOADER_OPTIONS = {
    image: {
        type: 'auto',
        decode: true // if format is HTML
    }
    // imagebitmap: {} - passes (platform dependent) parameters to ImageBitmap constructor
};
/**
 * Loads a platform-specific image type
 * Note: This type can be used as input data to WebGL texture creation
 */
export const ImageLoader = {
    dataType: null,
    batchType: null,
    id: 'image',
    module: 'images',
    name: 'Images',
    version: VERSION,
    mimeTypes: MIME_TYPES,
    extensions: EXTENSIONS,
    parse: parseImage,
    // TODO: byteOffset, byteLength;
    tests: [(arrayBuffer) => Boolean(getBinaryImageMetadata(new DataView(arrayBuffer)))],
    options: DEFAULT_IMAGE_LOADER_OPTIONS
};

// LOADERS AND WRITERS
export { ImageLoader } from "./image-loader.js";
export { ImageWriter } from "./image-writer.js";
// IMAGE CATEGORY API
// Binary Image API
export { getBinaryImageMetadata } from "./lib/category-api/binary-image-api.js";
// Parsed Image API
export { isImageTypeSupported, getDefaultImageType } from "./lib/category-api/image-type.js";
export { isImage, getImageType, getImageSize, getImageData } from "./lib/category-api/parsed-image-api.js";
// EXPERIMENTAL
export { getSupportedImageFormats } from "./lib/category-api/image-format.js";
export { isImageFormatSupported } from "./lib/category-api/image-format.js";
// REMOVED
/** @deprecated Temporary placeholder to prevent builds from breaking */
export function loadImage() {
    throw new Error('loadImage has moved to @loaders.gl/textures');
}

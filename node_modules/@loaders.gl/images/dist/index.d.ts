export type { ImageDataType, ImageType, ImageTypeEnum } from "./types.js";
export type { ImageLoaderOptions } from "./image-loader.js";
export { ImageLoader } from "./image-loader.js";
export { ImageWriter } from "./image-writer.js";
export { getBinaryImageMetadata } from "./lib/category-api/binary-image-api.js";
export { isImageTypeSupported, getDefaultImageType } from "./lib/category-api/image-type.js";
export { isImage, getImageType, getImageSize, getImageData } from "./lib/category-api/parsed-image-api.js";
export { getSupportedImageFormats } from "./lib/category-api/image-format.js";
export { isImageFormatSupported } from "./lib/category-api/image-format.js";
/** @deprecated Temporary placeholder to prevent builds from breaking */
export declare function loadImage(): void;
//# sourceMappingURL=index.d.ts.map
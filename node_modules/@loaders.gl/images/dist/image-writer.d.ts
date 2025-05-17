import type { WriterOptions } from '@loaders.gl/loader-utils';
import { encodeImage } from "./lib/encoders/encode-image.js";
export type ImageWriterOptions = WriterOptions & {
    image?: {
        mimeType?: 'image/png';
        jpegQuality?: number | null;
    };
};
/** Writer for image data */
export declare const ImageWriter: {
    readonly name: "Images";
    readonly id: "image";
    readonly module: "images";
    readonly version: any;
    readonly extensions: ["jpeg"];
    readonly options: {
        readonly image: {
            readonly mimeType: "image/png";
            readonly jpegQuality: null;
        };
    };
    readonly encode: typeof encodeImage;
};
//# sourceMappingURL=image-writer.d.ts.map
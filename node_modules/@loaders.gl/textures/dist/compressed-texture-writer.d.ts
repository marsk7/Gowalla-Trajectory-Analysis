import type { WriterOptions } from '@loaders.gl/loader-utils';
import { encodeImageURLToCompressedTextureURL } from "./lib/encoders/encode-texture.js";
/** Compressed Texture writer options */
export type CompressedTextureWriterOptions = WriterOptions & {
    /** @deprecated current working directory */
    cwd?: string;
    /** Compressed Texture writer options */
    texture?: {
        format: string;
        compression: string;
        quality: string;
        mipmap: boolean;
        flipY: boolean;
        toolFlags: string;
    };
};
/**
 * DDS Texture Container Exporter
 */
export declare const CompressedTextureWriter: {
    readonly name: "DDS Texture Container";
    readonly id: "dds";
    readonly module: "textures";
    readonly version: any;
    readonly extensions: ["dds"];
    readonly options: {
        readonly texture: {
            readonly format: "auto";
            readonly compression: "auto";
            readonly quality: "auto";
            readonly mipmap: false;
            readonly flipY: false;
            readonly toolFlags: "";
        };
    };
    readonly encodeURLtoURL: typeof encodeImageURLToCompressedTextureURL;
    readonly encode: () => never;
};
//# sourceMappingURL=compressed-texture-writer.d.ts.map
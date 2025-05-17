import type { WriterOptions } from '@loaders.gl/loader-utils';
import { encodeKTX2BasisTexture } from "./lib/encoders/encode-ktx2-basis-texture.js";
/** @todo should be in basis sub-object */
export type KTX2BasisWriterOptions = WriterOptions & {
    ['ktx2-basis-writer']?: {
        useSRGB?: boolean;
        qualityLevel?: number;
        encodeUASTC?: boolean;
        mipmaps?: boolean;
    };
};
/**
 *  Basis Universal Supercompressed GPU Texture.
 *  Spec - https://github.com/Esri/i3s-spec/blob/master/docs/1.8/textureSetDefinitionFormat.cmn.md
 */
export declare const KTX2BasisWriter: {
    readonly name: "Basis Universal Supercompressed GPU Texture";
    readonly id: "ktx2-basis-writer";
    readonly module: "textures";
    readonly version: any;
    readonly extensions: ["ktx2"];
    readonly options: {
        readonly "ktx2-basis-writer": {
            readonly useSRGB: false;
            readonly qualityLevel: 10;
            readonly encodeUASTC: false;
            readonly mipmaps: false;
        };
    };
    readonly encode: typeof encodeKTX2BasisTexture;
};
//# sourceMappingURL=ktx2-basis-writer.d.ts.map
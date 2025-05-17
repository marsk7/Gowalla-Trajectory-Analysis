export declare const BASIS_EXTERNAL_LIBRARIES: {
    /** Basis transcoder, javascript wrapper part */
    TRANSCODER: string;
    /** Basis transcoder, compiled web assembly part */
    TRANSCODER_WASM: string;
    /** Basis encoder, javascript wrapper part */
    ENCODER: string;
    /** Basis encoder, compiled web assembly part */
    ENCODER_WASM: string;
};
/**
 * Loads wasm transcoder module
 * @param options
 * @returns {BasisFile} promise
 */
export declare function loadBasisTranscoderModule(options: any): Promise<any>;
/**
 * Loads wasm encoder module
 * @param options
 * @returns {BasisFile, KTX2File} promise
 */
export declare function loadBasisEncoderModule(options: any): Promise<any>;
//# sourceMappingURL=basis-module-loader.d.ts.map
import Tar from "./lib/tar/tar.js";
type TarBuilderOptions = {
    recordsPerBlock?: number;
};
/**
 * Build a tar file by adding files
 */
export declare class TarBuilder {
    static get properties(): {
        id: string;
        name: string;
        extensions: string[];
        mimeTypes: string[];
        builder: typeof TarBuilder;
        options: {
            recordsPerBlock: number;
        };
    };
    options: TarBuilderOptions;
    tape: Tar;
    count: number;
    constructor(options?: Partial<TarBuilderOptions>);
    /** Adds a file to the archive. */
    addFile(filename: string, buffer: ArrayBuffer): void;
    build(): Promise<ArrayBuffer>;
}
export {};
//# sourceMappingURL=tar-builder.d.ts.map
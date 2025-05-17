type FileMap = Record<string, ArrayBuffer>;
export declare const ZipLoader: {
    readonly dataType: FileMap;
    readonly batchType: never;
    readonly id: "zip";
    readonly module: "zip";
    readonly name: "Zip Archive";
    readonly version: any;
    readonly extensions: ["zip"];
    readonly mimeTypes: ["application/zip"];
    readonly category: "archive";
    readonly tests: ["PK"];
    readonly options: {};
    readonly parse: typeof parseZipAsync;
};
declare function parseZipAsync(data: any, options?: {}): Promise<FileMap>;
export {};
//# sourceMappingURL=zip-loader.d.ts.map
import { parseCrunch } from "../lib/parsers/parse-crunch.js";
/**
 * Loader for the Crunch compressed texture container format
 */
export declare const CrunchLoaderWithParser: {
    parse: typeof parseCrunch;
    dataType: import("@loaders.gl/schema").TextureLevel[];
    batchType: never;
    id: "crunch";
    name: "Crunch";
    module: "textures";
    version: any;
    worker: true;
    extensions: ["crn"];
    mimeTypes: ["image/crn", "image/x-crn", "application/octet-stream"];
    binary: true;
    options: {
        readonly crunch: {
            readonly libraryPath: "libs/";
        };
    };
};
//# sourceMappingURL=crunch-worker.d.ts.map
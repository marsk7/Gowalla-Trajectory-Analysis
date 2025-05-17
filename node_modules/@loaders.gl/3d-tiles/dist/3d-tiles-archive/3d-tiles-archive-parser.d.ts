import { FileProviderInterface } from '@loaders.gl/loader-utils';
import { Tiles3DArchive } from "./3d-tiles-archive-archive.js";
/**
 * Creates 3tz file handler from raw file
 * @param fileProvider raw file data
 * @param cb is called with information message during parsing
 * @returns 3tz file handler
 */
export declare const parse3DTilesArchive: (fileProvider: FileProviderInterface, cb?: (msg: string) => void) => Promise<Tiles3DArchive>;
//# sourceMappingURL=3d-tiles-archive-parser.d.ts.map